import FAQAccordian from "./FAQAccordian";
import BlueFlower from "../assets/blueflower.png"
import SectionHeading from "./SectionHeading";

export default function FAQ(){
    return(
    <div className = "flex flex-row justify-between w-300 py-4 px-4 h-200 bg-items-center text-center relative rounded-2xl">
        <div className ="flex flex-col items-center gap-4 w-150">
           <img 
            src={BlueFlower} 
            className="w-125 h-125"
            /> 
        </div>
        <div className ="flex flex-col w-125 gap-4">
            <SectionHeading subheadingText = "FAQ" headingText ="ASK JUNO" pageText ="Below are some popular questions about Juno."/>
            <FAQAccordian/>
        </div>
    </div>
    )
}