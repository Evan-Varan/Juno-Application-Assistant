import {ArrowDownTrayIcon} from '@heroicons/react/24/solid'
import Button from './Button'
type cardProps = {
    title : string,
    contentText: string
}
export default function OutputCard({title, contentText} : cardProps) {
    function handleDownload() : void{
        alert("Clicked Download")
    }
    return (
        <div className = "flex flex-col px-2 py-2 gap-4 rounded-2xl border-solid border-white/10 border-2  bg-gray-900 w-80 h-40">
            <h1 className = "font-bold text-l text-white">{title}</h1>
            <p className= "text-gray-300">{contentText}</p>
            <div className ="flex flex-row items-center gap-4">
                <Button text= "Download" Icon = {ArrowDownTrayIcon}onClick = {handleDownload}/>
                {/*Simple Image to the right */}
            </div>
        </div>
    )
}