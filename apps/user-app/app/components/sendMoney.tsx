"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { P2pTransfer } from "../lib/actions/p2ptransfer";

export function SendMoney(){
    const [number, setNumber] = useState("0");
    const [amount, setAmount] = useState("0")
    return <Card title="Send Money">
                <TextInput placeholder="958965...." lable="Mobile Number" onChange={(value)=>{setNumber(value)}}/>
                <TextInput placeholder="Amount" lable="Amount" onChange={(value)=>{setAmount(value)}}/>
                <div className="mt-3 flex justify-center">
                    <Button onClick={()=>{P2pTransfer(number, Number(amount))}}>Send</Button>
                </div>
            </Card>
}