"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function KeyFacts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const counter1 = useRef<HTMLSpanElement>(null);
  const counter3 = useRef<HTMLSpanElement>(null);

  const awards = [
    "/images/awwwards.svg",
    "/images/ccda.svg",
    "/images/thefwa.svg",
    "/images/csswinner.svg",
    "/images/adesignaward.svg",
    "/images/gsap.svg",
  ];

  const partners = [
    { src: "/images/partner1.svg", width: "w-[5.5rem]" },
    { src: "/images/partner2.svg", width: "w-[6.75rem]" },
    { src: "/images/partner3.svg", width: "w-[6.5rem]" },
    { src: "/images/partner4.svg", width: "w-[6.75rem]" },
    { src: "/images/partner5.svg", width: "w-[5.625rem]" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cards stagger entrance
      gsap.from("[data-kf-card='true']", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 2. Numerical counter tweens
      const obj1 = { val: 0 };
      gsap.to(obj1, {
        val: 50,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        onUpdate: () => {
          if (counter1.current) {
            counter1.current.innerText = `${Math.floor(obj1.val)}`;
          }
        },
      });

      const obj3 = { val: 0 };
      gsap.to(obj3, {
        val: 20,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        onUpdate: () => {
          if (counter3.current) {
            counter3.current.innerText = `${Math.floor(obj3.val)}`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement | null) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotationY: x * 0.04,
      rotationX: -y * 0.04,
      transformPerspective: 1200,
      ease: "power1.out",
      duration: 0.3,
    });
  };

  const handleCardMouseLeave = (card: HTMLDivElement | null) => {
    if (!card) return;
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.5,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="keyfacts-section"
      className="pt-24 pb-20 lg:pb-36 bg-[linear-gradient(0deg,#FFFFFF_0%,#D2D2D2_100%)] relative z-20 min-h-screen"
    >
      <div className="tr__container">
        {/* Title Block (Screenshot 1) */}
        <div className="title-block flex flex-col items-center mb-12 lg:mb-20 gap-4 text-center">
          <h2 className="text-[#111214] block text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight">
            Key facts
          </h2>
          <p className="text-[#555860] small text-sm md:text-base font-sans max-w-sm">
            A snapshot of our <br />
            experience and impact.
          </p>
        </div>

        {/* 3D Perspective Cards */}
        <div className="key-card-list perspective-[1400] flex gap-6 justify-center flex-wrap lg:flex-nowrap transform-3d">
          {/* Card 1: Featured & Awards */}
          <div
            ref={card1Ref}
            data-kf-card="true"
            onMouseMove={(e) => handleCardMouseMove(e, card1Ref.current)}
            onMouseLeave={() => handleCardMouseLeave(card1Ref.current)}
            className="featured-card shrink-0 w-full sm:w-[380px] lg:w-full max-w-sm h-[500px] rounded-lg bg-black text-light-font overflow-hidden relative p-8 lg:p-10 flex flex-col justify-between shadow-2xl transform-3d will-change-transform backface-hidden cursor-pointer"
          >
            <video
              autoPlay
              src="/video/awards-card-video.mp4"
              muted
              playsInline
              loop
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover hidden md:block pointer-events-none opacity-60"
            />
            <video
              autoPlay
              src="/video/awards-card-video_m.mp4"
              muted
              playsInline
              loop
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover md:hidden pointer-events-none opacity-60"
            />

            <div className="relative z-2">
              <span className="text-light-font title block text-xs uppercase font-mono tracking-widest text-[#D8D8D8]">
                Featured &amp; Awards
              </span>
            </div>

            <div className="relative z-2">
              <div className="flex flex-wrap gap-4 items-center mb-4">
                {awards.map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    alt="Awards"
                    className="h-5 w-auto object-contain brightness-0 invert opacity-80"
                  />
                ))}
              </div>

              <div className="flex justify-between items-end gap-x-4">
                <p className="small text-xs opacity-80 text-[#D8D8D8] max-w-[170px]">
                  Featured on top design platforms worldwide.
                </p>
                <div className="flex items-baseline tabular-nums text-white text-5xl md:text-6xl font-display font-bold">
                  <span ref={counter1}>0</span>
                  <span className="text-3xl font-light ml-0.5">+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Projects Completed */}
          <div
            ref={card2Ref}
            data-kf-card="true"
            onMouseMove={(e) => handleCardMouseMove(e, card2Ref.current)}
            onMouseLeave={() => handleCardMouseLeave(card2Ref.current)}
            className="project-card relative shrink-0 w-full sm:w-[380px] lg:w-full max-w-sm h-[500px] rounded-lg bg-[#E6E4E2] p-8 lg:p-10 flex flex-col justify-between overflow-hidden text-center shadow-2xl transform-3d will-change-transform backface-hidden cursor-pointer"
          >
            <span className="title block text-dark-font text-xs uppercase font-mono tracking-widest text-[#434343]">
              projects completed
            </span>

            <div className="flex flex-col items-center justify-center flex-1 relative">
              <div className="w-44 h-44 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-inner"></div>
              <div className="relative z-2 flex items-baseline text-5xl md:text-6xl font-display font-bold text-[#434343] tabular-nums">
                <span>1.5K</span>
                <span className="text-3xl font-light ml-0.5">+</span>
              </div>
            </div>

            <p className="small text-dark-font text-xs text-[#434343] opacity-80">
              90% of our clients seek our <br />
              services for a second project.
            </p>
          </div>

          {/* Card 3: Our Team Members */}
          <div
            ref={card3Ref}
            data-kf-card="true"
            onMouseMove={(e) => handleCardMouseMove(e, card3Ref.current)}
            onMouseLeave={() => handleCardMouseLeave(card3Ref.current)}
            className="team-card shrink-0 w-full sm:w-[380px] lg:w-full max-w-sm h-[500px] rounded-lg bg-[#2F3135] text-light-font overflow-hidden relative p-8 lg:p-10 flex flex-col justify-between shadow-2xl transform-3d will-change-transform backface-hidden cursor-pointer"
          >
            <div className="relative z-3">
              <span className="title block text-right text-xs uppercase font-mono tracking-widest text-[#D8D8D8]">
                our team members
              </span>
            </div>

            <div className="team-video overflow-hidden rounded-sm my-auto h-48 w-full">
              <video
                autoPlay
                src="/video/team/rushi.mp4"
                muted
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-cover object-top rounded-sm hidden md:block"
              />
              <video
                autoPlay
                src="/video/team/rushi_m.mp4"
                muted
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-cover object-top rounded-sm md:hidden"
              />
            </div>

            <div className="relative z-3 flex items-end justify-between">
              <p className="small text-light-font/60 text-xs text-[#D8D8D8]">
                Different skills. <br />
                One standard.
              </p>
              <div className="flex items-baseline tabular-nums text-white text-5xl md:text-6xl font-display font-bold">
                <span ref={counter3}>0</span>
                <span className="text-3xl font-light ml-0.5">+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Partners */}
        <div className="partners-block mt-20 lg:mt-28 flex flex-col gap-8">
          <span className="text-black title text-center block text-xs font-mono uppercase tracking-widest text-[#434343]">
            Our business partners
          </span>
          <div className="partners-list flex flex-wrap justify-center items-center">
            {partners.map((p, i) => (
              <div
                key={i}
                className="px-6 lg:px-10 border-r border-[#434343]/15 flex justify-center items-center last:border-0"
              >
                <img src={p.src} alt={`Partner ${i}`} className={`h-auto ${p.width} opacity-80 hover:opacity-100 transition-opacity`} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Line Plus Crosshair */}
        <div className="js-kf-line-wrap tr__container relative mt-16 pt-8 border-b border-[#2F323B]/15">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="w-3.5 h-3.5 mx-auto absolute -bottom-1.5 left-1/2 -translate-x-1/2">
            <line x1="6.5" y1="0" x2="6.5" y2="13" strokeWidth="1" stroke="#272727" />
            <line x1="0" y1="6.5" x2="13" y2="6.5" strokeWidth="1" stroke="#272727" />
          </svg>
        </div>
      </div>
    </section>
  );
}
