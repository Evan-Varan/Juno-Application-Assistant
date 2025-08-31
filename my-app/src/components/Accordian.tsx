import AccordianItem from "./AccordianItem"

const faqs = [
    {
        question: "What is JunoAI?",
        answer:
        "JunoAI is an intelligent assistant designed to help you work smarter. It can generate content, answer questions, and provide guidance across creative, technical, and business tasks."
    },
    {
        question: "How is JunoAI different from other AI tools?",
        answer:
        "Unlike generic AI tools, JunoAI is designed to adapt to your workflow. It emphasizes clarity, personalization, and a clean interface that helps you focus on getting things done."
    },
    {
        question: "Can I use JunoAI without technical skills?",
        answer:
        "Absolutely. JunoAI is built to be intuitive and accessible for everyone—whether you're a student, creator, or professional—no coding or technical setup required."
    },
    {
        question: "Is my data safe with JunoAI?",
        answer:
        "Yes. Your inputs are handled with strict privacy measures. We don’t sell or misuse your data, and security is a core part of our design."
    },
    {
        question: "What kinds of tasks can JunoAI help with?",
        answer:
        "JunoAI can draft text, summarize information, generate ideas, assist with research, and even help with technical explanations. It’s a versatile partner for work, study, and creativity."
    }
        
    ]


export default function Accordian(){
    return(
        <div className ="flex flex-col gap-4">
            {faqs.map((faq,key) => (
                <AccordianItem key = {key} question={faq.question} answer= {faq.answer} />
            ))}
        </div>
    )
}