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
import { MagicButton } from '@/components/ui/border-magic-button';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Navbar({ onOpenCmdPalette }: { onOpenCmdPalette?: () => void }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const { showToast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'playground' | 'studies' | 'contact' | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Observer to detect when any modal opens (body overflow: hidden)
    const checkModalState = () => {
      setIsModalOpen(document.body.style.overflow === 'hidden');
    };
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
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
    showToast('Discord Tag Copied!', 'santhu_developer#4091 saved to clipboard.', 'success');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-3 xs:px-4 sm:px-8 lg:px-12 py-3 sm:py-4 transition-all duration-300 ${
        isModalOpen
          ? 'opacity-0 -translate-y-12 pointer-events-none'
          : 'opacity-100 translate-y-0 pointer-events-none'
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] 4xl:max-w-[2800px] items-center justify-between rounded-full border px-4 sm:px-8 py-3 sm:py-3.5 backdrop-blur-xl transition-all duration-300 pointer-events-auto shadow-md ${
          isScrolled
            ? theme === 'dark'
              ? 'border-purple-900/40 bg-slate-950/90 shadow-slate-950/50'
              : 'border-purple-200 bg-white/95 shadow-purple-500/10'
            : theme === 'dark'
            ? 'border-purple-900/30 bg-slate-950/70'
            : 'border-purple-200/80 bg-white/90'
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('#')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white border border-purple-500 shadow-sm shadow-purple-500/20">
            <SquareTerminal className="h-4.5 w-4.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-base sm:text-lg font-extrabold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              Santhu<span className="text-purple-600">.dev</span>
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" title="Available for work" />
          </div>
        </button>

        {/* Desktop Navigation Links with Grouped Dropdowns */}
        <nav className="hidden md:flex items-center gap-1.5">
          {/* 1. ABOUT (Direct Link) */}
          <button
            onClick={() => scrollToSection('#about')}
            className={`rounded-full px-4 py-2 text-sm font-extrabold transition-all cursor-pointer ${
              theme === 'dark'
                ? 'text-slate-300 hover:text-white hover:bg-purple-950/40'
                : 'text-slate-900 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            About
          </button>

          {/* 2. PROJECTS (Direct Link) */}
          <button
            onClick={() => scrollToSection('#projects')}
            className={`rounded-full px-4 py-2 text-sm font-extrabold transition-all cursor-pointer ${
              theme === 'dark'
                ? 'text-slate-300 hover:text-white hover:bg-purple-950/40'
                : 'text-slate-900 hover:text-purple-700 hover:bg-purple-50'
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
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold transition-all cursor-pointer ${
                activeDropdown === 'playground'
                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-purple-950/40'
                  : 'text-slate-900 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <span>Playground</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'playground' ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'playground' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full left-0 mt-2 w-72 rounded-2xl border p-3 shadow-2xl z-50 space-y-1 backdrop-blur-2xl ${
                    theme === 'dark'
                      ? 'border-purple-900/40 bg-slate-950/95 text-slate-100 shadow-purple-950/40'
                      : 'border-purple-200 bg-white/95 text-slate-900 shadow-purple-500/10'
                  }`}
                >
                  <button
                    onClick={() => scrollToSection('#sql-lab')}
                    className={`w-full flex items-start gap-3 rounded-xl p-2.5 text-left transition-all cursor-pointer group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-purple-50'
                    }`}
                  >
                    <div className="p-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-600 group-hover:scale-105 transition-transform">
                      <Database className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className={`flex items-center gap-1.5 text-sm font-extrabold ${theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-slate-950 group-hover:text-purple-700'}`}>
                        <span>SQL Lab</span>
                        <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 border border-purple-300 px-1.5 py-0.2 rounded">LIVE</span>
                      </div>
                      <p className={`text-xs leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
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
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold transition-all cursor-pointer ${
                activeDropdown === 'studies'
                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-purple-950/40'
                  : 'text-slate-900 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <span>Studies</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'studies' ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'studies' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full left-0 mt-2 w-72 rounded-2xl border p-3 shadow-2xl z-50 space-y-1 backdrop-blur-2xl ${
                    theme === 'dark'
                      ? 'border-purple-900/40 bg-slate-950/95 text-slate-100 shadow-purple-950/40'
                      : 'border-purple-200 bg-white/95 text-slate-900 shadow-purple-500/10'
                  }`}
                >
                  <button
                    onClick={() => scrollToSection('#system-design')}
                    className={`w-full flex items-start gap-3 rounded-xl p-2.5 text-left transition-all cursor-pointer group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-purple-50'
                    }`}
                  >
                    <div className="p-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-600 group-hover:scale-105 transition-transform">
                      <Layers className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-slate-950 group-hover:text-purple-700'}`}>
                        System Design
                      </div>
                      <p className={`text-xs leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Interactive distributed microservices topology
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('#blog')}
                    className={`w-full flex items-start gap-3 rounded-xl p-2.5 text-left transition-all cursor-pointer group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-purple-50'
                    }`}
                  >
                    <div className="p-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-600 group-hover:scale-105 transition-transform">
                      <BookOpen className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-slate-950 group-hover:text-purple-700'}`}>
                        Case Studies
                      </div>
                      <p className={`text-xs leading-snug mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
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
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold transition-all cursor-pointer ${
                activeDropdown === 'contact'
                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-purple-950/40'
                  : 'text-slate-900 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <span>Contact</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'contact' ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'contact' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full right-0 mt-2 w-[330px] rounded-2xl border p-3 shadow-2xl z-50 space-y-1 backdrop-blur-2xl ${
                    theme === 'dark'
                      ? 'border-purple-900/40 bg-slate-950/95 text-slate-100 shadow-purple-950/40'
                      : 'border-purple-200 bg-white/95 text-slate-900 shadow-purple-500/10'
                  }`}
                >
                  {/* GitHub */}
                  <a
                    href="https://github.com/sandyddeveloper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-between rounded-xl p-2.5 transition-all cursor-pointer group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-600 group-hover:scale-105 transition-transform">
                        <GithubIcon />
                      </div>
                      <div>
                        <span className={`text-sm font-extrabold block ${theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-slate-950 group-hover:text-purple-700'}`}>GitHub</span>
                        <span className={`text-xs block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>sandyddeveloper (41+ Repos)</span>
                      </div>
                    </div>
                    <ExternalLink className={`h-4 w-4 ${theme === 'dark' ? 'text-slate-500 group-hover:text-purple-400' : 'text-slate-400 group-hover:text-purple-600'}`} />
                  </a>

                  {/* Discord */}
                  <button
                    onClick={handleDiscordClick}
                    className={`w-full flex items-center justify-between rounded-xl p-2.5 text-left transition-all cursor-pointer group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-600 group-hover:scale-105 transition-transform">
                        <MessageSquare className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className={`text-sm font-extrabold block ${theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-slate-950 group-hover:text-purple-700'}`}>Discord</span>
                        <span className={`text-xs block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>santhu_developer#4091</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 border border-purple-300 px-2 py-0.5 rounded">COPY</span>
                  </button>

                  {/* WhatsApp OTP Modal Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDropdown(null);
                      setIsWhatsAppModalOpen(true);
                    }}
                    className={`w-full flex items-center justify-between rounded-xl p-2.5 text-left transition-all cursor-pointer group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-600 group-hover:scale-105 transition-transform">
                        <MessageCircle className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-sm font-extrabold block ${theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-slate-950 group-hover:text-purple-700'}`}>WhatsApp</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded">VERIFIED</span>
                        </div>
                        <span className={`text-xs block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Phone & Message OTP Session</span>
                      </div>
                    </div>
                    <ExternalLink className={`h-4 w-4 ${theme === 'dark' ? 'text-slate-500 group-hover:text-purple-400' : 'text-slate-400 group-hover:text-purple-600'}`} />
                  </button>

                  {/* Email */}
                  <a
                    href="mailto:santhoshrajk1812@gmail.com"
                    className={`w-full flex items-center justify-between rounded-xl p-2.5 transition-all cursor-pointer group ${
                      theme === 'dark' ? 'hover:bg-slate-900' : 'hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-600 group-hover:scale-105 transition-transform">
                        <Mail className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className={`text-sm font-extrabold block ${theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-slate-950 group-hover:text-purple-700'}`}>Direct Email</span>
                        <span className={`text-xs block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>santhoshrajk1812@gmail.com</span>
                      </div>
                    </div>
                    <ArrowRight className={`h-4 w-4 ${theme === 'dark' ? 'text-slate-500 group-hover:text-purple-400' : 'text-slate-400 group-hover:text-purple-600'}`} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Trigger Pill */}
          <button
            onClick={onOpenCmdPalette}
            className={`hidden sm:flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-mono transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-purple-900/40 bg-slate-900 text-slate-300 hover:text-white hover:border-purple-700'
                : 'border-purple-200 bg-purple-50/60 text-slate-900 font-extrabold hover:bg-purple-100'
            }`}
            title="Open Command Search (Cmd + K)"
          >
            <Search className="h-3.5 w-3.5 text-purple-600" />
            <kbd className="text-xs text-slate-500 font-sans font-bold">⌘K</kbd>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center rounded-full border p-2.5 transition-all cursor-pointer ${
              mounted && theme === 'dark'
                ? 'border-purple-900/40 bg-slate-900 text-purple-400 hover:bg-slate-800 hover:text-white'
                : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
            title={`Switch to ${mounted && theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {mounted && theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Minimal Contact Button */}
          <div className="hidden xs:block">
            <MagicButton onClick={() => scrollToSection('#contact')}>
              <Send className="h-3.5 w-3.5 text-purple-500" />
              <span>Hire Me</span>
            </MagicButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex md:hidden rounded-full border p-2.5 transition-colors ${
              theme === 'dark'
                ? 'border-purple-900/40 bg-slate-900 text-purple-400'
                : 'border-purple-200 bg-purple-50 text-purple-700'
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              theme === 'dark' ? 'border-purple-900/40 bg-slate-950/95 text-slate-100' : 'border-purple-200 bg-white/95 text-slate-950 shadow-purple-500/10'
            }`}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCmdPalette) onOpenCmdPalette();
              }}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-mono font-bold border transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-900 border-purple-900/40 text-purple-400'
                  : 'bg-purple-50 border-purple-200 text-purple-700 font-extrabold'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Search className="h-4 w-4" />
                <span>Search Commands</span>
              </div>
              <kbd className="text-xs text-slate-500 font-sans font-bold">⌘K</kbd>
            </button>

            <nav className="flex flex-col gap-2.5">
              {/* Direct Links */}
              <div className={`flex items-center gap-2 border-b pb-2.5 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'}`}>
                <button
                  onClick={() => scrollToSection('#about')}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-left text-sm font-extrabold ${
                    theme === 'dark' ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-950 hover:bg-purple-50'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('#projects')}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-left text-sm font-extrabold ${
                    theme === 'dark' ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-950 hover:bg-purple-50'
                  }`}
                >
                  Projects
                </button>
              </div>

              {/* Group 1: Playground */}
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase text-purple-600 px-2">Playground</span>
                <button
                  onClick={() => scrollToSection('#sql-lab')}
                  className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-extrabold ${
                    theme === 'dark' ? 'text-purple-400 hover:bg-slate-900' : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  <Database className="h-4 w-4" />
                  <span>SQL Lab (Query Sandbox)</span>
                </button>
              </div>

              {/* Group 2: Studies */}
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase text-purple-600 px-2">Studies</span>
                <button
                  onClick={() => scrollToSection('#system-design')}
                  className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-extrabold ${
                    theme === 'dark' ? 'text-purple-400 hover:bg-slate-900' : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>System Design Architecture</span>
                </button>
                <button
                  onClick={() => scrollToSection('#blog')}
                  className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-extrabold ${
                    theme === 'dark' ? 'text-purple-400 hover:bg-slate-900' : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Case Studies & Articles</span>
                </button>
              </div>

              {/* Group 3: Contact Channels */}
              <div className={`space-y-1 border-t pt-2.5 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'}`}>
                <span className="text-xs font-mono font-bold uppercase text-purple-600 px-2">Contact Channels</span>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <a
                    href="https://github.com/sandyddeveloper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 rounded-lg border p-2 text-xs font-bold ${
                      theme === 'dark' ? 'bg-slate-900 border-purple-900/40 text-slate-300' : 'bg-purple-50/50 border-purple-200 text-slate-950'
                    }`}
                  >
                    <GithubIcon />
                    <span>GitHub</span>
                  </a>
                  <button
                    onClick={handleDiscordClick}
                    className={`flex items-center gap-2 rounded-lg border p-2 text-xs font-bold text-left ${
                      theme === 'dark' ? 'bg-slate-900 border-purple-900/40 text-purple-400' : 'bg-purple-50/50 border-purple-200 text-purple-700'
                    }`}
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
                    className={`flex items-center gap-2 rounded-lg border p-2 text-xs font-bold text-left ${
                      theme === 'dark' ? 'bg-slate-900 border-purple-900/40 text-emerald-400' : 'bg-purple-50/50 border-purple-200 text-emerald-700'
                    }`}
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <a
                    href="mailto:santhoshrajk1812@gmail.com"
                    className={`flex items-center gap-2 rounded-lg border p-2 text-xs font-bold ${
                      theme === 'dark' ? 'bg-slate-900 border-purple-900/40 text-purple-400' : 'bg-purple-50/50 border-purple-200 text-purple-700'
                    }`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-purple-600 border border-purple-500 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20"
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
