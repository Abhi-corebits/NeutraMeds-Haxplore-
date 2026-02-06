"use client"
import { User, Heart, Settings, Share2, Globe, Copy, Eye, MessageSquare, Menu, X, Home, MessageCircleHeart, AlertOctagon, CloudAlert, MessageSquareCode, LucideMessageCircleWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeftNavBar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("automations");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selected , setSelected] = useState("Home")

  

  // User data
  const user = {
    name: "Abhinav Sinha",
    username: "@abhinav_sinha",
    bio: "Automation enthusiast Python developer. Love building tools that save time.",
    website: "abhinav.dev",
    avatar: "👨‍💻",
    socialLinks: {
      twitter: "#",
      github: "#",
      linkedin: "#"
    }
  };

  return (
    <>
      {/* Mobile Menu Button - Shows only on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600/30 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <div className={`
                fixed lg:static
                top-0 left-0 
                h-full lg:h-auto
                w-64 sm:w-72 lg:w-auto
                bg-white lg:bg-transparent
                z-40 lg:z-auto
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                lg:col-span-2
                overflow-y-auto
                shadow-2xl shadow-black/40 border-black border-2 rounded-2xl 
            `}>
        <div className=" rounded-lg p-2 text-sm sm:text-md font-semibold ">
          {/* Mobile Header - Shows only on mobile */}
          <div className="lg:hidden mb-6 pb-4 border-b border-gray-300">
            
          </div>

          {/* Navigation */}
          <div className="space-y-2 2xl:text-lg lg:text-xs ">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-blue-50 hover:text-blue-600  rounded-md transition-colors"
            >
              <Home className="size-5 sm:size-6" />
              <span className="">Home</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-blue-50 hover:text-blue-600  rounded-md transition-colors"
            >
              <LucideMessageCircleWarning className="size-5 sm:size-6" />
              <span className="">Notifications</span>
            </button>
            <button
              onClick={() => router.push('/explore')}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              <Globe className="size-5" />
              <span className="">Explore</span>
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              <Settings className="size-5" />
              <span className="">Settings</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-2 xl:px-8 px-1 sm:gap-3 mt-6 pt-6 border-t border-gray-300 justify-center lg:justify-start">
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
              <Globe className="size-4 sm:size-5" />
            </button>
            <button className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              <Share2 className="size-4 sm:size-5" />
            </button>
            <button className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              <MessageSquare className="size-4 sm:size-5" />
            </button>
          </div>

          {/* Share Profile Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors "
          >
            <Share2 className="size-4" />
            <span>Share Profile</span>
          </button>
        </div>
      </div>
    </>
  );
}