import Button from "./Buttons/Button"
import Juno2 from "../assets/Juno2.png"
import {motion} from "framer-motion"
import {Section} from "./Section"


type heroProps = {
    buildRef: React.RefObject<HTMLDivElement | null>
    aboutRef: React.RefObject<HTMLDivElement | null>
}

export default function Hero({buildRef,aboutRef} : heroProps){
    return(
        <Section className ="flex flex-row justify-between w-full items-center h-screen">
            <div className= "flex flex-col w-2/3 gap-8 ">
                <div className = "flex flex-col gap-4">
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
                </div>

                <div className= "gap-4 flex">
                    <Button size= "lg" text ="Try Now" onClick = {() => buildRef.current?.scrollIntoView({behavior: "smooth"})}/>
                    <Button size= "lg" variant="secondary" onClick = {() => aboutRef.current?.scrollIntoView({behavior: "smooth"})} text="Learn More"/>
                </div>
            </div>
            <div className= "flex flex-col w-1/3">
                <img 
                src={Juno2} 
                className="w-full h-full scale-75"
                /> 
            </div>
        </Section>
    )
}