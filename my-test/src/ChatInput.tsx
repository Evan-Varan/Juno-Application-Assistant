import { TbSparkles } from "react-icons/tb";



export default function ChatInput(){
    return(
        <div className="flex-flex col items-left border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)] w-3/4 h-1/3 text-left">
            <div className="flex flex-row gap-2 py-2 px-2 items-center">
                <TbSparkles className="text-indigo-400 w-5 h-auto"/>
                <input placeholder="Input a job descritption to get started..." className="w-full h-full py-2"></input>
            </div>
        </div>
    )
}   