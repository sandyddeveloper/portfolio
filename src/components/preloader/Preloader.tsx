"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reel1Ref = useRef<HTMLDivElement>(null);
  const reel2Ref = useRef<HTMLDivElement>(null);
  const reel3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsFinished(true);
          if (onComplete) onComplete();
        },
      });

      // 0. Set belts to full scale immediately and hide white overlay
      gsap.set(".pl-belt", { scaleY: 1 });
      gsap.set(".pl-white-overlay", { display: "none" });

      // 1. Draw logo border and reveal emblem paths
      tl.to(".pl-border-svg", { opacity: 1, duration: 0.3 })
        .to(".pl-border-svg rect", { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, "-=0.2")
        .to(".pl-t-path", { opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.4")
        .to(".pl-overlay-counter", { opacity: 1, duration: 0.3 }, "-=0.3")
        .to(".pl-tag-word", { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }, "-=0.2")
        .to(".pl-tag-dot", { opacity: 1, duration: 0.2, stagger: 0.08 }, "-=0.3");

      // 2. Animate slot reels: 000 -> 100
      if (reel1Ref.current && reel2Ref.current && reel3Ref.current) {
        tl.to(reel1Ref.current, { y: -16, duration: 0.8, ease: "power3.inOut" }, "-=0.4");
        tl.to(reel2Ref.current, { y: -160, duration: 1.0, ease: "power3.inOut" }, "-=0.8");
        tl.to(reel3Ref.current, { y: -160, duration: 1.2, ease: "power3.inOut" }, "-=1.0");
      }

      // 3. Flying pluses fly to screen corners
      tl.to(".pl-flying-plus", {
        opacity: 1,
        duration: 0.3,
      }, "-=0.6")
      .to(".pl-flying-plus:nth-child(3)", { top: "3%", left: "3%", duration: 0.7, ease: "power3.inOut" }, "-=0.3")
      .to(".pl-flying-plus:nth-child(4)", { top: "3%", left: "97%", duration: 0.7, ease: "power3.inOut" }, "-=0.7")
      .to(".pl-flying-plus:nth-child(5)", { top: "97%", left: "3%", duration: 0.7, ease: "power3.inOut" }, "-=0.7")
      .to(".pl-flying-plus:nth-child(6)", { top: "97%", left: "97%", duration: 0.7, ease: "power3.inOut" }, "-=0.7");

      // 4. Split 10 belts collapse from center outwards to reveal dark hero
      tl.to(".pl-overlay-center", { opacity: 0, scale: 0.95, duration: 0.35, ease: "power2.in" })
        .to(".pl-belt", {
          scaleY: 0,
          duration: 0.7,
          stagger: { from: "center", amount: 0.3 },
          ease: "power3.inOut",
        }, "-=0.15")
        .to(".pl-flying-plus", { opacity: 0, duration: 0.25 }, "-=0.3")
        .to(containerRef.current, { opacity: 0, duration: 0.15, pointerEvents: "none" });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-9500 pointer-events-auto">
      <div className="pl-white-overlay"></div>

      {/* 10 Belts */}
      <div className="pl-overlay active flex flex-col fixed inset-0 z-9100 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="pl-belt" />
        ))}
      </div>

      {/* Flying Corner Crosshairs */}
      <div className="pl-flying-plus fixed top-1/2 left-1/2" style={{ opacity: 0 }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" />
          <line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" />
        </svg>
      </div>
      <div className="pl-flying-plus fixed top-1/2 left-1/2" style={{ opacity: 0 }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" />
          <line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" />
        </svg>
      </div>
      <div className="pl-flying-plus fixed top-1/2 left-1/2" style={{ opacity: 0 }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" />
          <line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" />
        </svg>
      </div>
      <div className="pl-flying-plus fixed top-1/2 left-1/2" style={{ opacity: 0 }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" />
          <line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" />
        </svg>
      </div>

      {/* Center Box & SVG Monogram with Clip Paths */}
      <div className="pl-overlay-center fixed inset-0 flex flex-col items-center justify-center z-9350 pointer-events-none" style={{ visibility: "visible" }}>
        <div className="pl-overlay-logo-wrap relative">
          <div className="pl-logo-black-box"></div>

          {/* Border Outline */}
          <svg className="pl-border-svg" style={{ opacity: 0 }}>
            <rect x="0.75" y="0.75" width="98%" height="98%" fill="none" stroke="#434343" strokeWidth="1.5" rx="2" />
          </svg>

          {/* Corner Pluses */}
          <div className="pl-logo-corner-plus tl"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" /><line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" /></svg></div>
          <div className="pl-logo-corner-plus tr"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" /><line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" /></svg></div>
          <div className="pl-logo-corner-plus bl"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" /><line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" /></svg></div>
          <div className="pl-logo-corner-plus br"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" /><line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" /></svg></div>

          {/* Trionn Monogram Limb 1 */}
          <svg className="pl-t-path absolute inset-0 w-full h-full" viewBox="-79.5 -31.4 662 640" fill="none" style={{ opacity: 0 }}>
            <defs>
              <clipPath id="pl-clip1">
                <path fillRule="evenodd" clipRule="evenodd" d="M269.431 257.019C268.708 258.271 268.717 259.816 269.455 261.06L286.98 290.611C288.54 293.241 292.355 293.219 293.885 290.57L327.284 232.72C328.825 230.052 332.677 230.054 334.215 232.724L425.279 390.875C425.982 392.095 427.275 392.856 428.682 392.878L463.65 393.434C466.755 393.483 468.73 390.129 467.18 387.438L353.861 190.681C353.148 189.444 353.149 187.921 353.863 186.685L388.264 127.101C388.965 125.885 388.979 124.391 388.299 123.163L371.368 92.5833C369.861 89.8615 365.96 89.8265 364.404 92.5208L269.431 257.019Z" />
              </clipPath>
            </defs>
            <path fillRule="evenodd" clipRule="evenodd" d="M269.431 257.019C268.708 258.271 268.717 259.816 269.455 261.06L286.98 290.611C288.54 293.241 292.355 293.219 293.885 290.57L327.284 232.72C328.825 230.052 332.677 230.054 334.215 232.724L425.279 390.875C425.982 392.095 427.275 392.856 428.682 392.878L463.65 393.434C466.755 393.483 468.73 390.129 467.18 387.438L353.861 190.681C353.148 189.444 353.149 187.921 353.863 186.685L388.264 127.101C388.965 125.885 388.979 124.391 388.299 123.163L371.368 92.5833C369.861 89.8615 365.96 89.8265 364.404 92.5208L269.431 257.019Z" fill="none" stroke="#aaa" strokeWidth="1.5" />
          </svg>

          {/* Trionn Monogram Limb 2 */}
          <svg className="pl-t-path absolute inset-0 w-full h-full" viewBox="-79.5 -31.4 662 640" fill="none" style={{ opacity: 0 }}>
            <defs>
              <clipPath id="pl-clip2">
                <path fillRule="evenodd" clipRule="evenodd" d="M316.66 425.547C318.087 425.545 319.406 426.304 320.123 427.537L356.868 490.777C357.572 491.989 358.86 492.744 360.263 492.767L395.242 493.322C398.347 493.372 400.322 490.018 398.773 487.327L304.909 324.268C304.196 323.03 302.878 322.266 301.449 322.263L265.933 322.201C262.846 322.196 260.916 325.543 262.468 328.212L293.454 381.508C295.005 384.176 293.079 387.521 289.993 387.519L107.1 387.384C105.67 387.383 104.348 388.146 103.633 389.384L86.0729 419.792C84.532 422.461 86.4598 425.796 89.5411 425.793L316.66 425.547Z" />
              </clipPath>
            </defs>
            <path fillRule="evenodd" clipRule="evenodd" d="M316.66 425.547C318.087 425.545 319.406 426.304 320.123 427.537L356.868 490.777C357.572 491.989 358.86 492.744 360.263 492.767L395.242 493.322C398.347 493.372 400.322 490.018 398.773 487.327L304.909 324.268C304.196 323.03 302.878 322.266 301.449 322.263L265.933 322.201C262.846 322.196 260.916 325.543 262.468 328.212L293.454 381.508C295.005 384.176 293.079 387.521 289.993 387.519L107.1 387.384C105.67 387.383 104.348 388.146 103.633 389.384L86.0729 419.792C84.532 422.461 86.4598 425.796 89.5411 425.793L316.66 425.547Z" fill="none" stroke="#aaa" strokeWidth="1.5" />
          </svg>

          {/* Trionn Monogram Limb 3 */}
          <svg className="pl-t-path absolute inset-0 w-full h-full" viewBox="-79.5 -31.4 662 640" fill="none" style={{ opacity: 0 }}>
            <defs>
              <clipPath id="pl-clip3">
                <path fillRule="evenodd" clipRule="evenodd" d="M182.809 283.818C179.736 283.807 177.822 280.479 179.359 277.818L271.364 118.461C272.066 117.245 272.079 115.751 271.399 114.523L254.468 83.9432C252.961 81.2213 249.06 81.1863 247.504 83.8807L133.245 281.783C132.528 283.026 131.2 283.789 129.765 283.783L56.9478 283.499C55.5132 283.494 54.1855 284.257 53.4681 285.499L35.9048 315.92C34.3665 318.584 36.2864 321.915 39.363 321.92L229.336 322.201C230.767 322.203 232.091 321.441 232.806 320.201L250.222 290.036C251.759 287.375 249.845 284.047 246.771 284.036L182.809 283.818Z" />
              </clipPath>
            </defs>
            <path fillRule="evenodd" clipRule="evenodd" d="M182.809 283.818C179.736 283.807 177.822 280.479 179.359 277.818L271.364 118.461C272.066 117.245 272.079 115.751 271.399 114.523L254.468 83.9432C252.961 81.2213 249.06 81.1863 247.504 83.8807L133.245 281.783C132.528 283.026 131.2 283.789 129.765 283.783L56.9478 283.499C55.5132 283.494 54.1855 284.257 53.4681 285.499L35.9048 315.92C34.3665 318.584 36.2864 321.915 39.363 321.92L229.336 322.201C230.767 322.203 232.091 321.441 232.806 320.201L250.222 290.036C251.759 287.375 249.845 284.047 246.771 284.036L182.809 283.818Z" fill="none" stroke="#aaa" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Tagline */}
        <div className="pl-overlay-tagline flex items-center gap-1 mt-10">
          <span className="pl-tag-word title text-xs uppercase font-medium tracking-widest text-[#111]">Inspire</span>
          <span className="pl-tag-dot text-[#555] mx-2">·</span>
          <span className="pl-tag-word title text-xs uppercase font-medium tracking-widest text-[#111]">Innovate</span>
          <span className="pl-tag-dot text-[#555] mx-2">·</span>
          <span className="pl-tag-word title text-xs uppercase font-medium tracking-widest text-[#111]">Impact</span>
        </div>

        {/* 3-Reel Mechanical Slot Machine Counter */}
        <div className="pl-overlay-counter flex items-center gap-0.5 mt-8 font-mono text-base font-light text-[#434343]" style={{ opacity: 0 }}>
          <div className="pl-slot-reel h-4 overflow-hidden">
            <div ref={reel1Ref} className="pl-slot-strip">
              <span className="pl-slot-digit block h-4">0</span>
              <span className="pl-slot-digit block h-4">1</span>
            </div>
          </div>
          <div className="pl-slot-reel h-4 overflow-hidden">
            <div ref={reel2Ref} className="pl-slot-strip">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, i) => (
                <span key={i} className="pl-slot-digit block h-4">{d}</span>
              ))}
            </div>
          </div>
          <div className="pl-slot-reel h-4 overflow-hidden">
            <div ref={reel3Ref} className="pl-slot-strip">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, i) => (
                <span key={i} className="pl-slot-digit block h-4">{d}</span>
              ))}
            </div>
          </div>
          <span className="ml-1">%</span>
        </div>
      </div>
    </div>
  );
}
