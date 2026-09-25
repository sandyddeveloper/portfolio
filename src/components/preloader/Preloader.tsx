"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const d1Ref = useRef<HTMLSpanElement>(null);
  const d2Ref = useRef<HTMLSpanElement>(null);
  const d3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsFinished(true);
          if (onComplete) onComplete();
        },
      });

      // 0. Set belts to full scale immediately, hide white overlay, prepare stroke offsets
      gsap.set(".pl-belt", { scaleY: 1 });
      gsap.set(".pl-white-overlay", { display: "none" });
      gsap.set(".pl-r-draw-path", { strokeDashoffset: 750, strokeDasharray: 750 });

      // 1. Draw outer border rectangle
      tl.to(".pl-border-svg", { opacity: 1, duration: 0.25 })
        .to(".pl-border-svg rect", { strokeDashoffset: 0, duration: 0.65, ease: "power2.inOut" }, "-=0.15")

      // 2. Architectural Blueprint Vector Tracing: 3 'R' limbs draw themselves out sequentially
        .to(".pl-t-path", { opacity: 1, duration: 0.2 }, "-=0.3")
        .to(
          ".pl-r-draw-path",
          {
            strokeDashoffset: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.inOut",
          },
          "-=0.25"
        )

      // 3. Tactile corner crosshairs snap-rotate 90 degrees when frame locks
        .to(
          ".pl-logo-corner-plus svg",
          {
            rotation: 90,
            duration: 0.35,
            ease: "back.out(2)",
          },
          "-=0.2"
        )

      // 4. Reveal Tagline and Counter
        .to(".pl-overlay-counter", { opacity: 1, duration: 0.25 }, "-=0.4")
        .to(".pl-tag-word", { opacity: 1, y: 0, stagger: 0.08, duration: 0.35, ease: "power2.out" }, "-=0.35")
        .to(".pl-tag-dot", { opacity: 1, duration: 0.2, stagger: 0.08 }, "-=0.25");

      // 5. Realistic 3-Stage Acceleration/Deceleration Loading Curve:
      // Stage 1 (DOM & Base assets): 0% -> 28% fast surge
      // Stage 2 (3D Model, shaders & textures): 28% -> 76% heavy asset compilation
      // Stage 3 (Scene Graph linkage): 76% -> 100% precise deceleration lock
      const counterProgress = { val: 0 };
      const updateDigits = () => {
        const p = Math.round(counterProgress.val);
        const str = String(p).padStart(3, "0");
        if (d1Ref.current) d1Ref.current.textContent = str[0];
        if (d2Ref.current) d2Ref.current.textContent = str[1];
        if (d3Ref.current) d3Ref.current.textContent = str[2];
      };

      tl.to(
        counterProgress,
        {
          val: 28,
          duration: 0.35,
          ease: "power2.out",
          onUpdate: updateDigits,
        },
        "-=0.6"
      )
        .to(counterProgress, {
          val: 76,
          duration: 0.55,
          ease: "power1.inOut",
          onUpdate: updateDigits,
        })
        .to(counterProgress, {
          val: 100,
          duration: 0.45,
          ease: "power3.out",
          onUpdate: updateDigits,
        })

      // 6. Tactile micro-pulse snap when reaching 100%
        .to(".pl-overlay-counter", {
          scale: 1.08,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        })

      // 7. Satisfying 500ms hold at 100% so user clearly sees the finished state
        .to({}, { duration: 0.5 })

      // 8. Corner crosshairs fly to screen corners
        .to(
          ".pl-flying-plus",
          {
            opacity: 1,
            duration: 0.25,
          },
          "-=0.3"
        )
        .to(".pl-flying-plus:nth-child(3)", { top: "3%", left: "3%", duration: 0.65, ease: "power3.inOut" }, "-=0.2")
        .to(".pl-flying-plus:nth-child(4)", { top: "3%", left: "97%", duration: 0.65, ease: "power3.inOut" }, "-=0.65")
        .to(".pl-flying-plus:nth-child(5)", { top: "97%", left: "3%", duration: 0.65, ease: "power3.inOut" }, "-=0.65")
        .to(".pl-flying-plus:nth-child(6)", { top: "97%", left: "97%", duration: 0.65, ease: "power3.inOut" }, "-=0.65");

      // 9. Center emblem subtle recoil and 10 louver belts split open from center
      tl.to(".pl-overlay-center", {
        opacity: 0,
        scale: 0.9,
        y: -10,
        duration: 0.38,
        ease: "power2.in",
      })
        .to(
          ".pl-belt",
          {
            scaleY: 0,
            duration: 0.75,
            stagger: { from: "center", amount: 0.35 },
            ease: "power3.inOut",
          },
          "-=0.18"
        )
        .to(".pl-flying-plus", { opacity: 0, duration: 0.25 }, "-=0.3")
        .to(containerRef.current, { opacity: 0, duration: 0.15, pointerEvents: "none" });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-9500 pointer-events-auto">
      <div className="pl-white-overlay"></div>

      {/* 10 Louver Shutter Belts with Bevel Depth */}
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

      {/* Center Box & SVG Architectural Blueprint Monogram */}
      <div
        className="pl-overlay-center fixed inset-0 flex flex-col items-center justify-center z-9350 pointer-events-none"
        style={{ visibility: "visible" }}
      >
        <div className="pl-overlay-logo-wrap relative">
          <div className="pl-logo-black-box"></div>

          {/* Border Outline */}
          <svg className="pl-border-svg" style={{ opacity: 0 }}>
            <rect x="0.75" y="0.75" width="98%" height="98%" fill="none" stroke="#434343" strokeWidth="1.5" rx="2" />
          </svg>

          {/* Corner Pluses with Mechanical Rotation */}
          <div className="pl-logo-corner-plus tl">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" />
              <line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" />
            </svg>
          </div>
          <div className="pl-logo-corner-plus tr">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" />
              <line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" />
            </svg>
          </div>
          <div className="pl-logo-corner-plus bl">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" />
              <line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" />
            </svg>
          </div>
          <div className="pl-logo-corner-plus br">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#555" />
              <line x1="13" y1="6.5" x2="0" y2="6.5" stroke="#555" />
            </svg>
          </div>

          {/* RRR Monogram Limb 1 (Top-Left R) — Live Blueprint Trace */}
          <svg
            className="pl-t-path absolute inset-0 w-full h-full"
            viewBox="0 0 500 500"
            fill="none"
            style={{ opacity: 0 }}
          >
            <g transform="translate(250, 250) rotate(-60) translate(0, -85) scale(0.9)">
              <path
                className="pl-r-draw-path"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M -48 84 L -48 -68 L -32 -84 L 24 -84 Q 72 -84 72 -36 Q 72 8 20 8 L 24 8 L 68 72 L 56 84 L 24 84 L -12 8 L -20 8 L -20 84 Z M -20 -20 L -20 -56 L 16 -56 Q 40 -56 40 -38 Q 40 -20 16 -20 Z"
                fill="none"
                stroke="#1c1d22"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          {/* RRR Monogram Limb 2 (Top-Right R) — Live Blueprint Trace */}
          <svg
            className="pl-t-path absolute inset-0 w-full h-full"
            viewBox="0 0 500 500"
            fill="none"
            style={{ opacity: 0 }}
          >
            <g transform="translate(250, 250) rotate(60) translate(0, -85) scale(0.9)">
              <path
                className="pl-r-draw-path"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M -48 84 L -48 -68 L -32 -84 L 24 -84 Q 72 -84 72 -36 Q 72 8 20 8 L 24 8 L 68 72 L 56 84 L 24 84 L -12 8 L -20 8 L -20 84 Z M -20 -20 L -20 -56 L 16 -56 Q 40 -56 40 -38 Q 40 -20 16 -20 Z"
                fill="none"
                stroke="#1c1d22"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          {/* RRR Monogram Limb 3 (Bottom R) — Live Blueprint Trace */}
          <svg
            className="pl-t-path absolute inset-0 w-full h-full"
            viewBox="0 0 500 500"
            fill="none"
            style={{ opacity: 0 }}
          >
            <g transform="translate(250, 250) rotate(180) translate(0, -85) scale(0.9)">
              <path
                className="pl-r-draw-path"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M -48 84 L -48 -68 L -32 -84 L 24 -84 Q 72 -84 72 -36 Q 72 8 20 8 L 24 8 L 68 72 L 56 84 L 24 84 L -12 8 L -20 8 L -20 84 Z M -20 -20 L -20 -56 L 16 -56 Q 40 -56 40 -38 Q 40 -20 16 -20 Z"
                fill="none"
                stroke="#1c1d22"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
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

        {/* 3-Digit Precision Kinetic Counter (000% -> 100%) */}
        <div
          className="pl-overlay-counter select-none"
          style={{ opacity: 0 }}
        >
          <span ref={d1Ref} className="inline-block w-[1ch] text-center">0</span>
          <span ref={d2Ref} className="inline-block w-[1ch] text-center">0</span>
          <span ref={d3Ref} className="inline-block w-[1ch] text-center">0</span>
          <span className="ml-1 text-[#111] font-bold">%</span>
        </div>
      </div>
    </div>
  );
}
