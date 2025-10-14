import Input from "./Input"
import Button from "./Buttons/Button"
import SignupModalBackground1 from "../assets/SingupModalBackground1.png"
import Tulips from "../assets/tulips.png"
import Sun from "../assets/sun.jpg"
import Waves from "../assets/waves.jpg"
import Sky from "../assets/sky.jpg"

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaGithub   } from "react-icons/fa";
import ModalImageSection from "./ModalImageSection"
import Checkbox from "./Checkbox"



type LoginModalProps = {
  setLogin: (value: boolean) => void;
  setSignup: (value: boolean) => void;
};


export default function LoginModal({ setLogin, setSignup }: LoginModalProps){

    function handleForgotPassword(){
        console.log("forgot password")
    }

    function handleSignUp(){
        setLogin(false)
        setSignup(true)
    }

    function handleLogin() : void{
        window.open("http://localhost:5005/api/login", "_blank");
    }
    

    return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"> {/* For backdrop */}
      <div className="flex flex-row gap-12 bg-gray-900 text-white w-full max-w-5xl  h-[70vh] border-white/10 border-2 rounded-2xl px-6 py-6 "> {/* For Actual modal size */}
            <div className="flex flex-col w-1/2 gap-8 items-left justify-center">
                {/*Header */}
                <div className="gap-4 flex flex-col text-left">
                    <h1 className="text-5xl flex font-bold text-white" >Hello,</h1>
                    <h1 className="text-5xl flex font-bold text-white" >Welcome Back</h1>
                    <div className= "flex flex-row">
                        <p className="text-lg text-gray-300" >Welcome back to{" "} {/* space between text and span */}
                        <span className=" font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">Juno</span></p>
                    </div>
                </div>

                {/*Input fields and checkbox */}
                <div className="gap-4 flex flex-col w-full ">
                    <Input placeholder = "Email"/>
                    <Input placeholder = "Enter your password"/>
                    {/* terms and conditions checkbox and p text*/}
                    <div className= "flex flex-row justify-between w-full">
                        <Checkbox/>
                        <Button text= "Forgot Password?" onClick={handleForgotPassword} size = "link" variant ="link" className="flex text-purple-300 " />
                    </div>     
                </div>

                {/*Creat account and register with */}
                <div className="flex flex-col gap-8 text-center w-full">
                        <Button text = "Sign in" onClick={handleLogin}/>
                    <div className = "flex flex-col gap-4">
                        <div className = "flex flex-row gap-4 items-center justify-center w-full">
                            <div className="flex-1 border-1 bg-gray-300"></div>
                            <p className="text-md flex text-gray-300">Or login with</p>
                            <div className="flex-1 border-1 bg-gray-300"></div>
                        </div>
                        
                        <div className="flex flex-row gap-4 w-full justify-center">
                            <Button variant="secondary" text="Google" Icon={FcGoogle} />
                            <Button variant="secondary" text="Github" Icon={FaGithub} />
                        </div>
                    </div>
                        
                </div>
                <div className = "flex gap-2">
                    <p className="text-gray-300" >Don't have an account?</p>
                    <Button text= "Sign up" onClick={handleSignUp} size = "link" variant ="link" className="flex text-purple-300 " />
                </div>
                

            </div>
        {/*Image */}
        <div className="flex relative h-full w-1/2">
            <ModalImageSection setSignup = {setLogin}/>
        </div>
            {/*Right side info */}
            
        </div>
    </div>
    )
}