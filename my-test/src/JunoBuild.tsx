import SideBar from "./SideBar"
import ApplicationTabs from "./ApplicationTabs"
import EntryHeader from "./EntryHeader"
import ChatInput from "./ChatInput"
import Chat from "./Chat"

type Message = {
  id: string
  text: string
  sender: "Juno" | "User"
}

const exampleChat : Message[] = [
    { id: "1", text: "Hey, how’s it going?", sender: "Juno" },
    { id: "2", text: "All good! You?", sender: "User" },
    { id: "3", text: "Working on the chat UI right now 👩‍💻", sender: "Juno" },
]

export default function JunoBuild(){
    return(
        <div className = "flex flex-col h-screen">
            <ApplicationTabs />
            <div className="flex flex-row gap-4 justify-center w-max-6xl my-auto mx-auto">
                <SideBar/>
                {/* <div className="flex flex-col gap-12 w-4/5 pb-4 items-center justify-end border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
                    <EntryHeader />
                    <ChatInput/>
                </div> */}
                
                <div className="flex flex-col px-4 py-4 gap-12 w-4/5 pb-4 border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
                    <Chat messages={exampleChat}/>
                    <ChatInput/>
                </div>
            </div>
        </div>
    )
}