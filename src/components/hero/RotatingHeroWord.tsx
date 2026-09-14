"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ROTATING_WORDS = [
  "depth.",
  "impact.",
  "purpose.",
  "something.",
  "intention.",
];

export default function RotatingHeroWord() {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wordIdx = 0;
    let isMounted = true;
    let cycleTimeout: ReturnType<typeof setTimeout> | null = null;
    let activeTimeline: gsap.core.Timeline | null = null;

    // Helper to generate a word span containing individual letter spans
    const buildWordElement = (word: string, isAbsolute: boolean = false) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = `word-slot inline-block ${
        isAbsolute ? "absolute left-0 top-0 pointer-events-none" : "relative"
      }`;
      wordSpan.style.whiteSpace = "nowrap";

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const charSpan = document.createElement("span");
        charSpan.className = "char inline-block will-change-[filter,opacity,transform]";
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = "0";
        charSpan.style.filter = "blur(14px)";
        charSpan.style.transform = "translate3d(0, 10px, 0)";
        wordSpan.appendChild(charSpan);
      }

      return wordSpan;
    };

    // Clear initial SSR static markup and build first interactive word
    container.innerHTML = "";
    let activeWordElement = buildWordElement(ROTATING_WORDS[wordIdx], false);
    container.appendChild(activeWordElement);

    const initialChars = activeWordElement.querySelectorAll(".char");

    // Initial staggered reveal synced with hero headline animation
    activeTimeline = gsap.timeline({
      delay: 1.2,
      onComplete: () => {
        scheduleNextCycle();
      },
    });

    activeTimeline.to(initialChars, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.7,
      stagger: 0.065,
      ease: "power2.out",
    });

    const scheduleNextCycle = () => {
      if (!isMounted) return;
      cycleTimeout = setTimeout(() => {
        if (!isMounted) return;
        // If tab is inactive, postpone until active
        if (document.hidden) {
          scheduleNextCycle();
          return;
        }
        triggerWordSwitch();
      }, 2500);
    };

    const triggerWordSwitch = () => {
      if (!isMounted || !container) return;

      const nextIdx = (wordIdx + 1) % ROTATING_WORDS.length;
      const nextWord = ROTATING_WORDS[nextIdx];

      // Mark current word as absolute layer so it stays in exact layout position during transition
      const outgoingWordElement = activeWordElement;
      outgoingWordElement.className =
        "word-slot inline-block absolute left-0 top-0 pointer-events-none";

      // Create new incoming word as relative layer to establish natural container dimensions
      const incomingWordElement = buildWordElement(nextWord, false);
      container.appendChild(incomingWordElement);

      activeWordElement = incomingWordElement;
      wordIdx = nextIdx;

      const outgoingChars = outgoingWordElement.querySelectorAll(".char");
      const incomingChars = incomingWordElement.querySelectorAll(".char");

      const tl = gsap.timeline({
        onComplete: () => {
          if (outgoingWordElement.parentNode === container) {
            container.removeChild(outgoingWordElement);
          }
          scheduleNextCycle();
        },
      });
      activeTimeline = tl;

      // 1. Outgoing letters blur out sequentially from left to right
      tl.to(
        outgoingChars,
        {
          opacity: 0,
          filter: "blur(14px)",
          y: -10,
          duration: 0.36,
          stagger: 0.038,
          ease: "power2.in",
        },
        0
      );

      // 2. Incoming letters start blurring into sharpness with a 0.12s overlap
      // Earlier letters resolve first while subsequent letters are mid-blur
      tl.to(
        incomingChars,
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.65,
          stagger: 0.065,
          ease: "power2.out",
        },
        0.12
      );
    };

    return () => {
      isMounted = false;
      if (cycleTimeout) clearTimeout(cycleTimeout);
      if (activeTimeline) activeTimeline.kill();
      container.innerHTML = "";
    };
  }, []);

  return (
    <span className="words-wrapper inline-block italic font-editorial font-light text-white select-none whitespace-nowrap min-w-[240px] md:min-w-[320px] lg:min-w-[420px]">
      <span
        ref={containerRef}
        className="inline-block relative min-h-[1.1em] align-baseline"
      >
        {/* Static SSR fallback before client hydration */}
        <span className="word-slot inline-block relative">
          {"depth.".split("").map((ch, i) => (
            <span
              key={i}
              className="char inline-block will-change-[filter,opacity,transform]"
            >
              {ch}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
