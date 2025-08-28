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
        <div className = "flex flex-col px-2 py-2 gap-4 border rounded-xl border-solid border-gray-500 bg-white w-80 h-40">
            <h1 className = "font-bold ">{title}</h1>
            <p>{contentText}</p>
            <div className ="flex flex-row items-center gap-4">
                <Button text= "Download" Icon = {ArrowDownTrayIcon}onClick = {handleDownload}/>
                {/*Simple Image to the right */}
            </div>
        </div>
    )
}