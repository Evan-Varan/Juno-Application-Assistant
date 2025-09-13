import Input from "./Input"
import Button from "./Buttons/Button"
import SectionHeading from "./SectionHeading";
import { IoIosSend } from "react-icons/io";
import { Section } from "./Section";

export default function Contact(){
    return(
    <Section className = "gap-16">
        <div className ="flex flex-col gap-4 w-1/2">
            <SectionHeading subheadingText = "REACH OUT" headingText ="CONTACT JUNO TODAY" pageText ="Juno is based in Austin, Texas and available 24/7."/> 
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440952.6293508476!2d-98.0626223129064!3d30.29570088187667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b464bd469d57a!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1756670251641!5m2!1sen!2sus"
                className ="h-full"
            >                
            </iframe>
        </div>
        <div className ="flex flex-col items-center justify-center gap-16 border-white/10 border-2 relative rounded-2xl bg-gray-900 w-1/2">
            <div className ="flex flex-col gap-8">
                <Input placeholder = "Enter your full name"/>
                <Input placeholder = "Enter your email"/>
                <Input placeholder = "Enter your phone number"/>
                <textarea
                placeholder="Type your message..."
                className="w-full h-screen[60vh] px-2 py-2 border border-solid rounded-xl border-gray-500 bg-gray-700 text-white"
                />  
            </div>
            <Button text ="Request info" Icon = {IoIosSend}/>
        </div>
    </Section>
    )
}