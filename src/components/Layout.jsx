import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { contact, phoneHref, social, services } from '../data/content'
import { ScrollTop } from './ui'

const links=[['/','Home'],['/about','About'],['/services','Services'],['/projects','Projects'],['/expertise','Our Expertise'],['/contact','Contact']]

function Navbar(){
  const [open,setOpen]=useState(false)
  const cls=({isActive})=>`relative py-2 text-sm font-medium transition-colors duration-300 hover:text-teal-light ${isActive?'text-teal-light after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-teal-light':'text-mist/80'}`
  return <header className="sticky top-0 z-50 border-b hair-d bg-ink/95 backdrop-blur">
    <div className="h-1.5 bg-teal" />
    <nav aria-label="Main" className="wrap flex h-[72px] items-center justify-between">
      <Link to="/" aria-label="ZENTRO NETWORKS home" onClick={()=>setOpen(false)}><img src="/logo-dark.png" alt="ZENTRO NETWORKS" width="180" height="60" className="h-12 w-auto md:h-14"/></Link>
      <div className="hidden items-center gap-8 lg:flex">
        {links.map(([to,l])=><NavLink key={to} to={to} end={to==='/'} className={cls}>{l}</NavLink>)}
        <Link to="/contact" className="btn btn-solid !py-2.5">Let's Talk</Link>
      </div>
      <button className="p-2 text-mist lg:hidden" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </nav>
    <AnimatePresence>{open && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden border-t hair-d lg:hidden">
      <div className="wrap flex flex-col gap-1 py-4">
        {links.map(([to,l])=><NavLink key={to} to={to} end={to==='/'} onClick={()=>setOpen(false)} className={({isActive})=>`border-b hair-d py-3 text-lg ${isActive?'text-teal-light':'text-mist'}`}>{l}</NavLink>)}
        <Link to="/contact" onClick={()=>setOpen(false)} className="btn btn-solid mt-4">Let's Talk</Link>
      </div></motion.div>}</AnimatePresence>
  </header>
}

function Footer(){
  const h="mb-4 text-sm font-semibold text-mist"; const a="block py-1 text-sm text-mist/65 transition-colors hover:text-teal-light"
  return <footer className="bg-ink text-mist"><div className="wrap pb-8 pt-16">
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
      <div><img src="/logo-dark.png" alt="ZENTRO NETWORKS" width="180" height="60" loading="lazy" className="h-14 w-auto"/>
        <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist/65">A technology company building innovative, reliable and scalable digital solutions.</p></div>
      <div><p className={h}>Navigate</p>{links.map(([to,l])=><Link key={to} to={to} className={a}>{l}</Link>)}</div>
      <div><p className={h}>Services</p>{services.slice(0,6).map(s=><Link key={s[1]} to="/services" className={a}>{s[1]}</Link>)}</div>
      <div><p className={h}>Contact</p><a href={'mailto:'+contact.email} className={a}>{contact.email}</a><a href={phoneHref} className={a}>{contact.phone}</a><p className={a}>{contact.location}</p>
        {social.length>0&&<div className="mt-3 flex flex-wrap gap-x-4">{social.map(([n,u])=><a key={n} href={u} target="_blank" rel="noreferrer" className={a}>{n}</a>)}</div>}</div>
    </div>
    <div className="mt-14 flex flex-col justify-between gap-2 border-t hair-d pt-6 text-xs text-mist/60 sm:flex-row">
      <span className="font-semibold tracking-wide">ZENTRO NETWORKS</span><span>© {new Date().getFullYear()} ZENTRO NETWORKS. All rights reserved.</span></div>
  </div></footer>
}
export default function Layout(){ return <><ScrollTop/><a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-teal focus:p-3 focus:text-white">Skip to content</a><Navbar/><main id="main"><Outlet/></main><Footer/></> }
