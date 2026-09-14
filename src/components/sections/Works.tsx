"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // Calculate exact horizontal scroll distance
        const getScrollDistance = () => track.scrollWidth - window.innerWidth;

        // Pinned horizontal track scroll (Screenshots 2 -> 3 -> 4 -> 5)
        const scrollTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Parallax lift on card containers as they enter from right to left
        const cardInners = track.querySelectorAll(".js-work-card-inner");
        cardInners.forEach((inner) => {
          gsap.fromTo(
            inner,
            { y: 50 },
            {
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: inner,
                containerAnimation: scrollTween,
                start: "left right",
                end: "center center",
                scrub: true,
              },
            }
          );
        });

        // Vertical dividing lines reveal
        const cardLines = track.querySelectorAll(".js-card-line");
        cardLines.forEach((line) => {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: line,
                containerAnimation: scrollTween,
                start: "left right",
                end: "left center",
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works-section"
      className="relative w-full min-h-screen bg-white text-[#111214] overflow-hidden select-none z-20"
    >
      {/* Horizontal Track Container */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row h-auto md:h-screen flex-nowrap items-center will-change-transform w-full md:w-max"
      >
        {/* 1. Introductory Title Panel (Screenshot 2 left side) */}
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

          {/* Plus Crosshair on Divider (Screenshot 2) */}
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

        {/* 2, 3, 4. Project Panels (Screenshots 2, 3, 4) */}
        {homeProjects.map((project, idx) => (
          <div
            key={idx}
            className="js-work-card relative flex w-full md:w-[50vw] shrink-0 h-auto md:h-full items-center justify-center px-6 md:px-12 lg:px-16 py-12 md:py-0 border-r border-[#2F323B]/10 bg-white"
          >
            {/* Vertical divider line */}
            <div className="js-card-line hidden md:block absolute left-0 top-0 h-full w-px bg-[#2F323B]/10 origin-top" />

            <div className="js-work-card-inner w-full max-w-[560px] flex flex-col will-change-transform">
              {/* Project Card Link */}
              <a
                href={`/work/${project.slug}`}
                className="group relative block w-full no-underline text-inherit cursor-pointer"
              >
                {/* Media Container with Rounded Corners */}
                <div className="relative w-full aspect-[16/10.5] overflow-hidden rounded-2xl bg-black shadow-md transition-shadow duration-500 group-hover:shadow-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Project Metadata below Image */}
                <div className="mt-6 flex flex-col">
                  <div className="flex flex-row justify-between items-baseline gap-4">
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-[#111214] tracking-tight">
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
              </a>
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

        {/* 5. End Panel: Discover Complete Collection (Screenshot 5) */}
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
    </section>
  );
}
