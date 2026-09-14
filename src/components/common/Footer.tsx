"use client";

import React from "react";
import RollingButton from "./RollingButton";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const year = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/trionn" },
    { name: "Instagram", url: "https://www.instagram.com/trionn.design" },
    { name: "X (Twitter)", url: "https://x.com/trionndesign" },
    { name: "Awwwards", url: "https://www.awwwards.com/trionn" },
    { name: "Dribbble", url: "https://dribbble.com/trionn" },
  ];

  return (
    <footer
      id="site-footer"
      className="site-footer relative z-2 flex min-h-screen flex-col justify-between overflow-hidden bg-[#040508] text-[#D8D8D8] border-t border-[#2F323B]/60"
    >
      <div className="tr__container flex w-full flex-col pt-24 pb-12 md:pt-36 md:pb-20 justify-between flex-1">
        {/* Top Block: Statement & CTAs */}
        <div className="grid w-full grid-cols-12 gap-10 md:gap-x-12 lg:gap-y-0 lg:mb-24">
          <div className="flex flex-col justify-between gap-6 col-span-12 lg:col-span-8">
            <div>
              <span className="title mb-4 text-xs font-mono uppercase tracking-widest text-[#9C9C9C] block">
                Let&apos;s build work that inspires.
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-none">
                Ready to build <br />
                <span className="italic font-editorial font-light text-[#E6E4E2]">something bold?</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col justify-end col-span-12 lg:col-span-4 gap-6">
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn relative flex w-full min-h-12 cursor-pointer items-center justify-between overflow-hidden px-6 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#E6E4E2] transition-colors"
              >
                <span>Discuss Your Project</span>
                <svg width="12" height="12" viewBox="0 0 10 9" fill="none" className="w-3 h-3">
                  <path d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V0L9.32372 3.836V4.816L5.47372 8.652ZM0 5.11V3.542H8.60972V5.11H0Z" fill="currentColor" />
                </svg>
              </button>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://calendly.com/hello-trionn/30min"
                className="btn relative flex w-full min-h-12 cursor-pointer items-center justify-between overflow-hidden px-6 rounded-full border border-[#2F323B] text-[#D8D8D8] font-mono text-xs uppercase tracking-wider hover:border-white transition-colors"
              >
                <span>Book a 30-min call</span>
                <svg width="12" height="12" viewBox="0 0 10 9" fill="none" className="w-3 h-3">
                  <path d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V0L9.32372 3.836V4.816L5.47372 8.652ZM0 5.11V3.542H8.60972V5.11H0Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Block: Contact Details & Socials */}
        <div className="grid w-full grid-cols-12 gap-10 lg:gap-x-12 pt-16 border-t border-[#2F323B]/50 my-auto">
          {/* Business Enquiry */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9C9C9C]">
              Business Enquiry
            </span>
            <div className="flex flex-col gap-2 font-mono text-sm">
              <a
                href="mailto:hello@trionn.com"
                className="text-white hover:text-[#9C9C9C] transition-colors"
              >
                hello@trionn.com
              </a>
              <a
                href="tel:+919824182099"
                className="text-white hover:text-[#9C9C9C] transition-colors"
              >
                +91 98241 82099
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9C9C9C]">
              Studio Location
            </span>
            <p className="text-sm text-[#9C9C9C] leading-relaxed">
              TRIONN Studio <br />
              Rajkot, Gujarat 360005, India
            </p>
          </div>

          {/* Social Links */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9C9C9C]">
              Social &amp; Platforms
            </span>
            <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-wider">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-[#9C9C9C] transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 mt-16 border-t border-[#2F323B]/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#9C9C9C] font-mono">
          <div className="flex items-center gap-3">
            <img src="/images/logo.svg" alt="TRIONN" className="w-16 h-auto opacity-70" />
            <span>©TRIONN® {year} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Made with passion in India</span>
            <span className="text-white/40">✦</span>
            <span>Independent AI Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
