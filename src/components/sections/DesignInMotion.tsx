"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardData {
  id: string;
  theme: "orange-ai" | "swank" | "resum" | "novaglam" | "streetwear" | "hardware" | "balkony" | "chrono" | "imagination" | "reyden";
  tag: string;
  title: string;
  subtitle?: string;
  extra?: string;
  image: string;
  accent?: string;
}

const CAROUSEL_CARDS: CardData[] = [
  {
    id: "orange-ai",
    theme: "orange-ai",
    tag: "AI EXPLORATION",
    title: "LOOSE SKETCHES TO VISUALS ©",
    subtitle: "Prompt engineering meets high-fashion silhouette",
    extra: "05",
    image: "/images/projects/novaglam/novaglam.jpg",
    accent: "#FF4D00",
  },
  {
    id: "swank",
    theme: "swank",
    tag: "BRAND EDITORIAL",
    title: "SWANK ®",
    subtitle: "STYLE DEFINES CHARACTER",
    extra: "VOL. 24",
    image: "/images/projects/8octa/8octa.jpg",
    accent: "#E5A93C",
  },
  {
    id: "resum",
    theme: "resum",
    tag: "INTERFACE DESIGN",
    title: "RESUM LABS",
    subtitle: "A place where patience and story move together",
    extra: "GRID",
    image: "/images/projects/pulse-studio/pulse-studio.jpg",
    accent: "#111214",
  },
  {
    id: "novaglam",
    theme: "novaglam",
    tag: "ART DIRECTION |",
    title: "NOVAGLAM VINTAGE FASHION STUDIO",
    subtitle: "Kinetic lookbook & immersive ecommerce",
    extra: "↗",
    image: "/images/projects/novaglam/novaglam-1.webp",
    accent: "#FF2A85",
  },
  {
    id: "streetwear",
    theme: "streetwear",
    tag: "ARCHIVE 2026",
    title: "2026 BRUTALISM",
    subtitle: "Next generation garment architecture",
    extra: "LOOKBOOK",
    image: "/images/projects/loftloom/loftloom.jpg",
    accent: "#222222",
  },
  {
    id: "hardware",
    theme: "hardware",
    tag: "HARDWARE LAB",
    title: "DESIGNED FOR EVERYTHING",
    subtitle: "Tactile acoustic controllers & haptics",
    extra: "LAB.01",
    image: "/images/projects/technis/technis.jpg",
    accent: "#00F0FF",
  },
  {
    id: "balkony",
    theme: "balkony",
    tag: "01 / BALANCE",
    title: "BALKÓNY AUDIO MUSIC",
    subtitle: "Tactile rotary synthesizer interface",
    extra: "DIAL",
    image: "/images/projects/crowd-mouth/crowd-mouth.jpg",
    accent: "#FF6600",
  },
  {
    id: "chrono",
    theme: "chrono",
    tag: "SMART HOROLOGY",
    title: "CHRONO OS SERIES 9",
    subtitle: "Biometric titanium smart device interface",
    extra: "SERIES 9",
    image: "/images/projects/techno/techno.jpg",
    accent: "#E2E8F0",
  },
  {
    id: "imagination",
    theme: "imagination",
    tag: "CREATIVE DIRECTION",
    title: "WE BRING IMAGINATION TO LIFE",
    subtitle: "Architectural coastal sanctuary identity",
    extra: "EDITORIAL",
    image: "/images/projects/shore/shore.jpg",
    accent: "#8C7B6B",
  },
  {
    id: "reyden",
    theme: "reyden",
    tag: "ARCHITECTURE",
    title: "REYDEN RESIDENCE",
    subtitle: "Brutalist concrete dwelling in desert hills",
    extra: "MONOLITH",
    image: "/images/projects/reyden/reyden.jpg",
    accent: "#D4AF37",
  },
];

export default function DesignInMotion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const ribbonContainerRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLDivElement>(null);
  const titleRightRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const arcPath1Ref = useRef<SVGPathElement>(null);
  const arcPath2Ref = useRef<SVGPathElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const ribbonContainer = ribbonContainerRef.current;
    const titleLeft = titleLeftRef.current;
    const titleRight = titleRightRef.current;
    const subtitle = subtitleRef.current;

    if (!section || !viewport || !ribbonContainer || !titleLeft || !titleRight || !subtitle) return;

    const ctx = gsap.context(() => {
      const cardEls = ribbonContainer.querySelectorAll<HTMLDivElement>(".dim-card");

      // Math for parametric ribbon curve
      // Matches Trionn's exact curve: low at left, sweeping up to center-right, gently sloping
      const updateCards = (progress: number) => {
        const isMobile = window.innerWidth < 768;
        const winW = window.innerWidth;
        const wSpread = isMobile ? winW * 0.42 : Math.min(winW * 0.48, 680);
        // Total travel distance across the ribbon during the scroll
        const totalTravel = 2.5;

        cardEls.forEach((card, idx) => {
          // Staggered base position along ribbon curve
          // Spacing of 0.35 puts ~6-7 cards comfortably across the screen at any moment
          const baseOffset = -0.55 + idx * 0.35;
          const s = baseOffset - progress * totalTravel;

          // If far offscreen, hide cleanly
          if (Math.abs(s) > 1.55) {
            card.style.opacity = "0";
            card.style.pointerEvents = "none";
            return;
          }

          // X: spreads horizontally across viewport
          const x = s * wSpread;
          // Y: gentle curve, dipping on left, rising toward right, concave downward
          const y = -s * 32 - s * s * 24;
          // Z: convex curve — center cards closest to camera (+200px), edges recede (-400px)
          const z = 180 - s * s * 340;
          // rotateY: cards always face mostly forward! Max rotation is ~24 degrees at screen edge
          // NEVER turns 90 degrees edge-on!
          const ry = -s * 22;
          // rotateX: gentle upward tilt so camera looks slightly down onto card faces
          const rx = 8;
          // rotateZ: cohesive subtle diagonal tilt matching Trionn
          const rz = -7;

          // Smooth edge opacity fade
          let op = 1;
          if (Math.abs(s) > 1.05) {
            op = Math.max(0, 1 - (Math.abs(s) - 1.05) / 0.4);
          }

          // Depth-based z-index ensures cards in front naturally overlap cards behind
          const zIndex = Math.round(100 + z);

          card.style.opacity = `${op}`;
          card.style.zIndex = `${zIndex}`;
          card.style.pointerEvents = op > 0.6 ? "auto" : "none";
          card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rx}deg) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz}deg)`;
        });
      };

      // Initial card positioning at progress = 0
      updateCards(0);

      // SVG arc paths setup
      const arc1 = arcPath1Ref.current;
      const arc2 = arcPath2Ref.current;
      if (arc1) {
        const len1 = arc1.getTotalLength();
        arc1.style.strokeDasharray = `${len1}`;
        arc1.style.strokeDashoffset = `${len1}`;
      }
      if (arc2) {
        const len2 = arc2.getTotalLength();
        arc2.style.strokeDasharray = `${len2}`;
        arc2.style.strokeDashoffset = `${len2}`;
      }

      // Main Pinned Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=360%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.85,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateCards(self.progress);
          },
        },
        defaults: { ease: "none" },
      });

      // 1. Top Divider Line animation
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.12 },
          0
        );
      }

      // 2. Subtitle Fade In
      tl.fromTo(
        subtitle,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.1 },
        0.02
      );

      // 3. Bottom Bar Fade In
      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1 },
          0.04
        );
      }

      // 4. SVG Decorative Arcs draw on scroll
      if (arc1) {
        tl.to(arc1, { strokeDashoffset: 0, duration: 0.4 }, 0.05);
      }
      if (arc2) {
        tl.to(arc2, { strokeDashoffset: 0, duration: 0.45 }, 0.08);
      }

      // 5. CONTINUOUS OPPOSITE-DIRECTION SLIDING TYPOGRAPHY
      // "DESIGN IN" slides from left (-32vw) across to right (+32vw)
      const travelDistance = window.innerWidth < 768 ? "26vw" : "32vw";
      tl.fromTo(
        titleLeft,
        { x: `-${travelDistance}`, opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      tl.to(
        titleLeft,
        { x: travelDistance, duration: 1.0 },
        0
      );

      // "MOTION" slides from right (+32vw) across to left (-32vw)
      tl.fromTo(
        titleRight,
        { x: travelDistance, opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      tl.to(
        titleRight,
        { x: `-${travelDistance}`, duration: 1.0 },
        0
      );

      // 6. Graceful Exit Fade at the very end
      tl.to(
        [titleLeft, titleRight, subtitle, bottomBarRef.current, ribbonContainer],
        { opacity: 0, duration: 0.08 },
        0.92
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="design-in-motion"
      className="relative z-20 bg-[#E1E0DC] min-h-dvh select-none"
    >
      <div
        ref={viewportRef}
        className="relative w-full h-dvh overflow-hidden"
      >
        {/* Layer 1: Top Hairline Divider with Centered + Crosshair */}
        <div className="absolute top-14 md:top-20 left-0 right-0 z-30 px-6 md:px-12">
          <div
            ref={lineRef}
            className="w-full h-px bg-[#BDBDBB] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="6.5" y1="0" x2="6.5" y2="13" strokeWidth="1" stroke="#888886" />
              <line x1="0" y1="6.5" x2="13" y2="6.5" strokeWidth="1" stroke="#888886" />
            </svg>
          </div>
        </div>

        {/* Layer 2: Decorative Hand-Drawn SVG Arc Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Upper swoop behind "DESIGN IN" */}
          <path
            ref={arcPath1Ref}
            d="M 120 130 C 450 60, 750 250, 1150 180 S 1650 80, 1920 150"
            stroke="#ADACA8"
            strokeWidth="1"
            fill="none"
            opacity="0.45"
          />
          {/* Lower swoop curving behind the ribbon */}
          <path
            ref={arcPath2Ref}
            d="M 220 680 C 650 820, 1100 620, 1480 710 S 1850 620, 2050 590"
            stroke="#B5B4B0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.35"
          />
        </svg>

        {/* Layer 3: Split Typography (Opposite Direction Sliding Parallax) */}
        {/* "DESIGN IN" — sliding from Left to Right (Upper Tier) */}
        <div
          ref={titleLeftRef}
          className="absolute top-[17%] md:top-[19%] left-0 right-0 z-10 pointer-events-none flex justify-center"
          style={{ opacity: 0 }}
        >
          <h2
            className="text-[#262628] font-display font-black uppercase leading-[0.82] tracking-tighter whitespace-nowrap"
            style={{ fontSize: "clamp(4.5rem, 13vw, 14.5rem)" }}
          >
            DESIGN IN
          </h2>
        </div>

        {/* Center Subtitle — Centered between the two sliding titles */}
        <div
          ref={subtitleRef}
          className="absolute top-[37%] md:top-[39%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center"
          style={{ opacity: 0 }}
        >
          <p className="text-[10px] md:text-xs font-mono tracking-[0.22em] uppercase text-[#6B6B6D] leading-relaxed whitespace-nowrap">
            EXPLORING IDEAS THROUGH
            <br />
            DAILY DESIGN PRACTICE.
          </p>
        </div>

        {/* "MOTION" — sliding from Right to Left (Middle Tier) */}
        <div
          ref={titleRightRef}
          className="absolute top-[44%] md:top-[46%] left-0 right-0 z-10 pointer-events-none flex justify-center"
          style={{ opacity: 0 }}
        >
          <h2
            className="text-[#262628] font-display font-black uppercase leading-[0.82] tracking-tighter whitespace-nowrap"
            style={{ fontSize: "clamp(4.5rem, 13vw, 14.5rem)" }}
          >
            MOTION
          </h2>
        </div>

        {/* Layer 4: 3D Curved Ribbon of Dribbble Cards (Lower Tier) */}
        {/* Anchored at top: 68% so cards never cover "DESIGN IN" or the top bar! */}
        <div
          className="absolute top-[67%] md:top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-20 pointer-events-none"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 30%",
          }}
        >
          <div
            ref={ribbonContainerRef}
            className="relative"
            style={{
              width: "1px",
              height: "1px",
              transformStyle: "preserve-3d",
            }}
          >
            {CAROUSEL_CARDS.map((card) => {
              return (
                <div
                  key={card.id}
                  className="dim-card absolute will-change-transform pointer-events-auto"
                  style={{
                    width: "clamp(260px, 22vw, 340px)",
                    height: "clamp(340px, 28vw, 440px)",
                    left: "50%",
                    top: "50%",
                    marginLeft: "calc(-1 * clamp(260px, 22vw, 340px) / 2)",
                    marginTop: "calc(-1 * clamp(340px, 28vw, 440px) / 2)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    opacity: 0,
                  }}
                >
                  {/* Card Body with Custom High-End Styling */}
                  {card.theme === "orange-ai" ? (
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] bg-[#F8F7F4] border border-black/[0.08] p-4 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] cursor-pointer">
                      <div className="flex justify-between items-start">
                        <span className="font-display font-black text-4xl text-[#111214] leading-none">AI</span>
                        <div className="text-right">
                          <p className="text-[9px] font-mono uppercase tracking-wider text-[#FF4D00] font-bold">LOOSE SKETCHES</p>
                          <p className="text-[8px] font-mono text-[#888]">TO VISUALS ©</p>
                        </div>
                      </div>
                      <div className="relative my-2 flex-1 rounded-xl overflow-hidden bg-orange-100">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex justify-between items-end pt-1">
                        <div>
                          <p className="text-xl font-serif text-[#FF4D00] leading-none">“</p>
                          <p className="text-[9px] font-mono text-[#555] leading-tight max-w-[160px]">Style exploration through generative prompts</p>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#888]">05</span>
                      </div>
                    </div>
                  ) : card.theme === "swank" ? (
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.22)] bg-[#1F1B18] border border-white/10 p-4 text-white flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono tracking-wider uppercase text-[#E5A93C]">EDITORIAL VOL. 24</span>
                        <span className="text-[9px] font-mono opacity-40">2026</span>
                      </div>
                      <div className="relative my-2 flex-1 rounded-xl overflow-hidden bg-[#2D2622]">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-2xl tracking-tighter uppercase leading-none text-white">SWANK ®</h3>
                        <p className="text-[10px] font-mono text-[#E5A93C] tracking-wide mt-1 uppercase">STYLE DEFINES CHARACTER</p>
                      </div>
                    </div>
                  ) : card.theme === "resum" ? (
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] bg-white border border-black/[0.08] p-4 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#111214] font-bold">RESUM</span>
                        <span className="text-[9px] font-mono text-[#888]">GRID / V2</span>
                      </div>
                      <div className="relative my-2 flex-1 rounded-xl overflow-hidden border border-black/[0.04]">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                        {/* Target reticle decoration */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                          <div className="w-24 h-24 rounded-full border border-white/60 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-[#666] leading-tight">
                          A PLACE WHERE PATIENCE AND STORY MOVE TOGETHER
                        </p>
                      </div>
                    </div>
                  ) : card.theme === "novaglam" ? (
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] bg-gradient-to-br from-[#2D0B28] via-[#1A061B] to-[#0A020D] border border-pink-500/20 p-4 text-white flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono tracking-wider text-pink-400">↗ ART DIRECTION |</span>
                        <span className="text-[9px] font-mono text-pink-300/40">LOOKBOOK</span>
                      </div>
                      <div className="relative my-2 flex-1 rounded-xl overflow-hidden">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A061B]/80 via-transparent to-transparent" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base tracking-tight uppercase leading-snug text-white">
                          NOVAGLAM VINTAGE FASHION STUDIO
                        </h3>
                      </div>
                    </div>
                  ) : card.theme === "streetwear" ? (
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] bg-[#F2F2F2] border border-black/[0.08] p-4 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono tracking-wider text-[#666]">STREETWEAR</span>
                        <span className="text-[9px] font-mono text-[#999]">ISSUE 04</span>
                      </div>
                      <div className="relative my-2 flex-1 rounded-xl overflow-hidden">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex justify-between items-end">
                        <h3 className="font-display font-black text-3xl tracking-tighter text-[#111214] leading-none">2026</h3>
                        <span className="text-[8px] font-mono text-[#888] uppercase">ARCHITECTURE</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-[#141416] border border-white/10 p-4 text-white flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.accent || "#999" }} />
                          <span className="text-[9px] font-mono tracking-wider uppercase opacity-60">{card.tag}</span>
                        </div>
                        <span className="text-[9px] font-mono opacity-40">{card.extra}</span>
                      </div>
                      <div className="relative my-2 flex-1 rounded-xl overflow-hidden bg-black/20">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-sm tracking-tight uppercase line-clamp-1">{card.title}</h3>
                        {card.subtitle && (
                          <p className="mt-0.5 text-[9px] font-mono opacity-50 line-clamp-1">{card.subtitle}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Layer 5: Bottom Bar */}
        <div
          ref={bottomBarRef}
          className="absolute bottom-6 md:bottom-10 left-0 right-0 z-30 px-6 md:px-12 flex justify-between items-end pointer-events-none"
          style={{ opacity: 0 }}
        >
          {/* Left: Description */}
          <p className="text-[10px] md:text-xs font-mono text-[#555557] max-w-[240px] md:max-w-xs leading-relaxed">
            Concepts, explorations, and interface
            <br className="hidden md:block" />
            {" "}experiments shared openly as part of
            <br className="hidden md:block" />
            {" "}our creative process.
          </p>

          {/* Right: Dribbble CTA */}
          <a
            href="https://dribbble.com/trionndesign"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-wider text-[#262628] border-b border-[#262628] pb-0.5 hover:opacity-60 transition-opacity pointer-events-auto"
          >
            <span>VIEW ON DRIBBBLE</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
