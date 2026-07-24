'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Send, Terminal, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'SQL Lab', href: '#sql-lab' },
  { name: 'System Design', href: '#system-design' },
  { name: 'Case Studies', href: '#blog' },
  { name: 'GitHub', href: '#telemetry' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenCmdPalette }: { onOpenCmdPalette?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 lg:px-12 py-4 transition-all duration-300 pointer-events-none">
      <div
        className={`mx-auto flex w-full max-w-[1600px] items-center justify-between rounded-full border px-5 sm:px-8 py-2.5 backdrop-blur-xl transition-all duration-300 pointer-events-auto shadow-sm ${
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
            <Terminal className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Santhu<span className="text-cyan-400">.dev</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" title="Available for work" />
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {link.name}
            </button>
          ))}
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
            className="flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer"
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
            className={`md:hidden mx-auto w-full max-w-[1600px] mt-2 rounded-2xl border backdrop-blur-2xl p-4 shadow-xl pointer-events-auto transition-colors ${
              theme === 'dark' ? 'border-slate-800 bg-slate-950/95 text-slate-100' : 'border-slate-200 bg-white/95 text-slate-900'
            }`}
          >
            <nav className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCmdPalette) onOpenCmdPalette();
                }}
                className="flex items-center justify-between rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs font-mono text-cyan-400 mb-1"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-3.5 w-3.5" />
                  <span>Search Commands</span>
                </div>
                <kbd className="text-[10px] text-slate-500 font-sans">⌘K</kbd>
              </button>

              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`rounded-lg px-3 py-2 text-left text-xs font-medium transition-all ${
                    theme === 'dark'
                      ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 py-2 text-xs font-semibold text-cyan-400"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Hire Me</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
