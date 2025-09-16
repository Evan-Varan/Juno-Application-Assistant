import Button from "./ButtonPrimative"

type HistoryButtonProps = {
    text: string,
    onClick?: () => void
}

export default function HistoryButton({text, onClick}:HistoryButtonProps){
    return(
        <Button  
        className = "text-sm gap-2 text-left px-2 text-gray-500 [mask-image:linear-gradient(to_right,black,black,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%]" 
        text= {text}>
        </Button>
    )
}