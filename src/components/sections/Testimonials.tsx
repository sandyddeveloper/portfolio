"use client";

import React, { useState } from "react";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    {
      name: "Stephen Dash",
      role: "Founder & CEO · USA",
      company: "Credible",
      avatar: "/images/stephen.webp",
      quote:
        "The Trionn team is extremely reliable, professional and talented. It has been a great pleasure collaborating with them over many years.",
    },
    {
      name: "Doug Petrie",
      role: "Founder & CEO · USA",
      company: "Fast Resume",
      avatar: "/images/doug.webp",
      quote:
        "Sunny and his award winning team are second to none when it comes to responsive web design. Their ability to take an idea and make it a work of art has always been a great experience. When you find companies like his you make sure to keep them close.",
    },
    {
      name: "Malte Kramer",
      role: "Founder & CEO · USA",
      company: "Luxury Presence",
      avatar: "/images/malte.webp",
      quote:
        "He's meticulous in his attention to detail and has a true passion for creating beautiful user interfaces.",
    },
    {
      name: "Jean-Baptiste Biolay",
      role: "General Manager · UAE",
      company: "Technis",
      avatar: "/images/jean.webp",
      quote:
        "Sunny and his team is very professional, with whom I am used to working on different projects. Listening, versatile, very smart, I recommend without hesitation.",
    },
    {
      name: "Zoltan Csonka",
      role: "Founder & CEO · UAE",
      company: "Ventigence",
      avatar: "/images/zoltan.webp",
      quote:
        "Trionn team did an amazing development work for my company. They were fast, flexible and very professional. If your organization needs website design, I guess you know who I would recommend to be the 1st on your list.",
    },
  ];

  return (
    <section
      id="testimonials-section"
      className="relative bg-[#040508] py-28 md:py-36 border-t border-[#2F323B]/40"
    >
      <div className="tr__container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#2F323B]/50">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-[#9C9C9C] block mb-2">
              Endorsements
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[#D8D8D8]">
              Trusted by the ambitious.
            </h2>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={`View testimonial ${idx + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIdx === idx ? "bg-white scale-125" : "bg-[#434343] hover:bg-[#9C9C9C]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Featured Testimonial Spotlight */}
        <div className="mb-12 p-8 md:p-14 rounded-2xl bg-[#111214] border border-[#2F323B]/60 shadow-2xl relative overflow-hidden transition-all duration-500">
          <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9C9C9C] mb-4 block">
                {testimonials[activeIdx].company}
              </span>
              <p className="text-xl md:text-2xl lg:text-3xl text-white font-editorial italic leading-relaxed mb-8">
                &ldquo;{testimonials[activeIdx].quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[activeIdx].avatar}
                  alt={testimonials[activeIdx].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#2F323B]"
                />
                <div>
                  <h4 className="text-base font-bold text-white font-sans">
                    {testimonials[activeIdx].name}
                  </h4>
                  <p className="text-xs text-[#9C9C9C] font-mono">
                    {testimonials[activeIdx].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Quote decoration */}
            <div className="text-8xl font-editorial text-[#2F323B]/40 select-none hidden md:block">
              &ldquo;
            </div>
          </div>
        </div>

        {/* All Client Cards Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                activeIdx === idx
                  ? "bg-[#111214] border-[#D8D8D8] shadow-lg"
                  : "bg-transparent border-[#2F323B]/40 hover:border-[#2F323B]"
              }`}
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="w-9 h-9 rounded-full object-cover border border-[#2F323B] shrink-0"
              />
              <div className="overflow-hidden">
                <h5 className="text-xs font-bold text-white truncate font-sans">
                  {item.name}
                </h5>
                <p className="text-[10px] text-[#9C9C9C] truncate font-mono">
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
