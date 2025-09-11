import Button from './Button'
import Input from './Input'
import {SparklesIcon} from '@heroicons/react/24/solid'
import SectionHeading from './SectionHeading'
import { useState } from 'react'
import { IoMdSwap  } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";
import { useRef } from 'react'
import { GrPowerReset } from "react-icons/gr";
import { FaStopCircle } from "react-icons/fa";



type buildInputProps = {
    search: string
    setSearch: (value: string) => void
    setShowOutput: (value: boolean) => void
    setOutputDescription: (value: string) => void
    setLoading: (value: boolean) => void
    setError: (value: boolean) => void
}
type listingSkill = {
    name: string,
    weight: number
}
type JobApplicationPackage = {
  listingInfo: {
    title: string,
    company: string,
    description: string,
    techStack: listingSkill[]
  },
  coverLetter:{
    coverLetterText: string
    date: string;
  }
}

export default function BuildSectionInput({search, setSearch, setShowOutput, setOutputDescription, setLoading, setError}: buildInputProps){
    const [jobData, setJobData] = useState<JobApplicationPackage | null>()
    const [inputPlaceholder, setInputPlaceholder] = useState<string>("Enter Job Description...")
    const [switchInputButtonText, setSwitchInputButtonText] = useState<string>("Switch to URL Input")
    
    let abortController = useRef<(AbortController | null)>(null) //Global reference to abortcontroller

    async function handleJobDescriptionInput() {
        abortController.current = new AbortController(); //We have to create a new instance of abort controller each time we use it as it destroys itself when aborted
        console.log("calling /api/jobparser with", search);
        try {
            setLoading(true)
            const startTime : number = Date.now();
            const res = await fetch("http://localhost:5005/api/jobparser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobText: search }),
            signal: abortController.current.signal //Abort signal 
            });
            const endTime : number = Date.now();
            const timeTaken : number = endTime - startTime
            const data : JobApplicationPackage = await res.json();

            console.log(data.listingInfo.company)
            console.log(data.listingInfo.description)
            console.log(data.listingInfo.title)

            data.listingInfo.techStack.forEach(tech => {
                console.log(tech)
            });

            if(data.listingInfo.company.trim() == "" || data.listingInfo.title.trim() == "" || data.listingInfo.techStack.length == 0){
                setError(true);
                setLoading(false);
                return;
            }

            setJobData(data);
            setShowOutput(true);
            setOutputDescription(`View your created documents below. Juno took ${(timeTaken / 1000).toFixed(2)} seconds.`)

        } catch (e:any) {
            if(e.name === "AbortError"){ //called when abortController.abort() is run
                console.log("user canceled request")
            }else{
                setError(true) //Cant connect to API Error
                setOutputDescription("Input a Job Description or URL to get started.")
                console.error("request failed", e);
            }
            
        }
        setLoading(false)
    }

    function cancelUserRequest(){
        if(abortController.current){
            abortController.current.abort();
            abortController.current = null; //set controller to null as its been aborted
        }
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
        setError(false)
        setOutputDescription("Input a Job Description or URL to get started.")
    }

    function handleGenerateClick(){
        handleResetOutput()
        setOutputDescription("Please wait for your request to be processed. This might take some time.")
        handleJobDescriptionInput();
    }

    return(
    <div className ="flex flex-col gap-4 w-1/2">
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
                    <ul className = "italic text-gray-300 text-left"><strong>Top Technologies Used:</strong>
                    {jobData?.listingInfo.techStack?.slice(0,8).map((tech,key) => <li key={key}>{tech.name}</li>)}
                    </ul>
                </div> : null
            }
            <div className= "flex flex-row gap-4">
                <Button text = {switchInputButtonText} Icon ={IoMdSwap} onClick = {switchInputType}/>
                <Button variant= "secondary" text= "Clear" Icon ={MdOutlineClear} onClick = {handleResetOutput}/>
                <Button variant= "tertiary" text= "Cancel" Icon ={FaStopCircle} onClick = {cancelUserRequest}/>
            </div>       
        </div>
    </div>
    )
}