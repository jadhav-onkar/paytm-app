import { Button } from "./button";

interface appbarProps {
    user?: {
        name?: String | null
    }
    onSignin: any;
    onSignout: any,
    logoClick: any
}

export function Appbar({user, onSignin, onSignout, logoClick}:appbarProps ){
    return <div className="bg-gray-400 flex justify-between px-15 py-3">
        <div onClick={logoClick} className="text-slate-800 cursor-pointer hover:shadow-2xs hover:shadow-slate-700">PAYTM</div>
        <Button onClick={user ? onSignout : onSignin}>{user ? "Log out" : "Sign in"}</Button>
    </div>
}