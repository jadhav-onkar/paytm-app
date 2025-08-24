import { Balance } from "@repo/ui/balance";
import { getServerSession } from "next-auth";
import { AuthOptions } from "./lib/authProvider";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(AuthOptions)
  if(!session?.user){
    redirect('/api/auth/signin')
  }
  else{
    redirect('/dashboard')
  }

  return (
    <div>
      {JSON.stringify(session.user)}
      <Balance /> 
    </div>
  );
}
