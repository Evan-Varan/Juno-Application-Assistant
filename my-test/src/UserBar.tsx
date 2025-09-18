import userImage from "./assets/userImage.jpg"
import { IoSettingsOutline } from "react-icons/io5";
import IconButton from "./Buttons/IconButton";

export default function UserBar(){
    return(
        <div className="flex justify-between flex-row py-2 px-2 gap-2 border-gray-200 shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)] rounded-2xl items-center">
            <img src= {userImage} className="justify-start border-accent border rounded-full w-10 h-auto"></img>
            <div className ="flex flex-col">
                <h1 className="text-sm text-left font-bold text-text">John Doe</h1>
                <h1 className="text-xs text-left font-bold text-text-muted">john.doe@gmail.com</h1>
            </div>
            <IconButton Icon={IoSettingsOutline}/>
        </div>
    )
}