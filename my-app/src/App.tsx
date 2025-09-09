import { useState, useRef} from 'react'
import './App.css'

import {motion} from "framer-motion"

import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Testimonials from './components/Tesimonials'
import About from './components/About'
import Build from "./components/Build"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"
import Contact from "./components/Contact"
import { Section } from './components/Section'

// function verifyURL(search: string) : boolean{
//   const regexPattern = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(:[0-9]+)?(\/\S*)?$/i
//   return regexPattern.test(search)
// }
type JobApplicationPackage = {
  listingInfo: {
    title: string,
    company: string,
    description: string,
    techStack: string[]
  },
  coverLetter:{
    coverLetterText: string
    date: string;
  }
}

export default function App() {

  
  // function searchHandler(){
  //   if (verifyURL(search)) {
  //     setShowOutput(true)
  //     setSearch("")
  //   } else {
  //     alert("Invalid URL ❌")
  //     setSearch("")
  //     setShowOutput(false)
  //   }
  // }



  const buildRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  return (
    <div className =" flex flex-col justify-center items-center border-dashed bg-gradient-to-b from-black to-gray-900">
      <div className="flex justify-center">
      <Navbar buildRef = {buildRef} aboutRef = {aboutRef} faqRef = {faqRef} contactRef = {contactRef}/>
      </div>
      <div className=" relative flex gap-16 items-center justify-center flex-col min-h-screen">
         <Section>
            <Hero buildRef={buildRef} aboutRef={aboutRef}/>
         </Section>
      <div ref ={buildRef}>
        <Section>
          <Build />
        </Section>
      </div>
      <div ref ={aboutRef}>
        <Section>
          <About />
        </Section>
        <Section>
          <Testimonials />
        </Section>
      </div>
      <div ref ={faqRef}>
        <Section>
          <FAQ />
        </Section>
      </div>
      <div ref ={contactRef}>
        <Section>
          <Contact />
        </Section>
      </div>
      <Section>
        <Footer />
      </Section>
      
      
      {/* <div className="flex flex-col gap-20 items-center">
        <div className = "flex flex-row gap-4 items-center justify-center">
          <Input placeholder = "Enter Job Description..." value = {search} onChange = {setSearch}/>
          <Button text = "Generate" Icon ={SparklesIcon} onClick = {handleJobDescriptionInput}/>
        </div>
        {showOutput ?
          <>
            <div className = "flex flex-row items-center justify-center gap-4">
              <OutputCard title = "Resume" contentText = "Your optimized resume based on the link above."/>
              <OutputCard title = "Cover Letter" contentText = "Your optimized Cover Letter based on the link above."/>
            </div>
            <h1 className="text-3xl flex font-bold underline items-center justify-center text-white">Your Parsed Data:</h1>
            <p className = "text-center text-white"><strong>Title:</strong> {jobData?.listingInfo.title}</p>
            <p className = "text-center text-white"><strong>Company:</strong> {jobData?.listingInfo.company}</p>
            <p className = "text-center text-white"><strong>Description:</strong> {jobData?.listingInfo.description}</p>
            <ul className = "text-center text-white"><strong>Tech Stack:</strong>
              {jobData?.listingInfo.techStack?.map((tech,key) => <li key={key}>{tech}</li>)}
            </ul>
            
            <p className = "text-center text-white"><strong>Date:</strong> {jobData?.coverLetter.date}</p>
            <p className = "text-center text-white">{jobData?.coverLetter.coverLetterText}</p>
            
          </> 
         : 
          <EmptyOutputCard />
        }
      </div>
      <Testimonials /> */}
      </div>
    </div>
  );
}


