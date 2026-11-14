import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from './ui'
import { projects } from '../data/content'

export function ProjectCard({p,dark}){
  return <Link to={`/projects/${p.slug}`} className={`group block border transition duration-300 hover:border-teal ${dark?'hair-d':'hair-l'}`}>
    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-ink">
      <img src={p.image} alt={`${p.name} project illustration`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between text-xs"><span className="text-teal-light">{p.category}</span><span className={dark?'text-mist/60':'text-muted'}>{p.status}</span></div>
      <h3 className="mt-3 text-xl font-semibold">{p.name}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${dark?'text-mist/70':'text-muted'}`}>{p.description}</p>
      <p className={`mt-4 text-xs ${dark?'text-mist/60':'text-muted'}`}>{p.tech.join(', ')}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal transition-all group-hover:gap-2">View Details <ArrowUpRight size={16}/></span>
    </div></Link>
}
export function ServiceCell({s,dark,i}){
  return <Link to="/services#all" className={`group flex flex-col border-t p-6 transition duration-300 hover:bg-teal/10 md:p-8 ${dark?'hair-d':'hair-l'}`}>
    <Icon name={s[0]} className="text-teal-light" size={28} strokeWidth={1.5}/>
    <h3 className="mt-6 text-lg font-semibold">{s[1]}</h3>
    <p className={`mt-2 flex-1 text-sm leading-relaxed ${dark?'text-mist/70':'text-muted'}`}>{s[2]}</p>
    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-light transition-all group-hover:gap-2">Learn More <ArrowUpRight size={16}/></span>
  </Link>
}
export function TeamCard({m}){
  return <div className="group">
    <div className="flex aspect-[4/5] items-center justify-center overflow-hidden border hair-l bg-ink">
      {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover"/> : <img src="/mark.png" alt="" className="h-14 w-auto opacity-40"/>}
    </div>
    <div className="mt-4 border-l-2 border-teal pl-4"><h3 className="font-semibold">{m.name}</h3><p className="text-sm text-teal">{m.role}</p><p className="mt-2 text-sm leading-relaxed text-muted">{m.bio}</p></div>
  </div>
}
