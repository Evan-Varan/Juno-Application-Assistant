
import Button from './Button'
import Input from './Input'
import {SparklesIcon} from '@heroicons/react/24/solid'
import floweroutline from '../assets/floweroutline.png'
import OutputCard from './OutputCard'
import SectionHeading from './SectionHeading'
import { useState } from 'react'

type buildProps = {
    search: string
    setSearch: (value: string) => void
    handleJobDescriptionInput: () => void
}

//TODO: useState -> useMemo
export default function Build({search, setSearch, handleJobDescriptionInput}: buildProps){
    const [outputDescpition, setOutputDescription] = useState<string>("View your created documents below.");
    return(
        <div className = "flex flex-col border-2 border-white/10 rounded-2xl items-center h-150">
            <div className = "flex flex-row justify-between w-300 py-4 px-4  bg-items-center text-center relative">
                <div className ="flex flex-col gap-4 w-125">
                    <SectionHeading subheadingText = "CREATE WITH JUNO" headingText ="BUILD" pageText ="Create your dream job application with Juno."/> 
                    <div className = "flex flex-row gap-4 ">
                        <Input placeholder = "Enter Job Description..." value = {search} onChange = {setSearch}/>
                        <Button text = "Generate" Icon ={SparklesIcon} onClick = {handleJobDescriptionInput}/>
                    </div>
                    {/* <h1 className="text-xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">OR Enter URL</h1>
                    <div className = "flex flex-row gap-4 ">
                        <Input placeholder = "Enter Job URL..." value = {search} onChange = {setSearch}/>
                        <Button text = "Generate" Icon ={SparklesIcon} onClick = {handleJobDescriptionInput}/>
                    </div> */}
                </div>
                <div className ="flex flex-col gap-4 w-150">
                    <SectionHeading subheadingText = "VIEW WITH JUNO" headingText ="OUTPUT" pageText ={outputDescpition}/> 
                    {search 
                    ? 
                    <>
                        setOutputDescription("View your created documents below.")
                        <div className= "flex flex-row gap-4 ">
                            <OutputCard title = "Resume" contentText='Your Juno Created Resume'/>
                            <OutputCard title = "Cover Letter" contentText='Your Juno Created Cover Letter'/>
                        </div> 
                    </> 
                    : 
                    <>
                        setOutputDescription("View your created documents below.")
                    </>
                    }   
                </div>
            </div>
            {/* <div className={`flex flex-row items-center ${search ? "-mt-17" : "mt-13"}`}>
                <img 
                    src={floweroutline} 
                    className="w-130 justify-left flex"
                />
                <img 
                    src={floweroutline} 
                    className="w-130 justify-right flex"
                /> 
            </div> */}
        </div>
    )
}