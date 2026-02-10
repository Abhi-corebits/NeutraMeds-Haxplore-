import { ChessRookIcon, CropIcon, Crown, EyeIcon, FactoryIcon, Heart, HeartPlus, Leaf, LucideIcon, Milk, MoveRightIcon, PersonStanding, SparkleIcon, TractorIcon, User, Wheat, WholeWordIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"
import { RocketIcon, UserIcon } from "lucide-react";
import StatsCard from "./stats-card";
import About from "./about";
import Header from "./header";
import Footer from "./footer";
import Typinganimation from "./typing-animation";

interface statsprops {
    icon:LucideIcon;
    data:string;
    info:string;
    isMid?:boolean;
}

function HomePage() {

    const stats:statsprops[] = [
        {
            icon: Wheat,
            data: "5K+",
            info: "Farmers Benefited"
        },
        {
            icon: HeartPlus ,
            data: "15K+",
            info: "Animals Health Improved" ,
            isMid: true
        },
        {
            icon: User,
            data: "40K+",
            info: "Farmers Reached"
        }
    ]

    return (
        <main>
            <Header/>
            <div className="flex flex-col text-center justify-center items-center sm:pl-10 sm:pr-10 px-6  w-full space-y-8  bg-red-200/30 bg-cover mb-2">
                <Badge asChild variant={"default"} className="py-1 px-8 mt-5 bg-[#73f146]/10 backdrop-blur-2xl font-sm text-lg">
                    <Link href="/"> 
                        <span className="relative flex size-2 mr-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-red-600"></span>
                        </span>
                        <h1 className="flex text-center text-black items-center gap-1">Join us with the aim towards Growth<ChessRookIcon size={18}/>!!</h1>
                    </Link>
                </Badge>
                <div className="pt-6 text-green-500">
                    <Typinganimation/>
                    <p className="mt-10 text-5xl font-medium font-lgstroke-2 "> We at 
                        <span className="font-extrabold text-green-900"> Occumy  </span> Believes Better nutrition for animals</p>
                    <p className="pt-3 text-2xl font-semibold text-amber-700">Nutrition that improves yield, immunity, and livelihoods</p>
                </div>
                <div className="flex gap-2 sm:gap-18 pt-9 mt-4 ">
                    <Button className="hover:scale-105">
                        <Link href={"/signup"} className="flex gap-1 items-center">
                            <h1 className="flex text-xl font-sm items-center text-center gap-2 mix-blend-screen"><Leaf className="size-4 text-[#81fa78]" />View dashboard</h1>
                        </Link>
                    </Button>
                    <Button className="hover:scale-105">
                        <Link href={"https://share.google/K1BYkHidXigZElAlE"} className="flex gap-1 items-center">
                            <h1 className="flex text-xl font-sm items-center text-center gap-2 text-muted" >Explore Our Community <MoveRightIcon className="size-5 relative inset-y-[0.45px] text-[#81fa78]" /></h1>
                        </Link>
                    </Button>
                </div>

                <section id="statsCard" className="pt-10 pb-10 ">
                    <div className="grid grid-cols-3 items-center divide-x-2 divide-gray-300">
                        {
                            stats.map((obj:statsprops)=> {
                                return (
                                    <div key={obj.info} className="flex items-center justify-center" >
                                        <StatsCard icon={obj.icon} data={obj.data} info={obj.info}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
            <About />
            <Footer/>
        </main>

    )
}

export default HomePage 