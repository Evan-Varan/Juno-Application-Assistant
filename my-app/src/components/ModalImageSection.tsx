import Input from "./Input"
import Button from "./Buttons/Button"
import SignupModalBackground1 from "../assets/SingupModalBackground1.png"
import Tulips from "../assets/tulips.png"
import Sun from "../assets/sun.jpg"
import Waves from "../assets/waves.jpg"
import City from "../assets/city.jpg"
import Sky from "../assets/sky.jpg"
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Castle from "../assets/castle.jpg"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useState } from "react"

type ModalImageProps = {
    setSignup: (value: boolean) => void;
}



export default function ModalImageSection({setSignup} : ModalImageProps){

    const [activeIndex, setActiveIndex] = useState(0)

    function handleBackButton(){
        console.log("Clicked")
        setSignup(false)
    }

    return(
        <>
            <Swiper
                loop
                autoplay={{ delay: 5000 }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                modules={[Autoplay]}
                className="w-full h-full"
            >
                <SwiperSlide>
                <img src={Castle} alt="Slide 1" className="w-full h-full object-cover rounded-2xl" />
                </SwiperSlide>
                <SwiperSlide>
                <img src={Sky} alt="Slide 2" className="w-full h-full object-cover rounded-2xl" />
                </SwiperSlide>
                <SwiperSlide>
                <img src={City} alt="Slide 3" className="w-full h-full object-cover rounded-2xl" />
                </SwiperSlide>
            </Swiper>
            <div className="absolute inset-0 flex flex-col justify-start items-center text-black z-20 pointer-events-none">
                <div className="flex flex-row justify-between w-full items-center py-4 px-4 pointer-events-auto">
                    <p className = "text-4xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">Juno</p>
                    <Button variant="secondary" text="Back" Icon={FaArrowRightLong} onClick={handleBackButton} />
                </div>
            </div> 
            <div className="absolute inset-0 flex flex-col justify-end items-center text-white py-4 z-10 ">
                <div className="flex flex-col gap-8 py-2 justify-center items-center">
                    <div className= "gap-0 text-center font-bold">
                        <h1 className="text-3xl ">Helping Developers</h1>
                        <h1 className="text-3xl ">Find Dream Jobs</h1>
                    </div>
                    <div className="flex flex-row w-full justify-center gap-4">
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`h-1 w-8 rounded-full transition-all ${
                                activeIndex === i ? "bg-white" : "bg-gray-400/50"
                                }`}
                            />
                            ))}
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}