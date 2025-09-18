import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"

type Message = {
  id: string
  text: string
  sender: "Juno" | "User"
}

type DisplayChatProps ={
    messages: Message[]
}

export default function DisplayChatMessages({messages}:DisplayChatProps ){
    return(
        <div className="flex flex-col w-full h-full gap-4 py-8 px-24">
            {messages.map((e) => /* add key */
                <ChatBubble text = {e.text} sender={e.sender}/>
            )}
            <div className="flex w-1/2 h-1/5 items-center mt-auto  mx-auto">
                <ChatInput /> 
            </div>
            
        </div>
    )
}