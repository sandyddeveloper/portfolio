"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RotatingHeroWord from "@/components/hero/RotatingHeroWord";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  onDiscussClick: () => void;
  playSound?: (type: string) => void;
}

export default function Hero({ onDiscussClick, playSound }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isBlasting, setIsBlasting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of hero typography and buttons
      const tl = gsap.timeline({ delay: 1.4 });

      tl.from(".banner-title-block h1", {
        y: 70,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
      })
      .from("#s1-cta", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      }, "-=0.6")
      .from(".banner-text-block > div", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const triggerBlast = () => {
    if (typeof window !== "undefined") {
      const blastFn = (window as unknown as { __trionnBlast?: () => void }).__trionnBlast;
      if (blastFn) {
        blastFn();
      }
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="main-banner relative min-h-screen pt-28 lg:pt-36 pb-12 flex flex-col justify-between w-full bg-transparent overflow-hidden select-none"
    >
      {/* Hero UI Overlay Layer */}
      <div className="tr__container relative z-10 flex flex-col justify-between w-full flex-1 pointer-events-none">
        {/* Banner Top Block */}
        <div className="banner-top-block flex flex-col w-full items-start pointer-events-none">
          {/* Availability Status Chip */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-xs pointer-events-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8D8D8]">
              Available for select projects &amp; roles
            </span>
          </div>

          <div className="grid grid-cols-12 gap-6 mb-8 w-full">
            <div
              className="banner-title-block w-full flex flex-col items-start col-span-12 lg:col-span-9 pointer-events-auto"
              id="s1-headline"
            >
              <h1 className="z-2 font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[#D8D8D8] leading-none mb-1">
                Santhosh Raj
              </h1>
              <h1 className="z-2 font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[#D8D8D8] leading-none flex items-baseline flex-wrap">
                <span className="inline-block mr-4 font-display font-bold text-[#D8D8D8]">crafting</span>
                <RotatingHeroWord />
              </h1>
            </div>
          </div>

          {/* Banner CTAs */}
          <div id="s1-cta" className="flex gap-6 flex-wrap pointer-events-auto">
            {/* Discuss Project Button */}
            <div
              style={{
                ["--button_wrapper-color" as string]: "#D8D8D8",
                ["--pad-x" as string]: "0px",
                ["--arrow-size" as string]: "2.5rem",
              }}
              className="button_wrapper relative w-52 uppercase transition-opacity duration-300 hover:opacity-95"
            >
              <button
                type="button"
                onClick={onDiscussClick}
                className="btn button-text relative flex w-full min-h-10 cursor-pointer items-center overflow-hidden no-underline uppercase"
              >
                <span className="underline pointer-events-none absolute inset-x-0 bottom-0 h-px">
                  <span className="u-right absolute inset-x-0 bottom-0 h-px bg-[#D8D8D8] origin-left"></span>
                  <span className="u-left absolute inset-x-0 bottom-0 h-px bg-[#D8D8D8] origin-left"></span>
                </span>
                <span className="word relative inline-flex text-xs font-mono tracking-wider text-[#D8D8D8]">
                  Discuss Your Project
                </span>
                <span className="arrow-sprite ml-2 opacity-0 transition-all duration-300 flex items-center">
                  <svg width="10" height="9" viewBox="0 0 10 9" fill="none" className="w-2.5 h-2.5">
                    <path d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V0L9.32372 3.836V4.816L5.47372 8.652ZM0 5.11V3.542H8.60972V5.11H0Z" fill="#D8D8D8" />
                  </svg>
                </span>
              </button>
            </div>

            {/* View Work Button */}
            <div
              style={{
                ["--button_wrapper-color" as string]: "#D8D8D8",
                ["--pad-x" as string]: "0px",
                ["--arrow-size" as string]: "2.5rem",
              }}
              className="button_wrapper relative w-56 uppercase transition-opacity duration-300 hover:opacity-95"
            >
              <a
                href="#work-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn button-text relative flex w-full min-h-10 cursor-pointer items-center overflow-hidden no-underline uppercase text-[#9C9C9C] hover:text-[#D8D8D8] transition-colors"
              >
                <span className="underline pointer-events-none absolute inset-x-0 bottom-0 h-px">
                  <span className="u-right absolute inset-x-0 bottom-0 h-px bg-[#9C9C9C] origin-left"></span>
                  <span className="u-left absolute inset-x-0 bottom-0 h-px bg-[#9C9C9C] origin-left"></span>
                </span>
                <span className="word relative inline-flex text-xs font-mono tracking-wider">
                  View Selected Work
                </span>
                <span className="arrow-sprite ml-2 opacity-0 transition-all duration-300 flex items-center">
                  <svg width="10" height="9" viewBox="0 0 10 9" fill="none" className="w-2.5 h-2.5">
                    <path d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V0L9.32372 3.836V4.816L5.47372 8.652ZM0 5.11V3.542H8.60972V5.11H0Z" fill="#9C9C9C" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Center spacing area so the 3D emblem floats majestically in the middle */}
        <div className="flex-1 min-h-[160px] md:min-h-[220px] pointer-events-none" />

        {/* Banner Bottom Block */}
        <div className="banner-text-block grid grid-cols-12 gap-6 w-full pt-4 items-end pointer-events-none">
          {/* About / Scroll Down indicator */}
          <div
            id="s1-scroll"
            data-cursor-text="SCROLL"
            className="col-span-4 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#9C9C9C] pointer-events-auto cursor-pointer hover:text-white transition-colors"
            onClick={() => {
              const el = document.getElementById("about-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>ABOUT</span>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="w-3.5 h-3.5 animate-bounce">
              <path d="M9 5v8M6 10l3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Blast Status Badge */}
          <div
            id="s1-stats"
            data-cursor-text="HOLD"
            onClick={triggerBlast}
            className="col-span-12 lg:col-span-4 flex flex-col items-center text-center cursor-pointer pointer-events-auto group transition-transform active:scale-95 pb-2"
            title="Click or Hold anywhere to Blast"
          >
            <span className="title blast-icon text-xs uppercase tracking-wider text-[#D8D8D8] group-hover:text-white flex items-center gap-1.5 transition-colors">
              Hold to
              <img
                src="/images/blast-icon.svg"
                alt="blast"
                className="w-4 h-4 inline-block animate-pulse"
              />
              blast
            </span>
            <span className="title block text-[10px] text-[#9C9C9C] tracking-wide mt-0.5 font-mono group-hover:text-amber-400 transition-colors">
              Dare ⚡ to touch the lines.
            </span>
          </div>

          {/* R Symbol Badge Box & Subtext */}
          <div className="col-span-8 lg:col-span-4 flex flex-col items-end gap-3 ml-auto pointer-events-auto">
            <div id="s1-box">
              <div className="flex border border-[#2F323B] overflow-hidden rounded-sm min-h-16 text-light-font title bg-[#0C0C0C]/50 backdrop-blur-xs">
                <div className="flex flex-col justify-center items-center min-w-20 border-r border-[#2F323B] text-center gap-1 p-3">
                  <span className="font-display font-bold text-2xl text-white tracking-tighter">R</span>
                  <span className="text-[10px] font-mono uppercase block text-[#9C9C9C] tracking-widest">Portfolio</span>
                </div>
                <div className="p-3 flex flex-col justify-center text-left">
                  <span className="text-[11px] leading-snug uppercase block text-[#D8D8D8] font-mono">
                    Full-Stack Engineer &amp; <br />
                    Systems Developer
                  </span>
                </div>
              </div>
            </div>
            <div id="s1-sub" className="max-w-xs text-right">
              <p className="text-[11px] text-[#9C9C9C] leading-snug">
                Websites, AI products, scalable APIs, and distributed systems built for clarity and scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

