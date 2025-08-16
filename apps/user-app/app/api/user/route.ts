import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../../lib/authProvider";


export async function GET(){
    const session = await getServerSession(AuthOptions) || ""
    console.log(session.user)
    if(session.user){
        return NextResponse.json({
            user:session.user
        })
    }
    return NextResponse.json({
        msg:"you are not logged in"
    },{
        status:403
    })
}


