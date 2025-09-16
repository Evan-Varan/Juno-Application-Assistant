import Juno2 from "./assets/Juno2.png"
export default function EntryHeader(){
    return(
        <div className="flex flex-col items-center gap-4 ">
            <img src= {Juno2} className="w-1/4 h-auto"></img>
            <div className=" flex flex-col gap-2">
                <h1 className="text-3xl font-semibold text-text">Good Morning, Evan</h1>
                <h1 className="text-4xl font-semibold">How may <span className ="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">I assist you today?</span> </h1>
            </div>      
        </div>
    )
}