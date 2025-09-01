
import Button from './Button'
import Input from './Input'
import {SparklesIcon} from '@heroicons/react/24/solid'
import floweroutline from '../assets/floweroutline.png'
import OutputCard from './OutputCard'

type buildProps = {
    search: string
    setSearch: (value: string) => void
    handleJobDescriptionInput: () => void
}


export default function Build({search, setSearch, handleJobDescriptionInput}: buildProps){
    return(
     <div className = "flex flex-col gap-4">   
       <h1 className="text-xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">CREATE WITH JUNO</h1> 
    <div className = "flex flex-col border-2 border-white/10 rounded-2xl items-center h-150">
        <div className = "flex flex-row justify-between w-300 py-4 px-4  bg-items-center text-center  relative ">
            <div className ="flex flex-col gap-4 w-125">
                <h1 className="text-5xl flex font-bold text-white ">Build</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></div>
                <p className="italic text-gray-300 text-left">Create your dream job application with Juno.</p>
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
                <h1 className="text-5xl flex font-bold text-white ">Output</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></div>
                {search ? 
                <>
                <p className="italic text-gray-300 text-left">View your created documents below.</p>
                <div className= "flex flex-row gap-4 ">
                    <OutputCard title = "Resume" contentText='Your Juno Created Resume'/>
                    <OutputCard title = "Cover Letter" contentText='Your Juno Created Cover Letter'/>
                </div> 
                </> : 
                <>
                <p className="italic text-gray-300 text-left">Enter a job description to see your outputted documents below.</p>

                </>
                }
                
            </div>
            
        </div>
        <div className={`flex flex-row items-center ${search ? "-mt-17" : "mt-13"}`}>
            <img 
                src={floweroutline} 
                className="w-130 justify-left flex"
            />
            <img 
                src={floweroutline} 
                className="w-130 justify-right flex"
            /> 
        </div>

     
    </div>
    </div>
    )
}