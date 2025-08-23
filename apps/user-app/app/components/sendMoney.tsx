"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { P2pTransfer } from "../lib/actions/p2ptransfer";

export function SendMoney(){
    const [number, setNumber] = useState("0");
    const [amount, setAmount] = useState("0");
    const [proseccTransaction, setProcessTransaction] = useState(false)
    if(proseccTransaction){
        return (
        <div role="status" className="max-w-sm animate-pulse pt-7">
            <div className="h-8  bg-gray-200  rounded-full dark:bg-gray-700 w-35 mb-4 "></div>
            <div className="h-5 bg-gray-200  rounded-full dark:bg-gray-700 max-w-[100px] mb-2.5"></div>
            <div className="h-10 bg-gray-200  rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-5 bg-gray-200  rounded-full dark:bg-gray-700 max-w-[100px] mb-2.5"></div>
            <div className="h-10 bg-gray-200  rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="flex justify-center">
                <div className="h-7 bg-gray-200  rounded-full dark:bg-gray-700 w-[100px]"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
        )


    }
    return <Card title="Send Money">
                <TextInput placeholder="958965...." lable="Mobile Number" onChange={(value)=>{setNumber(value)}}/>
                <TextInput placeholder="Amount" lable="Amount" onChange={(value)=>{setAmount(value)}}/>
                <div className="mt-3 flex justify-center">
                    <Button onClick={async ()=>{
                        setProcessTransaction(true)
                        await P2pTransfer(number, Number(amount))
                        setProcessTransaction(false)
                        }}>Send</Button>
                </div>
            </Card>
}