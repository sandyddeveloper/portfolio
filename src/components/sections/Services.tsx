"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 6 Authentic SVG Icons reverse-engineered from TRIONN
const CARD_SVGS: string[][] = [
  [
    "M35.9,59.8V.5",
    "M30,59.7V.4",
    "M6.4,59.8V.5",
    "M59.5,59.7V.4",
    "M53.6,59.7V.4",
    "M47.7,59.7V.4",
    "M41.8,59.7V.4",
    "M24.1,59.7V.3",
    "M18.2,59.7V.4",
    "M12.3,59.7V.4",
    "M.5,59.7V.4",
  ],
  [
    "M.6,30c0,16.2,13.2,29.4,29.4,29.4s29.4-13.2,29.4-29.4S46.2.6,30,.6.6,13.8.6,30Z",
    "M6.6,30c0,12.9,10.5,23.4,23.4,23.4s23.4-10.5,23.4-23.4S42.9,6.6,30,6.6,6.6,17.1,6.6,30Z",
    "M12.6,30c0,9.6,7.8,17.4,17.4,17.4s17.4-7.8,17.4-17.4-7.8-17.4-17.4-17.4-17.4,7.8-17.4,17.4Z",
    "M18.6,30c0,6.3,5.1,11.4,11.4,11.4s11.4-5.1,11.4-11.4-5.1-11.4-11.4-11.4-11.4,5.1-11.4,11.4Z",
    "M24.6,30c0,3,2.4,5.4,5.4,5.4s5.4-2.4,5.4-5.4-2.4-5.4-5.4-5.4-5.4,2.4-5.4,5.4Z",
  ],
  [
    "M.6,59.2c0,.1.1.3.3.3h58.3c.1,0,.3-.1.3-.3V.9c0-.1-.1-.3-.3-.3H.8c-.1,0-.3.1-.3.3v58.3h0Z",
    "M6.6,53.2c0,.1,0,.2.2.2h46.4c.1,0,.2,0,.2-.2V6.8c0-.1,0-.2-.2-.2H6.8c-.1,0-.2,0-.2.2v46.4h0Z",
    "M12.6,47.2c0,.1.1.3.3.3h34.3c.1,0,.3-.1.3-.3V12.9c0-.1-.1-.3-.3-.3H12.8c-.1,0-.3.1-.3.3v34.3h0Z",
    "M18.6,41.2c0,.1.1.2.2.2h22.3c.1,0,.2-.1.2-.2v-22.3c0-.1-.1-.2-.2-.2h-22.3c-.1,0-.2.1-.2.2v22.3h0Z",
    "M24.6,35.2c0,.1,0,.2.2.2h10.4c.1,0,.2,0,.2-.2v-10.4c0-.1,0-.2-.2-.2h-10.4c-.1,0-.2,0-.2.2v10.4Z",
    "M29.3,30.1c0-.4.3-.7.7-.7s.7.3.7.7-.3.7-.7.7-.7-.3-.7-.7Z",
  ],
  [
    "M.5,59.2c4.7-.1,8.8-1.1,12.5-3,10.1-5.1,16.5-15,16.5-26.2S23.1,8.8,13,3.7C9.3,1.9,5.2.9.5.8",
    "M59.6.8c-4.7.1-8.8,1.1-12.5,3-10.1,5.1-16.5,15-16.5,26.3s6.4,21.1,16.5,26.2c3.6,1.8,7.8,2.8,12.5,3",
    "M59.9,6.6c-9.8.6-16.8,5.1-21,13.5-1.5,3-2.2,6.3-2.2,9.9,0,3.6.8,6.9,2.3,9.9,4.3,8.4,11.3,12.9,21.1,13.4",
    "M.4,53.3c7.8-.4,13.9-3.5,18.2-9.2,3.2-4.2,4.8-8.9,4.8-14.1,0-5.2-1.6-9.9-4.8-14.1C14.3,10.2,8.2,7.1.4,6.7",
    "M.5,47.3c5.7-.3,10.3-2.6,13.6-7.1,2.3-3.1,3.4-6.4,3.4-10.2,0-3.7-1.1-7.1-3.4-10.2-3.3-4.5-7.8-6.8-13.6-7.1",
    "M59.8,12.6c-6.8.5-11.7,3.5-14.9,9-1.5,2.5-2.2,5.3-2.2,8.3s.7,5.8,2.2,8.3c3.2,5.5,8.2,8.5,14.9,9",
    "M59.6,18.7c-6.2.4-11,5.2-11,11.3,0,6.1,4.8,10.9,11,11.3",
    "M.4,41.3c5.3-.5,8.9-3.2,10.6-8.2.3-.9.5-1.9.5-3.1h0c0-1.2-.1-2.3-.4-3.1-1.7-5-5.2-7.7-10.5-8.2",
    "M.6,35.3c2.7-.3,4.9-2.5,4.9-5.3,0-2.8-2.1-5-4.9-5.3",
    "M59.7,24.6c-2.8.2-5.1,2.5-5.1,5.3,0,2.8,2.2,5.1,5,5.4",
  ],
  [
    "M47.9,25c0,2.3,0,4.1,0,5.3-.2,4.8-1.9,8.8-5.1,12.1-10,10.2-27.1,5.3-30.2-8.5-2.1-9.1,3.2-18.1,12.3-21,1.7-.5,4.7-.8,9.1-.8,5.8,0,15.2,0,26.1,0M53.7,25c0,2.5,0,4.4,0,5.5,0,3.2-.7,6.3-2.1,9.3-3,6.4-7.9,10.7-14.5,12.8-4.9,1.5-9.7,1.5-14.5-.1C6.5,47,1,27.1,12.3,14.3c3.3-3.7,7.4-6.2,12.4-7.4,1.9-.4,5.2-.7,10.1-.6,7.2,0,16.2,0,25.2,0M36.4,25c0,1,0,2.1,0,3.4,0,3-.4,5.3-3,6.9-3.7,2.4-8.3.4-9.5-3.7-.5-1.9-.2-3.7,1.1-5.4,2-2.7,4.4-2.6,8.1-2.6,12.4,0,21.1,0,26.1,0,.2,0,.3.1.3.3,0,3,.2,6,0,8.6-.9,9.5-5.4,16.9-13.4,22.2-12.7,8.4-30.1,5.2-39.3-6.9C-6.7,30.3,3.1,5.1,24.8,1.1c1.8-.3,5.2-.5,10.1-.5,4.2,0,13.3,0,25,0M42.1,25c0,1.2,0,2.8,0,5,0,5-3,9.4-7.7,11.3-7.6,3-16-2.3-16.5-10.5-.2-3.3.8-6.2,2.9-8.6,1.6-1.8,3.5-3.1,5.7-3.7,1.3-.4,3.5-.6,6.5-.6,11.4,0,21,0,27,0",
  ],
  [
    "M17.2,59.4h25.5",
    "M8.9,52.9h42.2",
    "M4.2,46.4h51.4",
    "M1.6,39.8h56.7",
    "M.4,33.3h59.2",
    "M.4,26.8h59.2",
    "M1.5,20.3h56.9",
    "M4.2,13.7h51.5",
    "M8.9,7.2h42.2",
    "M17.3.7h25.4",
  ],
];

interface CardData {
  id: string;
  svgIndex: number;
  title: string;
  description: string;
}

const LEFT_CARDS: CardData[] = [
  {
    id: "card-L0",
    svgIndex: 0,
    title: "AI & Intelligent Automation",
    description:
      "AI-powered solutions designed to enhance products, automate workflows, and unlock smarter digital experiences.",
  },
  {
    id: "card-L1",
    svgIndex: 1,
    title: "Web Development",
    description:
      "Custom web development delivered with a product-focused, design-conscious approach.",
  },
  {
    id: "card-L2",
    svgIndex: 2,
    title: "Product Design",
    description:
      "Thoughtful product design that captures attention, deepens engagement, and builds lasting loyalty.",
  },
];

const RIGHT_CARDS: CardData[] = [
  {
    id: "card-R0",
    svgIndex: 3,
    title: "Website & Mobile Design",
    description:
      "High-quality website and app experiences designed to attract users and keep them coming back.",
  },
  {
    id: "card-R1",
    svgIndex: 4,
    title: "WordPress Development",
    description:
      "WordPress development focused on performance, clarity, and experiences that convert visitors into loyal users.",
  },
  {
    id: "card-R2",
    svgIndex: 5,
    title: "Branding",
    description:
      "Impactful branding positions startups for success through credibility, clarity, and lasting loyalty.",
  },
];

const STACKED_WORDS = ["A.I.", "Design", "Development", "Branding"];

interface ServicesProps {
  scrollProgressRef?: React.MutableRefObject<number>;
  embedded?: boolean;
}

export default function Services({ scrollProgressRef, embedded = false }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const lightBgRef = useRef<HTMLDivElement>(null);
  const stoneImgRef = useRef<HTMLImageElement>(null);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const tagline1Ref = useRef<HTMLDivElement>(null);
  const tagline2Ref = useRef<HTMLDivElement>(null);
  const stripesRef = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 3D Particle dispersion state
  const particleContainerRef = useRef<HTMLDivElement | null>(null);
  const particleTLRef = useRef<gsap.core.Timeline | null>(null);
  const prevInZoneRef = useRef<boolean>(false);

  // 371 Preloaded stone frames state
  const stoneDataRef = useRef<{
    imgs: HTMLImageElement[];
    loaded: number;
    preloading: boolean;
    videoIdx: number;
    cardsTL: gsap.core.Timeline | null;
    pairCenterTimes: { lk: string; rk: string; centerTime: number }[];
    svgFired: Set<string>;
  }>({
    imgs: new Array(371),
    loaded: 0,
    preloading: false,
    videoIdx: 0,
    cardsTL: null,
    pairCenterTimes: [],
    svgFired: new Set(),
  });

  // Render stone frame safely with immediate fallback
  const renderStoneFrame = (frameIdx: number) => {
    const imgEl = stoneImgRef.current;
    if (!imgEl) return;
    const clamped = Math.max(0, Math.min(370, Math.round(frameIdx)));
    const targetSrc = `/images/stone/frame_${String(clamped + 1).padStart(4, "0")}.webp`;
    const preloaded = stoneDataRef.current.imgs[clamped];
    const nextSrc = preloaded && preloaded.src ? preloaded.src : targetSrc;
    if (imgEl.src !== nextSrc && !imgEl.src.endsWith(targetSrc)) {
      imgEl.src = nextSrc;
    }
  };

  // Preload all 371 frames with immediate high-priority batch
  const preloadStoneFrames = () => {
    const state = stoneDataRef.current;
    if (state.preloading || state.loaded > 0) return;
    state.preloading = true;

    // Immediately load first 60 frames synchronously for instant display
    for (let i = 0; i < Math.min(60, 371); i++) {
      const img = new Image();
      img.src = `/images/stone/frame_${String(i + 1).padStart(4, "0")}.webp`;
      img.onload = () => {
        state.loaded++;
        if (state.loaded === 1) renderStoneFrame(0);
      };
      state.imgs[i] = img;
    }

    const idle =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 10);

    const loadBatch = (startIdx: number) => {
      const endIdx = Math.min(startIdx + 30, 371);
      let batchCount = 0;
      const countNeeded = endIdx - startIdx;

      const onItemLoaded = () => {
        batchCount++;
        state.loaded++;
        if (batchCount === countNeeded && endIdx < 371) {
          idle(() => loadBatch(endIdx));
        }
      };

      for (let i = startIdx; i < endIdx; i++) {
        if (state.imgs[i]) {
          onItemLoaded();
          continue;
        }
        const img = new Image();
        img.decoding = "async";
        img.src = `/images/stone/frame_${String(i + 1).padStart(4, "0")}.webp`;
        img.decode().then(onItemLoaded, onItemLoaded);
        state.imgs[i] = img;
      }
    };

    idle(() => loadBatch(60));
  };

  // Resize stone element to exact 16:9 viewport proportions — always centered
  const resizeStone = () => {
    const imgEl = stoneImgRef.current;
    if (!imgEl) return;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    let w: number, h: number;
    if (isMobile) {
      w = 999;
      h = 594;
    } else if (isTablet) {
      h = Math.round(0.75 * (window.visualViewport?.height ?? window.innerHeight));
      w = Math.round((16 / 9) * h);
    } else {
      h = Math.round(window.visualViewport?.height ?? window.innerHeight);
      w = Math.round((16 / 9) * h);
    }
    imgEl.style.width = `${w}px`;
    imgEl.style.height = `${h}px`;
    // Always force the centering transform to prevent any Tailwind override
    imgEl.style.position = "absolute";
    imgEl.style.top = "50%";
    imgEl.style.left = "50%";
    imgEl.style.transform = "translate(-50%, -50%)";
  };

  // Measure character bounding boxes for 3D dispersion (P from Trionn)
  const getCharacterPositions = () => {
    const chars: {
      ch: string;
      x: number;
      y: number;
      fontSize: number;
      fontFamily: string;
      fontWeight: string;
      fontStyle: string;
      color: string;
    }[] = [];
    const container = wordsContainerRef.current;
    if (!container) return chars;

    container.querySelectorAll<HTMLElement>("[data-line]").forEach((lineEl) => {
      const style = getComputedStyle(lineEl);
      const textNode = lineEl.firstChild;
      if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
      const rawText = textNode.textContent || "";
      const transform = style.textTransform;
      const text =
        transform === "uppercase"
          ? rawText.toUpperCase()
          : transform === "lowercase"
          ? rawText.toLowerCase()
          : rawText;
      if (text.length !== rawText.length) return;

      const fontSize = parseFloat(style.fontSize);
      const fontFamily = style.fontFamily;
      const fontWeight = style.fontWeight;
      const fontStyle = style.fontStyle;
      const color = style.color || "#FFFFFF";
      const range = document.createRange();

      for (let i = 0; i < rawText.length; i++) {
        if (rawText[i] === " " || rawText[i] === "\n") continue;
        range.setStart(textNode, i);
        range.setEnd(textNode, i + 1);
        const rect = range.getBoundingClientRect();
        if (rect.width !== 0 || rect.height !== 0) {
          chars.push({
            ch: text[i],
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            fontSize,
            fontFamily,
            fontWeight,
            fontStyle,
            color,
          });
        }
      }
    });

    return chars;
  };

  // Build 3D Particle Dispersion Effect (P from Trionn)
  const createParticles = () => {
    destroyParticles();

    const particles: any[] = [];
    const pContainer = document.createElement("div");
    pContainer.id = "trionn-letter-particles";
    pContainer.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:999;overflow:visible;isolation:isolate;mix-blend-mode:difference;";
    document.body.appendChild(pContainer);
    particleContainerRef.current = pContainer;

    const chars = getCharacterPositions();
    const l = Math.max(window.innerWidth, window.innerHeight);
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Pick 2 or 3 hero letters to scale huge in foreground (Screenshots 3 & 4)
    const heroCount = Math.floor(2 + Math.random() * 2);
    const heroIndices = new Set<number>();
    while (heroIndices.size < Math.min(heroCount, chars.length)) {
      heroIndices.add(Math.floor(Math.random() * chars.length));
    }

    chars.forEach((c, idx) => {
      const isHero = heroIndices.has(idx);
      const span = document.createElement("span");
      span.textContent = c.ch;
      span.style.cssText = `position:absolute;top:0;left:0;font-family:${c.fontFamily};font-style:${c.fontStyle};font-weight:${c.fontWeight};font-size:${c.fontSize}px;color:${c.color};font-synthesis:none;transform-origin:center center;will-change:transform,opacity;white-space:nowrap;line-height:1;-webkit-font-smoothing:antialiased;`;
      pContainer.appendChild(span);

      const rect = span.getBoundingClientRect();
      const offX = -(rect.width / 2);
      const offY = -(rect.height / 2);
      gsap.set(span, { x: c.x + offX, y: c.y + offY, opacity: 1 });

      const angle = (Math.random() * 2 - 1) * Math.PI;
      const speed = isHero
        ? (0.05 + Math.random() * 0.1) * l
        : (0.4 + Math.random() * 0.5) * l;

      particles.push({
        el: span,
        ox: c.x,
        oy: c.y,
        fontSize: c.fontSize,
        isHero,
        offX,
        offY,
        tx: isHero ? winW / 2 + (Math.random() * 2 - 1) * 0.15 * winW : null,
        ty: isHero ? winH / 2 + (Math.random() * 2 - 1) * 0.15 * winH : null,
        heroScale: isHero ? 6 + Math.random() * 4 : 1,
        dirX: Math.cos(angle),
        dirY: Math.sin(angle) * (-1 + Math.random() * 1.18),
        speed,
        rotX: (Math.random() * 2 - 1) * 360,
        rotY: (Math.random() * 2 - 1) * 360,
        rotZ: isHero ? (Math.random() * 2 - 1) * 15 : (Math.random() * 2 - 1) * 180,
        fadeOffset: Math.random() * 0.3,
      });
    });

    const tl = gsap.timeline({ paused: true });
    tl.to(
      { _p: 0 },
      {
        _p: 1,
        duration: 1,
        ease: "none",
        onUpdate: function () {
          const t = this.progress();
          particles.forEach((p) => {
            const curX = p.isHero
              ? p.ox + (p.tx - p.ox) * t
              : p.ox + p.dirX * p.speed * t;
            const curY = p.isHero
              ? p.oy + (p.ty - p.oy) * t
              : p.oy + p.dirY * p.speed * t;
            const alpha = p.isHero
              ? t < 0.15
                ? t / 0.15
                : t > 0.7
                ? 1 - (t - 0.7) / 0.3
                : 1
              : t < p.fadeOffset + 0.3
              ? 1
              : Math.max(0, 1 - (t - p.fadeOffset - 0.3) / 0.35);

            const fSize = p.isHero
              ? p.fontSize * (1 + (p.heroScale - 1) * Math.min(1, t / 0.5))
              : p.fontSize;

            const scX = Math.cos((p.rotY * t * Math.PI) / 180);
            const scY = p.isHero ? 1 : Math.cos((p.rotX * t * Math.PI) / 180);
            const rZ = p.rotZ * t;

            gsap.set(p.el, {
              x: curX + p.offX,
              y: curY + p.offY,
              fontSize: fSize,
              rotation: rZ,
              scaleX: scX,
              scaleY: scY,
              opacity: Math.max(0, alpha),
            });
          });
        },
      }
    );

    particleTLRef.current = tl;
  };

  const destroyParticles = () => {
    if (particleTLRef.current) {
      particleTLRef.current.kill();
      particleTLRef.current = null;
    }
    if (particleContainerRef.current) {
      particleContainerRef.current.remove();
      particleContainerRef.current = null;
    }
  };

  const toggleStaticWords = (visible: boolean) => {
    const el = wordsContainerRef.current;
    if (el) {
      el.style.transition = "none";
      el.style.opacity = visible ? "1" : "0";
    }
  };

  // Build 3D cards flight timeline
  const buildCardsTimeline = () => {
    const state = stoneDataRef.current;
    if (state.cardsTL) state.cardsTL.kill();

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const isMobile = winW < 768;
    const isTablet = winW >= 768 && winW < 1512;
    const pad = isMobile ? 24 : 40;

    let cardW: number, cardH: number;
    if (isMobile) {
      cardW = winW - 2 * pad;
      cardH = Math.round(0.55 * cardW);
    } else {
      cardW = isTablet ? Math.round(0.42 * winW) : Math.round(0.28 * winW);
      cardH = Math.round(0.32 * winH);
    }

    const domCards = Object.values(cardRefs.current).filter(Boolean) as HTMLDivElement[];
    domCards.forEach((c) => {
      c.style.width = `${cardW}px`;
      c.style.height = `${cardH}px`;
    });
    gsap.set(domCards, { opacity: 0, x: 0, y: 0 });

    const tl = gsap.timeline({ paused: true });

    if (isMobile) {
      const order = ["card-L0", "card-R0", "card-L1", "card-R1", "card-L2", "card-R2"];
      state.svgFired = new Set();
      state.pairCenterTimes = order.map((k, idx) => ({
        lk: k,
        rk: "",
        centerTime: 0.12 * idx + 0.09,
      }));

      order.forEach((k, idx) => {
        const el = cardRefs.current[k];
        if (!el) return;
        const kfs: { x: number; y: number; opacity: number }[] = [];
        for (let s = 0; s <= 12; s++) {
          const prog = s / 12;
          const xPos = (winW - cardW) / 2;
          const yPos = winH + prog * (-cardH - winH);
          const alpha = prog < 0.15 ? prog / 0.15 : prog > 0.85 ? 1 - (prog - 0.85) / 0.15 : 1;
          kfs.push({ x: xPos, y: yPos, opacity: alpha });
        }
        tl.to(el, { keyframes: kfs, duration: 0.3, ease: "none" }, 0.12 * idx);
      });
    } else {
      const pairs = [
        ["card-L0", "card-R0"],
        ["card-L1", "card-R1"],
        ["card-L2", "card-R2"],
      ];
      state.svgFired = new Set();
      state.pairCenterTimes = pairs.map(([l, r], idx) => ({
        lk: l,
        rk: r,
        centerTime: 0.2 * idx + 0.135,
      }));

      pairs.forEach(([lk, rk], idx) => {
        const startT = 0.2 * idx;
        const leftEl = cardRefs.current[lk];
        const rightEl = cardRefs.current[rk];
        if (!leftEl || !rightEl) return;

        const leftKfs: { x: number; y: number; opacity: number }[] = [];
        const rightKfs: { x: number; y: number; opacity: number }[] = [];

        for (let s = 0; s <= 12; s++) {
          const prog = s / 12;
          const startXLeft = -(0.7 * cardW);
          const yLeft = winH + prog * (-cardH - winH);
          const curveL = prog <= 0.5 ? Math.sin(prog * Math.PI) : 1;
          const xLeft = startXLeft + curveL * ((isTablet ? pad : 0.1 * winW) - startXLeft);

          const startXRight = winW - 0.3 * cardW;
          const yRight = -cardH + prog * (winH - -cardH);
          const curveR = prog <= 0.5 ? Math.sin(prog * Math.PI) : 1;
          const xRight =
            startXRight +
            curveR * ((isTablet ? winW - pad - cardW : 0.9 * winW - cardW) - startXRight);

          const alpha = prog < 0.15 ? prog / 0.15 : prog > 0.85 ? 1 - (prog - 0.85) / 0.15 : 1;
          leftKfs.push({ x: xLeft, y: yLeft, opacity: alpha });
          rightKfs.push({ x: xRight, y: yRight, opacity: alpha });
        }

        tl.to(leftEl, { keyframes: leftKfs, duration: 0.45, ease: "none" }, startT);
        tl.to(rightEl, { keyframes: rightKfs, duration: 0.45, ease: "none" }, startT);
      });
    }

    state.cardsTL = tl;
  };

  // Master scroll frame reaction updater
  const updateScrollFrame = (scrollT: number) => {
    const state = stoneDataRef.current;

    // 1. Light Background Overlay: starts at 1, fades out to 0 between 0 and 0.12 (Screenshots 2 -> 3 -> 4)
    if (lightBgRef.current) {
      const lightAlpha = scrollT <= 0 ? 1 : scrollT >= 0.12 ? 0 : 1 - scrollT / 0.12;
      lightBgRef.current.style.opacity = String(lightAlpha);
    }

    // 2. Smoke video: fades in smoothly between 0.04 and 0.12 (Screenshots 3 -> 4 -> 5)
    const isDesktop = window.innerWidth >= 768;
    const activeVideo = isDesktop ? videoDesktopRef.current : videoMobileRef.current;
    const inactiveVideo = isDesktop ? videoMobileRef.current : videoDesktopRef.current;
    if (activeVideo) {
      const vidAlpha = 0.5 * gsap.utils.clamp(0, 1, (scrollT - 0.04) / 0.08);
      activeVideo.style.opacity = String(vidAlpha);
      if (scrollT >= 0.04 && activeVideo.paused) {
        activeVideo.play().catch(() => {});
      } else if (scrollT < 0.04 && !activeVideo.paused) {
        activeVideo.pause();
      }
    }
    if (inactiveVideo) {
      inactiveVideo.style.opacity = "0";
      if (!inactiveVideo.paused) inactiveVideo.pause();
    }

    // 3. Audio thunder effect
    if (audioRef.current) {
      const audioEl = audioRef.current;
      if (scrollT >= 0.04 && scrollT < 0.95) {
        if (audioEl.paused) audioEl.play().catch(() => {});
        const vol = gsap.utils.clamp(0, 0.4, ((scrollT - 0.04) / 0.16) * 0.4);
        audioEl.volume = vol;
      } else if (!audioEl.paused) {
        audioEl.pause();
      }
    }

    // 4. Stone 3D Frame Sequence (Screenshots 1 to 5: descends, rotates, settles into square slab)
    if (stoneImgRef.current) {
      const stoneAlpha = gsap.utils.clamp(0, 1, scrollT / 0.05);
      stoneImgRef.current.style.opacity = String(stoneAlpha);
    }
    const targetFrame = 370 * scrollT;
    state.videoIdx += (targetFrame - state.videoIdx) * 0.2;
    renderStoneFrame(state.videoIdx);

    // 5. Massive Typography Color Transition (Screenshot 2: #111214 -> Screenshot 4: silver -> Screenshot 5: #FFFFFF)
    const textProg = gsap.utils.clamp(0, 1, (scrollT - 0.01) / 0.12);
    const textCol = gsap.utils.interpolate("rgb(17, 18, 20)", "rgb(255, 255, 255)", textProg);
    if (textContainerRef.current) {
      textContainerRef.current
        .querySelectorAll<HTMLElement>("[data-services-copy], [data-services-copy] *")
        .forEach((el) => {
          el.style.setProperty("color", textCol, "important");
        });
    }

    // 6. Tagline Character Blur Switch (Red arrow in Screenshot 3: blurs & morphs into Screenshot 5)
    if (tagline1Ref.current && tagline2Ref.current) {
      tagline1Ref.current.style.opacity = String(
        gsap.utils.clamp(0, 1, 1 - (textProg - 0.3) / 0.2)
      );
      tagline2Ref.current.style.opacity = String(
        gsap.utils.clamp(0, 1, (textProg - 0.5) / 0.2)
      );

      const chars1 = tagline1Ref.current.querySelectorAll<HTMLElement>(".chars");
      const chars2 = tagline2Ref.current.querySelectorAll<HTMLElement>(".chars");

      chars1.forEach((el, idx) => {
        const offset = (idx / chars1.length) * 0.3;
        const blurFactor = gsap.utils.clamp(0, 1, (textProg - offset) / 0.2);
        el.style.opacity = String(1 - blurFactor);
        el.style.filter = `blur(${12 * blurFactor}px)`;
      });

      chars2.forEach((el, idx) => {
        const offset = 0.5 + (idx / chars2.length) * 0.3;
        const blurFactor = gsap.utils.clamp(0, 1, (textProg - offset) / 0.2);
        el.style.opacity = String(blurFactor);
        el.style.filter = `blur(${(1 - blurFactor) * 12}px)`;
      });
    }

    // 7. 3D Particle dispersion zone (Screenshots 2, 3, 4: letters shatter and scatter around stone)
    const inZone = scrollT >= 0.32 && scrollT <= 0.54;
    const pastZone = scrollT > 0.54;
    const zoneProgress = inZone ? (scrollT - 0.32) / 0.22 : 0;

    if (inZone && !prevInZoneRef.current) {
      createParticles();
    } else if (!inZone && prevInZoneRef.current) {
      destroyParticles();
    }
    prevInZoneRef.current = inZone;

    if (inZone && particleTLRef.current) {
      particleTLRef.current.progress(zoneProgress);
      toggleStaticWords(false);
    } else if (pastZone) {
      toggleStaticWords(false);
    } else {
      toggleStaticWords(true);
    }

    // 8. Flying 3D Cards (scrollT >= 0.54 to 0.96)
    const domCards = Object.values(cardRefs.current).filter(Boolean) as HTMLDivElement[];
    if (scrollT < 0.54) {
      gsap.set(domCards, { opacity: 0, x: 0, y: 0 });
    } else {
      if (!state.cardsTL) buildCardsTimeline();
      const cardsProg = Math.min(1, (scrollT - 0.54) / 0.42);
      state.cardsTL?.progress(cardsProg);

      // Trigger animated SVG strokes on each card pair as they reach center
      const currentCardsTime = state.cardsTL?.time() ?? 0;
      state.pairCenterTimes.forEach(({ lk, rk, centerTime }) => {
        if (!state.svgFired.has(lk) && currentCardsTime >= centerTime) {
          state.svgFired.add(lk);
          const leftEl = cardRefs.current[lk];
          const rightEl = cardRefs.current[rk];
          if (leftEl) {
            const paths = Array.from(leftEl.querySelectorAll<SVGPathElement>(".svg-path"));
            paths.forEach((p) => {
              const len = p.getTotalLength?.() || 200;
              gsap.fromTo(
                p,
                { strokeDasharray: len, strokeDashoffset: len },
                { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }
              );
            });
          }
          if (rightEl) {
            const paths = Array.from(rightEl.querySelectorAll<SVGPathElement>(".svg-path"));
            paths.forEach((p) => {
              const len = p.getTotalLength?.() || 200;
              gsap.fromTo(
                p,
                { strokeDasharray: len, strokeDashoffset: len },
                { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }
              );
            });
          }
        }
      });
    }

    // 9. White Stripes Transition into next section (scrollT >= 0.88 to 1.0)
    if (stripesRef.current.length > 0) {
      const stripesProg = gsap.utils.clamp(0, 1, (scrollT - 0.88) / 0.12);
      stripesRef.current.forEach((stripe, idx) => {
        if (stripe) {
          const delay = (stripesRef.current.length - 1 - idx) * 0.02;
          const p = gsap.utils.clamp(0, 1, (stripesProg - delay) / (1 - delay));
          stripe.style.transform = `scaleY(${p})`;
        }
      });
    }
  };

  useEffect(() => {
    preloadStoneFrames();
    resizeStone();
    buildCardsTimeline();

    const onResize = () => {
      resizeStone();
      buildCardsTimeline();
    };
    window.addEventListener("resize", onResize);

    // If standalone (embedded === false), set up dedicated ScrollTrigger pin
    let st: ScrollTrigger | null = null;
    let animFrameId: number;

    if (!embedded) {
      const sec = sectionRef.current;
      if (sec) {
        st = ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: "+=350%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            updateScrollFrame(self.progress);
          },
        });
      }
    } else {
      // Embedded in parent #work-section: animation loop listens to scrollProgressRef
      const loop = () => {
        if (scrollProgressRef) {
          updateScrollFrame(scrollProgressRef.current);
        }
        animFrameId = requestAnimationFrame(loop);
      };
      animFrameId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (st) st.kill();
      if (animFrameId) cancelAnimationFrame(animFrameId);
      destroyParticles();
      if (stoneDataRef.current.cardsTL) {
        stoneDataRef.current.cardsTL.kill();
      }
    };
  }, [embedded]);

  return (
    <section
      ref={sectionRef}
      id="trionn-services"
      className={`relative min-h-dvh ${embedded ? "h-full min-h-0 w-full" : ""}`}
    >
      <div
        ref={viewportRef}
        className={`relative w-full overflow-hidden bg-[#000] ${
          embedded ? "h-full min-h-dvh" : "h-dvh min-h-dvh"
        }`}
      >
        {/* Layer 1: Clean Light Background Overlay (Screenshot 2: #ECECEC, fades out to 0 on scroll) */}
        <div
          ref={lightBgRef}
          className="pointer-events-none absolute inset-0 z-25 bg-[#ECECEC]"
          style={{ opacity: 1 }}
          aria-hidden="true"
        />

        {/* Layer 2: 3D Stone Frame Sequence (Screenshot 1-5: rotates, morphs, settles into square slab) */}
        <img
          ref={stoneImgRef}
          id="c"
          alt="3D Services Stone"
          aria-hidden="true"
          src="/images/stone/frame_0001.webp"
          className="pointer-events-none z-10 mix-blend-screen select-none"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "block",
            maxWidth: "none",
            objectFit: "contain",
            opacity: 0,
          }}
        />

        {/* Layer 3: Ambient Dark Smoke Video (Screenshot 4 & 5: rolls in with mix-blend-screen) */}
        <video
          ref={videoDesktopRef}
          src="/video/homepage-services-video.mp4"
          muted
          loop
          playsInline
          preload="auto"
          className="pointer-events-none object-cover z-1 mix-blend-screen absolute inset-0 h-full w-full min-h-full min-w-full hidden md:block"
          style={{
            opacity: 0,
            transform: "rotate(180deg) translateZ(0)",
            willChange: "opacity",
          }}
        />
        <video
          ref={videoMobileRef}
          src="/video/homepage-services-video_m.mp4"
          muted
          loop
          playsInline
          preload="auto"
          className="pointer-events-none object-cover z-1 mix-blend-screen absolute inset-0 h-full w-full min-h-full min-w-full md:hidden"
          style={{
            opacity: 0,
            transform: "rotate(180deg) translateZ(0)",
            willChange: "opacity",
          }}
        />

        {/* Layer 4: Ambient Audio */}
        <audio ref={audioRef} src="/audio/thunder.mp3" loop preload="auto" />

        {/* Layer 5: Flying 3D Service Cards (Screenshots 5) */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden z-20 max-md:z-40"
          style={{ perspective: "93.75rem" }}
        >
          {LEFT_CARDS.map((card) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.id] = el;
              }}
              className="svc-card z-10 absolute top-0 left-0 will-change-[transform,opacity] transform-3d lg:p-6 pointer-events-auto"
            >
              <ServiceCard data={card} />
            </div>
          ))}
          {RIGHT_CARDS.map((card) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.id] = el;
              }}
              className="svc-card absolute z-10 top-0 left-0 will-change-[transform,opacity] transform-3d lg:p-6 pointer-events-auto"
            >
              <ServiceCard data={card} />
            </div>
          ))}
        </div>

        {/* Layer 6: Main Typography, Header, and Morphing Taglines */}
        <div
          ref={textContainerRef}
          className="tr__container relative flex h-full flex-col items-center justify-between pt-28 md:pt-32 pb-12 md:pb-16 z-30 pointer-events-none"
        >
          {/* Top: OUR SERVICES */}
          <div data-services-copy className="relative z-20 block">
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-center block transition-colors duration-500 font-semibold text-[#111214]">
              OUR SERVICES
            </span>
          </div>

          {/* Center: Massive Stacked Words (Screenshots 1-2: static, Screenshots 2-4: shattering in 3D) */}
          <div
            ref={wordsContainerRef}
            className="relative z-20 my-auto flex w-full items-center justify-center pointer-events-none"
          >
            <div className="text-center flex flex-col items-center justify-center select-none">
              {STACKED_WORDS.map((word, idx) => (
                <div
                  key={idx}
                  data-line
                  data-services-copy
                  className="block font-display font-black uppercase text-6xl sm:text-7xl md:text-8xl lg:text-[7.4vw] leading-[0.84] tracking-tighter text-[#111214] transition-colors duration-500"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Tagline Morph & View Services Link */}
          <div className="relative z-20 flex flex-col gap-6 md:flex-row w-full justify-between items-center px-4 md:px-8">
            <div className="hidden w-1/3 lg:block" />

            {/* Tagline Container with letter-level blur switch */}
            <div
              data-services-copy
              className="w-full lg:text-center md:w-1/2 lg:w-1/3 relative min-h-8"
            >
              {/* Tagline 1: ✦ DESIGN WITH INTENT. BUILT TO WORK. */}
              <div
                ref={tagline1Ref}
                className="absolute inset-0 flex items-center justify-center md:justify-start lg:justify-center"
                style={{ opacity: 1 }}
              >
                <span className="text-xs sm:text-sm font-mono tracking-wider uppercase block text-[#111214] font-medium">
                  {"✦ DESIGN WITH INTENT. BUILT TO WORK.".split("").map((ch, i) => (
                    <span
                      key={i}
                      className="chars inline-block"
                      style={{ transition: "none" }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                </span>
              </div>

              {/* Tagline 2: ✦ DIFFERENT DISCIPLINES. ONE STANDARD OF CRAFT. */}
              <div
                ref={tagline2Ref}
                className="absolute inset-0 flex items-center justify-center md:justify-start lg:justify-center"
                style={{ opacity: 0 }}
              >
                <span className="text-xs sm:text-sm font-mono tracking-wider uppercase block text-[#111214] font-medium">
                  {"✦ DIFFERENT DISCIPLINES. ONE STANDARD OF CRAFT.".split("").map((ch, i) => (
                    <span
                      key={i}
                      className="chars inline-block"
                      style={{ transition: "none" }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            {/* Bottom Right: VIEW SERVICES Link */}
            <div className="flex w-full justify-center md:justify-end md:w-1/2 lg:w-1/3 pointer-events-auto">
              <a
                href="/services"
                data-services-copy
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#111214] border-b border-current pb-0.5 transition-colors duration-500 hover:opacity-75"
              >
                <span>VIEW SERVICES</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Layer 7: White Vertical Stripes Transition into Testimonials */}
        <div className="absolute inset-0 pointer-events-none flex flex-col w-full h-full z-30 max-md:z-50">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) stripesRef.current[idx] = el;
              }}
              style={{
                flex: 1,
                width: "100%",
                marginTop: idx > 0 ? "-0.5px" : undefined,
                paddingBottom: "0.5px",
                backgroundColor: "#fff",
                transform: "scaleY(0)",
                transformOrigin: "bottom",
                willChange: "transform",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Subcomponent: Glassmorphic Service Card with animated SVG Icon
function ServiceCard({ data }: { data: CardData }) {
  const paths = CARD_SVGS[data.svgIndex] || [];
  return (
    <div className="w-full h-full relative">
      <div className="card-inner pointer-events-auto bg-[#000]/70 lg:bg-[#000]/40 border border-[#2F323B]/30 rounded-lg p-8 md:p-10 h-full flex flex-col justify-between overflow-hidden relative backdrop-blur-md shadow-2xl">
        <div className="card-top relative z-10 flex justify-between items-start gap-6">
          <h3 className="text-white text-xl md:text-2xl font-display font-medium m-0 max-w-[200px] leading-tight">
            {data.title}
          </h3>
          <svg
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
            className="card-svg-icon shrink-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20"
          >
            {paths.map((p, i) => (
              <path
                key={i}
                className="svg-path"
                fill="none"
                stroke="#d8d8d8"
                strokeWidth="1"
                strokeMiterlimit="10"
                style={{ vectorEffect: "non-scaling-stroke" }}
                d={p}
              />
            ))}
          </svg>
        </div>
        <p className="text-[#9C9C9C] text-sm relative z-10 m-0 mt-8 leading-relaxed max-w-sm">
          {data.description}
        </p>
      </div>
    </div>
  );
}
