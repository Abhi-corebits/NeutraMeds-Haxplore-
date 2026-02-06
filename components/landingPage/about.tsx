import { AtomIcon, GemIcon, LucideArrowBigUpDash, Sprout, TvIcon } from "lucide-react";
import Fadein from "../ui/fadein";

export default function About() {
    return (
        <div className="bg-green-950 pb-6 text-white">
            <Fadein>
            <p className="flex text-center content-center justify-center font-bold text-4xl pt-6 gap-2 pb-4 "> <Sprout className="size-10"/>About NeutraMeds </p>
            <div className="text-center font-extralight text-lg space-y-5 pl-20 pr-20 ">
                    <p>NeutraMeds Dashboard is a centralized occupancy and engagement analytics platform built to help organizers:</p>

                    <p>Monitor participation and activity. Understand marketing reach and performance Gain clear insights into overall engagement trends Make faster and better decisions using visual data The dashboard converts raw activity data into clear, readable insights.</p>

                    <p>This website is a learning project created to practice full-stack development and product design. Thanks for the Event Haxplore for providing such opportunity.</p>
            </div>
            </Fadein>
        </div>
    )
}