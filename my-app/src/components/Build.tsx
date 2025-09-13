import { useState } from 'react'
import BuildSectionInput from './BuildSectionInput'
import BuildSectionOutput from './BuildSectionOutput'
import { Section } from './Section';
import Juno from './Juno';
import JunoHello from '../assets/JunoHello.png';
import JunoThinking from '../assets/JunoThinking.png';
import JunoFound from '../assets/JunoFound.png';
import JunoSad from '../assets/JunoSad.png';


export default function Build(){
    const [search, setSearch] = useState<string>("");
    const [showOutput, setShowOutput] = useState<boolean>(false)
    const [outputDescription, setOutputDescription] = useState<string>("Input a Job Description or URL to get started.");
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const renderJuno = () => {
        if(error)
            return <Juno junoHeader="I'm Sorry!" junoSubHeader="I couldn't find anything for that description." junoImage = {JunoSad}/>
        if (loading && !showOutput)
            return <Juno junoHeader="I got your request!" junoSubHeader="Give me one moment..." junoImage = {JunoThinking} loading />
        if (showOutput && !loading)
            return <Juno junoHeader="Here’s what I found." junoSubHeader="Your documents are below." junoImage = {JunoFound} />
        if (!showOutput && !loading)
            return <Juno junoHeader="Hey, I’m Juno!" junoSubHeader="Let’s get started on your application." junoImage = {JunoHello}/>
        return null
    }
    return(
        <Section className='relative flex flex-col min-h-[60vh]'>
            {renderJuno()}
            <Section noMinWidth className = "flex z-1 text-center border-2 gap-8 border-white/10 rounded-3xl bg-black">
                <BuildSectionInput search = {search} setSearch={setSearch} setShowOutput ={setShowOutput} setOutputDescription = {setOutputDescription} setLoading ={setLoading} setError ={setError} loading = {loading}/>
                <BuildSectionOutput showOutput = {showOutput} outputDescription= {outputDescription} loading = {loading}/>
            </Section>      
        </Section>
    )
}