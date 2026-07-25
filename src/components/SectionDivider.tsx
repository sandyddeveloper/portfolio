'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function SectionDivider() {
  return (
    <div className="relative my-2 sm:my-2 w-full hidden md:flex items-center justify-center overflow-hidden">
      {/* Base Subtle Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      {/* Traveling Laser Shimmer Beam */}
      <motion.div
        className="absolute h-[2px] w-2/5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4]"
        animate={{
          x: ['-150%', '150%']
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut'
        }}
      />

      {/* Secondary Pulse Glow */}
      <div className="absolute h-[1px] w-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" />

      {/* Center Micro Node Marker */}
      <div className="absolute flex h-3.5 w-3.5 items-center justify-center rounded-full border border-cyan-400/50 bg-slate-950 shadow-sm shadow-cyan-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
      </div>
    </div>
  );
}
