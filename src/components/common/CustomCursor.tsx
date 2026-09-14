"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickTo for smooth 60fps cursor trailing
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("button, a, [data-cursor]");
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute("data-cursor-text") || "";
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-9999 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hidden md:flex ${
          isHovered
            ? "w-16 h-16 bg-white text-black text-[10px] font-mono uppercase tracking-wider font-bold mix-blend-normal shadow-lg scale-100"
            : "w-8 h-8 border border-white/50 bg-transparent mix-blend-difference"
        }`}
      >
        {cursorText}
      </div>

      {/* Center Precise Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-9999 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 hidden md:block ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
}
