import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { About, Services, Projects, ProjectDetail, Expertise, Contact, NotFound } from './pages/Pages'
export default function App(){
  return <Routes><Route element={<Layout/>}>
    <Route index element={<Home/>}/><Route path="about" element={<About/>}/><Route path="services" element={<Services/>}/>
    <Route path="projects" element={<Projects/>}/><Route path="projects/:slug" element={<ProjectDetail/>}/>
    <Route path="expertise" element={<Expertise/>}/><Route path="team" element={<Navigate to="/expertise" replace/>}/><Route path="contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/>
  </Route></Routes>
}
