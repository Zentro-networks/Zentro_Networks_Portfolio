import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Section, Heading, Reveal, NetworkArt, TechLogo, CtaBand, usePageTitle, Icon } from '../components/ui'
import { ServiceCell, ProjectCard } from '../components/cards'
import { services, projects, why, tech, techSlug, disciplines } from '../data/content'

export default function Home(){
  usePageTitle('')
  return <>
    <section className="relative flex min-h-[calc(100vh-78px)] items-center overflow-hidden bg-ink text-mist">
      <NetworkArt className="right-0 top-6 w-[300px] sm:w-[420px] lg:w-[620px]"/>
      <div className="wrap relative py-24">
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8}} className="mb-6 text-sm font-semibold tracking-[.3em] text-teal-light">ZENTRO NETWORKS</motion.p>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}} className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Building Digital Solutions.<br/>Creating What's Next.</motion.h1>
        <motion.p initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.25}} className="mt-8 max-w-2xl text-lg leading-relaxed text-mist/70">We transform ideas into innovative digital products through technology, creativity and engineering. From websites and mobile applications to custom software solutions, we help businesses move forward.</motion.p>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.4}} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link to="/services" className="btn btn-solid">Explore Our Services</Link><Link to="/contact" className="btn btn-line-dark">Start a Project</Link></motion.div>
      </div>
    </section>

    <Section><div className="grid gap-12 lg:grid-cols-2">
      <Reveal><h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Technology built around your business.</h2></Reveal>
      <Reveal delay={.1}><p className="text-lg leading-relaxed text-muted">ZENTRO NETWORKS is a technology-focused company committed to building innovative, reliable and scalable digital solutions that help businesses transform their ideas into reality.</p>
        <Link to="/about" className="btn btn-line-light mt-8">About Us</Link></Reveal></div></Section>

    <Section dark><Heading dark title="What we do" intro="We design, build and support digital products across web, mobile and cloud, from the first sketch to long-term maintenance."/>
      <div className="grid gap-px border-t hair-d sm:grid-cols-3">{[['PenTool','Design','Interfaces that are clear, consistent and accessible.'],['Code2','Build','Engineering with modern, maintainable technology.'],['LifeBuoy','Support','Maintenance and improvements after launch.']].map(([i,t,d],k)=>
        <Reveal key={t} delay={k*.08} className="py-8 sm:pr-8"><Icon name={i} className="text-teal-light" size={28} strokeWidth={1.5}/><h3 className="mt-5 text-xl font-semibold">{t}</h3><p className="mt-2 text-mist/70">{d}</p></Reveal>)}</div></Section>

    <Section><Heading title="Our services" intro="A focused set of services covering the full life of a digital product."/>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-l hair-l">{services.map((s,i)=><ServiceCell key={s[1]} s={s} i={i}/>)}</div>
      <Link to="/services" className="btn btn-line-light mt-10">All Services</Link></Section>

    <Section dark><Heading dark title="Featured projects" intro="Sample projects and live demos that show what we build."/>
      <div className="grid gap-6 md:grid-cols-3">{projects.map(p=><ProjectCard key={p.slug} p={p} dark/>)}</div>
      <Link to="/projects" className="btn btn-line-dark mt-10">View All Projects</Link></Section>

    <Section><Heading title="Why choose Zentro"/>
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{why.map(([t,d],i)=><Reveal key={t} delay={(i%3)*.06}><div className="border-t border-teal pt-5"><h3 className="text-lg font-semibold">{t}</h3><p className="mt-2 text-muted">{d}</p></div></Reveal>)}</div></Section>

    <Section dark><Heading dark title="Technology expertise" intro="The tools and platforms we build with."/>
      <div className="grid grid-cols-2 sm:grid-cols-5">{tech.map(t=><TechLogo key={t} name={t} slug={techSlug[t]} dark/>)}</div></Section>

    <Section><Heading title="Our team" intro="The disciplines behind every ZENTRO NETWORKS project."/>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{disciplines.map(([i,t,d])=><Reveal key={t}><div className="border-t border-teal pt-5"><Icon name={i} className="text-teal" size={26} strokeWidth={1.5}/><h3 className="mt-4 text-lg font-semibold">{t}</h3><p className="mt-2 text-muted">{d}</p></div></Reveal>)}</div>
      <Link to="/expertise" className="btn btn-line-light mt-10">Our Expertise</Link></Section>
    <CtaBand/>
  </>
}
