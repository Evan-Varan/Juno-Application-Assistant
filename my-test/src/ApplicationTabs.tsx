import { IoDocumentOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaAirbnb } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import ApplicationTab from "./Buttons/ApplicationTab";

export default function ApplicationTabButton(){
    return (
        <div className="flex flex-row items-center w-full gap-4 h-1/12  ">
            <ApplicationTab  companyName="AirBnb" companyIcon={FaAirbnb} roleName = "Software Engineer"/>
            <ApplicationTab  companyName="Google" companyIcon={FcGoogle} roleName = "Software Engineer"/>
            <ApplicationTab  companyName="Apple" companyIcon={FaApple} roleName = "Software Engineer"/>
            <ApplicationTab  companyName="Github" companyIcon={FaGithub} roleName = "Software Engineer"/>
            <button className = "items-center border rounded-xl px-2 py-1">+</button>
        </div>
    )
}