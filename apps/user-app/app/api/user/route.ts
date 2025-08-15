import { PrismaClient } from "@repo/db/db";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient()
export async function POST(req:NextRequest){
    try{
        const user = await client.user.create({
            data:{
                email:"gesh@gmail.com",
                password:"gash@0230"
            }
        })
        return NextResponse.json({msg:"user created succesfully",user})
    }
    catch(e){
        return NextResponse.json({
            msg:"error",
            e
        })
    }
}