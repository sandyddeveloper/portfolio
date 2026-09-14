"use client";

import React from "react";
import RollingButton from "./RollingButton";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function MenuDrawer({ isOpen, onClose, onOpenContact }: MenuDrawerProps) {
  const menuItems = [
    { label: "Work", href: "#works-section" },
    { label: "Services", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#", isContact: true },
  ];

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/trionnstudio/" },
    { label: "Dribbble", href: "https://dribbble.com/trionnstudio" },
    { label: "Instagram", href: "https://www.instagram.com/trionnstudio/" },
    { label: "Facebook", href: "https://www.facebook.com/trionnstudio/" },
  ];

  return (
    <div
      className={`fixed inset-0 z-100 flex justify-end transition-all duration-700 pointer-events-none ${
        isOpen ? "pointer-events-auto" : ""
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`relative z-10 w-full md:max-w-md h-full bg-white text-[#272727] p-8 md:p-12 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col justify-between ${
          isOpen
            ? "clip-circle-open opacity-100"
            : "clip-circle-closed opacity-0"
        }`}
      >
        <div>
          {/* Close button */}
          <div className="flex justify-end mb-12">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full border border-black/20 hover:border-black text-black transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-6 mb-12">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                {item.isContact ? (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenContact();
                    }}
                    className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-[#272727] hover:text-[#9C9C9C] transition-colors"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-[#272727] hover:text-[#9C9C9C] transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mb-12">
            <a
              href="#"
              className="inline-block py-2 px-4 rounded-full border border-black/30 text-xs uppercase tracking-wider text-[#272727] hover:border-black transition-colors"
            >
              ✦ The TRIONN name Story
            </a>
          </div>
        </div>

        {/* Footer info inside menu */}
        <div className="pt-8 border-t border-black/10">
          <div className="mb-6">
            <span className="text-[10px] uppercase font-mono text-[#9C9C9C] block mb-2">
              Business Enquiry
            </span>
            <p className="text-sm font-medium">
              E: <a href="mailto:hello@trionn.com" className="underline">hello@trionn.com</a>
            </p>
            <p className="text-sm font-medium text-[#434343]">
              P: +91 98241 82099
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-[#9C9C9C] block mb-2">
              Social
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#272727]">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
