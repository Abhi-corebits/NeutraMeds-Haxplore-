"use client";

import { useEffect, useState } from "react";
import { Globe, Github, Linkedin, GlobeIcon, LinkedinIcon, GithubIcon } from "lucide-react";
import {VerifyToken } from "@/lib/verify";

type User = {
    name: string;
    socials: string[];
    bio:string;
};

export default function Profile() {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data only once when component mounts
        const fetchUserData = async () => {
            try {
                // Replace this with your actual API endpoint
                const response = await fetch('/api/auth/token');
                const data = await response.json();
                console.log(data.token)
                const userInfo = await fetch('/api/auth/token', {
                    method:"POST",
                    body:JSON.stringify({"token":data.token})
                }).then((res)=>res.json()) as User;

                setUserData(userInfo);
                console.log("Completed")
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); 
    
    const user = {
        name: userData?.name ,
        username: userData?.username ,
        bio: userData?.bio ,
        avatar: userData?.avatar || "👨‍💻",
        socialLinks: userData?.socials
    };

    // const getIcon = (iconName: string) => {
    //     switch (iconName) {
    //         case "Globe":
    //             return <Globe className="size-4 sm:size-5" />;
    //         case "Github":
    //             return <Github className="size-4 sm:size-5" />;
    //         case "Linkedin":
    //             return <Linkedin className="size-4 sm:size-5" />;
    //         default:
    //             return null;
    //     }
    // };

    if (loading) {
        // Loading skeleton
        return (
            <div className="rounded-lg p-4 sm:p-6 mb-2 bg-white shadow-black/30 shadow-2xl animate-pulse">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 w-full">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                        <div className="flex gap-3">
                            <div className="h-10 bg-gray-200 rounded w-24"></div>
                            <div className="h-10 bg-gray-200 rounded w-24"></div>
                            <div className="h-10 bg-gray-200 rounded w-24"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg p-4 sm:p-6 mb-2 bg-white shadow-black/30 shadow-sm ">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Avatar */}
                <div
                    className="text-5xl sm:text-6xl bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center flex-shrink-0"
                    style={{ fontSize: '3rem' }}
                >
                    {user.avatar}
                </div>

                {/* User Info */}
                <div className="flex-1 w-full min-w-0">
                    {/* Name */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-1 break-words">
                        {user.name}
                    </h1>

                    {/* Username */}
                    <p className="text-sm sm:text-base text-gray-500 mb-3">
                        {user.username}
                    </p>

                    {/* Bio */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 break-words">
                        {user.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        {user.socialLinks.map((link: any, index: number) => (
                            <a
                                key={index}
                                href={link.startsWith('http') ? link : `https://${link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                            >
                                {
                                    index==0 &&
                                    <span className="group-hover:scale-110 transition-transform">
                                        <Globe className="size-4 sm:size-5" />
                                    </span>
                                }
                                {
                                    index == 1 &&
                                    <span className="group-hover:scale-110 transition-transform">
                                        <LinkedinIcon className="size-4 sm:size-5" />
                                    </span>
                                }
                                {
                                    index == 2 &&
                                    <span className="group-hover:scale-110 transition-transform">
                                        <GithubIcon className="size-4 sm:size-5" />
                                    </span>
                                }

                                <span className="hover:underline truncate max-w-[150px] sm:max-w-none">
                                    {link}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}