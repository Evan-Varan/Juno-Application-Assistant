import { TbSparkles } from "react-icons/tb";
import DropDownButton from "./Buttons/DropDownButton";
import { CurrentChatProvider, useCurrentChat } from "./CurrentChatContext";
import { useState } from "react";


export default function ChatInput(){

    const {addMessage, currentChatId, newChat} = useCurrentChat()
    const[value, setValue] = useState<string>("")

    function handleInputSubmit(e: React.KeyboardEvent<HTMLInputElement>){
        
        if(e.key === "Enter"){
            if(currentChatId){
                addMessage(value,"User")
                setValue("")
            }
            else{
                newChat(value)
                setValue("")
            }
        }
    }

    return(
        <div className="flex flex-col items-left py-2 px-2 justify-between border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)] w-full h-full text-left">
            <div className="flex flex-row gap-2 items-center">
                <TbSparkles className="text-primary w-5 h-auto"/>
                <input  
                    value = {value}
                    placeholder="Input a job descritption to get started..." 
                    className="w-full h-full py-2" 
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown = {handleInputSubmit}>
                </input>
            </div>
            <DropDownButton text= "Select input type"/>
        </div>
    )
}   