"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-[24px] relative bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white w-full max-w-[440px] p-[32px] rounded-[12px] shadow-sm border border-gray-200 relative z-10"
      >
        <div className="flex flex-col items-center mb-[32px]">
          <div className="w-[48px] h-[48px] rounded-[12px] bg-primary-purple flex items-center justify-center shadow-sm mb-[16px]">
            <Sparkles className="w-[24px] h-[24px] text-white" />
          </div>
          <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight">Welcome to Confidant</h1>
          <p className="text-gray-500 text-[14px] text-center mt-[8px]">Sign in to access your personalized interview coach.</p>
        </div>

        <form className="space-y-[16px]" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-[8px]">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          
          <div className="space-y-[8px]">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-[12px] font-medium text-primary-purple hover:underline">Forgot password?</Link>
            </div>
            <Input id="password" type="password" required />
          </div>

          <Button type="submit" className="w-full mt-[24px] group">
            Sign In <ArrowRight className="w-[16px] h-[16px] ml-[8px] group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="mt-[24px] text-center text-[14px] text-gray-500">
          Don't have an account? <Link href="#" className="text-primary-purple hover:underline font-medium">Sign up</Link>
        </div>
      </motion.div>
    </main>
  );
}
