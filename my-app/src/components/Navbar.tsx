import Button from "./Button";
import JunoAIProfilePicture from "../assets/JunoAIProfilePicture.png"

export default function Navbar(){
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
                <button>About</button>
                <button>Builder</button>
                <button>Contact</button>
                <div className= "gap-4 flex">
                    <Button text ="Login"/>
                    <Button variant="secondary" text="Signup"/>
                </div>
            </div>
        </div>
    )
}