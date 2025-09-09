import { useState } from 'react'
import BuildSectionInput from './BuildSectionInput'
import BuildSectionOutput from './BuildSectionOutput'
import { Section } from './Section';
import Juno from './Juno';


//TODO: useState -> useMemo, switch input logic and UI, break build components up into buildinput and buildoutput


export default function Build(){
    const [search, setSearch] = useState<string>("");
    const [showOutput, setShowOutput] = useState<boolean>(false)
    const [outputDescription, setOutputDescription] = useState<string>("Input a Job Description or URL to get started.");
    const [loading, setLoading] = useState<boolean>(false)

    const renderJuno = () => {
        if (loading && !showOutput)
            return <Juno junoHeader="I got your request!" junoSubHeader="Give me one moment..." />
        if (showOutput && !loading)
            return <Juno junoHeader="Here’s what I found" junoSubHeader="Your documents are below" />
        if (!showOutput && !loading)
            return <Juno junoHeader="Hey, I’m Juno!" junoSubHeader="Let’s get started on your application." />
        return null
    }
    return(
        <Section className='relative flex flex-col min-h-[60vh]'>
            {renderJuno()}
            <Section className = "bg-items-center z-1 text-center border-2 gap-8 border-white/10 rounded-3xl bg-black">
                <BuildSectionInput search = {search} setSearch={setSearch} setShowOutput ={setShowOutput} setOutputDescription = {setOutputDescription} setLoading ={setLoading}/>
                <BuildSectionOutput showOutput = {showOutput} outputDescription= {outputDescription} loading = {loading}/>
            </Section>      
        </Section>
    )
}