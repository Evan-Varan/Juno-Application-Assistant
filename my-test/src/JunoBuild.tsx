import SideBar from "./SideBar"
import ApplicationTabs from "./ApplicationTabs"
import EntryHeader from "./EntryHeader"
import ChatInput from "./ChatInput"
export default function JunoBuild(){
    return(
        <div className = "flex flex-col border border-red-500 h-[95vh]">
            <ApplicationTabs />
            <div className="flex flex-row gap-4 justify-center w-max-6xl my-auto mx-auto h-11/12 border border-amber-600 ">
                <SideBar/>
                <div className="flex flex-col gap-12 w-4/5 items-center justify-end py-12 border-indigo-500 border rounded-2xl">
                    <EntryHeader />
                    <ChatInput/>
                </div>
            </div>
        </div>
    )
}