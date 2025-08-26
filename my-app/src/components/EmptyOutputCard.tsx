import {FaceFrownIcon} from '@heroicons/react/24/solid'

export default function EmptyOutputCard(){
    return(
        <div className = "flex flex-col border border-dashed border-black w-110 h-55">
            <p>Enter a job to get help!</p>
            <FaceFrownIcon />
        </div>
    )
}