import { useState } from 'react'
import './App.css'
import OutputCard from './components/OutputCard'
import EmptyOutputCard from './components/EmptyOutputCard'
import Button from './components/Button'
import Input from './components/Input'



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

  return (
    <div className=" flex gap-4 items-center justify-center flex-col min-h-screen bg-gray-50 border-dashed">
      <h1 className="text-3xl flex font-bold underline ">Job Helper</h1>
      <div className="flex flex-col gap-8">
        <div className = "flex flex-row gap-4">
          {/* <Input placeholder = "enter job url" value = {search} onChange = {setSearch}/>
          <Button onClick = {searchHandler}/> */}

          {/* <p> Or </p> */}

          <Input placeholder = "enter job description" value = {search} onChange = {setSearch}/>
          <Button onClick = {handleJobDescriptionInput}/>
        </div>
        {showOutput ?
          <>
            <h1 className="text-3xl flex font-bold underline ">Your Parsed Data:</h1>
            <p className = "text-center"><strong>Title:</strong> {jobData?.listingInfo.title}</p>
            <p className = "text-center"><strong>Company:</strong> {jobData?.listingInfo.company}</p>
            <p className = "text-center"><strong>Description:</strong> {jobData?.listingInfo.description}</p>
            <ul className = "text-center"><strong>Tech Stack:</strong>
              {jobData?.listingInfo.techStack?.map((tech,key) => <li key={key}>{tech}</li>)}
            </ul>
            <OutputCard title = "Resume" contentText = "Your optimized resume based on the link above."/>
            <OutputCard title = "Cover Letter" contentText = "Your optimized Cover Letter based on the link above."/>
            <p className = "text-center"><strong>Date:</strong> {jobData?.coverLetter.date}</p>
            <p>{jobData?.coverLetter.coverLetterText}</p>
          </> 
         : 
          <EmptyOutputCard />
        }
      </div>
    </div>
  );
}


