"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary-purple text-white shadow-xs border border-primary-purple hover:bg-purple-700",
      secondary: "bg-white border border-gray-300 text-gray-700 shadow-xs hover:bg-gray-50",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-50",
    };

    const sizes = {
      default: "h-[40px] px-[16px] py-[10px]",
      sm: "h-[36px] px-[14px]",
      lg: "h-[44px] px-[18px] text-[16px]",
      icon: "h-[40px] w-[40px]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-[8px] text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-50 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
