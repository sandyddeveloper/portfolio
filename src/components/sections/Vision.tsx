"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Horizontal marquee continuous drift
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 18,
        ease: "none",
      });

      // 2. Exact Trionn shutter stripes animation with ScrollTrigger pin (Image 5)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          pinSpacing: true,
        },
        defaults: { ease: "none" },
      });

      tl.addLabel("stripes_start");
      for (let i = 0; i < 5; i++) {
        const start = (0.3 * (4 - i)) / 4;
        const end = start + 0.3;
        const el = stripesRef.current[i];
        if (el) {
          tl.to(
            el,
            {
              scaleY: 1,
              duration: end - start,
              ease: "none",
            },
            `stripes_start+=${start}`
          );
        }
      }
      tl.to({}, { duration: 0.1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision-section"
      className="relative min-h-screen overflow-visible bg-transparent pointer-events-none"
    >
      <div
        id="s3-text"
        className="relative z-20 w-full min-h-screen flex flex-col justify-between bg-transparent text-left overflow-hidden items-center py-20 lg:py-24 text-white"
      >
        {/* Section Headline (Image 4 top left) */}
        <div className="tr__container w-full grid grid-cols-12 gap-x-6">
          <div className="lg:col-start-2 col-span-12 lg:col-span-11">
            <span className="vision-title title block text-xs font-mono uppercase tracking-widest text-[#9C9C9C] leading-relaxed">
              FOCUSED VISION.
              <br />
              MEASURED EXECUTION.
            </span>
          </div>
        </div>

        {/* Marquee Wrapper across center with re-assembled 3D model behind it (Image 4) */}
        <div className="relative z-10 flex flex-col justify-center items-start py-12 lg:py-20 w-full overflow-hidden">
          <div className="relative overflow-hidden w-full marquee-wrapper">
            <div className="marquee-track flex whitespace-nowrap will-change-transform w-max select-none">
              {Array.from({ length: 3 }).map((_, loopIdx) => (
                <div key={loopIdx} className="shrink-0 flex items-center">
                  <div className="uppercase marquee-text flex items-center text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-display font-bold tracking-tight text-white">
                    <span className="marquee-text-item">INSPIRE</span>
                    <span className="mx-6 sm:mx-10 lg:mx-16 font-light text-4xl sm:text-6xl md:text-8xl text-white/80">
                      +
                    </span>

                    <span className="marquee-text-item">INNOVATE</span>
                    <span className="mx-6 sm:mx-10 lg:mx-16 font-light text-4xl sm:text-6xl md:text-8xl text-white/80">
                      +
                    </span>

                    <span className="marquee-text-item">IMPACT</span>
                    <span className="mx-6 sm:mx-10 lg:mx-16 font-light text-4xl sm:text-6xl md:text-8xl text-white/80">
                      +
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline (Image 4 bottom center) */}
        <div className="tr__container w-full grid grid-cols-12 gap-x-6 pb-6 lg:pb-10">
          <span className="title z-3 col-span-12 text-center text-xs font-mono uppercase tracking-widest text-[#9C9C9C]">
            ✦ FROM IDEA TO OUTCOME.
          </span>
        </div>
      </div>

      {/* Vertical Shutter Stripes - Light grey #D2D2D2 wipe transitioning into KeyFacts (Image 5) */}
      <div className="stripes-container absolute inset-0 pointer-events-none flex flex-col w-full h-screen z-30">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              stripesRef.current[i] = el;
            }}
            className="stripe-item flex-1 w-full h-full bg-[#D2D2D2]"
            style={{
              willChange: "transform",
              transform: "scaleY(0)",
              transformOrigin: "bottom",
              marginTop: i > 0 ? "-1px" : undefined,
              paddingBottom: "1px",
            }}
          />
        ))}
      </div>
    </section>
  );
}
