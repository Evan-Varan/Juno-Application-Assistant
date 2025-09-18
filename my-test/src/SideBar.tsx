import Juno2 from "./assets/Juno2.png"
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoDocumentOutline } from "react-icons/io5";
import HistoryButton from "./Buttons/HistoryButton";
import LinkButton from "./Buttons/LinkButton";
import UserBar from "./UserBar";
import {useCurrentChat} from "./CurrentChatContext"


export default function SideBar(){
    const {newChat, savedChats, setCurrentChatId} = useCurrentChat()

    return(
        <div className="flex flex-col px-4 py-4 gap-8 justify-between border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
            <div className="flex flex-row items-center justify-start gap-2"> {/* bar header */}
                <img src = {Juno2} className="w-1/4 h-auto"></img>
                <h1 className="text-2xl font-bold">Juno</h1>
            </div>
            <div className="flex flex-row items-center border-gray-200 shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)] gap-2 rounded-2xl px-2">
                <CiSearch className="shrink-0 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="py-2 outline-none " 
                />
            </div>
            <div className="gap-4 flex flex-col">
                <LinkButton text="Home" Icon={IoHomeOutline} onClick={() => setCurrentChatId(null)}/>
                <LinkButton text="Profile" Icon={CgProfile}/>
                <LinkButton text="New Application" Icon={IoDocumentOutline} onClick={() => newChat()}/>
            </div>

            <div className="gap-4 flex flex-col">
                <h1 className="text-xl text-left font-bold text-gray-600">History</h1>
                <h1 className=" text-left font-bold text-gray-500">Yesterday</h1>
                {savedChats.map((c) => 
                    <HistoryButton text= {c.title} key= {c.id} chatId= {c.id}/>
                )}
                {/* <h1 className="text-left font-bold text-gray-500">Last Week</h1> */}
            
            </div>
            <UserBar/>
        </div>
    )
}