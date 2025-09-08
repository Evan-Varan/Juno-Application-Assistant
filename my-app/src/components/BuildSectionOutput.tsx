import OutputCard from './OutputCard'
import SectionHeading from './SectionHeading'
import { FiLoader } from "react-icons/fi";

type buildOutputProps = {
    showOutput: boolean
    outputDescription: string
    loading: boolean
}

export default function BuildSectionOuput({showOutput, outputDescription,loading }: buildOutputProps){
    return(
     <div className ="flex flex-col gap-4 w-150">
        <SectionHeading subheadingText = "VIEW WITH JUNO" headingText ="OUTPUT" pageText ={outputDescription}/> 
        {showOutput && loading == false
        ? 
            <div className= "flex flex-row gap-4 ">
                <OutputCard title = "Resume" contentText='Your Juno Created Resume' downloadType='resume'/>
                <OutputCard title = "Cover Letter" contentText='Your Juno Created Cover Letter' downloadType='coverletter'/>
            </div> 
        : null
        }
        {loading && showOutput == false 
        ?
            <div className ="flex flex-col items-center gap-4">
                <h1 className="text-4xl flex font-bold text-left text-white">Juno is working on your request...</h1>
                <FiLoader className='w-15 h-15 text-white'/>
            </div>
        : null
        }   
    </div>
    )
}