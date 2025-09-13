import Juno2 from "./assets/Juno2.png"
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoDocumentOutline } from "react-icons/io5";



export default function SideBar(){
    return(
        <div className="flex flex-col px-4 py-4 gap-8 w-1/5 border rounded-2xl">
            <div className="flex flex-row items-center justify-start gap-2"> {/* bar header */}
                <img src = {Juno2} className="w-1/4 h-auto"></img>
                <h1 className="text-xl font-bold">Juno</h1>
            </div>
            <div className="flex flex-row items-center border gap-2 rounded-2xl px-2">
                <CiSearch className="shrink-0 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="py-2 outline-none" 
                />
            </div>
            <div className="gap-4 flex flex-col">
                <button  className = "border rounded-2xl flex items-center gap-2 text-left px-2">
                    <IoHomeOutline className="shrink-0 text-gray-500" /> Home
                </button>
                <button  className = "border rounded-2xl flex items-center gap-2 text-left px-2">
                    <CgProfile className="shrink-0 text-gray-500" /> Profile
                </button>
                <button  className = "border rounded-2xl flex items-center gap-2 text-left px-2">
                    <IoDocumentOutline  className="shrink-0 text-gray-500" /> New Application
                </button>
            </div>

            <div className="gap-4 flex flex-col">
                <h1 className="text-xl text-left font-bold">History</h1>
                <button  className = " flex items-center gap-2 text-left px-2">
                    Example Application
                </button>
                <button  className = "flex items-center gap-2 text-left px-2">
                    Example Application 2
                </button>
                <button  className = "flex items-center gap-2 text-left px-2">
                    Example Application 3
                </button>
            </div>
        </div>
    )
}