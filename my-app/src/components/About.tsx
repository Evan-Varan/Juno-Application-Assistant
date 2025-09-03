import Aboutsection from "../assets/Aboutsection.png"
import SectionHeading from "./SectionHeading"

export default function About(){
    return(
    <div className = "flex flex-row justify-between w-300 py-4 px-4 h-100 bg-items-center text-center relative rounded-2xl">
        <div className ="flex flex-col gap-4 w-125">
            <SectionHeading subheadingText = "WHY CHOOSE US" headingText ="ABOUT JUNO" pageText ="“Juno AI is your intelligent application assistant, designed to simplify the way you work, build, and connect with technology. From guiding you through complex processes to generating smart, real-time solutions, Juno helps you achieve more with less effort. With cutting-edge AI at its core, Juno adapts to your needs—whether you’re a student, a professional, or a creator—delivering accurate, personalized support every step of the way. Our mission is to make powerful AI tools accessible, intuitive, and reliable so you can focus on what truly matters: turning your ideas into reality.”"/>
        </div>
        <div className ="flex w-100">
            <img 
                src={Aboutsection} 
                className=""
                /> 
        </div>
    </div>
    )
}