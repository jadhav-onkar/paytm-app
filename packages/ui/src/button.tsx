"use client"
import { ReactNode } from "react"

interface ButtonProps {
    children: ReactNode;
    onClick: ()=> void;
}

export const Button = ({children, onClick}:ButtonProps)=>{
    return <button onClick={onClick} type="button" className="bg-black text-slate-200 hover:bg-slate-200 hover:text-slate-700 rounded-md py-1 px-3 ">
        {children}
    </button>
}