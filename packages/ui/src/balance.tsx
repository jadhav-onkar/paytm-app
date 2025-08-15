"use client"
import { balanceAtom } from "@repo/store/atoms/transfer"
import { useBalance } from "@repo/store/hooks/useTransaction"
import { useSetRecoilState } from "recoil"

export const Balance = ()=>{
    const balance = useBalance()
    const setBalance  = useSetRecoilState(balanceAtom)
    return <div>
        <button onClick={()=>setBalance((c)=>c+1)}>click me</button> <br />
        {balance}
        </div>
}