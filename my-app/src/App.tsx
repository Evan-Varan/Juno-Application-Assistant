import { useRef} from 'react'
import './App.css'

import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Testimonials from './components/Tesimonials'
import About from './components/About'
import Build from "./components/Build"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"
import Contact from "./components/Contact"
import Juno from './components/Juno'


export default function App() {

  const buildRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  return (
    <div className =" flex flex-col justify-center items-center border-dashed bg-gradient-to-b from-black to-gray-900">
      <div className="flex justify-center">
        <Navbar buildRef = {buildRef} aboutRef = {aboutRef} faqRef = {faqRef} contactRef = {contactRef}/>
      </div>
      <div className=" relative flex gap-24 items-center justify-center flex-col min-h-screen">
        <Hero buildRef={buildRef} aboutRef={aboutRef}/>
        
        <div ref ={buildRef}>
          <Build />
        </div>
        <div ref ={aboutRef}>
          <About />
        </div>
          <Testimonials />
        <div ref ={faqRef}>
          <FAQ />
        </div>
        <div ref ={contactRef}>
          <Contact />
        </div>
          <Footer />
        </div>
    </div>
  );
}


