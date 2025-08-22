"use server"

import { getServerSession } from "next-auth"
import { AuthOptions } from "../authProvider"
import { prisma } from "../prisma"

export async function createOnramptxs(amount:number, provider:string) {
    const session = await getServerSession(AuthOptions)
    if(!session.user){
        return {
            msg:"unauthorised user"
        }
    }
    let token = (Math.floor(10000 + Math.random() * 90000)).toString() 
    try{
        const creatOnRamp = await prisma.onRampTransaction.create({
            data:{
                token,
                status:"processing",
                provider,
                userId: Number(session?.user?.id),
                amount: amount * 100,
                starttime: new Date()
            }
        })
        return {
            msg:"done"
        } 
    }
    catch(e){
        return e
    }
}