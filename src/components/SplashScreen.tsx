'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

type SplashPhase = 'walk-in' | 'greeting' | 'swipe-out';

export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<SplashPhase>('walk-in');
  const [isWaving, setIsWaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Step 1: Walk in to center (1.2s)
    const timer1 = setTimeout(() => {
      setPhase('greeting');
      setIsWaving(true);
    }, 1200);

    // Step 2: Wave & display greeting (2.4s), then trigger swipe
    const timer2 = setTimeout(() => {
      setIsWaving(false);
      setPhase('swipe-out');
    }, 3600);

    // Step 3: Complete transition & reveal main portfolio (4.6s)
    const timer3 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 4600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-overlay"
          initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          animate={
            phase === 'swipe-out'
              ? { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' }
              : { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
          }
          transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-darkBg text-silver overflow-hidden"
        >
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cedar/30 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-umber/40 blur-[100px] pointer-events-none" />

          {/* Central Content Wrapper */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl px-6 text-center">
            {/* RoboX Robot Character Moving Across Screen */}
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
                  ? { duration: 1.2, ease: 'easeOut' }
                  : phase === 'swipe-out'
                  ? { duration: 1.0, ease: 'easeInOut' }
                  : {}
              }
              className="relative flex flex-col items-center mb-6"
            >
              {/* RoboX Speech Bubble */}
              <AnimatePresence>
                {phase === 'greeting' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className="absolute bottom-[115px] z-20 w-80 rounded-2xl border border-cyan-400/40 bg-slate-900/95 p-4 shadow-2xl shadow-cyan-500/30 backdrop-blur-md text-slate-100"
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-1 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                      RoboX AI
                    </div>
                    <p className="text-base font-semibold leading-snug text-white">
                      Hey Hi! 👋 Let&apos;s create a great experience together!
                    </p>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-slate-900/95" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3D Shaded RoboX Robot Graphic */}
              <motion.div
                animate={
                  phase === 'walk-in'
                    ? { y: [0, -4, 0] }
                    : phase === 'swipe-out'
                    ? { rotate: 15, y: [0, -6, 0] }
                    : { y: 0 }
                }
                transition={
                  phase === 'walk-in'
                    ? { repeat: Infinity, duration: 0.4 }
                    : phase === 'swipe-out'
                    ? { repeat: Infinity, duration: 0.2 }
                    : {}
                }
                className="relative"
              >
                {/* Glowing Aura */}
                <div className="absolute -inset-3 rounded-full bg-cyan-400/30 blur-xl animate-pulse" />

                <svg
                  width="90"
                  height="116"
                  viewBox="0 0 100 130"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative drop-shadow-[0_12px_24px_rgba(6,182,212,0.4)]"
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

                    {/* Glowing LED Eyes */}
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

                  {/* NECK */}
                  <rect x="44" y="39" width="12" height="4" rx="2" fill="url(#splashChrome)" />

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
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    />
                    <path d="M50 57 V60 M48.5 58.5 A2.5 2.5 0 1 0 51.5 58.5" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />

                    <text x="50" y="70" textAnchor="middle" fill="#64748B" fontSize="5.5" fontWeight="bold" letterSpacing="0.5">
                      RoboX
                    </text>
                  </g>

                  {/* LEFT ARM */}
                  <motion.g
                    style={{ transformOrigin: '22px 46px' }}
                    animate={
                      phase === 'swipe-out'
                        ? { rotate: [-55, 55, -55] }
                        : { rotate: [-18, 18, -18] }
                    }
                    transition={{ repeat: Infinity, duration: phase === 'swipe-out' ? 0.2 : 0.5 }}
                  >
                    <rect x="14" y="46" width="10" height="14" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                    <circle cx="19" cy="61" r="3.5" fill="url(#splashChrome)" />
                    <rect x="12" y="63" width="12" height="16" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                    <path d="M14 79 C12 83, 14 86, 17 86 C19 86, 21 83, 20 79" fill="url(#splashChrome)" stroke="#64748B" strokeWidth="1" />
                  </motion.g>

                  {/* RIGHT ARM (Waving during greeting!) */}
                  <motion.g
                    style={{ transformOrigin: '78px 46px' }}
                    animate={
                      isWaving
                        ? { rotate: [-20, 50, -20, 50, 0] }
                        : phase === 'swipe-out'
                        ? { rotate: [55, -55, 55] }
                        : { rotate: [18, -18, 18] }
                    }
                    transition={
                      isWaving
                        ? { duration: 1.2, ease: 'easeInOut' }
                        : { repeat: Infinity, duration: phase === 'swipe-out' ? 0.2 : 0.5 }
                    }
                  >
                    <rect x="76" y="46" width="10" height="14" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                    <circle cx="81" cy="61" r="3.5" fill="url(#splashChrome)" />
                    <rect x="76" y="63" width="12" height="16" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                    <path
                      d={isWaving ? "M78 65 C76 61, 80 58, 83 60 C86 62, 85 66, 82 66" : "M80 79 C78 83, 80 86, 83 86 C85 86, 87 83, 86 79"}
                      fill="url(#splashChrome)"
                      stroke="#64748B"
                      strokeWidth="1"
                    />
                  </motion.g>

                  {/* PELVIS */}
                  <rect x="34" y="75" width="32" height="8" rx="3" fill="url(#splashChrome)" />

                  {/* LEFT LEG */}
                  <motion.g
                    style={{ transformOrigin: '38px 80px' }}
                    animate={
                      phase === 'swipe-out'
                        ? { rotate: [45, -45, 45], y: [0, -4, 0] }
                        : { rotate: [22, -22, 22], y: [0, -2, 0] }
                    }
                    transition={{ repeat: Infinity, duration: phase === 'swipe-out' ? 0.2 : 0.4 }}
                  >
                    <rect x="31" y="80" width="14" height="16" rx="4" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                    <rect x="33" y="84" width="10" height="10" rx="2" fill="url(#splashChrome)" />
                    <rect x="30" y="95" width="16" height="20" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1.2" />
                    <path d="M26 114 C26 110, 42 110, 44 114 L45 122 C45 125, 25 125, 26 122 Z" fill="url(#splashBody)" stroke="#64748B" strokeWidth="1.2" />
                    <path d="M28 120 H42" stroke="url(#splashChrome)" strokeWidth="2" strokeLinecap="round" />
                  </motion.g>

                  {/* RIGHT LEG */}
                  <motion.g
                    style={{ transformOrigin: '62px 80px' }}
                    animate={
                      phase === 'swipe-out'
                        ? { rotate: [-45, 45, -45], y: [-4, 0, -4] }
                        : { rotate: [-22, 22, -22], y: [-2, 0, -2] }
                    }
                    transition={{ repeat: Infinity, duration: phase === 'swipe-out' ? 0.2 : 0.4 }}
                  >
                    <rect x="55" y="80" width="14" height="16" rx="4" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1" />
                    <rect x="57" y="84" width="10" height="10" rx="2" fill="url(#splashChrome)" />
                    <rect x="54" y="95" width="16" height="20" rx="5" fill="url(#splashBody)" stroke="#94A3B8" strokeWidth="1.2" />
                    <path d="M50 114 C50 110, 66 110, 68 114 L69 122 C69 125, 49 125, 50 122 Z" fill="url(#splashBody)" stroke="#64748B" strokeWidth="1.2" />
                    <path d="M52 120 H66" stroke="url(#splashChrome)" strokeWidth="2" strokeLinecap="round" />
                  </motion.g>
                </svg>

                {/* Ground Shadow */}
                <motion.div
                  className="mx-auto h-3 w-20 rounded-full bg-cyan-400/30 blur-md"
                  animate={{ scaleX: [0.8, 1.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 0.4 }}
                />
              </motion.div>
            </motion.div>

            {/* Brand Title */}
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Santhu<span className="text-cyan-400">.dev</span>
              </h1>
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-300/80">
                Full-Stack Engineer Portfolio
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
