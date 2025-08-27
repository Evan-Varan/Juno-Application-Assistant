type inputProps = {
    value: string,
    placeholder: string,
    onChange: (val : string) => void
}

export default function Input({value, placeholder, onChange} : inputProps) {
    return (
        <div>
            <input type = "text" 
            value = {value}
            onChange = {(e) => onChange(e.target.value)}
            className = "w-80 h-10 px-2 py-2 border border-solid border-black" 
            placeholder ={placeholder}>
            </input>
        </div>
    )
}