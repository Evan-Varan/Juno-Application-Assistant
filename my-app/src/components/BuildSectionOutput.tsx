import OutputCard from './OutputCard'
import SectionHeading from './SectionHeading'
import OtherQuestions from './OtherQuestion';
import Loading from './Loading';

type buildOutputProps = {
    showOutput: boolean
    outputDescription: string
    loading: boolean
}

export default function BuildSectionOuput({showOutput, outputDescription,loading }: buildOutputProps){
    return(
     <div className ="flex flex-col gap-4 w-1/2">
        <SectionHeading subheadingText = "VIEW WITH JUNO" headingText ="OUTPUT" pageText ={outputDescription}/> 
        {showOutput && loading == false
        ? 
            <div className ="flex flex-col gap-16">
                <div className= "flex flex-row gap-4 ">
                    <OutputCard title = "Resume" contentText='Your Juno Created Resume' downloadType='resume'/>
                    <OutputCard title = "Cover Letter" contentText='Your Juno Created Cover Letter' downloadType='coverletter'/>
                </div>
                <OtherQuestions/>
            </div>
        : null
        }
        {loading && showOutput == false 
        ?
            <Loading/>
        : null
        }
           
    </div>
    )
}