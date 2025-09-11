import Juno2 from '../assets/Juno2.png'
import { FaGithub, FaLinkedin } from "react-icons/fa"
import blueflower3 from '../assets/blueflower3.png'
import blueflower2 from '../assets/blueflower2.png'


type footerProps = {
    buildRef: React.RefObject<HTMLDivElement | null>,
    aboutRef: React.RefObject<HTMLDivElement| null>,
    faqRef: React.RefObject<HTMLDivElement | null>,
    contactRef: React.RefObject<HTMLDivElement | null>,
}

export default function Footer({buildRef,aboutRef,faqRef,contactRef} : footerProps){
    return(
        <div className ="flex justify-between w-450 h-100">
            <div className= "flex w-100">
                <img 
                    src={blueflower2} 
                    className="w-75 h-75"
                    />
            </div>
            <div className ="flex flex-col items-center w-150 justify-center gap-4">
                <div className ="justify-center">
                    <img 
                    src={Juno2} 
                    className="w-25 h-25 flex"
                    />
                    <p className="text-gray-300 text-2xl font-bold text-center">Juno AI</p> 
                </div>
                
                <div className ="flex flex-row text-lg text-white font-semibold items-center gap-10">
                    <button onClick = {() => buildRef.current?.scrollIntoView({behavior: "smooth"})}>Builder</button>
                    <button onClick = {() => aboutRef.current?.scrollIntoView({behavior: "smooth"})}>About</button>
                    <button onClick = {() => faqRef.current?.scrollIntoView({behavior: "smooth"})}>FAQ</button>
                    <button onClick = {() => contactRef.current?.scrollIntoView({behavior: "smooth"})}>Contact</button>
                </div>

                <div className ="flex flex-row items-center gap-10">
                <a href="https://github.com/evan-varan" target="_blank">
                    <FaGithub className="w-10 h-10 text-white hover:text-gray-400" />
                </a>
                <a href="https://linkedin.com/in/evan-r-varan" target="_blank">
                    <FaLinkedin className="w-10 h-10 text-blue-600 hover:text-blue-800" />
                </a>
                
                </div>
                <p className="text-gray-300 text-center">@ Copyright Evan Varan 2025 All Rights Reserved</p> 
            </div>
            <div className= "flex w-100">
                <img 
                    src={blueflower3} 
                    className="w-75 h-75 rotate-200 -scale-y-100"
                    />
            </div>
        </div>
    )
}