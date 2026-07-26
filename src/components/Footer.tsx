'use client';

import React from 'react';
import {
  ArrowUp,
  Mail,
  SquareTerminal
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';
import FloatingDockDemo from '@/components/floating-dock-demo';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    const email = 'santhoshrajk1812@gmail.com';
    navigator.clipboard.writeText(email);
    showToast('Email Copied!', `${email} saved to clipboard.`, 'success');
  };

  return (
    <footer
      className={`relative w-full border-t transition-all duration-300 mt-12 sm:mt-16 ${theme === 'dark'
        ? 'border-purple-900/40 bg-slate-950/95 text-slate-300'
        : 'border-purple-200 bg-white text-slate-950'
        }`}
    >
      {/* Top Accent Gradient Divider Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600" />

      {/* Subtle Ambient Background Watermark Text */}
      <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none text-[80px] sm:text-[120px] lg:text-[150px] font-black uppercase tracking-tighter opacity-[0.03] whitespace-nowrap">
        SANTHOSH RAJ
      </div>

      <div className="mx-auto w-full max-w-[1600px] 2xl:max-w-[1800px] px-6 sm:px-12 lg:px-16 py-8 sm:py-10 space-y-6">
        {/* Top Header Row: Brand Info + Social Actions */}
        <div className={`flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b pb-6 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
          }`}>
          {/* Left: Brand Info */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 font-mono font-bold">
                <SquareTerminal className="h-4 w-4" />
              </div>
              <span className={`text-lg font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                Santhosh Raj
              </span>
              <span className="rounded-full bg-purple-100 border border-purple-300 px-2 py-0.5 text-[10px] font-mono text-purple-800 font-bold">
                Backend Developer @ DataMoo.ai
              </span>
            </div>
            <p className={`text-xs leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
              Specialized in Python, Django REST, PostgreSQL, Scalable Fintech APIs, Docker, Next.js 16, and RAG AI Systems.
            </p>
          </div>

          {/* Right: Social Links & Back To Top */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/sandyddeveloper"
              target="_blank"
              rel="noreferrer"
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${theme === 'dark'
                ? 'border-purple-900/40 bg-slate-900/80 text-slate-400 hover:text-white'
                : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              title="GitHub Profile"
            >
              <GithubIcon />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${theme === 'dark'
                ? 'border-purple-900/40 bg-slate-900/80 text-slate-400 hover:text-white'
                : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              title="LinkedIn Profile"
            >
              <LinkedinIcon />
            </a>

            <button
              onClick={handleCopyEmail}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all cursor-pointer ${theme === 'dark'
                ? 'border-purple-900/40 bg-slate-900/80 text-slate-400 hover:text-white'
                : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              title="Copy Direct Email"
            >
              <Mail className="h-4 w-4" />
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 rounded-xl bg-purple-600 border border-purple-500 px-3.5 py-2 text-xs font-bold text-white hover:bg-purple-700 transition-all cursor-pointer group shadow-md shadow-purple-500/20"
              title="Back to top"
            >
              <span className="hidden sm:inline">Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs font-mono font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-700'
          }`}>
          <div>
            © 2026 <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-950 font-extrabold'}>Santhosh Raj</span>. All rights reserved.
          </div>
          <div className="flex flex-col items-center justify-center my-2 lg:my-0">
            <FloatingDockDemo />
          </div>
          <div className="flex items-center gap-2">
            <span>Built with Next.js 16, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
