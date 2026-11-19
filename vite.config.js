import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only plugin: serves /api/contact locally so the Vercel serverless
// function can be tested without deploying.  Reads env vars from .env / .env.local.
function contactApi() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Method not allowed' }))
        }
        // Parse JSON body
        const chunks = []
        let size = 0
        for await (const c of req) {
          size += c.length
          if (size > 20 * 1024) {
            res.writeHead(413, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ ok: false, error: 'Request too large' }))
          }
          chunks.push(c)
        }
        let body
        try { body = JSON.parse(Buffer.concat(chunks).toString()) } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Invalid request body' }))
        }
        // Load env vars from .env / .env.local (all prefixes, not just VITE_)
        const env = loadEnv('development', process.cwd(), '')
        for (const k of ['RESEND_API_KEY', 'CONTACT_EMAIL_TO', 'CONTACT_EMAIL_FROM', 'WHATSAPP_NUMBERS']) {
          if (env[k]) process.env[k] = env[k]
        }
        req.body = body
        const json = (code, data) => {
          res.writeHead(code, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(data))
        }
        const mockRes = {
          setHeader(k, v) { res.setHeader(k, v) },
          status(c) { this._c = c; return this },
          json(d) { json(this._c, d) },
          _c: 200
        }
        try {
          const mod = await server.ssrLoadModule('/api/contact.js')
          await mod.default(req, mockRes)
        } catch (e) {
          console.error('[api/contact]', e)
          json(500, { error: e.message || 'Internal server error' })
        }
      })
    }
  }
}

export default defineConfig({ plugins: [react(), contactApi()] })
