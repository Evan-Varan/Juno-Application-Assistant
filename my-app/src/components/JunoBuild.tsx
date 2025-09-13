export default function JunoBuild(){
    return(
        <div className = "flex flex-col gap-4 border border-red-500 h-screen">
            <div className="flex flex-row gap-4 px-4 py-4 items-left w-full h-1/12 ">
                <button className = "border rounded-2xl">Application 1</button>
                <button className = "border rounded-2xl">Application 2</button>
                <button className = "border rounded-2xl">Application 3</button>
                <button className = "border rounded-2xl">Application 4</button>
                <button className = "border rounded-2xl w-1/12">+</button>
            </div>
            <div className="flex flex-row gap-4 items-left w-full h-11/12 ">
                <div className="flex flex-col px-4 py-4 gap-4 w-1/6 border rounded-2xl">
                    <button className = "border rounded-2xl text-left px-2">Item 1</button>
                    <button className = "border rounded-2xl text-left px-2">Item 2</button>
                    <button className = "border rounded-2xl text-left px-2">Item 3</button>
                    <button className = "border rounded-2xl text-left px-2">Item 4</button>
                </div>
                <div className="flex flex-col gap-4 w-5/6 items-center justify-end py-12 border-indigo-500 border rounded-2xl">
                    <h1>Good morning how can i help you?</h1>
                    <div className="flex-flex col items-left border border-black w-3/4 h-1/3 text-left">
                        <input placeholder="How Can I help you?"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}