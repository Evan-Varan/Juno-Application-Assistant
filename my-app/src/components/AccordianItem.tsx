import { useState } from "react"
type accordianItemProps = {
    question : string,
    answer: string,
}

export default function AccordianItem({question,answer}: accordianItemProps){
    const [open, setOpen] = useState(false)
    return(
        <div className ="border-b border-white text-left pb-4" onClick= {() => setOpen(v => !v)}>
            <button className="flex justify-between w-120 text-white font-semibold text-xl py-2">
            <div className = "flex w-110">
                {question}
            </div>
            
            {open ? "-" : "+"}
            </button>
           <span className ="text-gray-300 text-left">{open ? answer : null}</span> 
        </div>
    )
}