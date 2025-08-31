import Aboutsection from "../assets/Aboutsection.png"

export default function About(){
    return(
    <div className = "flex flex-row justify-between w-300 py-4 px-4 h-100 bg-items-center text-center relative rounded-2xl">
        <div className ="flex flex-col gap-4 w-125">
            <h1 className="text-xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">WHY CHOOSE US</h1>
            <h1 className="text-5xl flex font-bold text-white ">ABOUT JUNO</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></div>
            <p className="italic text-gray-300 text-left">“Juno AI is your intelligent application assistant, designed to simplify the way you work, build, and connect with technology. From guiding you through complex processes to generating smart, real-time solutions, Juno helps you achieve more with less effort.

With cutting-edge AI at its core, Juno adapts to your needs—whether you’re a student, a professional, or a creator—delivering accurate, personalized support every step of the way.

Our mission is to make powerful AI tools accessible, intuitive, and reliable so you can focus on what truly matters: turning your ideas into reality.”</p>
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