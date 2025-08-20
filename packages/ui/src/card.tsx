
import { ReactNode } from "react";

export const Card = ({title, children}:{title:string, children: ReactNode})=>{
    return(
        <div className="border rounded-md border-slate-400 p-4">
            <h1 className="text-xl border-b pb-2">{title}</h1>
            <div>{children}</div>
        </div>
    )
}