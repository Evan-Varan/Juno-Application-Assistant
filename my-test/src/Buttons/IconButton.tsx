import Button from "./ButtonPrimative";

type IconButtonProps = {
    Icon: React.ComponentType<{ className?: string }> | string,
    onClick?: () => void,
}

export default function IconButton({Icon, onClick} : IconButtonProps){
    return(
        <Button Icon={Icon} iconPosition="left" className= "w-5 h-5 scale-125" onClick={onClick}/>
    )
}