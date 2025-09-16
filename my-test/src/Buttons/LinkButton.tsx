
import Button from "./ButtonPrimative"

type LinkButtonProps = {
    text: string,
    Icon: React.ComponentType<{ className?: string }> | string,
    onClick?: () => void,
}


export default function LinkButton({text, Icon, onClick} : LinkButtonProps){
    return(
        <Button  
            className = "flex text-sm items-center gap-2 text-left px-2 text-text-muted"
            text = {text}
            Icon={Icon}
            onClick={onClick}
            iconPosition="left"
        >
        </Button>
    )
}