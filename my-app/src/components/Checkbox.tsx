export default function Checkbox(){
    return(
        <label className="relative flex items-center justify-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="
                peer h-5 w-5 appearance-none
                rounded-md border border-gray-600
                bg-gray-800
                checked:bg-indigo-500
                focus:ring-2 focus:ring-indigo-400
                "
            />
            <svg
                className="absolute left-0 top-0 h-5 w-5 hidden peer-checked:block text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
            >
                <path d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-200">Remember me</span>
        </label>
    )
}