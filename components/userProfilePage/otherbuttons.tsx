'use client'

import { ArrowRightCircle, Globe, PlusCircle } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";

export default function Otherbutton() {
    const [dropdown, setDropdown] = useState(false)

    function HandelYourProjects(){
        return window.location.href='/projects'
    }

    return (
        <main className="bg-[#e9e9e9]">
            
            {/* Floating Action Cards Section */}
            <div className="relative max-w-[1200px] mx-auto px-6 py-10 ">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-3">Take the next step</h2>
                    <p className="text-gray-600 text-lg">Feeling confused? Check out others projects on explore</p>
                </div>

                <div className="relative flex flex-col md:flex-row justify-center items-center gap-8">
                    {/* Left Card - Your Projects */}
                    <div onClick={HandelYourProjects} className="group w-full md:w-64 bg-white border-4 border-black rounded-2xl p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-8px] transition-all duration-300 cursor-pointer">
                        <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 border-3 border-black mx-auto group-hover:scale-125 transition-transform duration-300">
                            <ArrowRightCircle className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-center mb-2">Your Projects</h3>
                        <p className="text-sm text-gray-600 text-center">Manage active work</p>
                    </div>

                    {/* Center Card - Create New (Featured) */}
                    <div
                        onClick={() => setDropdown(!dropdown)}
                        className="group w-full md:w-80 bg-gradient-to-br from-green-500 to-green-600 border-4 border-black rounded-2xl p-8 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-12px] transition-all duration-300 cursor-pointer relative"
                    >
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full border-3 border-black font-bold text-sm">
                            RECOMMENDED
                        </div>

                        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 border-3 border-black mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                            <PlusCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-center mb-2 text-white">Create New Project</h3>
                        <p className="text-sm text-white/90 text-center">Start building today</p>
                    </div>

                    {/* Right Card - Explore */}
                    <div className="group w-full md:w-64 bg-white border-4 border-black rounded-2xl p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-8px] transition-all duration-300 cursor-pointer">
                        <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 border-3 border-black mx-auto group-hover:scale-125 transition-transform duration-300">
                            <Globe className="w-7 h-7 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-center mb-2">Explore</h3>
                        <p className="text-sm text-gray-600 text-center">Discover projects</p>
                    </div>
                </div>
            </div>

        </main>
    )
}