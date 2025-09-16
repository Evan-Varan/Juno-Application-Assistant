import QuickStartStep from "./QuickStartStep";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import buildingWebsiteImage from "./assets/building-website.svg"
import searchOnWebImage from "./assets/search-on-web.svg"
import solvingProblemImage from "./assets/solved-the-problem.png"


export default function QuickStartSteps(){
    return(
        <div className="flex flex-row gap-2 w-full h-auto items-center justify-center ">
            <QuickStartStep stepText= "STEP ONE" headerText="Paste Job Description" image={searchOnWebImage}/>
            <IoArrowForwardCircleOutline className="w-7 h-7"/>
            <QuickStartStep stepText= "STEP TWO" headerText="Download " image={solvingProblemImage}/>
            <IoArrowForwardCircleOutline className="w-7 h-7"/>
            <QuickStartStep stepText= "STEP THREE" headerText="Ask Questions" image={buildingWebsiteImage}/>
        </div>
    )
}