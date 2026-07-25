'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, SquareTerminal, FastForward, CheckCircle2 } from 'lucide-react';

type SplashPhase = 'walk-in' | 'greeting' | 'walk-out' | 'exit';

export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<SplashPhase>('walk-in');
  const [isWaving, setIsWaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Progress counter animation during greeting
    let progressInterval: NodeJS.Timeout;

    // Stage 1: Walk in from Left to Center (0ms - 900ms)
    const t1 = setTimeout(() => {
      setPhase('greeting');
      setIsWaving(true);

      // Start progress bar when robot reaches center
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 6;
        });
      }, 70);
    }, 900);

    // Stage 2: Walk out from Center to Right (2400ms)
    const t2 = setTimeout(() => {
      setIsWaving(false);
      setPhase('walk-out');
    }, 2400);

    // Stage 3: Trigger Cyber Shutter Split Exit (3100ms)
    const t3 = setTimeout(() => {
      setPhase('exit');
    }, 3100);

    // Stage 4: Unmount & reveal main portfolio (3700ms)
    const t4 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3700);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-auto">
          {/* TOP SHUTTER PANEL */}
          <motion.div
            initial={{ y: '0%' }}
            animate={phase === 'exit' ? { y: '-100%' } : { y: '0%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-slate-950 border-b border-cyan-500/30 z-20 overflow-hidden"
          >
            {/* Background Ambient Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-cyan-500/10 blur-[130px] pointer-events-none" />
          </motion.div>

          {/* BOTTOM SHUTTER PANEL */}
          <motion.div
            initial={{ y: '0%' }}
            animate={phase === 'exit' ? { y: '100%' } : { y: '0%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-slate-950 border-t border-cyan-500/30 z-20 overflow-hidden"
          >
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-600/10 blur-[130px] pointer-events-none" />
          </motion.div>

          {/* CENTER LASER BEAM SEAM */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={
              phase === 'exit'
                ? { opacity: [0, 1, 0], scaleX: [0.2, 1, 1], scaleY: [1, 4, 0] }
                : { opacity: 0.6, scaleX: 1, scaleY: 1 }
            }
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4] z-30 pointer-events-none"
          />

          {/* TOP SKIP BUTTON */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1.5 text-[11px] font-mono font-semibold text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all cursor-pointer shadow-lg shadow-cyan-500/10 backdrop-blur-md"
          >
            <span>Skip Intro</span>
            <FastForward className="h-3 w-3 text-cyan-400" />
          </button>

          {/* CENTRAL CONTENT CONTAINER - STABLE PIXEL-PERFECT ALIGNMENT */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={phase === 'exit' ? { opacity: 0, scale: 1.1, filter: 'blur(8px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center w-full max-w-md px-4 text-center">
              {/* RoboX Avatar Horizontal Walkway (Fixed Stage Height) */}
              <div className="relative w-full h-[180px] flex items-end justify-center pb-2 overflow-visible">
                <motion.div
                  initial={{ x: '-100vw' }}
                  animate={
                    phase === 'walk-in'
                      ? { x: 0 }
                      : phase === 'greeting'
                      ? { x: 0 }
                      : { x: '100vw' }
                  }
                  transition={
                    phase === 'walk-in'
                      ? { duration: 0.9, ease: 'easeOut' }
                      : phase === 'walk-out' || phase === 'exit'
                      ? { duration: 0.8, ease: 'easeIn' }
                      : {}
                  }
                  className="relative flex flex-col items-center"
                >
                  {/* Speech Bubble (Absolute Positioned with Fixed Reserved Height) */}
                  <div className="h-16 flex items-center justify-center mb-2">
                    <AnimatePresence mode="wait">
                      {phase === 'greeting' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                          className="relative z-40 w-72 xs:w-80 rounded-2xl border border-cyan-400/40 bg-slate-900/95 p-3 shadow-2xl shadow-cyan-500/30 backdrop-blur-md text-slate-100"
                        >
                          <div className="flex items-center justify-center gap-1.5 mb-0.5 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                            <Sparkles className="h-3 w-3 text-cyan-400" />
                            <span>RoboX AI Companion</span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold leading-snug text-white">
                            Welcome! 👋 Loading Santhosh Raj&apos;s Portfolio...
                          </p>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900/95" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                {/* 3D Shaded RoboX Graphic with Walking Bob */}
                <motion.div
                  animate={
                    phase === 'walk-in' || phase === 'walk-out'
                      ? { y: [0, -6, 0] }
                      : { y: 0 }
                  }
                  transition={
                    phase === 'walk-in' || phase === 'walk-out'
                      ? { repeat: Infinity, duration: 0.25 }
                      : {}
                  }
                  className="relative"
                >
                  <div className="absolute -inset-3 rounded-full bg-cyan-400/20 blur-lg animate-pulse" />
                  <svg
                    width="76"
                    height="98"
                    viewBox="0 0 100 130"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative drop-shadow-[0_10px_20px_rgba(6,182,212,0.4)]"
                  >
                    <defs>
                      <linearGradient id="splashBody" x1="20%" y1="0%" x2="80%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="45%" stopColor="#F1F5F9" />
                        <stop offset="85%" stopColor="#CBD5E1" />
                        <stop offset="100%" stopColor="#94A3B8" />
                      </linearGradient>

                      <linearGradient id="splashHelmet" x1="30%" y1="0%" x2="70%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#F8FAFC" />
                        <stop offset="100%" stopColor="#94A3B8" />
                      </linearGradient>

                      <linearGradient id="splashChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E2E8F0" />
                        <stop offset="35%" stopColor="#94A3B8" />
                        <stop offset="70%" stopColor="#475569" />
                        <stop offset="100%" stopColor="#64748B" />
                      </linearGradient>

                      <filter id="splashEyeGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* HEAD */}
                    <g id="RobotHead">
                      <rect x="18" y="16" width="6" height="12" rx="3" fill="url(#splashChrome)" />
                      <rect x="76" y="16" width="6" height="12" rx="3" fill="url(#splashChrome)" />

                      <rect x="22" y="6" width="56" height="34" rx="16" fill="url(#splashHelmet)" stroke="#94A3B8" strokeWidth="1.5" />
                      <ellipse cx="50" cy="10" rx="18" ry="3.5" fill="#FFFFFF" opacity="0.9" />

                      <rect x="28" y="12" width="44" height="22" rx="10" fill="#0A0E17" stroke="#334155" strokeWidth="1.5" />
                      <path d="M32 14 H68 C70 14, 71 16, 70 17 L30 17 C29 16, 30 14, 32 14 Z" fill="#FFFFFF" opacity="0.25" />

                      {/* LED Eyes */}
                      <g fill="#38BDF8" filter="url(#splashEyeGlow)">
                        <rect x="34" y="17" width="4" height="4" rx="1" />
                        <rect x="40" y="17" width="4" height="4" rx="1" />
                        <rect x="34" y="23" width="4" height="4" rx="1" />
                        <rect x="40" y="23" width="4" height="4" rx="1" />

                        <rect x="56" y="17" width="4" height="4" rx="1" />
                        <rect x="62" y="17" width="4" height="4" rx="1" />
                        <rect x="56" y="23" width="4" height="4" rx="1" />
                        <rect x="62" y="23" width="4" height="4" rx="1" />
                      </g>
                    </g>

                    {/* CHEST */}
                    <g id="RobotChest">
                      <rect x="18" y="42" width="14" height="8" rx="3" fill="url(#splashChrome)" />
                      <rect x="68" y="42" width="14" height="8" rx="3" fill="url(#splashChrome)" />

                      <path d="M26 43 H74 L68 76 H32 L26 43 Z" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1.5" />
                      <path d="M30 45 H70 L67 52 H33 Z" fill="#FFFFFF" opacity="0.4" />

                      <circle cx="43" cy="49" r="1.5" fill="#0F172A" />
                      <circle cx="50" cy="49" r="1.5" fill="#0F172A" />
                      <circle cx="57" cy="49" r="1.5" fill="#0F172A" />

                      <motion.circle
                        cx="50"
                        cy="60"
                        r="5.5"
                        fill="#38BDF8"
                        stroke="url(#splashChrome)"
                        strokeWidth="1"
                        filter="url(#splashEyeGlow)"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                    </g>

                    {/* ARMS */}
                    <motion.g
                      style={{ transformOrigin: '78px 46px' }}
                      animate={isWaving ? { rotate: [-10, 45, -10] } : { rotate: 0 }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                    >
                      <rect x="76" y="46" width="10" height="14" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                      <circle cx="81" cy="61" r="3.5" fill="url(#splashChrome)" />
                      <rect x="76" y="63" width="12" height="16" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                    </motion.g>

                    <rect x="14" y="46" width="10" height="14" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                    <circle cx="19" cy="61" r="3.5" fill="url(#splashChrome)" />
                    <rect x="12" y="63" width="12" height="16" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            {/* Brand Headline */}
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                    <SquareTerminal className="h-4 w-4" />
                  </div>
                  <h1 className="text-2xl xs:text-3xl font-extrabold tracking-tight text-white">
                    Santhu<span className="text-cyan-400">.dev</span>
                  </h1>
                </div>
                <p className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-cyan-400">
                  Backend Developer @ DataMoo.ai
                </p>
              </div>

              {/* High-Tech Progress Bar */}
              <div className="w-full space-y-2 pt-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Initializing System Stack...
                  </span>
                  <span className="font-bold text-cyan-400">{progress}%</span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 shadow-[0_0_10px_#06b6d4]"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Tech Badges */}
                <div className="flex items-center justify-center gap-2 text-[9px] font-mono text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                    Next.js 16
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                    Python & Django
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                    PostgreSQL
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
