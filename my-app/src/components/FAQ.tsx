import Accordian from "./Accordian";
import BlueFlower from "../assets/blueflower.png"

export default function FAQ(){
    return(
    <div className = "flex flex-row justify-between w-300 py-4 px-4 h-200 bg-items-center text-center relative rounded-2xl">
        <div className ="flex flex-col items-center gap-4 w-150">
           <img 
            src={BlueFlower} 
            className="w-125 h-125"
            /> 
        </div>
        <div className ="flex flex-col w-125 gap-4">
            <h1 className="text-xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">FAQ</h1>
            <h1 className="text-5xl flex font-bold text-white ">ASK JUNO</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></div>
            <p className="italic text-gray-300 text-left">Below are some popular questions about Juno.</p>
            <Accordian/>
        </div>
    </div>
    )
}