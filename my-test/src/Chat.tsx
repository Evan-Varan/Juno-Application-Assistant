import ChatBubble from "./ChatBubble"

type Message = {
  id: string
  text: string
  sender: "Juno" | "User"
}

type ChatProps ={
    messages: Message[]
}

export default function Chat({messages}: ChatProps){
    return(
        <div className="flex flex-col gap-4">
            {messages.map((m : Message) => (
                <ChatBubble key ={m.id} text ={m.text} sender={m.sender}/> 
            ))}
        </div>
    )
}