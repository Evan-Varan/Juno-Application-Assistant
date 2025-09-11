import LoadingSpinner from "./LoadingSpinner"

export default function Loading(){
    return(
        <div className ="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl flex font-bold text-left text-white">Juno is building your request...</h1>
            <LoadingSpinner/>
        </div>
    )
}