
import express from 'express'
import { prisma } from '@repo/db/db'

const app = express()

app.get('/',(req,res)=>{
    res.send("hi there")
})

app.post("/hdfcwebhook",async (req, res)=>{
    const paymentInfo: {
        token: string,
        userId: string,
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.id,
        amount: req.body.amount
    }

    if (!paymentInfo.token || !paymentInfo.userId || !paymentInfo.amount){
        res.status(400).json({
            msg:"invalid info send"
        })
    }
    try{
        await prisma.$transaction([
            prisma.balance.update({
                where:{
                    userId: Number(paymentInfo.userId)
                },
                data:{
                    amount:{
                        increment: Number(paymentInfo.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where:{
                    token: paymentInfo.token
                },
                data:{
                    status: "success"
                }
            })
        ]),
        res.status(200).json({
            msg:"captured"
        })
    }
    catch(e){
        console.log(e),
        res.status(404).json({
            msg:"something went wrong"
        })
    }
})


app.listen(3003, ()=>{
    console.log("app is listen on http://localhost:3003")
})