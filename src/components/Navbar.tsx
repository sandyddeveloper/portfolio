'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Send,
  SquareTerminal,
  Sun,
  Moon,
  Search,
  ChevronDown,
  Database,
  Layers,
  BookOpen,
  Mail,
  ExternalLink,
  MessageSquare,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';
import { WhatsAppModal } from '@/components/WhatsAppModal';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Navbar({ onOpenCmdPalette }: { onOpenCmdPalette?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'playground' | 'studies' | 'contact' | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (name: 'playground' | 'studies' | 'contact') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscordClick = () => {
    navigator.clipboard.writeText('santhu_developer#4091');
    showToast('Discord Tag Copied! 🎮', 'santhu_developer#4091 saved to clipboard.', 'success');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 xs:px-4 sm:px-8 lg:px-12 py-3 sm:py-4 transition-all duration-300 pointer-events-none">
      <div
        className={`mx-auto flex w-full max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] 4xl:max-w-[2800px] items-center justify-between rounded-full border px-3.5 sm:px-8 py-2 sm:py-2.5 backdrop-blur-xl transition-all duration-300 pointer-events-auto shadow-sm ${
          isScrolled
            ? theme === 'dark'
              ? 'border-slate-800/80 bg-slate-950/90 shadow-slate-950/50'
              : 'border-slate-200 bg-white/90 shadow-slate-200/50'
            : theme === 'dark'
            ? 'border-slate-800/60 bg-slate-950/70'
            : 'border-slate-200/60 bg-white/80'
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('#')}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-cyan-400 border border-slate-700">
            <SquareTerminal className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Santhu<span className="text-cyan-400">.dev</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" title="Available for work" />
          </div>
        </button>

        {/* Desktop Navigation Links with Grouped Dropdowns */}
        <nav className="hidden md:flex items-center gap-1">
          {/* 1. ABOUT (Direct Link) */}
          <button
            onClick={() => scrollToSection('#about')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              theme === 'dark'
                ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            About
          </button>

          {/* 2. PROJECTS (Direct Link) */}
          <button
            onClick={() => scrollToSection('#projects')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              theme === 'dark'
                ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Projects
          </button>

          {/* 3. PLAYGROUND DROPDOWN (SQL Lab) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('playground')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => scrollToSection('#sql-lab')}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                activeDropdown === 'playground'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Playground</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === 'playground' ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'playground' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-slate-800/90 bg-slate-950/95 backdrop-blur-2xl p-2.5 shadow-2xl z-50 text-slate-100 space-y-1 border-cyan-500/20 shadow-cyan-500/10"
                >
                  <button
                    onClick={() => scrollToSection('#sql-lab')}
                    className="w-full flex items-start gap-3 rounded-xl p-2.5 text-left hover:bg-slate-900 transition-all cursor-pointer group"
                  >
                    <div className="p-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs font-bold text-white group-hover:text-cyan-400">
                        <span>SQL Lab</span>
                        <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-1.5 py-0.2 rounded">LIVE</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-snug mt-0.5">
                        PostgreSQL indexing & execution speed sandbox
                      </p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. STUDIES DROPDOWN (System Design, Case Studies) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('studies')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => scrollToSection('#system-design')}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                activeDropdown === 'studies'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Studies</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === 'studies' ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'studies' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-slate-800/90 bg-slate-950/95 backdrop-blur-2xl p-2.5 shadow-2xl z-50 text-slate-100 space-y-1 border-cyan-500/20 shadow-cyan-500/10"
                >
                  <button
                    onClick={() => scrollToSection('#system-design')}
                    className="w-full flex items-start gap-3 rounded-xl p-2.5 text-left hover:bg-slate-900 transition-all cursor-pointer group"
                  >
                    <div className="p-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-400">
                        System Design
                      </div>
                      <p className="text-[10px] text-slate-400 leading-snug mt-0.5">
                        Interactive distributed microservices topology
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('#blog')}
                    className="w-full flex items-start gap-3 rounded-xl p-2.5 text-left hover:bg-slate-900 transition-all cursor-pointer group"
                  >
                    <div className="p-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-400">
                        Case Studies
                      </div>
                      <p className="text-[10px] text-slate-400 leading-snug mt-0.5">
                        Deep-dive tech articles, postmortems & guides
                      </p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. CONTACT DROPDOWN (GitHub, Discord, WhatsApp, Email) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('contact')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => scrollToSection('#contact')}
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                activeDropdown === 'contact'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Contact</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === 'contact' ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'contact' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-[310px] rounded-2xl border border-slate-800/90 bg-slate-950/95 backdrop-blur-2xl p-2.5 shadow-2xl z-50 text-slate-100 space-y-1 border-cyan-500/20 shadow-cyan-500/10"
                >
                  {/* GitHub */}
                  <a
                    href="https://github.com/sandyddeveloper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between rounded-xl p-2.5 hover:bg-slate-900 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-cyan-400 group-hover:scale-105 transition-transform">
                        <GithubIcon />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white group-hover:text-cyan-400 block">GitHub</span>
                        <span className="text-[10px] text-slate-400 block">sandyddeveloper (41+ Repos)</span>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400" />
                  </a>

                  {/* Discord */}
                  <button
                    onClick={handleDiscordClick}
                    className="w-full flex items-center justify-between rounded-xl p-2.5 text-left hover:bg-slate-900 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white group-hover:text-cyan-400 block">Discord</span>
                        <span className="text-[10px] text-slate-400 block">santhu_developer#4091</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-1.5 py-0.5 rounded">COPY</span>
                  </button>

                  {/* WhatsApp OTP Modal Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDropdown(null);
                      setIsWhatsAppModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between rounded-xl p-2.5 text-left hover:bg-slate-900 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-white group-hover:text-emerald-400 block">WhatsApp</span>
                          <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1 py-0.2 rounded">OTP VERIFIED</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block">Phone & Message OTP Session</span>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-emerald-400" />
                  </button>

                  {/* Email */}
                  <a
                    href="mailto:santhoshrajk1812@gmail.com"
                    className="w-full flex items-center justify-between rounded-xl p-2.5 hover:bg-slate-900 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white group-hover:text-cyan-400 block">Direct Email</span>
                        <span className="text-[10px] text-slate-400 block">santhoshrajk1812@gmail.com</span>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger Pill */}
          <button
            onClick={onOpenCmdPalette}
            className={`hidden sm:flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
            }`}
            title="Open Command Search (Cmd + K)"
          >
            <Search className="h-3 w-3 text-cyan-400" />
            <kbd className="text-[10px] text-slate-500 font-sans">⌘K</kbd>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center rounded-full border p-1.5 transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {/* Minimal Contact Button */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden xs:flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer"
          >
            <Send className="h-3 w-3" />
            <span>Hire Me</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex md:hidden rounded-full border p-1.5 transition-colors ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900 text-slate-300'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className={`md:hidden mx-auto w-full max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] 4xl:max-w-[2800px] mt-2 rounded-2xl border backdrop-blur-2xl p-4 shadow-xl pointer-events-auto transition-colors space-y-3 ${
              theme === 'dark' ? 'border-slate-800 bg-slate-950/95 text-slate-100' : 'border-slate-200 bg-white/95 text-slate-900'
            }`}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCmdPalette) onOpenCmdPalette();
              }}
              className="w-full flex items-center justify-between rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs font-mono text-cyan-400"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                <span>Search Commands</span>
              </div>
              <kbd className="text-[10px] text-slate-500 font-sans">⌘K</kbd>
            </button>

            <nav className="flex flex-col gap-2">
              {/* Direct Links */}
              <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2">
                <button
                  onClick={() => scrollToSection('#about')}
                  className="flex-1 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-slate-900"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('#projects')}
                  className="flex-1 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-300 hover:bg-slate-900"
                >
                  Projects
                </button>
              </div>

              {/* Group 1: Playground */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 px-2">Playground</span>
                <button
                  onClick={() => scrollToSection('#sql-lab')}
                  className="w-full flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs text-cyan-400 hover:bg-slate-900"
                >
                  <Database className="h-3.5 w-3.5" />
                  <span>SQL Lab (Query Sandbox)</span>
                </button>
              </div>

              {/* Group 2: Studies */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 px-2">Studies</span>
                <button
                  onClick={() => scrollToSection('#system-design')}
                  className="w-full flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs text-indigo-400 hover:bg-slate-900"
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>System Design Architecture</span>
                </button>
                <button
                  onClick={() => scrollToSection('#blog')}
                  className="w-full flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs text-purple-400 hover:bg-slate-900"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Case Studies & Articles</span>
                </button>
              </div>

              {/* Group 3: Contact Channels */}
              <div className="space-y-1 border-t border-slate-800/60 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 px-2">Contact Channels</span>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <a
                    href="https://github.com/sandyddeveloper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs text-slate-300"
                  >
                    <GithubIcon />
                    <span>GitHub</span>
                  </a>
                  <button
                    onClick={handleDiscordClick}
                    className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs text-indigo-400 text-left"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Discord</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsWhatsAppModalOpen(true);
                    }}
                    className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs text-emerald-400 text-left"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <a
                    href="mailto:santhoshrajk1812@gmail.com"
                    className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs text-cyan-400"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 py-2.5 text-xs font-semibold text-cyan-400"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Contact Direct / Hire Me</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp OTP Verification Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </header>
  );
}
