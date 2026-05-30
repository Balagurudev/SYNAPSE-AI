import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[8px] border border-gray-300 bg-white px-[14px] py-[10px] text-[14px] text-gray-900 shadow-xs ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:border-primary-purple focus-visible:ring-4 focus-visible:ring-purple-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
