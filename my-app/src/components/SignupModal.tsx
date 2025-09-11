import Input from "./Input"
import Button from "./MotionButton"
import SignupModalBackground1 from "../assets/SingupModalBackground1.png"
import Tulips from "../assets/tulips.png"
import Sun from "../assets/sun.jpg"
import Waves from "../assets/waves.jpg"
import Sky from "../assets/sky.jpg"
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import ModalImageSection from "./ModalImageSection"



type SignupModalProps = {
  setSignup: (value: boolean) => void;
};

export default function SignupModal({ setSignup }: SignupModalProps){
    return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"> {/* For backdrop */}
      <div className="flex flex-row gap-6 bg-gray-900 text-white w-full max-w-5xl  h-[70vh] border-white/10 border-2 rounded-2xl px-6 py-6 "> {/* For Actual modal size */}

        {/*Image */}
        <div className="flex relative h-full w-1/2">
            <ModalImageSection setSignup = {setSignup}/>
        </div>
            {/*Right side info */}
            <div className="flex flex-col w-1/2 gap-8 items-center justify-center">
                {/*Header */}
                <div className="gap-4 flex flex-col text-left">
                    <h1 className="text-5xl flex font-bold text-white" >Create an account</h1>
                    <div className= "flex flex-row gap-2">
                        <p className="text-lg flex text-gray-300" >Already have an account? </p>
                        <p className="text-lg flex text-purple-300 underline">Log in</p>
                    </div>
                </div>

                {/*Input fields and checkbox */}
                <div className="gap-4 flex flex-col w-full ">
                    <div className="flex flex-row gap-4">
                        <div className="w-1/2">
                            <Input placeholder="First Name" />
                        </div>
                        <div className="w-1/2">
                            <Input placeholder="Last Name" />
                        </div>
                    </div>
                    <Input placeholder = "Email"/>
                    <Input placeholder = "Enter your password"/>
                    {/* terms and conditions checkbox and p text*/}     
                </div>

                {/*Creat account and register with */}
                <div className="flex flex-col gap-8 text-center w-full">
                        <Button text = "Create Account"/>

                        <div className = "flex flex-row gap-4 items-center justify-center w-full">
                            <div className="w-1/3 border-1 bg-gray-300"></div>
                            <p className="text-md flex text-gray-300">Or register with</p>
                            <div className="w-1/3 border-1 bg-gray-300"></div>
                        </div>
                        
                        <div className="flex flex-row gap-4 w-full justify-center">
                            <Button variant="secondary" text="Google" Icon={FaGoogle} />
                            <Button variant="secondary" text="Apple" Icon={FaApple} />
                        </div>
                </div>

            </div>
        </div>
    </div>
    )
}