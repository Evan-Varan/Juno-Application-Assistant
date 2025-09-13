import Juno2 from "./assets/Juno2.png"
export default function EntryHeader(){
    return(
        <div className="flex flex-col items-center gap-4">
            <div className="flex justify-end">
                 <img src= {Juno2} className="w-1/12 h-auto"></img>
            </div>
            <img src= {Juno2} className="w-1/4 h-auto"></img>
            <div className=" flex flex-col gap-2">
                <h1 className="text-3xl">Good Morning, Evan</h1>
                <h1 className="text-4xl">How may I assist you today?</h1>
            </div>      
        </div>
    )
}