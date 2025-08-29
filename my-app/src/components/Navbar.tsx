import Button from "./Button";

export default function Navbar(){
    return(
        <div className="flex flex-row items-center justify-between w-300 h-15">
            <span className = "text-3xl justify-left flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent px-2">Job Helper</span>
            <div className= "flex text-white font-bold justify-right  gap-10">
                <button>Home</button>
                <button>About</button>
                <button>Builder</button>
                <button>Contact</button>
                <Button/>
                <Button/>
            </div>
        </div>
    )
}