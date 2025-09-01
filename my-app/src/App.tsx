import { useState, useRef} from 'react'
import './App.css'
import OutputCard from './components/OutputCard'
import EmptyOutputCard from './components/EmptyOutputCard'
import Button from './components/Button'
import Input from './components/Input'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import {SparklesIcon} from '@heroicons/react/24/solid'
import Testimonials from './components/Tesimonials'
import About from './components/About'
import Build from "./components/Build"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"
import Contact from "./components/Contact"

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

async function handleJobDescriptionInput() {
  console.log("calling /api/jobparser with", search);
  try {
    const res = await fetch("http://localhost:5005/api/jobparser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobText: search }),
    });
    const data : JobApplicationPackage = await res.json();
    setJobData(data);
    setShowOutput(true);
  } catch (e) {
    console.error("request failed", e);
  }
}

  const [jobData, setJobData] = useState<JobApplicationPackage>()
  const [search, setSearch] = useState<string>("");
  const [showOutput, setShowOutput] = useState<boolean>(false)
  // const [output, setOutput] = useState<string>("")

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
      <Hero buildRef={buildRef} aboutRef={aboutRef}/>
      <div ref ={buildRef}>
        <Build search ={search} setSearch ={setSearch} handleJobDescriptionInput ={handleJobDescriptionInput} />
      </div>
      <div ref ={aboutRef}>
        <About />
        <Testimonials />
      </div>
      <div ref ={faqRef}>
        <FAQ />
      </div>
      <div ref ={contactRef}>
        <Contact />
      </div>
      <Footer />
      
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


