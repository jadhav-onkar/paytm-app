"use client";
import React from "react"
import { RecoilRoot } from "recoil"
import { SessionProvider } from "next-auth/react";

export function ProvidersWrapper({ children }: {children: React.ReactNode}){
    return <RecoilRoot>
            <SessionProvider>
                {children}
            </SessionProvider>
        </RecoilRoot>
}
