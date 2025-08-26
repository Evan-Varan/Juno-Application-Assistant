import { useState } from 'react'
import './App.css'
import OutputCard from './components/OutputCard'
import EmptyOutputCard from './components/EmptyOutputCard'
import Button from './components/Button'
import Input from './components/Input'



function verifyURL(search: string) : boolean{
  const regexPattern = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(:[0-9]+)?(\/\S*)?$/i
  return regexPattern.test(search)
}

export default function App() {
  function searchHandler(){
    if (verifyURL(search)) {
      setShowOutput(true)
      setSearch("")
    } else {
      alert("Invalid URL ❌")
      setSearch("")
      setShowOutput(false)
    }
  }


  const [search, setSearch] = useState<string>("");
  const [showOutput, setShowOutput] = useState<boolean>(false)
  return (
    <div className=" flex gap-4 items-center justify-center flex-col min-h-screen bg-gray-50 border-dashed">
      <h1 className="text-3xl flex font-bold underline ">Job Helper</h1>
      <div className="flex flex-col gap-8">
        <div className = "flex flex-row gap-4">
          <Input value = {search} onChange = {setSearch}/>
          <Button onClick = {searchHandler}/>
        </div>
        {showOutput ?
          <>
            <OutputCard title = "Resume" contentText = "Your optimized resume based on the link above."/>
            <OutputCard title = "Cover Letter" contentText = "Your optimized Cover Letter based on the link above."/>
          </> 
         : 
          <EmptyOutputCard />
        }
      </div>
    </div>
  );
}


