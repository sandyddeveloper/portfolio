"use client";

import React, { useState } from "react";

interface RollingButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: "light" | "dark" | "pill";
  className?: string;
  showArrow?: boolean;
}

export default function RollingButton({
  text,
  onClick,
  href,
  variant = "light",
  className = "",
  showArrow = true,
}: RollingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const letters = text.split("");

  const content = (
    <div
      className={`relative inline-flex items-center uppercase cursor-pointer transition-all duration-300 ${
        variant === "pill"
          ? "px-5 py-2.5 rounded-full border border-light-font/40 hover:border-light-font bg-transparent text-light-font text-xs tracking-wider"
          : variant === "dark"
          ? "text-black border-b border-black pb-1 text-sm tracking-wider"
          : "text-light-font border-b border-light-font/30 hover:border-light-font pb-1 text-sm tracking-wider"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="relative inline-flex overflow-hidden font-medium select-none">
        {/* Original text layer */}
        <span
          className="inline-flex transition-transform duration-300 ease-out"
          style={{
            transform: isHovered ? "translateY(-100%)" : "translateY(0%)",
          }}
        >
          {letters.map((char, index) => (
            <span
              key={`orig-${index}`}
              className="inline-block transition-transform duration-300"
              style={{
                transitionDelay: `${index * 12}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>

        {/* Clone text layer */}
        <span
          className="absolute left-0 top-0 inline-flex transition-transform duration-300 ease-out"
          style={{
            transform: isHovered ? "translateY(0%)" : "translateY(100%)",
          }}
          aria-hidden="true"
        >
          {letters.map((char, index) => (
            <span
              key={`clone-${index}`}
              className="inline-block transition-transform duration-300"
              style={{
                transitionDelay: `${index * 12}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </span>

      {showArrow && (
        <span
          className="ml-2 inline-flex items-center transition-transform duration-300 ease-out"
          style={{
            transform: isHovered ? "translateX(4px)" : "translateX(0px)",
          }}
        >
          <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5">
            <path
              d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V0L9.32372 3.836V4.816L5.47372 8.652ZM0 5.11V3.542H8.60972V5.11H0Z"
              fill="currentColor"
            />
          </svg>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
