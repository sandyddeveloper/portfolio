'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function BackgroundCanvas() {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Minimal Mouse-Tracking Spotlight Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full transition-opacity duration-300 blur-[140px]"
        style={{
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(75, 58, 38, 0.35) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Subtle Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            theme === 'dark'
              ? 'radial-gradient(rgba(224, 221, 221, 0.15) 1px, transparent 1px)'
              : 'radial-gradient(rgba(15, 23, 42, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
