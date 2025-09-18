import Button from "./ButtonPrimative";
import { IoIosArrowDown } from "react-icons/io";

type DropDownButtonProps = {
    text: string,
    onClick?: () => void,
}

export default function DropDownButton({text, onClick} : DropDownButtonProps){
    return(
        <Button Icon={IoIosArrowDown} text= {text} iconPosition="right" 
        className= "px-2 py-1 gap-2 text-text text-sm border-gray-200 shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)] rounded-2xl" 
        onClick={onClick}/>
    )
}