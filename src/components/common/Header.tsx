"use client";

import React from "react";

interface HeaderProps {
  onOpenContact: () => void;
  onOpenMenu: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Header({
  onOpenContact,
  onOpenMenu,
  isSoundEnabled,
  onToggleSound,
}: HeaderProps) {
  return (
    <header className="site-header fixed top-0 left-0 w-full z-99 py-6 md:py-8 bg-transparent transition-all duration-300 select-none pointer-events-none">
      <div className="tr__container flex items-center justify-between w-full pointer-events-auto">
        {/* Left: Brand Logo with RRR Insignia & Santhosh Raj */}
        <a
          href="/"
          className="logo flex items-center gap-3.5 z-50 group no-underline text-inherit cursor-pointer"
        >
          {/* Futuristic RRR Insignia Badge */}
          <div className="relative w-9 h-9 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:border-white/50 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-all duration-300">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-300"
            >
              <defs>
                <linearGradient id="rrr-header-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" />
                  <stop offset="0.5" stopColor="#D8E2F0" />
                  <stop offset="1" stopColor="#90A4C0" />
                </linearGradient>
              </defs>
              <path
                d="M6 4h6.5c2.2 0 4 1.8 4 4 0 1.5-.8 2.8-2 3.5l2.7 6.5h-3.2l-2.4-5.8H9v5.8H6V4zm3 5.4h3.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H9v3z"
                fill="url(#rrr-header-grad)"
              />
              <circle cx="18.5" cy="5.5" r="1.5" fill="#34D399" className="animate-pulse" />
            </svg>
          </div>

          {/* Typography Lockup */}
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-wider text-sm sm:text-base text-white uppercase group-hover:text-white transition-colors leading-tight">
              Santhosh Raj
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#9C9C9C] uppercase leading-none mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Creative Developer</span>
            </span>
          </div>
        </a>

        {/* Center: ONLY Availability Status Pill */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-white/20 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8D8D8]">
            Available for select projects &amp; roles
          </span>
        </div>

        {/* Right: Sound Toggle, Let's Talk CTA & Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Sound Visualizer Pill */}
          <button
            type="button"
            id="sound-toggle"
            title={isSoundEnabled ? "Mute audio" : "Enable sound"}
            aria-label="Toggle sound"
            onClick={onToggleSound}
            className={`group relative flex h-9 items-center gap-2 px-3 rounded-full border transition-all duration-300 cursor-pointer ${
              isSoundEnabled
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                : "border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10"
            }`}
          >
            {isSoundEnabled ? (
              <div className="flex items-end gap-[2.5px] h-3.5">
                <span className="w-[2px] bg-emerald-400 rounded-full animate-eq-1" />
                <span className="w-[2px] bg-emerald-400 rounded-full animate-eq-2" />
                <span className="w-[2px] bg-emerald-400 rounded-full animate-eq-3" />
                <span className="w-[2px] bg-emerald-400 rounded-full animate-eq-4" />
              </div>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
              >
                <path
                  d="M7 2L3.5 5H1v6h2.5L7 14V2z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="10" y1="5" x2="15" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <line x1="15" y1="5" x2="10" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            )}
            <span className="text-[10px] font-mono tracking-widest uppercase hidden sm:inline-block">
              {isSoundEnabled ? "Sound" : "Muted"}
            </span>
          </button>

          {/* "Let's Talk" Capsule CTA */}
          <button
            type="button"
            onClick={onOpenContact}
            className="group relative h-9 px-4 sm:px-5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#E6E4E2] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all duration-300 flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black/80 group-hover:bg-emerald-500 transition-colors" />
            <span>Let&apos;s talk</span>
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              className="w-2.5 h-2.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            >
              <path
                d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V0L9.32372 3.836V4.816L5.47372 8.652ZM0 5.11V3.542H8.60972V5.11H0Z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Menu Trigger Pill */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="group relative h-9 px-3.5 sm:px-4 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-widest uppercase flex items-center gap-2.5 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span className="hidden xs:inline-block">Menu</span>
            <div className="flex flex-col gap-[3.5px] w-4">
              <span className="h-[1.5px] w-4 bg-current rounded-full transition-all duration-300 group-hover:w-2.5 group-hover:bg-amber-300" />
              <span className="h-[1.5px] w-2.5 bg-current rounded-full transition-all duration-300 group-hover:w-4 group-hover:bg-amber-300" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
