'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function BackgroundCanvas() {
  const { theme } = useTheme();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - 250;
      const y = e.clientY - 250;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* GPU Accelerated Mouse-Tracking Spotlight (Optimized without heavy CPU filter blurs) */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none will-change-transform"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(147, 51, 234, 0.16) 0%, rgba(147, 51, 234, 0.05) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(147, 51, 234, 0.03) 45%, transparent 70%)',
        }}
      />

      {/* Subtle Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            theme === 'dark'
              ? 'radial-gradient(rgba(168, 85, 247, 0.15) 1px, transparent 1px)'
              : 'radial-gradient(rgba(147, 51, 234, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
