import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Code2, Globe, Smartphone, PenTool, Cloud, Compass, LifeBuoy, Workflow, Circle } from 'lucide-react'
const Icons = { Code2, Globe, Smartphone, PenTool, Cloud, Compass, LifeBuoy, Workflow, Circle }

export function usePageTitle(t){ useEffect(()=>{ document.title = t ? `${t} | ZENTRO NETWORKS` : 'ZENTRO NETWORKS | Building Digital Solutions'; window.scrollTo(0,0) },[t]) }
export function ScrollTop(){ const {pathname}=useLocation(); useEffect(()=>{window.scrollTo(0,0)},[pathname]); return null }
export const Icon = ({name,...p}) => { const C = Icons[name] || Icons.Circle; return <C aria-hidden="true" {...p} /> }

export function Reveal({children,delay=0,className=''}){
  const r = useReducedMotion()
  return <motion.div className={className} initial={r?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,delay,ease:'easeOut'}}>{children}</motion.div>
}

// Network-line geometry from the PDF (upper-right of dark sections)
export function NetworkArt({className=''}){
  const pts=[[10,70],[110,18],[190,60],[275,12],[250,110],[145,135]]
  const lines=[[0,1],[1,2],[2,3],[3,4],[2,4],[2,5],[4,5],[1,3]]
  return <svg aria-hidden="true" viewBox="0 0 290 150" className={`pointer-events-none absolute ${className}`} fill="none">
    {lines.map(([a,b],i)=><line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="#087F7B" strokeOpacity=".45" strokeWidth=".7"/>)}
    {pts.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.8" fill="#00A99D" fillOpacity=".8"/>)}
  </svg>
}

export function Section({dark,id,children,className=''}){
  return <section id={id} className={`relative overflow-hidden py-20 md:py-28 ${dark?'bg-ink text-mist':'bg-paper text-text'} ${className}`}><div className="wrap relative">{children}</div></section>
}
export function Heading({dark,title,intro,children}){
  return <div className="mb-12 max-w-2xl md:mb-16">
    <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
    {intro && <p className={`mt-5 text-base leading-relaxed md:text-lg ${dark?'text-mist/70':'text-muted'}`}>{intro}</p>}{children}
  </div>
}
export function PageHero({title,intro}){
  return <section className="relative overflow-hidden bg-ink pb-20 pt-20 text-mist md:pb-28 md:pt-28">
    <NetworkArt className="right-0 top-0 hidden w-[420px] md:block lg:w-[520px]" />
    <div className="wrap relative"><motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{title}</motion.h1>
    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist/70">{intro}</p></div></section>
}
export const TechLogo = ({name,slug,dark}) => (
  <div className={`flex flex-col items-center gap-3 border-t px-4 py-8 ${dark?'hair-d':'hair-l'}`}>
    <img loading="lazy" width="32" height="32" alt="" src={`https://cdn.simpleicons.org/${slug}/${dark?'8FA7A3':'087F7B'}`} className="h-8 w-8" onError={e=>{e.currentTarget.style.display='none'}} />
    <span className="text-sm font-medium">{name}</span>
  </div>
)
export const CtaBand = () => (
  <Section dark><NetworkArt className="right-0 top-0 hidden w-80 opacity-60 md:block"/>
    <div className="max-w-2xl"><h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Have a project in mind?</h2>
    <p className="mt-5 text-lg text-mist/70">Tell us what you want to build. We will respond to discuss scope and next steps.</p>
    <Link to="/contact" className="btn btn-solid mt-8">Start a Project</Link></div></Section>
)
