"use client";

import React, { useState } from "react";
import RollingButton from "./RollingButton";

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
    <header className="site-header fixed top-0 left-0 w-full z-99 py-6 md:py-8 transition-all duration-300 mix-blend-difference">
      <div className="tr__container flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="logo block z-50">
          <img
            src="/images/logo.svg"
            alt="TRIONN"
            className="w-28 md:w-32 h-auto"
          />
        </a>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            type="button"
            id="sound-toggle"
            title={isSoundEnabled ? "Disable sound" : "Enable sound"}
            aria-label="Toggle sound"
            onClick={onToggleSound}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
              isSoundEnabled
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white/50 hover:text-white"
            }`}
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-3.5"
            >
              <g opacity={isSoundEnabled ? "1" : "0.5"}>
                <path
                  d="M13.7223 1.45716C13.5773 1.31116 13.3425 1.31116 13.1975 1.45716C13.0526 1.60326 13.0526 1.84007 13.1975 1.98617C14.5261 3.32546 15.2578 5.10621 15.2578 7.00034C15.2578 8.89447 14.5261 10.6752 13.1975 12.0145C13.0526 12.1606 13.0526 12.3974 13.1975 12.5435C13.27 12.6165 13.365 12.6531 13.4599 12.6531C13.5548 12.6531 13.6498 12.6165 13.7223 12.5435C15.1909 11.0629 15.9998 9.09428 15.9998 7.00034C15.9998 4.90641 15.1909 2.9378 13.7223 1.45716Z"
                  fill="currentColor"
                />
                <path
                  d="M12.1651 4.03432C12.0203 3.88832 11.7853 3.88826 11.6404 4.03437C11.4955 4.18042 11.4955 4.41723 11.6404 4.56333C12.2848 5.21289 12.6396 6.07801 12.6396 6.99943C12.6396 7.92084 12.2848 8.78596 11.6404 9.43552C11.4955 9.58162 11.4955 9.81842 11.6404 9.96448C11.7129 10.0375 11.8078 10.0741 11.9028 10.0741C11.9977 10.0741 12.0927 10.0375 12.1651 9.96453C12.9496 9.17367 13.3817 8.12065 13.3817 6.99943C13.3817 5.8782 12.9496 4.82519 12.1651 4.03432Z"
                  fill="currentColor"
                />
                <path
                  d="M9.40909 0.0603026C9.20504 -0.0396761 8.96751 -0.0139545 8.78915 0.127196L4.5934 3.45119L4.38994 3.61238V6.99429C4.38994 7.20824 4.21789 7.38169 4.00566 7.38169C3.79344 7.38169 3.62139 7.20824 3.62139 6.99429V3.62231H1.05146C0.471695 3.62231 0 4.09784 0 4.68233V9.3176C0 9.90214 0.471695 10.3777 1.05146 10.3777H3.95735H4.37739L4.59339 10.5488L7.27858 12.676V10.051C7.27858 9.83708 7.45063 9.66364 7.66285 9.66364C7.87508 9.66364 8.04712 9.83708 8.04712 10.051V13.2849L8.78909 13.8727C8.89536 13.9568 9.02259 14 9.15127 14C9.23859 14 9.32658 13.9801 9.40904 13.9397C9.61307 13.8398 9.73984 13.6356 9.73984 13.4069V0.593075C9.73984 0.36442 9.61313 0.16023 9.40909 0.0603026Z"
                  fill="currentColor"
                />
              </g>
              {!isSoundEnabled && (
                <line
                  x1="15"
                  y1="0.707595"
                  x2="1.70711"
                  y2="14.0005"
                  stroke="currentColor"
                  strokeOpacity="0.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          {/* "Let's Talk" Button */}
          <button
            type="button"
            onClick={onOpenContact}
            className="title pt-1.5 pb-2 px-5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-white/90 transition-all duration-300"
          >
            Let&apos;s talk
          </button>

          {/* Menu Trigger */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="title flex items-center gap-2 pt-1.5 pb-2 px-4 rounded-full border border-white text-white text-xs font-medium uppercase tracking-wider hover:border-white/60 transition-all duration-300"
          >
            <span>Menu</span>
            <div className="flex flex-col gap-1 w-3">
              <span className="h-px w-3 bg-current block"></span>
              <span className="h-px w-3 bg-current block"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
