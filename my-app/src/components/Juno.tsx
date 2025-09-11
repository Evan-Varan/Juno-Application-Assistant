import {motion} from "framer-motion"
import LoadingDots from "./LoadingDots"

type junoProps = {
    junoHeader: string,
    junoSubHeader: string,
    junoImage: string,
    loading?: boolean
}

export default function Juno({junoHeader, junoSubHeader, junoImage, loading} : junoProps){
    return(
        <div className= "scale-80 absolute top-[-35vh] right-[50%] z-0">
            <img 
                src={junoImage} 
                className="w-full h-[60vh] object-contain"
                />
            <div className="absolute top-[15%] right-[-110%] mx-auto w-full z-0 text-white border-white border-2 rounded-4xl py-6 px-6">
                <div className="flex flex-col text-center items-center">
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
                {loading ? <LoadingDots/> : null}
                </div>
                <div className="absolute -left-4 top-6 w-0 h-0 
                    border-t-8 border-b-8 border-r-8 
                    border-transparent border-r-white"></div>
                
            </div>
        </div>
    )
}