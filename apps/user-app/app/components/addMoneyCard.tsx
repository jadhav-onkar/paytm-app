"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import { createOnramptxs } from "../lib/actions/createonRamptxs"

const supportedBank = [
    { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com"},
    { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/"}
]

export const AddmoneyCard = ()=>{
    const [redirectUrl, setRedirectUrl] = useState(supportedBank[0]?.redirectUrl)
    const [amount, setAmount] = useState(0)
    const [provider, setProvider] = useState(supportedBank[0]?.name || '')
    return <Card title="ADD MONEY">
        <div className="w-full">
            <TextInput placeholder="Amount" lable="Amount" onChange={(value)=>setAmount(Number(value))}/>
            <div className="py-4 text-left">
            Bank
            </div>  
            <Select 
                options={supportedBank.map(item => ({
                    key:item.name,
                    value:item.name
                }))}
                onSelect={(value)=>{
                    setRedirectUrl(supportedBank.find(x => x.name === value)?.redirectUrl || "")
                    setProvider(supportedBank.find(x => x.name === value)?.name || "")
            }}/> 
            <div className="mt-3 flex justify-center">
                <Button onClick={()=>{window.location.href = redirectUrl || ""
                    createOnramptxs(amount, provider)
                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}