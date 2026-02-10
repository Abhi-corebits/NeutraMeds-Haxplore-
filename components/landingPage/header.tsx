import { BotIcon, Sprout } from "lucide-react"
import Link from "next/link"

export default function Header(){
    return (
        <div className="flex justify-between bg-green-950 pt-2 pb-3 text-white items-center text-center">
            <div className="flex text-2xl font-bold px-3 items-center text-center">
                {/* <Image src='/globe.svg' alt="App Image" width={30} height={30} className="-translate-y-[-2px]"/> */}
                <p className="pl-1.5 pt-1.5 font-bold text-3xl text-center items-center flex gap-2"> <Sprout size={40} className="pb-1"/>NeutriMeds</p>
            </div>
            <div className="flex gap-5 pr-4 pt-1 font-medium text-xl mr-2">
                <Link href={"/signup"} className="hover:underline">Sign up</Link>
                <Link href={"/login"} className="hover:underline">Login</Link>
            </div>
        </div>
    )
}