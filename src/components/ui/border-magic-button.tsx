"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface MagicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  innerClassName?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
}

export function MagicButton({
  children,
  onClick,
  href,
  className,
  innerClassName,
  type = "button",
  disabled = false,
  title,
}: MagicButtonProps) {
  const { theme } = useTheme();

  const buttonContent = (
    <span className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-transform active:scale-95 cursor-pointer">
      {/* Rotating Conic Gradient Border */}
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c084fc_0%,#4c1d95_50%,#c084fc_100%)]" />
      
      {/* Inner Backdrop Button Container */}
      <span
        className={cn(
          "inline-flex h-full w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold backdrop-blur-3xl transition-colors",
          theme === "dark"
            ? "bg-slate-950 text-white hover:bg-slate-900"
            : "bg-white text-slate-950 hover:bg-purple-50",
          innerClassName
        )}
      >
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} className={cn("inline-block", className)} title={title}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("inline-block disabled:opacity-50 disabled:pointer-events-none", className)}
      title={title}
    >
      {buttonContent}
    </button>
  );
}
