"use client"
import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/transfer";


export function useBalance(){
    const balance = useRecoilValue(balanceAtom)
    return balance
}