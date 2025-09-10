import MotionButton from "./MotionButton"
import Juno2 from "../assets/Juno2.png"
import {motion} from "framer-motion"
import {Section} from "./Section"


type heroProps = {
    buildRef: React.RefObject<HTMLDivElement | null>
    aboutRef: React.RefObject<HTMLDivElement | null>
}

export default function Hero({buildRef,aboutRef} : heroProps){
    return(
        <Section className ="flex flex-row justify-between items-center h-screen">
            <div className= "flex flex-col justify-between w-200 gap-4">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }} 
                    className = "text-7xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">JUNO AI
                </motion.h1>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }} 
                    className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8,}} 
                        className="text-4xl flex font-bold text-white ">Get the Application Assisstance You Need.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}  
                        className="text-xl flex font-semibold text-gray-300 "> The first ever generative AI for software developer job applications.
                    </motion.p>
                <div className= "gap-4 flex">
                    <MotionButton text ="Try Now" onClick = {() => buildRef.current?.scrollIntoView({behavior: "smooth"})}/>
                    <MotionButton variant="secondary" onClick = {() => aboutRef.current?.scrollIntoView({behavior: "smooth"})} text="Learn More"/>
                </div>
            </div>
            <div className= "flex flex-col justify-between w-75">
                <img 
                src={Juno2} 
                className="w-75 h-75"
                /> 
            </div>
        </Section>
    )
}