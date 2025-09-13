
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: "primary" | "secondary" | "tertiary" | "link";
  size?: "sm" | "md" | "lg" | "link";
};

const variantClasses = {
  primary: "bg-gradient-to-r from-indigo-400 to-sky-400 text-white",
  secondary: "bg-white/10 border border-white text-white",
  tertiary: "bg-transparent border border-indigo-400 text-indigo-300",
  link: " text-md font-normal bg-transparen flex text-purple-300 border-0 p-0"
} as const;

const sizeClasses = {
  sm: "px-3 py-1 text-sm rounded-lg min-w-[3em] h-[1.5em]",
  md: "px-4 py-2 text-base rounded-xl min-w-[5em] h-[2.5em]",
  lg: "px-6 py-3 text-lg rounded-2xl min-w-[7em] h-[3em]",
  link: ""
};

export default function Button({text, Icon, variant = "primary", size = "md", disabled, ...props} : ButtonProps){
    return (
        <>
            <button 
            {...props}
            className={`
                flex justify-center items-center gap-2 font-bold transition hover:scale-105
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            > 
            {Icon && <Icon className="w-[1.5em] h-[1.5em]" />}
            {text}
            </button>
        </> 
    )
}
