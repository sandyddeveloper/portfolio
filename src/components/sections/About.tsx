"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line expand animation on scroll
      gsap.to(".about-line", {
        width: "100%",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".line-plus-block",
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="home-about relative z-10 pt-24 lg:pt-36 pb-24 min-h-screen flex flex-col justify-center bg-transparent pointer-events-none"
    >
      <div className="tr__container relative w-full pointer-events-auto">
        <div className="about-top-block flex flex-col justify-between" id="s2-text">
          {/* Main Statement (Image 2 & 3) */}
          <div className="about-title-block grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-1">
              <span className="title mt-2 block text-xs font-mono uppercase tracking-widest text-[#9C9C9C]">
                ABOUT
              </span>
            </div>
            <div className="col-span-12 md:col-span-11">
              <h2
                ref={textRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[4vw] font-display font-medium leading-[1.15] tracking-tight max-w-5xl"
              >
                <span className="text-white">
                  Trionn is an independent digital studio crafting meaningful brand experiences{" "}
                </span>
                <span className="text-[#656873]">
                  through strategy, design, and technology.
                </span>
              </h2>
            </div>
          </div>

          {/* Line Plus Divider */}
          <div className="relative line-plus-block grid grid-cols-12 gap-x-6 mt-20 lg:mt-28 mb-16 lg:mb-20">
            <div className="about-line line absolute top-1/2 left-0 -translate-y-1/2 h-px w-0 bg-[#2F323B] transition-all duration-700"></div>
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 col-start-4 sm:col-start-7 lg:col-start-9 -translate-x-1/2 relative z-10"
            >
              <line x1="6.5" y1="0" x2="6.5" y2="13" strokeWidth="1" stroke="#D8D8D8"></line>
              <line x1="0" y1="6.5" x2="13" y2="6.5" strokeWidth="1" stroke="#D8D8D8"></line>
            </svg>
          </div>

          {/* Subtitle & Mission Statement (Image 3) */}
          <div className="about-subtitle-block grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-2">
              <span className="title block text-sm sm:text-base font-display font-bold uppercase tracking-wider text-white leading-snug">
                WE DESIGN FOR LONGEVITY
                <br />
                CLARITY FIRST, CRAFT ALWAYS,
                <br />
                BUILT TO SCALE.
              </span>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-8 flex flex-col">
              <p className="mb-8 text-sm md:text-base text-[#9C9C9C] leading-relaxed">
                Our mission is to make technology feel human by designing digital products that are intuitive, purposeful, and meaningful to people.
              </p>

              {/* Trionn Signature Link Button */}
              <div className="button_wrapper relative w-48 uppercase">
                <a
                  className="btn button-text relative inline-flex items-center gap-2 pb-1 border-b border-[#D8D8D8] text-xs font-mono tracking-wider text-[#D8D8D8] hover:text-white transition-colors"
                  href="/about"
                >
                  <span className="word uppercase">MORE ABOUT US</span>
                  <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
