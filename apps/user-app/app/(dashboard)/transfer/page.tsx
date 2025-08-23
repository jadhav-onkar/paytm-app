import { AuthOptions } from "../../lib/authProvider"
import { prisma } from "../../lib/prisma"
import { AddmoneyCard } from "../../components/addMoneyCard"
import { BalanceCard } from "../../components/balanceCard"
import { OnRampTransaction } from "../../components/onRampTransaction"
import { getServerSession } from "next-auth"

async function fetchBalance(){
    const session = await getServerSession(AuthOptions)
    try{
        const balance = await prisma.balance.findFirst({
            where:{
                userId: Number(session?.user?.id)
            }
        }) 
        return {
            amount: balance?.amount || 0,
            locked: balance?.locked || 0
        }
    }
    catch(e){
        console.log("error occured")
    }
}

async function getOnRampTransaction(){
    const session = await getServerSession(AuthOptions)
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.starttime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function(){
    const balance = await fetchBalance() || {amount:0, locked: 0}
    const transactions = await getOnRampTransaction()
    return(
     <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddmoneyCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransaction transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
    )
}