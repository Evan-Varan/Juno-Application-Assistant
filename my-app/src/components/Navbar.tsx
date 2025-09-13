import Button from "./Buttons/Button";
import Juno2 from "../assets/Juno2.png"
import { FaGithub   } from "react-icons/fa";
import { useState } from "react";

type navbarProps = {
    buildRef: React.RefObject<HTMLDivElement | null>,
    aboutRef: React.RefObject<HTMLDivElement| null>,
    faqRef: React.RefObject<HTMLDivElement | null>,
    contactRef: React.RefObject<HTMLDivElement | null>,
    setLogin: (value: boolean) => void,
    setSignup: (value: boolean) => void
}


export default function Navbar({buildRef,aboutRef,faqRef,contactRef, setLogin, setSignup} : navbarProps){

    function enableLogin(){
        setLogin(true)
    }
    function enableSingup(){
        setSignup(true)
    }
    
    return(
        <div className="flex flex-row items-center justify-between w-[70vw] h-15 py-12">
            <div className = "items-center gap-4 flex ">
                <img 
                src={Juno2} 
                className="w-20 h-20"
                /> 
                <p
                    className = "text-4xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">Juno
                </p>
            </div>
            <div className= "flex text-white font-bold text-lg gap-10">
                <button>Home</button>
                <button onClick = {() => buildRef.current?.scrollIntoView({behavior: "smooth"})}>Builder</button>
                <button onClick = {() => aboutRef.current?.scrollIntoView({behavior: "smooth"})}>About</button>
                <button onClick = {() => faqRef.current?.scrollIntoView({behavior: "smooth"})}>FAQ</button>
                <button onClick = {() => contactRef.current?.scrollIntoView({behavior: "smooth"})}>Contact</button>
                <a href="https://github.com/evan-varan" target="_blank">
                    <FaGithub className="w-10 h-10 text-white hover:text-gray-400" />
                </a>
                <div className= "gap-4 flex">
                    <Button text ="Login" variant="secondary" onClick={enableLogin}/>
                    <Button text = "Signup"  onClick={enableSingup}/>
                </div>
            </div>
        </div>
    )
}