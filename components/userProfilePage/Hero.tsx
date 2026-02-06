"use client"

import { Suspense, useEffect, useState } from "react";
import LeftNavBar from "./leftbar";
import Profile from "./profile";
import Options from "./optionsBlock";
import SkeletonProfile from "./profileSkeleton";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("myautomations");
  
  // const userInfo = await getUser()
  // const email = userInfo.email

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Main Container */}
      <div className="max-w-screen mx-auto px-2 sm:px-4 lg:px-6 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2">
            <LeftNavBar 
            />
          </div>

          {/* Mobile Menu - Shows only on mobile */}
          <div className="lg:hidden">
            <LeftNavBar />
          </div>

          {/* Main Content - Full width on mobile, 10 cols on desktop */}
          <div className="col-span-1 lg:col-span-10 w-full">
            {/* Profile Header */}
            <Suspense fallback={<SkeletonProfile/>}>
              <Profile />
            </Suspense>

            {/* Tabs */}
            <div className="bg-white rounded-lg mb-6 shadow-sm shadow-black/50 overflow-hidden">
              <div className="flex border-b border-black/30 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab("myautomations")}
                  className={`px-4 sm:px-6 py-3 font-medium whitespace-nowrap ${activeTab === "myautomations" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                >
                  My Automations
                </button>
                <button
                  onClick = {() => setActiveTab("likedautomations")}
                  className={`px-4 sm:px-6 py-3 font-medium whitespace-nowrap ${activeTab === "likedautomations" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                >
                  Liked Automations
                </button>
                <button
                  onClick={() => setActiveTab("addproject")}
                  className={`px-4 sm:px-6 py-3 font-medium whitespace-nowrap ${activeTab === "addproject" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                >
                  Add Project
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-4 sm:px-6 py-3 font-medium whitespace-nowrap ${activeTab === "settings" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                >
                  Settings
                </button>
              </div>
              <Options id={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;