import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "purple" | "gray";
}

function Badge({ className, variant = "gray", ...props }: BadgeProps) {
  const variants = {
    success: "bg-success-50 text-success-700",
    purple: "bg-purple-50 text-purple-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-full text-[12px] font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
