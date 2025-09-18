
import Juno2 from "./assets/Juno2.png"
import ChatBubble from "./ChatBubble"
import { HiSparkles } from "react-icons/hi2";



export default function EntryHeader(){
    return(
        <div className="flex flex-col items-center justify-center gap-4 ">
            <HiSparkles className="text-primary w-1/2 h-1/2"/>
            <div className=" flex flex-col items-center gap-2">
                <h1 className="text-3xl font-semibold text-text">Good Morning, Evan</h1>
                <h1 className="text-4xl font-semibold">How may <span className ="text-primary-gradient">I assist you today?</span> </h1>
            </div>      
        </div>
    )
}