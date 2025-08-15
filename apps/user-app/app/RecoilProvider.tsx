"use client";
import React from "react"
import { RecoilRoot } from "recoil"

export function RecoilWrapper({ children }: {children: React.ReactNode}){
    return <RecoilRoot>{children}</RecoilRoot>
}
