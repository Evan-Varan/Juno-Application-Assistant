import Button from "./ButtonPrimative"
import { CurrentChatProvider, useCurrentChat } from "../CurrentChatContext"


type HistoryButtonProps = {
    text: string,
    onClick?: () => void | undefined,
    chatId: string,
}

export default function HistoryButton({text, onClick, chatId}:HistoryButtonProps){

    const {setCurrentChatId} = useCurrentChat()

    return(
        <Button  
        className = "text-sm text-text-muted gap-2 text-left px-2  [mask-image:linear-gradient(to_right,black,black,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%]" 
        text= {text}
        onClick={() => setCurrentChatId(chatId)}>
        </Button>
    )
}