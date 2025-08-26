type buttonProps ={
    onClick: () => void
}

export default function Button({onClick} : buttonProps){
    return (
        <div>
            <button 
            className = "px-4 py-2 bg-black text-white font-bold flex rounded" 
            onClick = {onClick}> 
            Generate</button>
        </div>  
    )
}
