import Button from "./ButtonPrimative";

type ApplicationTabProps = {
    companyName: string,
    roleName: string,
    companyIcon: React.ComponentType<{ className?: string }>
}

export default function ApplicationTabButton({companyName, roleName, companyIcon: Icon} : ApplicationTabProps){
    return (
            <Button 
            className="text-sm gap-2 px-4 py-2 rounded-2xl bg-bg border-border border text-text hover:scale-105 hover:outline-1 outline-red-400
            shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)]"
            text= {`${companyName} | ${roleName}`}
            Icon={Icon}
            iconPosition="left"
            >
            </Button>
    )
}