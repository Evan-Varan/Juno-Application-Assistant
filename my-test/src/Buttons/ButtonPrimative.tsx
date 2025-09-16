export type ButtonProps = {
    onClick?: () => void,
    text?: string,
    Icon?: React.ComponentType<{ className?: string }> | string,
    iconPosition?: "left" | "right",
    className?: string
}

export default function Button({onClick, text, Icon, iconPosition, className} : ButtonProps){
    return(   
        <button onClick = {onClick} className= {`flex items-center infline-flex w-auto max-w-max ${className}`} >
            {Icon && iconPosition === "left" && <Icon />}
            {text}
            {Icon && iconPosition === "right" && <Icon />}
        </button>
    )

}
/*
w-auto → lets it size by content.

inline-flex → makes it shrink-to-content instead of acting like a block that could expand.

max-w-max → safety guard so parent layouts (like flex-grow or w-full defaults) can’t force it bigger.
*/