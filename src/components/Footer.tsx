'use client';

import React from 'react';
import {
  ArrowUp,
  Mail,
  SquareTerminal,
  Copy
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';

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

  const scrollToSection = (href: string) => {
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    const email = 'santhoshrajk1812@gmail.com';
    navigator.clipboard.writeText(email);
    showToast('Email Copied! 📋', `${email} saved to clipboard.`, 'success');
  };

  return (
    <footer
      className={`relative w-full border-t transition-all duration-300 mt-12 sm:mt-16 ${theme === 'dark'
          ? 'border-slate-800/80 bg-slate-950/95 text-slate-300'
          : 'border-slate-200 bg-slate-50/95 text-slate-700'
        }`}
    >
      {/* Top Accent Gradient Divider Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

      {/* Subtle Ambient Background Watermark Text */}
      <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none text-[80px] sm:text-[120px] lg:text-[150px] font-black uppercase tracking-tighter opacity-[0.03] whitespace-nowrap">
        SANTHOSH RAJ
      </div>

      <div className="mx-auto w-full max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] 4xl:max-w-[2800px] px-6 sm:px-12 lg:px-16 py-10 sm:py-12 space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-slate-800/60 pb-8">
          {/* Brand Info */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold">
                <SquareTerminal className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Santhosh Raj
              </span>
              <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-mono text-cyan-400 font-semibold">
                Backend Developer @ DataMoo.ai
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Specialized in Python, Django REST, PostgreSQL, Scalable Fintech APIs, Docker, Next.js 16, and RAG AI Systems.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400">
            {[
              { name: 'About', href: '#about' },
              { name: 'Projects', href: '#projects' },
              { name: 'SQL Lab', href: '#sql-lab' },
              { name: 'Experience', href: '#experience' },
              { name: 'Contact', href: '#contact' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Social Links & Back To Top */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/sandyddeveloper"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
              title="GitHub Profile"
            >
              <GithubIcon />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
              title="LinkedIn Profile"
            >
              <LinkedinIcon />
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-400 transition-all cursor-pointer"
              title="Copy Direct Email"
            >
              <Mail className="h-4 w-4" />
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-2 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer group"
              title="Back to top"
            >
              <span className="hidden sm:inline">Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack Badge */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 font-mono">
          <div>
            © 2026 <span className="text-slate-300 font-semibold">Santhosh Raj</span>. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span>Built with Next.js 16, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
