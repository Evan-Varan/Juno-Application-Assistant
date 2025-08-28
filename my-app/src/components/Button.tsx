
type buttonProps ={
    onClick: () => void
    text: string,
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export default function Button({onClick, text, Icon} : buttonProps){
    return (
        <>
            <button 
            className = "px-4 py-2 gap-2 items-center text-white font-bold flex flex-row rounded-xl bg-blue-700 hover:bg-blue-500" 
            onClick = {onClick}> 
            {Icon ? <Icon className="w-5 h-5 text-white"/> : null}
            {text}
            </button>
        </> 
    )
}
