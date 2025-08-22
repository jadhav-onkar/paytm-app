import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { SendMoney } from "../../components/sendMoney";

export default function P2pTransfer(){
    return (
        <div className="w-full">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transfer
            </div>
            <div className="w-full flex justify-center mt-20">
                <div className="w-100">
                    <SendMoney />
                </div>
            </div>
        </div>
    )
}