import Input from './Input';
import Button from './Button';
import {SparklesIcon} from '@heroicons/react/24/solid'
import { useState } from 'react';
import Loading from './Loading';


export default function OtherQuestions(){
    const [questionSearch, setQuestionSearch] = useState<string>("");
  const [questionResponse, setQuestionResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit() {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5005/api/otherquestions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userQuestion: questionSearch }),
            });

            if (!res.ok) throw new Error("Failed to fetch response");

            const data = await res.json();
            setQuestionResponse(data.response); // matches your QuestionResult model
        } catch (err) {
            console.error(err);
            setQuestionResponse("Error generating response.");
        } finally {
            setLoading(false)
        }
    }
    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-4xl flex font-bold text-left text-white">Any other questions on your application?</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></div>
            <p className="italic text-gray-300 text-left">Ask Juno Below</p>
            <div className = "flex flex-row gap-4 ">
                <Input placeholder='Paste An Exact Question...' value = {questionSearch} onChange={setQuestionSearch} />
                <Button text = "Answer" Icon ={SparklesIcon} onClick={handleSubmit}/> 
            </div>
            {loading ? <Loading/> : null}
            {questionResponse ? 
                <div className = "bg-gray-900 w-full h-full px-2 py-4 text-center border-white/10 border-2 relative rounded-2xl flex flex-col text-base items-center">
                    <p className="italic text-gray-300">{questionResponse}</p>
                </div>
            : null}
        </div>
    )
}