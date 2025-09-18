import { TbSparkles } from "react-icons/tb";
import DropDownButton from "./Buttons/DropDownButton";



export default function ChatInput(){
    return(
        <div className="flex flex-col items-left py-2 px-2 justify-between border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)] w-full h-full text-left">
            <div className="flex flex-row gap-2 items-center">
                <TbSparkles className="text-primary w-5 h-auto"/>
                <input placeholder="Input a job descritption to get started..." className="w-full h-full py-2"></input>
            </div>
            <DropDownButton text= "Select input type"/>
        </div>
    )
}   