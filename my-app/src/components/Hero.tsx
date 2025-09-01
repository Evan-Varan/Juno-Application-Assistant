import Button from "./Button"
import Juno from "../assets/Juno.png"

type heroProps = {
    buildRef: React.RefObject<HTMLDivElement | null>
    aboutRef: React.RefObject<HTMLDivElement | null>
}


export default function Hero({buildRef,aboutRef} : heroProps){
    return(
        <div className ="flex flex-row justify-between items-center w-300 h-200">
            <div className= "flex flex-col justify-between w-200 gap-4">
                <h1 className = "text-7xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">JUNO AI</h1>
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></div>
                <h2 className="text-4xl flex font-bold text-white ">Get the Application Assisstance You Need.</h2>
                <p className="text-xl flex font-semibold text-gray-300 "> The first ever generative AI for software developer job applications.</p>
                <div className= "gap-4 flex">
                    <Button text ="Try Now" onClick = {() => buildRef.current?.scrollIntoView({behavior: "smooth"})}/>
                    <Button variant="secondary" onClick = {() => aboutRef.current?.scrollIntoView({behavior: "smooth"})} text="Learn More"/>
                </div>
            </div>
            <div className= "flex flex-col justify-between w-75">
                <img 
                    src={Juno} 
                    className="w-75 h-75"
                    /> 
            </div>
        </div>

        // <>
        //     <h1 className="text-5xl flex font-bold text-white ">Get the Application Assisstance You Need.</h1>
        //     <h2 className= "text-3xl flex text-white py-2">Try
        //     <span className = "text-3xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent px-2">Juno AI</span> Today.</h2>
        //     <div className= "gap-4 flex">
        //         <Button text ="Try Now"/>
        //         <Button variant="secondary" text="Learn More"/>
        //     </div>
        // </>
    )
}