import { IoDocumentOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaAirbnb } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

type ApplicationTabProps = {
    companyName: string,
    roleName: string,
    companyIcon: React.ComponentType<{ className?: string }>
}

export default function ApplicationTabButton({companyName, roleName, companyIcon: Icon} : ApplicationTabProps){
    return (
            <button className="flex items-center text-sm gap-2 px-4 py-2 rounded-2xl bg-bg border-border border text-text hover:scale-105 hover:outline-1 outline-red-400
    shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)]">
                <Icon  className="shrink-0 rounded-full w-5 h-5" /> 
                {companyName} | {roleName}
            </button>
    )
}