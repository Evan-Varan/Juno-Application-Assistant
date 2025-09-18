import { IoDocumentOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaAirbnb } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import ApplicationTabButton from "./Buttons/ApplicationTabButton";

export default function ApplicationTabs(){
    return (
        <div className="flex flex-row h-full w-full gap-4 ">
            <ApplicationTabButton  companyName="AirBnb" companyIcon={FaAirbnb} roleName = "Software Engineer"/>
            <ApplicationTabButton  companyName="Google" companyIcon={FcGoogle} roleName = "Software Engineer"/>
            <ApplicationTabButton  companyName="Apple" companyIcon={FaApple} roleName = "Software Engineer"/>
            <ApplicationTabButton  companyName="Github" companyIcon={FaGithub} roleName = "Software Engineer"/>
            <button className = "items-center border rounded-xl px-2 py-1">+</button>
        </div>
    )
}