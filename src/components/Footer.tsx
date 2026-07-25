'use client';

import React from 'react';
import {
  Terminal,
  Zap,
  ArrowUp,
  Command,
  Mail,
  ExternalLink,
  ShieldCheck,
  Globe,
  Database,
  Server,
  Code2,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
    showToast('Email Copied!', `${email} saved to clipboard.`, 'success');
  };

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <footer
      className={`relative w-full overflow-hidden border-t mt-32 transition-all duration-300 ${
        theme === 'dark'
          ? 'border-divider bg-darkBg text-silver shadow-2xl shadow-black/80'
          : 'border-slate-200 bg-slate-50/90 text-slate-700 shadow-xl shadow-slate-200/50'
      }`}
    >
      {/* Top Gradient Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950" />

      {/* Watermark Background Text */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none text-[120px] sm:text-[140px] font-black uppercase tracking-tighter opacity-[0.04] whitespace-nowrap text-silver">
        SANTHOSH RAJ • FULL STACK ARCHITECT
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-12 lg:px-16 py-12 sm:py-16 space-y-12">
        {/* Top Header & Quick Action Row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-divider pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-umber border border-cedar text-silver font-mono font-bold shadow-md">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-silver">
                  Santhu<span className="text-amber-200/80">.dev</span>
                </span>
                <span className="ml-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE • SUB-32MS LATENCY
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
              Senior Full-Stack Engineer specializing in high-throughput streaming dashboards, event-driven APIs, distributed backend systems, and responsive web UX.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenCommandPalette}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-cedar bg-umber text-silver hover:bg-mocha shadow-md'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:border-cyan-500/40 hover:text-slate-900'
              }`}
            >
              <Command className={`h-3.5 w-3.5 ${theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'}`} />
              <span>Command Palette</span>
              <kbd className={`rounded px-1.5 py-0.5 text-[10px] font-mono border ${
                theme === 'dark' ? 'bg-mocha text-amber-200 border-cedar' : 'bg-slate-800/80 text-cyan-300 border-slate-700'
              }`}>
                Ctrl K
              </kbd>
            </button>

            <button
              onClick={scrollToTop}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all cursor-pointer group shadow-sm ${
                theme === 'dark'
                  ? 'bg-umber border-cedar text-silver hover:bg-mocha'
                  : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
              }`}
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Mega Grid Navigation */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: System Info & Contact */}
          <div className="space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'
            }`}>
              <ShieldCheck className="h-4 w-4" />
              <span>System & Contact</span>
            </h4>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-400'}`}>
              Available for full-time senior engineering positions, technical architecture consulting, and high-impact advisory.
            </p>
            <div className="space-y-2 text-xs">
              <button
                onClick={handleCopyEmail}
                className={`flex items-center gap-2 transition-colors group cursor-pointer ${
                  theme === 'dark' ? 'text-slate-300 hover:text-amber-200' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                <Mail className={`h-3.5 w-3.5 group-hover:scale-110 transition-transform ${theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'}`} />
                <span className="font-mono">santhoshrajk1812@gmail.com</span>
              </button>
              <div className="flex items-center gap-2 text-slate-400">
                <Globe className={`h-3.5 w-3.5 ${theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'}`} />
                <span>Global / Remote • UTC-5 to UTC+5.5</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com/sandyddeveloper"
                target="_blank"
                rel="noreferrer"
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'border-divider bg-darkBg text-slate-300 hover:border-cedar hover:bg-umber hover:text-silver shadow-md'
                    : 'border-slate-200 bg-slate-100 text-slate-600 hover:border-cyan-500/40 hover:text-cyan-600'
                }`}
                title="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'border-divider bg-darkBg text-slate-300 hover:border-cedar hover:bg-umber hover:text-silver shadow-md'
                    : 'border-slate-200 bg-slate-100 text-slate-600 hover:border-cyan-500/40 hover:text-cyan-600'
                }`}
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:santhoshrajk1812@gmail.com"
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'border-divider bg-darkBg text-slate-300 hover:border-cedar hover:bg-umber hover:text-silver shadow-md'
                    : 'border-slate-200 bg-slate-100 text-slate-600 hover:border-cyan-500/40 hover:text-cyan-600'
                }`}
                title="Direct Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'
            }`}>
              <Code2 className="h-4 w-4" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'About & Terminal', href: '#about' },
                { name: 'Selected Work & Demos', href: '#projects' },
                { name: 'SQL Query Sandbox', href: '#sql-lab' },
                { name: 'System Design Canvas', href: '#system-design' },
                { name: 'Engineering Case Studies', href: '#blog' },
                { name: 'GitHub Live Telemetry', href: '#telemetry' },
                { name: 'Contact & Inquiries', href: '#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`transition-colors flex items-center gap-1.5 cursor-pointer ${
                      theme === 'dark' ? 'text-slate-300 hover:text-silver' : 'text-slate-400 hover:text-cyan-300'
                    }`}
                  >
                    <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-amber-200' : 'text-cyan-500/70'}`}>›</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Technical Stack Matrix */}
          <div className="space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'
            }`}>
              <Layers className="h-4 w-4" />
              <span>Tech Stack</span>
            </h4>
            <ul className={`space-y-2 text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-400'}`}>
              <li className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${theme === 'dark' ? 'bg-amber-200' : 'bg-cyan-400'}`} />
                <span>Next.js 16 App Router & React 19</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${theme === 'dark' ? 'bg-amber-200' : 'bg-cyan-400'}`} />
                <span>TypeScript & Strict Type Systems</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${theme === 'dark' ? 'bg-amber-200' : 'bg-blue-400'}`} />
                <span>Node.js & Express Microservices</span>
              </li>
              <li className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${theme === 'dark' ? 'bg-amber-200' : 'bg-blue-400'}`} />
                <span>Python & FastAPI Async Pipeline</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>PostgreSQL & Redis Caching</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>Docker, AWS & Vercel Edge</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Live Telemetry Metrics */}
          <div className="space-y-4">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'
            }`}>
              <Sparkles className="h-4 w-4" />
              <span>Telemetry SLA</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className={`rounded-xl border p-3 ${
                theme === 'dark' ? 'border-divider bg-darkBg' : 'border-slate-200 bg-slate-50'
              }`}>
                <p className="text-[10px] font-mono text-slate-400 uppercase">Uptime</p>
                <p className="text-sm font-bold text-emerald-400 font-mono">99.95%</p>
              </div>

              <div className={`rounded-xl border p-3 ${
                theme === 'dark' ? 'border-divider bg-darkBg' : 'border-slate-200 bg-slate-50'
              }`}>
                <p className="text-[10px] font-mono text-slate-400 uppercase">Latency</p>
                <p className={`text-sm font-bold font-mono ${theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'}`}>18ms</p>
              </div>

              <div className={`rounded-xl border p-3 ${
                theme === 'dark' ? 'border-divider bg-darkBg' : 'border-slate-200 bg-slate-50'
              }`}>
                <p className="text-[10px] font-mono text-slate-400 uppercase">Repos</p>
                <p className={`text-sm font-bold font-mono ${theme === 'dark' ? 'text-silver' : 'text-white'}`}>41+</p>
              </div>

              <div className={`rounded-xl border p-3 ${
                theme === 'dark' ? 'border-divider bg-darkBg' : 'border-slate-200 bg-slate-50'
              }`}>
                <p className="text-[10px] font-mono text-slate-400 uppercase">Daily Evts</p>
                <p className="text-sm font-bold text-purple-400 font-mono">10M+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Specs Line */}
        <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t pt-6 text-[11px] font-mono ${
          theme === 'dark' ? 'border-divider text-slate-400' : 'border-slate-800/50 text-slate-500'
        }`}>
          <div>
            © 2026 <span className={theme === 'dark' ? 'text-silver font-semibold' : 'text-slate-300 font-semibold'}>Santhosh Raj</span>. All rights reserved.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full ${theme === 'dark' ? 'bg-amber-200' : 'bg-cyan-400'}`} />
              Next.js 16 & React 19
            </span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span className={theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'}>v3.4 Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
