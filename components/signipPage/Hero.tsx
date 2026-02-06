import { Sprout } from "lucide-react";
import SignupForm from "./form";
import Image from "next/image";

export default function SignupPage() {
    return (
        <main className="min-h-screen flex flex-col text-center items-center pt-[4%] bg-radial-[at_50%_0%] from-[#6BBF59] 
            via-[#3E8E41] 
            to-[#1F5F3B]">
            <div className="rounded-sm w-auto h-auto text-white ">
                <div className="flex justify-center pb-15 gap-3 text-white text-center items-center">
                    <Sprout size={80}/>
                    <h1 className="font-extrabold text-6xl">NeutriMeds</h1>
                </div>
                <SignupForm />
            </div>
        </main>
    )
}