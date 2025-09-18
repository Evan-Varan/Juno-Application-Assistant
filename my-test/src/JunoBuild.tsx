import SideBar from "./SideBar"
import ApplicationTabs from "./ApplicationTabs"
import EntryHeader from "./EntryHeader"
import ChatInput from "./ChatInput"
import Chat from "./Chat"
import QuickStartSteps from "./QuickStartSteps"
import DisplayChatMessages from "./DisplayChatMessages"
import {useCurrentChat} from "./CurrentChatContext"
type Chat = {
    id: string,
    title: string,
    messages: Message[]
}

type Message = {
  id: string
  text: string
  sender: "Juno" | "User"
}

// const sampleChats: Chat[] = [
//   {
//     id: "1a2b3c",
//     title: "Resume Draft",
//     messages: [
//       { id: "m1", sender: "User", text: "Can you help me write my resume?" },
//       { id: "m2", sender: "Juno", text: "Of course! Let's start with your work history." },
//     ],
//   },
//   {
//     id: "4d5e6f",
//     title: "Interview Prep",
//     messages: [
//       { id: "m1", sender: "User", text: "How should I answer 'Tell me about yourself'?" },
//       { id: "m2", sender: "Juno", text: "Start with your background, highlight key skills, and end with what excites you about the role." },
//     ],
//   },
//   {
//     id: "7g8h9i",
//     title: "Learning React",
//     messages: [
//       { id: "m1", sender: "User", text: "What’s the difference between props and state?" },
//       { id: "m2", sender: "Juno", text: "Props are inputs passed to a component. State is data managed inside the component." },
//       { id: "m3", sender: "User", text: "Got it, thanks!" },
//     ],
//   },
//   {
//     id: "10j11k",
//     title: "Travel Ideas",
//     messages: [
//       { id: "m1", sender: "User", text: "Where should I go this summer?" },
//       { id: "m2", sender: "Juno", text: "How about Japan? Great mix of culture, nature, and food." },
//     ],
//   },
// ]


export default function JunoBuild(){
    const {currentChatId, savedChats, setCurrentChatId , newChat} = useCurrentChat()

    function setChat(): Message[] | undefined{
        const chat = savedChats.find((c) => c.id == currentChatId)
        return chat?.messages;
    }

    return(
        <div className = "grid h-screen w-screen grid-rows-[1fr_18fr] px-8 py-8 gap-4">
                <ApplicationTabs />
            <div className="grid grid-cols-[1fr_6fr] w-full h-full gap-4">
                <SideBar/>
                 {currentChatId 
                    ? 
                    <DisplayChatMessages messages={setChat() || []}/> 
                    :
                <div className="flex flex-col gap-8 pb-4 items-center justify-center border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
                    <EntryHeader />
                    {/* <QuickStartSteps /> */}
                    <ChatInput/>

                </div>
                }
                {/* <div className="flex flex-col px-4 py-4 gap-12 w-4/5 pb-4 border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
                    <Chat messages={exampleChat}/>
                    <ChatInput/>
                </div> */}
            </div>
        </div>
    )
}