"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowRight, Video, FileText, Activity } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";

export function DashboardHome() {
  const activeFeatures = [
    {
      title: "Job Analyzer",
      description: "Paste a JD to get tailored questions and model answers.",
      icon: Briefcase,
      href: "/interview-prep",
      status: "active",
      buttonText: "Start Prep",
    },
    {
      title: "Mock Interviews",
      description: "Practice your answers on camera with AI feedback on tone and pacing.",
      icon: Video,
      href: "/interview-prep",
      status: "active",
      buttonText: "Start Video Mock",
    }
  ];

  const upcomingFeatures = [
    {
      title: "Resume Reviewer",
      description: "Score your resume against any job description instantly.",
      icon: FileText,
      status: "soon",
    },
  ];

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <header className="mb-[32px]">
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight">Welcome back, User</h1>
        <p className="text-[14px] text-gray-500 mt-[8px]">Here's an overview of your interview preparation.</p>
      </header>

      {/* Stats overview (placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-[48px]">
        {[
          { label: "Interviews Prepped", value: "3", change: "+1 this week" },
          { label: "Average Confidence", value: "78%", change: "+5% this week" },
          { label: "Questions Practiced", value: "24", change: "12 needs review" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-[24px] rounded-[12px] border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-[8px] mb-[16px]">
              <Activity className="w-[16px] h-[16px] text-gray-400" />
              <span className="text-[14px] font-medium text-gray-700">{stat.label}</span>
            </div>
            <div className="text-[30px] font-semibold text-gray-900 mb-[4px]">{stat.value}</div>
            <div className="text-[12px] text-gray-500">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="mb-[32px]">
        <h2 className="text-[18px] font-semibold text-gray-900 mb-[16px]">Active Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {activeFeatures.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-[24px] rounded-[12px] border border-gray-200 shadow-sm flex flex-col items-start"
            >
              <div className="w-[40px] h-[40px] rounded-[8px] bg-purple-50 text-purple-700 flex items-center justify-center mb-[16px]">
                <feature.icon className="w-[20px] h-[20px]" />
              </div>
              <h3 className="text-[16px] font-semibold text-gray-900 mb-[8px]">{feature.title}</h3>
              <p className="text-[14px] text-gray-500 mb-[24px] flex-1">{feature.description}</p>
              <Link href={feature.href} className="w-full">
                <Button variant="primary" className="w-full group">
                  {feature.buttonText} <ArrowRight className="w-[16px] h-[16px] ml-[8px] group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-[18px] font-semibold text-gray-900 mb-[16px]">Coming Soon to Confidant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {upcomingFeatures.map((feature, i) => (
            <div 
              key={i}
              className="bg-gray-50 p-[24px] rounded-[12px] border border-gray-200 shadow-xs opacity-70"
            >
              <div className="flex items-center justify-between mb-[16px]">
                <div className="w-[40px] h-[40px] rounded-[8px] bg-gray-200 text-gray-500 flex items-center justify-center">
                  <feature.icon className="w-[20px] h-[20px]" />
                </div>
                <Badge variant="gray">Coming Soon</Badge>
              </div>
              <h3 className="text-[16px] font-semibold text-gray-900 mb-[8px]">{feature.title}</h3>
              <p className="text-[14px] text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
