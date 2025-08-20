import { ReactNode } from "react";

export const Center = ({children}:{children:ReactNode})=>{
    return <div className="flex justify-center items-center">
        {children}
    </div>
}