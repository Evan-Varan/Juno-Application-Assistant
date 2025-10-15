import Input from "./Input"
import Button from "./Buttons/Button"
import { FcGoogle } from "react-icons/fc";
import { FaGithub   } from "react-icons/fa";
import ModalImageSection from "./ModalImageSection"
import { useRef, useState } from 'react' 



type SignupModalProps = {
  setSignup: (value: boolean) => void;
  setLogin: (value: boolean) => void;
};


export default function SignupModal({ setSignup, setLogin }: SignupModalProps){

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleLogin(){
        setSignup(false)
        setLogin(true)
    }

    let signupViewModel = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password
    };

    let abortController = useRef<(AbortController | null)>(null) //Global reference to abortcontroller
    
    async function handleSignup() {
        abortController.current = new AbortController();
        console.log("calling /api/signup with", signupViewModel);

        try {
            await fetch("http://localhost:5005/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupViewModel),
                signal: abortController.current.signal
            });
        } catch (e: any) {
            if (e.name === "AbortError") {
            console.log("user canceled request");
            } else {
            console.error("request failed", e);
            }
        }
    }




    return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"> {/* For backdrop */}
      <div className="flex flex-row gap-12 bg-gray-900 text-white w-full max-w-5xl  h-[75vh] border-white/10 border-2 rounded-2xl px-6 py-6 "> {/* For Actual modal size */}

            {/*Right side info */}
            <div className="flex flex-col w-1/2 gap-8 items-left justify-center">
                {/*Header */}
                <div className="gap-4 flex flex-col text-left">
                    <h1 className="text-5xl flex font-bold text-white" >Welcome,</h1>
                    <h1 className="text-5xl flex font-bold text-white" >Create an account</h1>
                    <div className= "flex flex-row gap-2">
                        <p className="text-lg flex text-gray-300" >Already have an account? </p>
                        <Button text= "Log in" onClick={handleLogin} size = "link" variant ="link" className="flex text-purple-300 " />
                    </div>
                </div>

                {/*Input fields and checkbox */}
                <div className="gap-4 flex flex-col w-full ">
                    <div className="flex flex-row gap-4">
                        <div className="w-1/2">
                            <Input value = {firstName} onChange={(val) => setFirstName(val)} placeholder="First Name" />
                        </div>
                        <div className="w-1/2">
                            <Input placeholder="Last Name" onChange={(val) => setLastName(val)}/>
                        </div>
                    </div>
                    <Input placeholder = "Email" onChange={(val) => setEmail(val)}/>
                    <Input placeholder = "Enter your password" onChange={(val) => setPassword(val)}/>
                    {/* terms and conditions checkbox and p text*/}     
                </div>

                {/*Creat account and register with */}
                <div className="flex flex-col gap-8 text-center w-full">
                        <Button text = "Create Account" onClick={handleSignup}/>

                        <div className = "flex flex-row gap-4 items-center justify-center w-full">
                            <div className="flex-1 border-1 bg-gray-300"></div> {/* flex-1 says take all avaliable space while sharing all avaliable space wioth siblings */}
                            <p className="text-md flex text-gray-300">Or register with</p>
                            <div className="flex-1 border-1 bg-gray-300"></div>
                        </div>
                        
                        <div className="flex flex-row gap-4 w-full justify-center">
                            <Button variant="secondary" text="Google" Icon={FcGoogle} />
                            <Button variant="secondary" text="Github" Icon={FaGithub} />
                        </div>
                </div>
                
            </div>
            {/*Image */}
        <div className="flex relative h-full w-1/2">
            <ModalImageSection setSignup = {setSignup}/>
        </div>
        </div>
    </div>
    )
}