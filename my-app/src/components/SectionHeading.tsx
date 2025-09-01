type headingProps = {
    subheadingText: string,
    headingText: string,
    pageText: string
}

export default function SectionHeading({subheadingText,headingText,pageText} : headingProps){
    return(
        <>
            <h1 className="text-xl flex font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">{subheadingText}</h1>
            <h1 className="text-5xl flex font-bold text-white ">{headingText}</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400"></div>
            <p className="italic text-gray-300 text-left">{pageText}</p>
        </>
    )
}