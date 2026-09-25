"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickTo for ultra-smooth 60fps trailing
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const safeClosest = (el: Element | null, selector: string): Element | null => {
      if (!el || !el.closest) return null;
      try {
        return el.closest(selector);
      } catch {
        return null;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        if (!target || !(target instanceof Element)) return;

        // 1. Pure DOM hierarchy check for light background (MenuDrawer, Works Light Layer)
        let isLight = false;
        let curr: HTMLElement | null = target;
        while (curr && curr !== document.body) {
          const cls = typeof curr.className === "string" ? curr.className : "";
          if (
            cls.includes("bg-white") ||
            cls.includes("bg-cream") ||
            cls.includes("E6E4E2") ||
            cls.includes("light")
          ) {
            isLight = true;
            break;
          }
          if (curr.getAttribute && curr.getAttribute("data-theme") === "light") {
            isLight = true;
            break;
          }
          curr = curr.parentElement;
        }
        setIsLightBg(isLight);

        // 2. Explicit data-cursor-text attribute
        const explicitTextEl = safeClosest(target, "[data-cursor-text]");
        if (explicitTextEl) {
          setIsHovered(true);
          const txt = explicitTextEl.getAttribute("data-cursor-text") || "CLICK";
          setCursorText(txt);
          return;
        }

        // 3. Hold to Blast Area
        if (safeClosest(target, "#s1-stats, .blast-icon, [data-cursor='hold']")) {
          setIsHovered(true);
          setCursorText("HOLD");
          return;
        }

        // 4. Scroll Triggers / Down Arrow
        if (safeClosest(target, "#s1-scroll, .scroll-indicator, [data-cursor='scroll']")) {
          setIsHovered(true);
          setCursorText("SCROLL");
          return;
        }

        // 5. 3D Canvas / Draggable Areas
        if (
          safeClosest(
            target,
            "#trionn-symbol-canvas-wrap, canvas, [data-cursor='drag'], .js-work-card-inner, .dim-carousel-track"
          )
        ) {
          setIsHovered(true);
          setCursorText("DRAG");
          return;
        }

        // 6. Close Buttons
        if (safeClosest(target, ".close-btn, [data-cursor='close']")) {
          setIsHovered(true);
          setCursorText("CLOSE");
          return;
        }

        // 7. Sound Toggle
        if (safeClosest(target, "#sound-toggle")) {
          setIsHovered(true);
          setCursorText("SOUND");
          return;
        }

        // 8. Project Links & Cards
        if (safeClosest(target, ".project-link, .work-card, .js-work-card")) {
          setIsHovered(true);
          setCursorText("VIEW");
          return;
        }

        // 9. All Interactive Buttons & Links (Navigation, CTAs, Menu Links)
        const clickable = safeClosest(
          target,
          "button, a, [role='button'], input[type='submit'], input[type='button'], .btn, .button_wrapper, .nav-link"
        );
        if (clickable) {
          setIsHovered(true);
          const label = (clickable.textContent || "").trim().toLowerCase();
          if (label.includes("menu")) {
            setCursorText("MENU");
          } else if (label.includes("talk") || label.includes("discuss") || label.includes("contact")) {
            setCursorText("CLICK");
          } else if (label.includes("view") || label.includes("explore")) {
            setCursorText("VIEW");
          } else {
            setCursorText("CLICK");
          }
          return;
        }

        // Default: Not hovering over interactive item
        setIsHovered(false);
        setCursorText("");
      } catch {
        // Fallback gracefully on any unexpected DOM error
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const displayedText = isMouseDown && cursorText === "HOLD" ? "BLAST!" : cursorText;

  return (
    <>
      {/* Outer Follower Ring / Interactive Action Capsule */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-9999 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hidden md:flex select-none ${
          isHovered
            ? isLightBg
              ? "w-16 h-16 bg-[#040508] text-white border border-white/20 shadow-[0_4px_25px_rgba(0,0,0,0.5)] scale-100"
              : "w-16 h-16 bg-white text-black shadow-[0_4px_25px_rgba(255,255,255,0.4)] scale-100"
            : "w-8 h-8 border border-white/50 bg-transparent mix-blend-difference"
        } ${isMouseDown ? "scale-90" : ""}`}
      >
        <span className="font-mono font-bold text-[10px] tracking-widest uppercase transition-opacity duration-200">
          {displayedText}
        </span>
      </div>

      {/* Center Precision Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-9999 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 hidden md:block ${
          isHovered ? "opacity-0" : "opacity-100 bg-white"
        }`}
      />
    </>
  );
}
