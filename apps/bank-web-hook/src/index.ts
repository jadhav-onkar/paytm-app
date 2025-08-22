
import express from 'express'
import { prisma } from '@repo/db/db'

const app = express()

app.use(express.json())
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
        res.status(404).json({
            msg:"invalid info send"
        })
    }
    try{
        await prisma.$transaction(async(tx)=>{
            const isBalance = await tx.balance.findFirst({
                where:{
                    userId: Number(paymentInfo.userId)
                }
            })
            console.log(isBalance)
            if(!isBalance){
                await tx.balance.create({
                    data:{
                        userId: Number(paymentInfo.userId),
                        amount: Number(paymentInfo.amount),
                        locked: 0
                    }
                })
            }
            else{
                const updateBalance = await tx.balance.update({
                    where:{
                        userId: Number(paymentInfo.userId)
                    },
                    data:{
                        amount:{
                            increment: Number(paymentInfo.amount)
                        }
                    }
                },)
            }

            await tx.onRampTransaction.update({
                where:{
                    token: paymentInfo.token
                },
                data:{
                    status: "success"
                }
            })
        },{
            timeout: 10000
        })
        ,
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