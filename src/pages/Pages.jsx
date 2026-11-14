import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Mail, Phone, MapPin, ChevronDown, CheckCircle2, AlertTriangle } from 'lucide-react'
import { PageHero, Section, Heading, Reveal, NetworkArt, CtaBand, TechLogo, usePageTitle, Icon } from '../components/ui'
import { ServiceCell, ProjectCard } from '../components/cards'
import { services, values, projects, expertise, contact, phoneHref, social } from '../data/content'

export function About(){
  usePageTitle('About Us')
  return <><PageHero title="About ZENTRO NETWORKS" intro="A technology-focused company building digital solutions that last."/>
    <Section><div className="grid gap-12 lg:grid-cols-3">
      {[['Who we are','ZENTRO NETWORKS is a technology-focused company committed to building innovative, reliable and scalable digital solutions that help businesses transform their ideas into reality.'],
        ['Our mission','To empower businesses through meaningful technology solutions that simplify processes, improve efficiency and create opportunities for growth.'],
        ['Our vision','To become a trusted technology partner recognized for innovation, quality and meaningful digital impact.']].map(([t,d],i)=>
        <Reveal key={t} delay={i*.08}><div className="border-t border-teal pt-5"><h2 className="text-2xl font-semibold">{t}</h2><p className="mt-3 leading-relaxed text-muted">{d}</p></div></Reveal>)}</div></Section>
    <Section dark><Heading dark title="Core values"/>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">{values.map(v=><div key={v} className="border-t hair-d py-8 pr-6 text-xl font-semibold">{v}</div>)}</div></Section>
    <CtaBand/></>
}

export function Services(){
  usePageTitle('Services')
  const [open,setOpen]=useState(null)
  return <><PageHero title="Services" intro="Eight services covering the full life of a digital product."/>
    <Section id="all"><div className="grid sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-l hair-l">
      {services.map((s,i)=><div key={s[1]} className="flex flex-col border-t border-l hair-l p-6 md:p-8">
        <Icon name={s[0]} className="text-teal" size={28} strokeWidth={1.5}/>
        <h2 className="mt-6 text-lg font-semibold">{s[1]}</h2><p className="mt-2 text-sm leading-relaxed text-muted">{s[2]}</p>
        <button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal">Learn More <ChevronDown size={16} className={`transition ${open===i?'rotate-180':''}`}/></button>
        {open===i && <div className="mt-4 border-t hair-l pt-4 text-sm text-muted">{s[3]} <Link to="/contact" className="font-semibold text-teal">Enquire</Link></div>}
      </div>)}</div></Section><CtaBand/></>
}

export function Projects(){
  usePageTitle('Projects')
  return <><PageHero title="Our Projects" intro="Sample projects and live demos built to show what ZENTRO NETWORKS can deliver."/>
    <Section><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map(p=><ProjectCard key={p.slug} p={p}/>)}</div></Section><CtaBand/></>
}
export function ProjectDetail(){
  const {slug}=useParams(); const p=projects.find(x=>x.slug===slug)
  const [zoom,setZoom]=useState(null)
  usePageTitle(p?p.name:'Project not found')
  useEffect(()=>{ if(zoom===null) return; const k=e=>e.key==='Escape'&&setZoom(null); window.addEventListener('keydown',k); return ()=>window.removeEventListener('keydown',k) },[zoom])
  if(!p) return <NotFound/>
  const B=({t,children})=><div className="border-t hair-l py-8 md:grid md:grid-cols-3"><h2 className="text-xl font-semibold">{t}</h2><div className="mt-3 text-muted md:col-span-2 md:mt-0">{children}</div></div>
  return <><PageHero title={p.name} intro={p.category}/>
    <Section><div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl border border-teal/40 bg-teal/5 p-4 text-sm">Sample project and live demo created to demonstrate ZENTRO NETWORKS' development capabilities. This is not a client project.</p>
        <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-solid">Open Live Demo</a></div>
      <img src={p.image} alt={`${p.name} showcase`} className="mb-8 w-full border hair-l"/>
      <B t="Overview">{p.overview}</B><B t="Problem Statement">{p.problem}</B><B t="Proposed Solution">{p.solution}</B>
      <B t="Key Features"><ul className="list-disc space-y-1 pl-5">{p.features.map(f=><li key={f}>{f}</li>)}</ul></B>
      <B t="Technologies"><div className="flex flex-wrap gap-2">{p.tech.map(t=><span key={t} className="border hair-l px-3 py-1 text-sm">{t}</span>)}</div></B>
      <B t="Screenshots"><div className="grid gap-4 sm:grid-cols-3">{p.shots.map((x,i)=><button key={x.src} onClick={()=>setZoom(i)} className="group border hair-l bg-ink text-left" aria-label={`View larger: ${x.label}`}><img src={x.src} alt={x.label} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:opacity-80"/></button>)}</div>
        <p className="mt-3 text-xs">Showcase images of the project. Select an image to enlarge it, or open the live demo to explore the actual site.</p></B>
      <B t="Development Status">{p.status}</B>
      <Link to="/projects" className="btn btn-line-light mt-8">Back to Projects</Link></Section>
    {zoom!==null&&<div role="dialog" aria-modal="true" aria-label={p.shots[zoom].label} onClick={()=>setZoom(null)} className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4">
      <button onClick={()=>setZoom(null)} className="absolute right-4 top-4 border border-white/30 px-3 py-1 text-sm text-mist hover:border-teal-light" autoFocus>Close</button>
      <img src={p.shots[zoom].src} alt={p.shots[zoom].label} onClick={e=>e.stopPropagation()} className="max-h-[88vh] max-w-full object-contain"/></div>}
    <CtaBand/></>
}

export function Expertise(){
  usePageTitle('Our Expertise')
  return <><PageHero title="Our Expertise" intro="Combining technology, creativity, and engineering to build reliable digital solutions for modern businesses."/>
    <Section><div className="grid gap-6 md:grid-cols-2">
      {expertise.map(([i,t,d,tags],k)=><Reveal key={t} delay={(k%2)*.08} className="h-full"><article className="group relative h-full border hair-l bg-white/50 p-8 transition duration-300 hover:-translate-y-1 hover:border-teal md:p-10">
        <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-teal transition duration-500 group-hover:scale-x-100"/>
        <div className="flex h-14 w-14 items-center justify-center border border-teal/40 text-teal transition duration-300 group-hover:bg-teal group-hover:text-white"><Icon name={i} size={26} strokeWidth={1.5}/></div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">{t}</h2>
        <p className="mt-3 leading-relaxed text-muted">{d}</p>
        <ul className="mt-6 flex flex-wrap gap-2 border-t hair-l pt-5">{tags.map(x=><li key={x} className="border hair-l px-3 py-1 text-xs text-text/80">{x}</li>)}</ul>
      </article></Reveal>)}</div></Section>
    <Section dark><NetworkArt className="right-0 top-0 hidden w-80 opacity-60 md:block"/>
      <div className="max-w-2xl"><h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Let's Build Something Together</h2>
      <p className="mt-5 text-lg text-mist/70">Have an idea or business challenge? Let's discuss how our expertise can turn it into a reliable digital solution.</p>
      <Link to="/contact" className="btn btn-solid mt-8">Start a Project</Link></div></Section></>
}

// Set VITE_FORM_ENDPOINT (e.g. Formspree/your API URL) in Vercel env vars to enable sending.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT
const empty={name:'',email:'',phone:'',company:'',service:'',budget:'',message:''}
export function Contact(){
  usePageTitle('Contact Us')
  const [f,setF]=useState(empty); const [err,setErr]=useState({}); const [state,setState]=useState('idle')
  const set=k=>e=>setF({...f,[k]:e.target.value})
  const validate=()=>{ const e={}
    if(f.name.trim().length<2) e.name='Enter your full name.'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email='Enter a valid email address.'
    if(f.phone && !/^[+\d][\d\s()-]{6,}$/.test(f.phone)) e.phone='Enter a valid phone number.'
    if(!f.service) e.service='Select a service.'
    if(f.message.trim().length<20) e.message='Describe your project in at least 20 characters.'
    return e }
  const submit=async ev=>{ ev.preventDefault(); const e=validate(); setErr(e); if(Object.keys(e).length) return
    if(!ENDPOINT){ const body=`Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone||'-'}\nCompany: ${f.company||'-'}\nService: ${f.service}\nBudget: ${f.budget||'-'}\n\n${f.message}`; window.location.href=`mailto:${contact.email}?subject=${encodeURIComponent('Project enquiry: '+f.service)}&body=${encodeURIComponent(body)}`; setState('mailto'); return }
    setState('sending')
    try{ const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(f)}); if(!r.ok) throw 0; setState('success'); setF(empty) }catch{ setState('error') } }
  const inp=k=>`mt-1 w-full border bg-white px-4 py-3 text-sm outline-none transition focus:border-teal ${err[k]?'border-red-600':'hair-l'}`
  const L=({k,label,req,children})=><div><label htmlFor={k} className="text-sm font-medium">{label}{req?' *':' (optional)'}</label>{children}{err[k]&&<p id={k+'-e'} role="alert" className="mt-1 text-xs text-red-700">{err[k]}</p>}</div>
  const P=k=>({id:k,value:f[k],onChange:set(k),className:inp(k),'aria-invalid':!!err[k],'aria-describedby':err[k]?k+'-e':undefined})
  return <><PageHero title="Contact Us" intro="Tell us about your project and we will get back to you."/>
    <Section><div className="grid gap-16 lg:grid-cols-3">
      <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
        <L k="name" label="Full Name" req><input {...P('name')} autoComplete="name"/></L>
        <L k="email" label="Email Address" req><input {...P('email')} type="email" autoComplete="email"/></L>
        <L k="phone" label="Phone Number"><input {...P('phone')} type="tel" autoComplete="tel"/></L>
        <L k="company" label="Company Name"><input {...P('company')} autoComplete="organization"/></L>
        <L k="service" label="Service Required" req><select {...P('service')}><option value="">Select a service</option>{services.map(s=><option key={s[1]}>{s[1]}</option>)}</select></L>
        <L k="budget" label="Project Budget"><select {...P('budget')}><option value="">Prefer not to say</option><option>Under ₹50,000</option><option>₹50,000 - ₹2,00,000</option><option>₹2,00,000 - ₹10,00,000</option><option>Above ₹10,00,000</option></select></L>
        <div className="sm:col-span-2"><L k="message" label="Project Description" req><textarea {...P('message')} rows={6}/></L></div>
        <div className="sm:col-span-2"><button className="btn btn-solid" disabled={state==='sending'}>{state==='sending'?'Sending...':'Submit Enquiry'}</button>
          <div aria-live="polite" className="mt-5">
            {state==='success'&&<p className="flex items-center gap-2 text-teal"><CheckCircle2 size={18}/>Enquiry sent. We will be in touch.</p>}
            {state==='error'&&<p className="flex items-center gap-2 text-red-700"><AlertTriangle size={18}/>The enquiry could not be sent. Please try again or email us directly.</p>}
            {state==='mailto'&&<p className="flex items-start gap-2 text-sm text-muted"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal"/>Your email app should now open with the enquiry ready to send to {contact.email}. The enquiry is sent only when you send that email.</p>}
          </div></div>
      </form>
      <aside className="space-y-6"><h2 className="text-2xl font-semibold">Contact details</h2>
        {[[Mail,contact.email,'mailto:'+contact.email],[Phone,contact.phone,phoneHref],[MapPin,contact.location,null]].map(([I,t,h],i)=><p key={i} className="flex gap-3 text-muted"><I size={20} className="shrink-0 text-teal"/>{h?<a href={h} className="hover:text-teal">{t}</a>:t}</p>)}
        {social.length>0&&<div className="border-t hair-l pt-6"><p className="mb-2 text-sm font-semibold">Follow us</p><div className="flex flex-wrap gap-x-5 gap-y-1">{social.map(([n,u])=><a key={n} href={u} target="_blank" rel="noreferrer" className="text-sm text-teal hover:underline">{n}</a>)}</div></div>}
      </aside></div></Section></>
}
export function NotFound(){ usePageTitle('Page not found'); return <><PageHero title="Page not found" intro="The page you are looking for does not exist."/><Section><Link to="/" className="btn btn-solid">Back to Home</Link></Section></> }
