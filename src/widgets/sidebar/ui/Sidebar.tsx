"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, LayoutDashboard, Briefcase, Video, FileText, Library, Settings } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Employee Hub", href: "/employee-hub", icon: Library },
    { name: "Job Analyzer", href: "/interview-prep", icon: Briefcase },
  ];

  const comingSoon = [
    { name: "Resume Reviewer", icon: FileText },
  ];

  return (
    <div className="flex h-screen w-[256px] flex-col border-r border-gray-200 bg-white">
      <div className="flex h-[64px] items-center px-[24px]">
        <Link href="/" className="flex items-center gap-[8px]">
          <div className="w-[32px] h-[32px] rounded-[8px] bg-primary-purple flex items-center justify-center shadow-sm">
            <Sparkles className="w-[16px] h-[16px] text-white" />
          </div>
          <span className="text-[18px] font-semibold text-gray-900 tracking-tight">Confidant</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-[4px] px-[16px] py-[24px] overflow-y-auto">
        <div className="text-[12px] font-semibold text-gray-500 mb-[16px] px-[8px] uppercase tracking-wider">
          Main Menu
        </div>
        
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-[12px] rounded-[8px] px-[12px] py-[8px] text-[14px] font-medium transition-colors",
                isActive 
                  ? "bg-purple-50 text-purple-700" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "w-[20px] h-[20px]", 
                isActive ? "text-purple-700" : "text-gray-400 group-hover:text-gray-600"
              )} />
              {item.name}
            </Link>
          );
        })}

        <div className="text-[12px] font-semibold text-gray-500 mt-[32px] mb-[16px] px-[8px] uppercase tracking-wider">
          Pro Features
        </div>
        
        {comingSoon.map((item) => (
          <div
            key={item.name}
            className="group flex items-center justify-between rounded-[8px] px-[12px] py-[8px] text-[14px] font-medium text-gray-400 cursor-not-allowed"
          >
            <div className="flex items-center gap-[12px]">
              <item.icon className="w-[20px] h-[20px] text-gray-300" />
              {item.name}
            </div>
            <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-[6px] py-[2px] rounded-full uppercase tracking-wider">
              Soon
            </span>
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-[16px]">
        <Link
          href="#"
          className="flex items-center gap-[12px] rounded-[8px] px-[12px] py-[8px] text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Settings className="w-[20px] h-[20px] text-gray-400" />
          Settings
        </Link>
      </div>
    </div>
  );
}
