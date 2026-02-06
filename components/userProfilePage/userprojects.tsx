"use client"

import { MessageSquareCode } from "lucide-react";
import { useEffect, useState } from "react";
import UserProjectsSkeleton from "./userprojectsskeleton";

export default function UserProjects() {
    const [automations , setAutomations] = useState<any[] | null>(null)

    useEffect(()=>{
        async function hey() {
            try {
                await fetch("http://127.0.0.1:3000/api/userprojects", {next: { revalidate: 120 }})
                    .then(res => res.json())
                    .then(data => setAutomations(data)); 
            } catch (error) {
                console.log(error)
            }
        }
        hey();
    },[])
     
    if (!automations) {
        return <UserProjectsSkeleton />;
    }

  return (
      <div className="w-full px-4 sm:px-6 lg:px-8 ">
        {/* Filter
            <div className="p-3 sm:p-4 border-b flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 whitespace-nowrap">
                          All
                        </button>
                        <button className="px-3 py-1 text-gray-600 rounded-md text-sm hover:bg-gray-100 whitespace-nowrap">
                          Workflows
                        </button>
                        <button className="px-3 py-1 text-gray-600 rounded-md text-sm hover:bg-gray-100 whitespace-nowrap">
                          Scripts
                        </button>
          </div> */}
          <div className="py-4 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 lg:gap-6">
              {automations.map((obj: any) => (
                  <div
                      key={obj.id}
                      className="bg-white p-4 border border-black/30 hover:bg-black/10 hover:scale-[1.02] transition-all duration-200 ease-in-out rounded-lg shadow-sm hover:shadow-lg overflow-hidden"
                  >
                      {/* Image Container */}
                      <div className="relative w-full aspect-video bg-gray-100">
                          <img
                              src={obj.screenshots_url[0]}
                              alt={obj.title}
                              className="w-full h-full object-cover"
                          />
                      </div>

                      {/* Content Container */}
                      <div className="">
                          {/* Title */}
                          <h3 className="font-semibold text-lg sm:text-xl mb-2 line-clamp-2">
                              {obj.project_name}
                          </h3>

                          {/* Description */}
                          <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                              {obj.soln}
                          </p>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mb-4 ">
                              {obj.badges.map((tool: any, index: number) => (
                                  <span
                                      key={index}
                                      className="px-2 py-1 bg-red-600/70 text-white text-xs sm:text-sm rounded-xl whitespace-nowrap"
                                  >
                                      {tool}
                                  </span>
                              ))}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-gray-200">
                              {/* Left Actions */}
                              <div className="flex items-center gap-2 sm:gap-3">
                                  {/* Votes Button */}
                                  <button className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 rounded-2xl text-white bg-black/80 hover:bg-black transition-colors cursor-pointer">
                                      <span className="font-extrabold text-lg sm:text-xl text-green-600">
                                          &#129033;
                                      </span>
                                      <span className="text-sm sm:text-base">{obj.votes}</span>
                                  </button>

                                  {/* Comments Button */}
                                  <button className="cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 rounded-2xl text-white bg-black/80 hover:bg-black transition-colors">
                                      <MessageSquareCode className="size-4 sm:size-5" />
                                      <span className="hidden sm:inline text-sm sm:text-base">Comments</span>
                                      <span className="sm:hidden text-sm">💬</span>
                                  </button>
                              </div>

                              {/* Copy Workflow Button */}
                              <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded hover:bg-blue-700 transition-colors whitespace-nowrap">
                                  Copy Workflow
                              </button>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  )
}