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
            className="
    w-full px-3 py-2 rounded-xl
    bg-gray-800 text-gray-100
    border-2 border-gray-600
    placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-indigo-400
  "
            placeholder ={placeholder}>
            </input>
        </div>
    )
}