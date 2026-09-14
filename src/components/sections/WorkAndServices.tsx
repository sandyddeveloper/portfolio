"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Services from "./Services";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  title: string;
  subTitle: string;
  image: string;
  slug: string;
}

const homeProjects: Project[] = [
  {
    title: "MyWorker AI",
    subTitle: "AI platform simplifying hiring, management, and workforce scaling.",
    image: "/images/projects/myworker/myworker.jpg",
    slug: "myworker-ai",
  },
  {
    title: "Pulse Studio",
    subTitle: "A motion-led studio website showcasing artists, projects, and culture.",
    image: "/images/projects/pulse-studio/pulse-studio.jpg",
    slug: "pulse-studio",
  },
  {
    title: "Loftloom",
    subTitle: "Seamless real estate platform for effortless property discovery.",
    image: "/images/projects/loftloom/loftloom.jpg",
    slug: "loftloom",
  },
];

export default function WorkAndServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const worksLayerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const servicesLayerRef = useRef<HTMLDivElement>(null);
  const servicesProgressRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const worksLayer = worksLayerRef.current;
    const track = trackRef.current;
    const servicesLayer = servicesLayerRef.current;
    if (!container || !worksLayer || !track || !servicesLayer) return;

    let st: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // Track horizontal distance
        const getMaxScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);

        // Pin the entire master work-section container
        st = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "+=950%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const maxScroll = getMaxScroll();

            // Phase 1: Works horizontal scrolling (0.0 -> 0.32)
            if (p <= 0.32) {
              const k = p / 0.32;
              gsap.set(track, { x: -k * maxScroll });
              gsap.set(worksLayer, { x: 0 });
              servicesProgressRef.current = 0;
            }
            // Phase 2: Works slide reveal to Services (0.32 -> 0.44) -> SCREENSHOT 1 & 2
            else if (p > 0.32 && p <= 0.44) {
              const m = (p - 0.32) / 0.12;
              gsap.set(track, { x: -maxScroll });
              // Slide works layer to the left, uncovering Services underneath!
              gsap.set(worksLayer, { x: -window.innerWidth * m });
              servicesProgressRef.current = 0;
            }
            // Phase 3: Services light-to-dark transition & 3D Stone sequence (0.44 -> 1.0) -> SCREENSHOTS 3, 4, 5
            else {
              gsap.set(track, { x: -maxScroll });
              gsap.set(worksLayer, { x: -window.innerWidth });
              const servT = (p - 0.44) / 0.56;
              servicesProgressRef.current = Math.min(1, Math.max(0, servT));
            }
          },
        });

        // Parallax lift on card containers
        const cardInners = track.querySelectorAll(".js-work-card-inner");
        cardInners.forEach((inner, idx) => {
          gsap.set(inner, { y: 30 });
        });
      } else {
        // Mobile fallback: normal scroll, Services pins itself
        gsap.set([worksLayer, track], { clearProps: "all" });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (st) st.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="work-section"
      className="relative z-20 w-full min-h-screen bg-black max-md:overflow-visible md:min-h-dvh md:h-dvh md:overflow-hidden"
    >
      {/* Layer 1: Selected Works Horizontal Showcase (z-10) */}
      <div
        ref={worksLayerRef}
        className="relative md:absolute md:inset-0 z-10 min-h-dvh overflow-visible pointer-events-none will-change-transform bg-white"
      >
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row h-auto md:h-screen flex-nowrap items-center will-change-transform w-full md:w-max pointer-events-auto"
        >
          {/* Panel 1: Introductory Title */}
          <div className="relative flex w-full md:w-[50vw] shrink-0 h-auto md:h-full flex-col justify-center items-center px-8 md:px-16 py-24 md:py-0 border-r border-[#2F323B]/10 bg-white">
            <div className="title-block flex flex-col items-center text-center gap-8 md:gap-10">
              <h2 className="text-[#111214] text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight leading-[1.15]">
                Selected work <br />
                &amp; explorations
              </h2>

              <div className="whitespace-nowrap">
                <a
                  href="/work"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#111214] border-b border-[#111214] pb-1 hover:opacity-70 transition-opacity"
                >
                  <span>VIEW ALL PROJECTS</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Plus Crosshair on Divider */}
            <div className="absolute right-0 top-0 bottom-0 h-full w-px pointer-events-none hidden md:block">
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible z-30"
              >
                <line x1="6.5" y1="0" x2="6.5" y2="13" strokeWidth="1" stroke="#2F323B" />
                <line x1="0" y1="6.5" x2="13" y2="6.5" strokeWidth="1" stroke="#2F323B" />
              </svg>
            </div>
          </div>

          {/* Panels 2, 3, 4: Projects (MyWorker AI, Pulse Studio, Loftloom) */}
          {homeProjects.map((project, index) => (
            <div
              key={project.slug}
              className="js-work-card relative flex w-full md:w-[50vw] shrink-0 h-auto md:h-full flex-col justify-center px-8 md:px-16 py-12 md:py-0 border-r border-[#2F323B]/10 bg-white"
            >
              <div className="js-card-line hidden md:block absolute left-0 top-0 h-full w-px bg-[#2F323B]/10 origin-top" />

              <div className="js-work-card-inner flex flex-col gap-6 md:gap-8 will-change-transform max-w-lg mx-auto w-full">
                <a
                  href={`/work/${project.slug}`}
                  className="group block relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#EBEBEB]"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <div className="flex flex-col">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#111214] tracking-tight">
                      {project.title}
                    </h3>

                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#111214] border-b border-[#111214] pb-0.5 group-hover:opacity-70 transition-opacity">
                      <span>EXPLORE PROJECT</span>
                      <span>→</span>
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-[#666870] leading-relaxed font-sans max-w-md">
                    {project.subTitle}
                  </p>
                </div>
              </div>

              {/* Plus Crosshair on Divider */}
              <div className="absolute right-0 top-0 bottom-0 h-full w-px pointer-events-none hidden md:block">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible z-30"
                >
                  <line x1="6.5" y1="0" x2="6.5" y2="13" strokeWidth="1" stroke="#2F323B" />
                  <line x1="0" y1="6.5" x2="13" y2="6.5" strokeWidth="1" stroke="#2F323B" />
                </svg>
              </div>
            </div>
          ))}

          {/* Panel 5: Discover Complete Collection (Screenshot 1 left half) */}
          <div className="js-work-card relative flex w-full md:w-[50vw] shrink-0 h-auto md:h-full items-center justify-center px-8 md:px-16 py-24 md:py-0 bg-white">
            <div className="js-card-line hidden md:block absolute left-0 top-0 h-full w-px bg-[#2F323B]/10 origin-top" />

            <div className="js-work-card-inner w-full max-w-md flex flex-col items-center justify-center text-center gap-8 will-change-transform">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-[#111214] leading-snug tracking-tight">
                Discover our complete collection of digital experiences, brands, and platforms.
              </h3>

              <div className="whitespace-nowrap">
                <a
                  href="/work"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#111214] border-b border-[#111214] pb-1 hover:opacity-70 transition-opacity"
                >
                  <span>VIEW ALL PROJECTS</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Plus Crosshair on Divider */}
            <div className="absolute right-0 top-0 bottom-0 h-full w-px pointer-events-none hidden md:block">
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible z-30"
              >
                <line x1="6.5" y1="0" x2="6.5" y2="13" strokeWidth="1" stroke="#2F323B" />
                <line x1="0" y1="6.5" x2="13" y2="6.5" strokeWidth="1" stroke="#2F323B" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2: Services Section (z-1, revealed as Layer 1 slides to the left) */}
      <div
        ref={servicesLayerRef}
        className="relative md:absolute md:inset-0 z-1 will-change-transform min-h-dvh"
      >
        <Services scrollProgressRef={servicesProgressRef} embedded={true} />
      </div>
    </div>
  );
}
