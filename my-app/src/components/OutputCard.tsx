import {ArrowDownTrayIcon} from '@heroicons/react/24/solid'
import Button from './Buttons/Button'
import pdfblue from '../assets/pdfblue.png'
import pdfgrey from '../assets/pdfgrey.png'

type cardProps = {
    title : string,
    contentText: string
    downloadType: string
}

export default function OutputCard({title, contentText, downloadType} : cardProps) {
    function handleDownload() : void{
        window.open(`http://localhost:5005/api/download${downloadType}`, "_blank");
    }
    return (
        <div className = "flex flex-row rounded-2xl border-solid border-white/10 border-2  bg-gray-900 w-80 h-40">
            <div className = "flex flex-col text-left px-2 py-2 justify-between ">
                <div className ="gap-2">
                    <h1 className = "font-bold text-xl text-white">{title}</h1>
                    <p className= "italic text-gray-300">{contentText}</p>
                </div>
                
                <div className ="flex flex-row items-center gap-4">
                    <Button text= "Download" Icon = {ArrowDownTrayIcon}onClick = {handleDownload}/>
                </div>
            </div>
            <div className = "flex relative items-center w-32 h-32">
                <img 
                    src={pdfblue} 
                    className="w-12 h-18 absolute ransform -rotate-6 left-2 top-10 z-20"
                    />
                <img 
                    src={pdfgrey} 
                    className="w-12 h-18 absolute transform rotate-6 left-6 top-10 z-10"
                    />
            </div>
        </div>
    )
}