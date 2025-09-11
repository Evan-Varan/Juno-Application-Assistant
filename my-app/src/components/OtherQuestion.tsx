import Input from './Input';
import Button from './Button';
import {SparklesIcon} from '@heroicons/react/24/solid'


export default function OtherQuestions(){
    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-4xl flex font-bold text-left text-white">Any other questions on your application?</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></div>
            <p className="italic text-gray-300 text-left">Ask Juno Below</p>
            <div className = "flex flex-row gap-4 ">
                <Input placeholder='Paste An Exact Question...' />
                <Button text = "Answer" Icon ={SparklesIcon}/> 
            </div>
        </div>
    )
}