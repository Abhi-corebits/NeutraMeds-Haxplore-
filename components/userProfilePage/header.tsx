import Image from "next/image"
import Link from "next/link"

export default function Header(){
    return (
        <div className="flex justify-between bg-gray-950 pt-3 pb-3 text-white ">
            <div className="flex text-2xl font-bold px-5">
                <Image src='/globe.svg' alt="App Image" width={20} height={20} />
                <p className="pl-1.5">iBuiltThis</p>
            </div>
            <div className="flex gap-5 pr-4 pt-1 font-medium">
                <Link href={"/signup"} className="hover:underline">Sign up</Link>
                <Link href={"/login"} className="hover:underline">Login</Link>
            </div>
        </div>
    )
}