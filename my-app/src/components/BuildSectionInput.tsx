import Button from './Button'
import Input from './Input'
import {SparklesIcon} from '@heroicons/react/24/solid'
import SectionHeading from './SectionHeading'
import { useState } from 'react'
import { IoMdSwap  } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";

type buildInputProps = {
    search: string
    setSearch: (value: string) => void
    setShowOutput: (value: boolean) => void
    setOutputDescription: (value: string) => void
    setLoading: (value: boolean) => void
}

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

export default function BuildSectionInput({search, setSearch, setShowOutput, setOutputDescription, setLoading}: buildInputProps){
    const [jobData, setJobData] = useState<JobApplicationPackage | null>()
    const [inputPlaceholder, setInputPlaceholder] = useState<string>("Enter Job Description...")
    const [switchInputButtonText, setSwitchInputButtonText] = useState<string>("Switch to URL Input")
    

    async function handleJobDescriptionInput() {
        console.log("calling /api/jobparser with", search);
        try {
            setLoading(true)
            const res = await fetch("http://localhost:5005/api/jobparser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobText: search }),
            });
            const data : JobApplicationPackage = await res.json();
            setJobData(data);
            setShowOutput(true);
            setOutputDescription("View your created documents below.")
        } catch (e) {
            console.error("request failed", e);
        }
        setLoading(false)
    }

    function switchInputType(){
        handleResetOutput();
        {inputPlaceholder ==  "Enter Job Description..." ? setInputPlaceholder("Enter Job URL...") : setInputPlaceholder("Enter Job Description...")}
        {switchInputButtonText ==  "Switch to URL Input" ? setSwitchInputButtonText("Switch to Description Input") : setSwitchInputButtonText("Switch to URL Input")}
    }

    function handleResetOutput(){
        setShowOutput(false);
        setSearch("")
        setJobData(null)
        setOutputDescription("Input a Job Description or URL to get started.")
    }

    function handleGenerateClick(){
        handleResetOutput()
        setOutputDescription("Please wait for your request to be processed.")
        handleJobDescriptionInput();
    }

    return(
    <div className ="flex flex-col gap-4 w-125">
        <SectionHeading subheadingText = "CREATE WITH JUNO" headingText ="BUILD" pageText ="Create your dream job application with Juno."/> 
        <div className ="flex flex-col gap-4 justify-between h-full">
            <div className = "flex flex-row gap-4 ">
                <Input placeholder = {inputPlaceholder} value = {search} onChange={setSearch}/>
                <Button text = "Generate" Icon ={SparklesIcon} onClick = {handleGenerateClick}/> 
            </div>
            {jobData  ?
                <div className= "flex flex-col gap-4">
                    <h1 className="text-4xl flex font-bold text-left text-white">Juno Found:</h1>
                    <div className="w-10 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></div>
                    <p className = "italic text-gray-300 text-left"><strong>Title:</strong> {jobData?.listingInfo.title}</p>
                    <p className = "italic text-gray-300 text-left"><strong>Company:</strong> {jobData?.listingInfo.company}</p>
                    <p className = "italic text-gray-300 text-left"><strong>Description:</strong> {jobData?.listingInfo.description}</p>
                    <ul className = "italic text-gray-300 text-left"><strong>Tech Stack:</strong>
                    {jobData?.listingInfo.techStack?.map((tech,key) => <li key={key}>{tech}</li>)}
                    </ul>
                </div> : null
            }
            <div className= "flex flex-row gap-4">
                <Button text = {switchInputButtonText} Icon ={IoMdSwap} onClick = {switchInputType}/>
                <Button variant= "secondary" text= "Clear" Icon ={MdOutlineClear} onClick = {handleResetOutput}/>
            </div>       
        </div>
    </div>
    )
}