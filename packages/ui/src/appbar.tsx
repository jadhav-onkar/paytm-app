import { Button } from "./button";

interface appbarProps {
    user?: {
        name?: String | null
    }
    onSignin: any;
    onSignout: any
}

export function Appbar({user, onSignin, onSignout}:appbarProps ){
    return <div className="bg-gray-400 flex justify-between">
        <div>Paytm</div>
        <Button onClick={user ? onSignout : onSignin}>{user ? "log out" : "sign in"}</Button>
    </div>
}