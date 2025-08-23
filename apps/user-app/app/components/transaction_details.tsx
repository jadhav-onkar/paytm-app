import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../lib/authProvider"

export const TransactionInfo =async ({transaction}:{
    transaction:{
        id:number,
        amount:number,
        senderId: number,
        ReceiverId: number,
        date: Date
    }[]
})=>{
    const session =await getServerSession(AuthOptions)
    return(
        <Card title="Recent Transactions">
                <div className="pt-2">
                    {transaction.map(e =>(
                        <div className="flex justify-between">
                            <div>
                                <div className="text-sm">
                                    {Number(session.user.id) === e.ReceiverId ? "Received INR" : "Send INR"} 
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {e.date.toDateString()}
                                </div>
                            </div>
                            <div className={`flex flex-col justify-center ${Number(session.user.id) === e.ReceiverId ? "text-green-600" : "text-red-500"}`}>
                                {Number(session.user.id) === e.ReceiverId ? "+" : "-"} Rs {e.amount / 100}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
    )
}