
"use server"

import { getServerSession } from "next-auth"
import { AuthOptions } from "../authProvider"
import { prisma } from "../prisma"
import { redirect } from "next/navigation"

export async function P2pTransfer(to:string, amount:number){
    const session = await getServerSession(AuthOptions)
    const from = session.user.id
    if(!from){
        redirect("/p2ptransfer")
    }
    const isExist = await prisma.user.findFirst({
        where:{
            number: to
        }
    })
    if(!isExist){
        redirect('/p2ptransfer')
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
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`;
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
            
            const createP2p = await tx.p2pTrancaction.create({
                data:{
                    amount: Number(amount)*100,
                    senderId: Number(from),
                    ReceiverId: isExist.id,
                    date: new Date()
                }
            })
            console.log("reached here")
        })
        return {msg:"transaction succesfull"}
    }
    catch (e: any) {
        throw Error("internal server error || transaction failed")
    }
}