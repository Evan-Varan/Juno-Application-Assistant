import Juno from "./assets/Juno2.png"
import User from "./assets/userImage.jpg"

type ChatBubbleProps = {
    text: string,
    sender: "Juno" | "User";
}

export default function ChatBubble({text, sender} : ChatBubbleProps){
    return(
        <div className={`flex flex-row gap-2 px-2 py-2 ${sender === "Juno" ? "justify-start" : "justify-end"}`}>
            {sender === "Juno" && (
                    <>
                        <img src ={Juno} className="w-10 h-auto translate-y-4 border border-primary rounded-full"/>
                        <div className="border rounded-full rounded-bl-none border-text-muted text-text px-2 py-2 shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
                            {text}
                        </div>
                    </>
                )
            }
            {sender === "User" && (
                    <>
                        <div className="border rounded-full rounded-br-none border-text-muted text-text px-2 py-2 shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
                            {text}
                        </div>
                        <img src ={User} className="w-10 h-10 border rounded-full translate-y-4"/>
                    </>
                )
            }
        </div>
        
    )
}