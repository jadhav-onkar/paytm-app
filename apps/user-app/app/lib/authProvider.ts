
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcrypt"

export const AuthOptions = {
    providers: [
        CredentialsProvider({
            name:"number",
            credentials:{
                number: {label:"number", placeholder:"95875645", type:"text"},
                password: {label:"password", placeholder:"password", type:"password"} 
                },
            async authorize(credentials,req){
                const number = credentials?.number
                const password = credentials?.password || ""
                const hashedPass = await bcrypt.hash(password, 10)
                if(!number || !password){
                    return null
                }
                try{
                    const ExistingUser = await prisma.user.findFirst({
                        where:{
                            number
                        }
                    })
                    
                    if(ExistingUser){
                        const passValidaiton = await bcrypt.compare(password, ExistingUser.password);
                        if(passValidaiton){
                            return {
                                id:ExistingUser.id.toString(),
                                number: ExistingUser.number
                            }
                        }
                        return null;
                    }
                }
                catch(e){
                    console.log(e)
                    return null
                }
                try{
                    const newUser = await prisma.user.create({
                        data:{
                            number,
                            password: hashedPass,
                        }
                    })
                    return {
                        id: newUser.id.toString(),
                        number: newUser.number,
                    }
                }
                catch(e){
                    console.log(e, "error")
                }
                return null
            }
            })
    ],
    secret: process.env.JWT_SECRET || "",
    callbacks:{
            async jwt({token, user}:any){
                if(user){
                    token.id = user.id
                    token.number = user.number
                }
                return token
            },
            async session({token, session}: any){
                session.user.id = token.sub
                session.user.number = token.number
                return session
            }
        }     
}