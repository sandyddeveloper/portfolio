"use client";

import React, { useState } from "react";
import RollingButton from "../common/RollingButton";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Website Design & Development",
    budget: "$15K - $30K",
    brief: "",
  });

  const services = [
    "Website Design & Development",
    "UI/UX Design",
    "Web Development",
    "Mobile App Design",
    "Branding & Identity",
    "AI-Powered Digital Product",
  ];

  const budgets = [
    "Under $5K",
    "$5K - $15K",
    "$15K - $30K",
    "$30K - $60K",
    "$60K+",
    "Not sure yet",
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

      {/* Drawer Panel with Circular Clip Path */}
      <div
        className={`relative z-10 w-full md:max-w-xl h-full bg-white text-[#272727] p-8 md:p-12 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col justify-between ${
          isOpen
            ? "clip-circle-open opacity-100"
            : "clip-circle-closed opacity-0"
        }`}
      >
        <div>
          {/* Header & Close Button */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-[#9C9C9C] block mb-1">
                Contact TRIONN
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#272727]">
                Let&apos;s build something great.
              </h2>
            </div>
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

          <p className="text-xs text-[#434343] mb-8">
            Tell us about your project. We usually reply within one business day.
          </p>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Inquiry submitted successfully!");
              onClose();
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <input
                type="text"
                placeholder="Full Name *"
                required
                className="w-full bg-transparent border border-black/15 rounded-lg px-4 py-3 text-sm text-[#272727] placeholder:text-[#434343]/60 focus:border-black outline-none transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address *"
                required
                className="w-full bg-transparent border border-black/15 rounded-lg px-4 py-3 text-sm text-[#272727] placeholder:text-[#434343]/60 focus:border-black outline-none transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Company / Website name"
                className="w-full bg-transparent border border-black/15 rounded-lg px-4 py-3 text-sm text-[#272727] placeholder:text-[#434343]/60 focus:border-black outline-none transition-colors"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            {/* Service Select */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#434343] mb-1">
                Select a Service
              </label>
              <select
                className="w-full bg-transparent border border-black/15 rounded-lg px-4 py-3 text-sm text-[#272727] outline-none"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                {services.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Select */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#434343] mb-1">
                Estimated Budget
              </label>
              <select
                className="w-full bg-transparent border border-black/15 rounded-lg px-4 py-3 text-sm text-[#272727] outline-none"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                {budgets.map((b, i) => (
                  <option key={i} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Brief */}
            <div>
              <textarea
                rows={3}
                placeholder="Share a little about your goals, timeline, and requirements..."
                className="w-full bg-transparent border border-black/15 rounded-lg px-4 py-3 text-sm text-[#272727] placeholder:text-[#434343]/60 focus:border-black outline-none resize-none"
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-black text-white text-xs uppercase font-medium tracking-widest hover:bg-black/90 transition-colors mt-2"
            >
              Send Inquiry
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <span className="h-px flex-1 bg-black/10" />
            <span className="text-xs uppercase text-[#434343]/60">OR</span>
            <span className="h-px flex-1 bg-black/10" />
          </div>

          {/* Calendly Booking Link */}
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg border border-black bg-[#E6E4E2] text-xs font-medium uppercase tracking-wider text-[#272727] hover:bg-black hover:text-white transition-colors"
          >
            <span>📅 Book a 30-minute call</span>
          </a>
        </div>

        {/* Footer info */}
        <div className="text-center pt-6 text-[11px] text-[#434343]/70 font-mono">
          Prefer email?{" "}
          <a href="mailto:hello@trionn.com" className="text-black underline">
            hello@trionn.com
          </a>
        </div>
      </div>
    </div>
  );
}
