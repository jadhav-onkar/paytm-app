"use client"
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export function ProvidersWrapper({children}:{children: React.ReactNode}){
    return <RecoilRoot>
        <SessionProvider>
            {children}
        </SessionProvider>
    </RecoilRoot>
}