import PasteIcon from "./assets/PasteIcon.png"

type StepProps = {
    headerText: string,
    stepText: string,
    image:string,
}


export default function QuickStartStep({headerText, stepText, image} : StepProps){
    return(
        <div className="flex flex-col px-4 py-4 w-1/5 h-full border-gray-300 border items-start justify-between rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.15),0_0_6px_rgba(255,255,255,0.7)]">
            <div>
                <p className="text-text-muted text-xs text-left"> {stepText}</p>
                <h1 className="text-text text-lg text-left"> {headerText}</h1>
            </div>
            <img src = {image} className="w-2/3 h-auto self-center"></img>
        </div>
    )
}