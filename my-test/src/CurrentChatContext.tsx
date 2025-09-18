import { createContext, useContext, useState} from "react"
import type { ReactNode } from "react"
import { v4 as uuid } from "uuid"
import Chat from "./Chat"

type Message = {
    id: string,
    sender: "User" | "Juno"
    text: string,
}

type Chat = {
    id: string,
    title: string,
    messages: Message[]
}

type CurrentChatContextType = {
    savedChats: Chat[],
    currentChatId: string | null,
    newChat: (userText? : string) => void,
    addMessage: (text:string, sender: "User" | "Juno") => void,
    setCurrentChatId: React.Dispatch<React.SetStateAction<string | null>>
    setSavedChats: React.Dispatch<React.SetStateAction<Chat[]>>
}


const CurrentChatContext = createContext({} as CurrentChatContextType)

export function CurrentChatProvider({children} : {children: ReactNode}){
    const [savedChats, setSavedChats] = useState<Chat[]>(initialChats)
    const [currentChatId, setCurrentChatId] = useState<string | null>(null)


    function newChat(userText? : string){
        console.log("creating new chat")
        let newChat : Chat
        {userText
            ?
            newChat = {id: uuid(), title: "New Chat", messages:[{id: uuid(), sender: "User", text: userText ?? "Error"}]}
            :
            newChat = {id: uuid(), title: "New Chat", messages:[{id: uuid(), sender: "Juno", text: "Hi what can I help you with?"}]}
        }
        setSavedChats((prevChats) => [...prevChats, newChat])
        setCurrentChatId(newChat.id)
    }

    /* We have to start at the highest level: setSavedChats, otherwise the savedChats object wont be updated with new messages
        prevChats represents the savedChats array. We loop through that for each chat. 
        We set a contitional to check if each chat matches the current one (the one we want to add a message to)
        if it does then we setSavedChats to the rest operator (all other chats in the savedChats) and then append a new chat
        In a similar way the new chat uses the rest operator to gather all the messages in the current chat and then adds a new chat at the end
    */
    function addMessage(text:string, sender: "User" | "Juno"){
        console.log("adding message")
        setSavedChats(prevChats => prevChats.map(c => 
            c.id == currentChatId ? 
            {
                ...c,
                messages: [...c.messages, {id: uuid(), text, sender}]
            }
            : c
        ))
    }

    
    return(
        <CurrentChatContext.Provider
      value={{ savedChats, currentChatId, newChat, addMessage, setCurrentChatId, setSavedChats}}>
      {children}
    </CurrentChatContext.Provider>
    )
}

export function useCurrentChat() {
  const ctx = useContext(CurrentChatContext)
  return ctx
}

//test data
const initialChats: Chat[] = [
  {
    id: "1",
    title: "Resume Draft",
    messages: [
      { id: "m1", sender: "User", text: "Can you help me write my resume?" },
      { id: "m2", sender: "Juno", text: "Of course! Let's start with your work history." },
    ],
  },
  {
    id: "2",
    title: "Interview Prep",
    messages: [
      { id: "m1", sender: "User", text: "How should I answer 'Tell me about yourself'?" },
      { id: "m2", sender: "Juno", text: "Start with your background, highlight key skills, and finish with what excites you about the role." },
    ],
  },
  {
    id: "3",
    title: "Learning React",
    messages: [
      { id: "m1", sender: "User", text: "What's the difference between props and state?" },
      { id: "m2", sender: "Juno", text: "Props are inputs from outside; state is managed within a component." },
      { id: "m3", sender: "User", text: "Got it, thanks!" },
    ],
  },
  {
    id: "4",
    title: "Travel Ideas",
    messages: [
      { id: "m1", sender: "User", text: "Where should I go this summer?" },
      { id: "m2", sender: "Juno", text: "How about Japan? Great mix of culture, food, and nature." },
    ],
  },
]
