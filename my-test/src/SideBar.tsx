import Juno2 from "./assets/Juno2.png"
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoDocumentOutline } from "react-icons/io5";
import userImage from "./assets/userImage.jpg"
import { IoSettingsOutline } from "react-icons/io5";
import HistoryButton from "./Buttons/HistoryButton";
import LinkButton from "./Buttons/LinkButton";


export default function SideBar(){
    return(
        <div className="flex flex-col px-4 py-4 gap-8 w-1/5 border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
            <div className="flex flex-row items-center justify-start gap-2"> {/* bar header */}
                <img src = {Juno2} className="w-1/4 h-auto"></img>
                <h1 className="text-2xl font-bold">Juno</h1>
            </div>
            <div className="flex flex-row items-center border-gray-200 shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)] gap-2 rounded-2xl px-2">
                <CiSearch className="shrink-0 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="py-2 outline-none " 
                />
            </div>
            <div className="gap-4 flex flex-col">
                <LinkButton text="Home" Icon={IoHomeOutline}/>
                <LinkButton text="Profile" Icon={CgProfile}/>
                <LinkButton text="New Application" Icon={IoDocumentOutline}/>
            </div>

            <div className="gap-4 flex flex-col">
                <h1 className="text-xl text-left font-bold text-gray-600">History</h1>
                <h1 className=" text-left font-bold text-gray-500">Yesterday</h1>
                <HistoryButton text= "Example Fading Text"/>
                <HistoryButton text= "Example Fading Text"/>
                <HistoryButton text= "Example Fading Text"/>
                <h1 className="text-left font-bold text-gray-500">Last Week</h1>
                <HistoryButton text= "Example Fading Text"/>
                <HistoryButton text= "Example Fading Text"/>
                <HistoryButton text= "Example Fading Text"/>
            </div>
            <div className="flex justify-endflex-row py-2 px-2 gap-2 border-gray-200 shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)] rounded-2xl items-center">
                <img src= {userImage} className="justify-start border rounded-full w-10 h-auto"></img>
                <div className ="flex flex-col">
                    <h1 className="text-sm text-left font-bold text-gray-600">John Doe</h1>
                    <h1 className="text-xs text-left font-bold text-gray-500">john.doe@gmail.com</h1>
                </div>
                <IoSettingsOutline  className=" text-gray-500 scale-150 justify-end" />
            </div>
        </div>
    )
}