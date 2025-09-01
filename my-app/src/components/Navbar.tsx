import Button from "./Button";
import JunoAIProfilePicture from "../assets/JunoAIProfilePicture.png"
import { FaGithub   } from "react-icons/fa";

type navbarProps = {
    buildRef: React.RefObject<HTMLDivElement | null>,
    aboutRef: React.RefObject<HTMLDivElement| null>,
    faqRef: React.RefObject<HTMLDivElement | null>,
    contactRef: React.RefObject<HTMLDivElement | null>,
}


export default function Navbar({buildRef,aboutRef,faqRef,contactRef} : navbarProps){
    return(
        <div className="flex flex-row items-center justify-between w-300 h-15 py-12">
            <div className = "items-center flex ">


            <img 
                    src={JunoAIProfilePicture} 
                    className="w-45 h-45"
                    /> 
            {/* <span className = "text-3xl justify-left flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent px-2">Juno AI</span> */}
            </div>
            <div className= "flex text-white font-bold gap-10">
                <button>Home</button>
                <button onClick = {() => buildRef.current?.scrollIntoView({behavior: "smooth"})}>Builder</button>
                <button onClick = {() => aboutRef.current?.scrollIntoView({behavior: "smooth"})}>About</button>
                <button onClick = {() => faqRef.current?.scrollIntoView({behavior: "smooth"})}>FAQ</button>
                <button onClick = {() => contactRef.current?.scrollIntoView({behavior: "smooth"})}>Contact</button>
                <a href="https://github.com/evan-varan" target="_blank">
                    <FaGithub className="w-10 h-10 text-white hover:text-gray-400" />
                </a>
                <div className= "gap-4 flex">
                    <Button text ="Login"/>
                    <Button variant="secondary" text="Signup"/>
                </div>
            </div>
        </div>
    )
}