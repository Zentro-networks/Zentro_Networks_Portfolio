// Vercel Serverless Function – Contact Form Handler
// Sends enquiries via email (Resend). After a successful email send, returns
// a WhatsApp Click-to-Chat URL so the frontend can navigate the visitor there.
//
// ── EMAIL environment variables ─────────────────────────────────────
//   RESEND_API_KEY     – Resend API key (https://resend.com)
//   CONTACT_EMAIL_TO   – Recipient email (comma-separate for several)
//   CONTACT_EMAIL_FROM – Sender on a domain verified in Resend, e.g.
//                        "Zentro Networks <enquiries@yourdomain.com>"
//                        (onboarding@resend.dev only delivers to the
//                        email address that owns the Resend account)
//
// ── WHATSAPP (Click-to-Chat) ────────────────────────────────────────
//   WHATSAPP_NUMBERS   – Comma-separated recipient numbers with country
//                        code, no + prefix (e.g. 916381337271,917305893249).
//                        Each number generates a separate wa.me URL.
//                        Leave empty to disable WhatsApp.
//
// All of these are read on the server only. Never prefix them with VITE_.

const REQUEST_TIMEOUT_MS = 7000
const MAX_BODY_BYTES = 20 * 1024

const LIMITS = { name: 100, email: 254, phone: 30, company: 120, service: 120, budget: 60, message: 5000 }

const EMAIL_RE = /^[^\s@<>"',;()\\]+@[^\s@<>"',;()\\]+\.[^\s@<>"',;()\\]{2,}$/
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/
const FROM_RE = /^(?:[^<>\r\n]{1,100}\s<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>|[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+)$/

// ── Best-effort abuse protection ────────────────────────────────────
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const DUPLICATE_WINDOW_MS = 60 * 1000
const hits = new Map()
const recentSent = new Map()

function rateLimited(ip) {
  const now = Date.now()
  if (hits.size > 1000) for (const [k, v] of hits) if (!v.some(t => now - t < RATE_WINDOW_MS)) hits.delete(k)
  const list = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS)
  if (list.length >= RATE_MAX) { hits.set(ip, list); return true }
  list.push(now); hits.set(ip, list)
  return false
}
function fingerprint(ip, d) { return `${ip}|${d.email}|${d.service}|${d.message}` }
function isDuplicate(key) {
  const now = Date.now()
  for (const [k, t] of recentSent) if (now - t > DUPLICATE_WINDOW_MS) recentSent.delete(k)
  return recentSent.has(key)
}

// ── Handler ─────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }
  if (!/^application\/json\b/i.test(String(req.headers?.['content-type'] || ''))) {
    return res.status(415).json({ ok: false, error: 'Content-Type must be application/json' })
  }
  if (Number(req.headers?.['content-length'] || 0) > MAX_BODY_BYTES) {
    return res.status(413).json({ ok: false, error: 'Request too large' })
  }

  const body = readBody(req)
  if (!body) return res.status(400).json({ ok: false, error: 'Invalid request body' })

  const { data, errors } = validate(body)
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, error: 'Validation failed', fields: errors })
  }

  const ip = clientIp(req)
  if (rateLimited(ip)) {
    res.setHeader('Retry-After', String(Math.ceil(RATE_WINDOW_MS / 1000)))
    return res.status(429).json({ ok: false, error: 'Too many enquiries. Please try again later.' })
  }
  const fp = fingerprint(ip, data)
  if (isDuplicate(fp)) {
    return res.status(429).json({ ok: false, error: 'This enquiry was just submitted. Please wait a moment before sending it again.' })
  }

  // ── Send email ──────────────────────────────────────────────────
  const email = await sendEmail(data).catch(unexpected('email'))

  // ── Build WhatsApp Click-to-Chat URLs (only after email succeeds) ──
  let whatsappUrls = []
  if (email.success) {
    whatsappUrls = buildWhatsAppUrls(data)
  }

  if (email.success) {
    recentSent.set(fp, Date.now())
    return res.status(200).json({
      ok: true,
      emailSent: true,
      email,
      whatsappUrls,
    })
  }

  return res.status(email.code === 'not_configured' ? 503 : 502).json({
    ok: false,
    error: 'Email delivery failed.',
    emailSent: false,
    emailError: email.error,
    email,
  })
}

function unexpected(channel) {
  return e => {
    console.error(`[contact] ${channel} unexpected error: ${e?.name || 'Error'}`)
    return { success: false, code: 'internal_error', error: `${channel === 'email' ? 'Email' : 'WhatsApp'} delivery failed unexpectedly.` }
  }
}

// ── Request parsing / validation ────────────────────────────────────
function readBody(req) {
  let b
  try { b = req.body } catch { return null }
  if (Buffer.isBuffer(b)) b = b.toString('utf8')
  if (typeof b === 'string') { try { b = JSON.parse(b) } catch { return null } }
  return b && typeof b === 'object' && !Array.isArray(b) ? b : null
}

function clientIp(req) {
  const xff = String(req.headers?.['x-forwarded-for'] || '').split(',')[0].trim()
  return xff || req.socket?.remoteAddress || 'unknown'
}

const oneLine = s => s.replace(/[\u0000-\u001F\u007F\u2028\u2029]+/g, ' ').replace(/\s{2,}/g, ' ').trim()
const multiLine = s => s.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u2028\u2029]/g, '').trim()

function validate(b) {
  const errors = {}
  const data = {}
  for (const k of Object.keys(LIMITS)) {
    const raw = b[k]
    if (raw === undefined || raw === null) { data[k] = ''; continue }
    if (typeof raw !== 'string') { errors[k] = 'Invalid value.'; data[k] = ''; continue }
    if (raw.length > LIMITS[k] * 2) { errors[k] = `Must be at most ${LIMITS[k]} characters.`; data[k] = ''; continue }
    data[k] = k === 'message' ? multiLine(raw) : oneLine(raw)
    if (data[k].length > LIMITS[k]) errors[k] = `Must be at most ${LIMITS[k]} characters.`
  }
  if (!errors.name && data.name.length < 2) errors.name = 'Enter your full name.'
  if (!errors.email && !EMAIL_RE.test(data.email)) errors.email = 'Enter a valid email address.'
  if (!errors.phone && data.phone && !PHONE_RE.test(data.phone)) errors.phone = 'Enter a valid phone number.'
  if (!errors.service && !data.service) errors.service = 'Select a service.'
  if (!errors.message && data.message.length < 20) errors.message = 'Describe your project in at least 20 characters.'
  data.subject = oneLine(`Project Enquiry: ${data.service}`)
  return { data, errors }
}

// ── Network helper ──────────────────────────────────────────────────
async function timedFetch(url, opts) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS)
  try { return await fetch(url, { ...opts, signal: ctrl.signal }) } finally { clearTimeout(t) }
}
function networkFailure(label, e) {
  if (e?.name === 'AbortError') return { success: false, code: 'timeout', error: `${label} service timed out.` }
  return { success: false, code: 'network_error', error: `Could not reach the ${label} service.` }
}
const envVar = k => (process.env[k] || '').trim()

// ── EMAIL via Resend ────────────────────────────────────────────────
async function sendEmail(d) {
  const apiKey = envVar('RESEND_API_KEY')
  const toRaw = envVar('CONTACT_EMAIL_TO')
  const from = envVar('CONTACT_EMAIL_FROM')

  const missing = [!apiKey && 'RESEND_API_KEY', !toRaw && 'CONTACT_EMAIL_TO', !from && 'CONTACT_EMAIL_FROM'].filter(Boolean)
  if (missing.length) {
    console.error(`[contact] email not configured, missing: ${missing.join(', ')}`)
    return { success: false, code: 'not_configured', error: 'Email service is not configured.' }
  }
  const to = toRaw.split(',').map(s => s.trim()).filter(Boolean)
  if (!to.length || to.length > 10 || !to.every(a => EMAIL_RE.test(a)) || !FROM_RE.test(from)) {
    console.error('[contact] email misconfigured: CONTACT_EMAIL_TO / CONTACT_EMAIL_FROM is not a valid address')
    return { success: false, code: 'not_configured', error: 'Email service is misconfigured.' }
  }

  const rows = [
    ['Name', d.name], ['Email', d.email], ['Phone', d.phone || '—'], ['Subject', d.subject],
    ['Company', d.company || '—'], ['Service Required', d.service], ['Budget', d.budget || 'Prefer not to say'],
  ]
  const html = [
    '<h2 style="margin:0 0 16px;">New Project Enquiry</h2>',
    '<table style="border-collapse:collapse;width:100%;max-width:600px;">',
    ...rows.map(([l, v]) => row(l, v)),
    '</table>',
    '<h3 style="margin:24px 0 8px;">Message</h3>',
    `<p style="white-space:pre-wrap;">${esc(d.message)}</p>`,
  ].join('\n')
  const text = [
    'New Project Enquiry', '',
    ...rows.map(([l, v]) => `${l}: ${v}`), '',
    'Message:', d.message,
  ].join('\n')

  let r
  try {
    r = await timedFetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from, to, reply_to: d.email,
        subject: oneLine(`${d.subject} — ${d.name}`).slice(0, 200),
        html, text,
      }),
    })
  } catch (e) {
    console.error(`[contact] email network error: ${e?.name}`)
    return networkFailure('email', e)
  }

  const resBody = await r.json().catch(() => ({}))
  if (r.ok) {
    if (resBody?.id) return { success: true, messageId: resBody.id }
    console.error('[contact] email: Resend returned success without an id')
    return { success: false, code: 'unexpected_response', error: 'Email provider returned an unexpected response.' }
  }

  console.error(`[contact] resend error: status=${r.status} name=${resBody?.name || 'unknown'}`)
  const name = String(resBody?.name || '')
  if (r.status === 401 || name === 'restricted_api_key') {
    return { success: false, code: 'invalid_credentials', error: 'Email API key is invalid or lacks permission to send.' }
  }
  if (r.status === 403) {
    return { success: false, code: 'sender_rejected', error: 'Email sender was rejected. Verify the sender domain in Resend (the test sender only delivers to the Resend account owner).' }
  }
  if (r.status === 429) {
    return { success: false, code: 'rate_limited', error: 'Email provider rate or quota limit reached. Try again later.' }
  }
  if (r.status === 400 || r.status === 422) {
    return { success: false, code: 'rejected', error: 'Email provider rejected the message (check sender and recipient addresses).' }
  }
  if (r.status >= 500) {
    return { success: false, code: 'provider_error', error: 'Email provider is temporarily unavailable.' }
  }
  return { success: false, code: 'provider_error', error: 'Email delivery failed.' }
}

function row(l, v) {
  return `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;width:160px;">${esc(l)}</td><td style="padding:8px 12px;border:1px solid #ddd;">${esc(v)}</td></tr>`
}
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// ── WHATSAPP Click-to-Chat URL builder ──────────────────────────────
function buildWhatsAppUrls(d) {
  const raw = envVar('WHATSAPP_NUMBERS')
  if (!raw) return []
  const numbers = raw.split(',').map(s => s.replace(/[\s+()-]/g, '').trim()).filter(n => /^[1-9]\d{7,14}$/.test(n))
  if (!numbers.length) return []

  const text = [
    'New Website Enquiry – Zentro', '',
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || 'Not provided'}`,
    `Subject: ${d.subject}`,
    `Company: ${d.company || 'Not provided'}`,
    `Service: ${d.service}`,
    `Budget: ${d.budget || 'Not specified'}`,
    '',
    'Message:',
    d.message,
  ].join('\n')

  return numbers.map(n => `https://wa.me/${n}?text=${encodeURIComponent(text)}`)
}
