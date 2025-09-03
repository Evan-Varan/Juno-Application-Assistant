import { useState } from 'react'
import BuildSectionInput from './BuildSectionInput'
import BuildSectionOutput from './BuildSectionOutput'


//TODO: useState -> useMemo, switch input logic and UI, break build components up into buildinput and buildoutput
export default function Build(){
    const [search, setSearch] = useState<string>("");
    const [showOutput, setShowOutput] = useState<boolean>(false)
    const [outputDescription, setOutputDescription] = useState<string>("Input a Job Description or URL to get started.");
    const [loading, setLoading] = useState<boolean>(false)
    return(
        <div className = "flex flex-row justify-between w-300 py-4 px-4 bg-items-center text-center relative border-2 border-white/10 rounded-3xl bg-white/[0.02]">
            <BuildSectionInput search = {search} setSearch={setSearch} setShowOutput ={setShowOutput} setOutputDescription = {setOutputDescription} setLoading ={setLoading}/>
            <BuildSectionOutput showOutput = {showOutput} outputDescription= {outputDescription} loading = {loading}/>
        </div>      
    )
}