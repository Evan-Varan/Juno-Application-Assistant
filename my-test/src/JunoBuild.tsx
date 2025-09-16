import SideBar from "./SideBar"
import ApplicationTabs from "./ApplicationTabs"
import EntryHeader from "./EntryHeader"
import ChatInput from "./ChatInput"
export default function JunoBuild(){
    return(
        <div className = "flex flex-col h-screen">
            <ApplicationTabs />
            <div className="flex flex-row gap-4 justify-center w-max-6xl my-auto mx-auto">
                <SideBar/>
                <div className="flex flex-col gap-12 w-4/5 pb-4 items-center justify-end border-gray-300 border rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
                    <EntryHeader />
                    <ChatInput/>
                </div>
            </div>
        </div>
    )
}