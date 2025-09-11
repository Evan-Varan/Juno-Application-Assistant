
type buttonProps ={
    onClick?: () => void
    text: string,
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    variant?: "primary" | "secondary" | "tertiary"
}

const variantClasses = {
    primary: "px-4 py-2 gap-2 items-center text-white font-bold flex flex-row rounded-xl bg-gradient-to-r from-indigo-400 to-sky-400 hover:bg-blue-500 hover:scale-105 transition",
    secondary: "px-4 py-2 gap-2 items-center text-white font-bold flex flex-row rounded-xl bg-transparent border-solid border-2 border-white bg-white/10 hover:bg-white/20 hover:scale-105 transition",
    tertiary: "px-4 py-2 gap-2 items-center text-indigo-300 font-bold flex flex-row rounded-xl bg-transparent border-2 border-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-200 hover:scale-105 transition"

} as const

export default function Button({onClick, text, Icon, variant = "primary"} : buttonProps){
    return (
        <>
            <button 
            className = {variantClasses[variant]}
            onClick = {onClick}> 
            {Icon ? <Icon className="w-5 h-5 text-white"/> : null}
            {text}
            </button>
        </> 
    )
}
