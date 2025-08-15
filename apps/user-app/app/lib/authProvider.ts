
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcrypt"

export const AuthOptions = {
    providers: [
        CredentialsProvider({
            name:"email",
            credentials:{
                email: {label:"email", placeholder:"xyz@gmail.com", type:"text"},
                password: {label:"password", placeholder:"password", type:"password"} 
                },
            async authorize(credentials,req){
                const email = credentials?.email
                const password = credentials?.password || ""
                const hashedPass = await bcrypt.hash(password, 10)
                if(!email || !password){
                    return null
                }

                try{
                    const ExistingUser = await prisma.user.findFirst({
                        where:{
                            email
                        }
                    })
                    
                    if(ExistingUser){
                        const passValidaiton = await bcrypt.compare(password, ExistingUser.password);
                        if(passValidaiton){
                            return {
                                id:ExistingUser.id.toString(),
                                email: ExistingUser.email
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
                            email,
                            password: hashedPass,
                        }
                    })
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
            async session({token, session}: any){
                session.user.id = token.sub
                return session
            }
        }     
}