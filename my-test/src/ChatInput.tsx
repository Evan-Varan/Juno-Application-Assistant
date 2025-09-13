import { TbSparkles } from "react-icons/tb";



export default function ChatInput(){
    return(
        <div className="flex-flex col items-left border border-black w-3/4 h-1/3 text-left">
            <div className="flex flex-row gap-2 py-2 px-2 items-center">
                <TbSparkles />
                <input placeholder="Input a job descritption to get started..." className="w-full h-full py-2"></input>
            </div>
        </div>
    )
}   