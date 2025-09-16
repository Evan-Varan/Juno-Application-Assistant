
import Juno2 from "./assets/Juno2.png"
import ChatBubble from "./ChatBubble"


export default function EntryHeader(){
    return(
        <div className="flex flex-col items-center gap-4 ">
            
            <div className=" flex flex-col gap-2">
                <h1 className="text-3xl font-semibold text-text">Good Morning, Evan</h1>
                <h1 className="text-4xl font-semibold">How may <span className ="text-primary-gradient">I assist you today?</span> </h1>
            </div>      
        </div>
    )
}