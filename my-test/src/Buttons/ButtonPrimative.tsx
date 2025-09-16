export type ButtonProps = {
    onClick?: () => void,
    text?: string,
    Icon?: React.ComponentType<{ className?: string }> | string,
    iconPosition?: "left" | "right",
    className?: string
}

export default function Button({onClick, text, Icon, iconPosition, className} : ButtonProps){
    return(   
        <button onClick = {onClick} className= {`flex items-center ${className}`} >
            {Icon && iconPosition === "left" && <Icon />}
            {text}
            {Icon && iconPosition === "right" && <Icon />}
        </button>
    )

}