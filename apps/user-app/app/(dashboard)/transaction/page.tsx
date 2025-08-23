import { getServerSession } from "next-auth";
import { TransactionInfo } from "../../components/transaction_details";
import { AuthOptions } from "../../lib/authProvider";
import { prisma } from "../../lib/prisma";

async function info(){
        const session = await getServerSession(AuthOptions)
        const info = await prisma.p2pTrancaction.findMany({
            where:{
                OR:[
                    {ReceiverId: Number(session.user.id)},
                    {senderId: Number(session.user.id)}
                ]
            },
            select:{
                amount: true,
                senderId: true,
                ReceiverId:true,
                id: true,
                date:true
            }
        })
        console.log(info)
        return info
}


export default async function(){
    const transaction =await info()
    console.log(transaction)
    return (
        <div className="w-full">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transfer
            </div>
                <div className="w-100">
                    <TransactionInfo transaction={transaction}/>
                </div>
        </div>
    )
}