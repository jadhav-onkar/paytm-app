
"use server"

import { getServerSession } from "next-auth"
import { AuthOptions } from "../authProvider"
import { prisma } from "../prisma"
import { error } from "console"

export async function P2pTransfer(to:string, amount:number){
    const session = await getServerSession(AuthOptions)
    const from = session.user.id
    if(!from){
        return "unauthorise user"
    }
    const isExist = await prisma.user.findFirst({
        where:{
            number: to
        }
    })
    if(!isExist){
        return "user with phone number not exist"
    }

    const amountCheck = await prisma.balance.findFirst({
                where:{userId: Number(from)},
    })
    if (!amountCheck) {
        throw new Error("BALANCE_NOT_FOUND")
        }

    if (amountCheck.amount < amount * 100) {
        console.log("triggered")
        throw new Error("INSUFFICIENT_FUNDS")
    }
    try{
        await prisma.$transaction(async (tx)=>{
            const deductFrom = await tx.balance.update({
                where:{
                    userId: Number(from)
                },
                data:{
                    amount:{
                        decrement: amount * 100
                    }
                }
            })

            const addTo = await tx.balance.update({
                where: {userId: isExist.id},
                data:{
                    amount:{
                        increment: amount * 100
                    }
                }
            })
        })
        return {msg:"transaction succesfull"}
    }
    catch (e: any) {
        return { msg: "internal server error || transaction failed" }
    }
}