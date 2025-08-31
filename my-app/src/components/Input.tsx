type inputProps = {
    value: string,
    placeholder: string,
    height? :string,
    onChange: (val : string) => void
}

export default function Input({value, placeholder, height = "h-10", onChange} : inputProps) {
    return (
        <div>
            <input type = "text" 
            value = {value}
            onChange = {(e) => onChange(e.target.value)}
            className={`w-80 ${height} px-2 py-2 border border-solid rounded-xl border-gray-500 bg-gray-700 text-white`}
            placeholder ={placeholder}>
            </input>
        </div>
    )
}