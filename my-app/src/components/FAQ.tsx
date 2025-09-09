import FAQAccordian from "./FAQAccordian";
import BlueFlower from "../assets/blueflower.png"
import SectionHeading from "./SectionHeading";
import { Section } from "./Section";

export default function FAQ(){
    return(
    <Section className="items-center">
        <div className ="flex flex-col items-center gap-4 w-1/2">
           <img 
            src={BlueFlower} 
            className="w-3/4 h-auto object-contain"
            /> 
        </div>
        <div className ="flex flex-col w-1/2 gap-4">
            <SectionHeading subheadingText = "FAQ" headingText ="ASK JUNO" pageText ="Below are some popular questions about Juno."/>
            <FAQAccordian/>
        </div>
    </Section>
    )
}