
type testimonialProps = {
    contentText: string,
    userName: string,
    profilePicture: string,
    role: string,
}

export default function Testimonial({contentText, userName, profilePicture, role} : testimonialProps){
    return(
        <div className = "bg-gray-900 w-60 h-70 px-2 py-4 text-center border-white/10 border-2 relative rounded-2xl flex flex-col text-base items-center">
            <p className="italic text-gray-300">“{contentText}”</p>
            <div className = "flex flex-row items-center absolute bottom-4  rounded-xl gap-4">
                <img 
                    src={profilePicture} 
                    className="w-12 h-12 rounded-full border-1 border-white"
                    />
                <div className = "flex flex-col items-center text-white">
                    <div className = "font-semibold text-l">
                        {userName}
                    </div>
                    <div className = "text-sm font-semibold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                        {role}
                    </div>
                </div>
            </div>
        </div>
        
    )
}