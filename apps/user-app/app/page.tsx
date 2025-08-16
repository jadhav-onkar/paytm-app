"use client"
import { Appbar } from "@repo/ui/appbar";
import { Balance } from "@repo/ui/balance";
import { AuthOptions } from "./lib/authProvider";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession()
  return (
    <div>
      <Appbar user={session.data?.user} onSignin={signIn} onSignout={signOut}/>
      <Balance /> 
    </div>
  );
}
