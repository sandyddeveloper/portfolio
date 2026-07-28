'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  SquareTerminal,
  Sun,
  Moon,
  Search
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function Navbar({ onOpenCmdPalette }: { onOpenCmdPalette?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

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

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Sandbox', href: '#sandbox' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 lg:px-12 py-3 transition-all duration-300 ${
        isModalOpen ? 'opacity-0 -translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-4 sm:px-6 py-2.5 backdrop-blur-md transition-all duration-200 ${
          isScrolled
            ? theme === 'dark'
              ? 'border-slate-800 bg-slate-900/90 shadow-md shadow-black/20'
              : 'border-slate-200/80 bg-white/95 shadow-sm'
            : theme === 'dark'
            ? 'border-slate-800/60 bg-slate-900/70'
            : 'border-slate-200/60 bg-white/80'
        }`}
      >
        {/* Brand Logo - M3 Style */}
        <button
          onClick={() => scrollToSection('#')}
          className="flex items-center gap-2.5 cursor-pointer group text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <SquareTerminal className="h-4.5 w-4.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
              Santhush<span className="text-blue-600">.dev</span>
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" title="Available for work" />
          </div>
        </button>

        {/* Desktop Navigation Links: 4 Flat Primary Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Cluster: Search Trigger (⌘K) & Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Search Trigger (⌘K) */}
          <button
            onClick={() => onOpenCmdPalette?.()}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'border-slate-200 bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
            title="Search command palette (Ctrl+K / ⌘K)"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className={`hidden sm:inline rounded px-1.5 py-0.5 text-[10px] font-mono ${
              theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-white text-slate-500 border border-slate-200'
            }`}>
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-800/50 text-amber-400 hover:bg-slate-800'
                : 'border-slate-200 bg-slate-100/70 text-slate-700 hover:bg-slate-200/70'
            }`}
            title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden flex h-9 w-9 items-center justify-center rounded-full border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-800/50 text-slate-200'
                : 'border-slate-200 bg-slate-100/70 text-slate-700'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden mx-auto mt-2 max-w-6xl rounded-2xl border p-4 shadow-lg backdrop-blur-xl ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900/95 text-slate-100'
                : 'border-slate-200 bg-white/95 text-slate-900'
            }`}
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors cursor-pointer ${
                    theme === 'dark'
                      ? 'hover:bg-slate-800 text-slate-200'
                      : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
