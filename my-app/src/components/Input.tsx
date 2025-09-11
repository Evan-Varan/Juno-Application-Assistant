type inputProps = {
    value?: string,
    placeholder: string,
    onChange?: (val : string) => void
}

export default function Input({value, placeholder, onChange} : inputProps) {
    return (
        <div>
            <input type = "text" 
            value = {value}
            onChange = {(e) => onChange?.(e.target.value)}
            className="w-full h-full px-2 py-2 border border-solid rounded-xl border-gray-500 bg-gray-700 text-white"
            placeholder ={placeholder}>
            </input>
        </div>
    )
}