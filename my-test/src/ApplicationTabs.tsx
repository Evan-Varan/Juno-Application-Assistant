import { IoDocumentOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaAirbnb } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function ApplicationTabs(){
    return (
        <div className="flex flex-row items-center w-full gap-4 h-1/12  ">
            <button className="flex items-center text-sm gap-2 px-4 py-2 rounded-2xl bg-white border-gray-200   border hover:scale-105 hover:outline-1 outline-red-400
    shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)]">
                <FaAirbnb  className="shrink-0 text-red-400 rounded-full w-5 h-5" /> 
                AirBnB | Software Engineer
                <IoMdClose  className="shrink-0 text-gray-500" /> 
            </button>
            <button className="flex items-center text-sm gap-2 px-4 py-2 rounded-2xl bg-white border-gray-200 border hover:scale-105 hover:outline-1 outline-red-400
    shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)]">
                <FcGoogle  className="shrink-0 rounded-full w-5 h-5" /> 
                Google | Software Developer
                <IoMdClose  className="shrink-0 text-gray-500" /> 
            </button>
            <button className="flex items-center text-sm gap-2 px-4 py-2 rounded-2xl bg-white border-gray-200 border hover:scale-105 hover:outline-1 outline-red-400
    shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)]">
                <FaApple  className="shrink-0 rounded-full w-5 h-5" /> 
                Apple | Front-end Developer
                <IoMdClose  className="shrink-0 text-gray-500" /> 
            </button>
            <button className="flex items-center text-sm gap-2 px-4 py-2 rounded-2xl bg-white border-gray-200 border hover:scale-105 hover:outline-1 outline-red-400
    shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)]">
                <FaGithub  className="shrink-0 rounded-full w-5 h-5" /> 
                Github | Software Engineer
                <IoMdClose  className="shrink-0 text-gray-500" /> 
            </button>
            <button className = "items-center border rounded-xl px-2 py-1">+</button>
        </div>
    )
}