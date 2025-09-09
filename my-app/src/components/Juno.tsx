import JunoCharacter from '../assets/JunoCharacter.png'
import {motion} from "framer-motion"

type junoProps = {
    junoHeader: string
    junoSubHeader: string
}

export default function Juno({junoHeader, junoSubHeader} : junoProps){
    return(
        <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }} className= "scale-80 absolute top-[-52%] right-[50%] z-0">
            <img 
                src={JunoCharacter} 
                className="w-full h-[60vh] object-contain"
                />
            <div className="absolute top-[15%] right-[-110%] mx-auto w-full z-0 text-white border-white border-2 rounded-4xl py-6 px-6">
                <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }} 
                className = "text-3xl flex font-bold text-white">{junoHeader}
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4}} 
                    className="text-3xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">{junoSubHeader}
                </motion.h1>
                <div className="absolute -left-4 top-6 w-0 h-0 
                    border-t-8 border-b-8 border-r-8 
                    border-transparent border-r-white"></div>
            </div>
        </motion.section>
    )
}