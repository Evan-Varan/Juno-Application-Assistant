import {ArrowDownTrayIcon} from '@heroicons/react/24/solid'
type cardProps = {
    title : string,
    contentText: string
}
export default function OutputCard({title, contentText} : cardProps) {
    function handleDownload() : void{
        alert("Clicked Download")
    }
    return (
        <div className = "flex flex-col px-2 py-2 gap-4 border border-solid border-black w-110 h-55">
            <h1>{title}</h1>
            <p>{contentText}</p>
            <div className ="flex flex-row items-center gap-4">
                <p>Download {title} as PDF</p>
                <ArrowDownTrayIcon className = "w-5 h-5" onClick = {handleDownload}/>
            </div>
        </div>
    )
}