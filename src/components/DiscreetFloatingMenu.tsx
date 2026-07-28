'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Volume2,
  Mail,
  X,
  Search,
  ChevronUp
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface DiscreetFloatingMenuProps {
  isSandboxActive?: boolean;
  botVisible: boolean;
  onToggleBot: () => void;
  onOpenCmdPalette?: () => void;
  onOpenVoiceIntro?: () => void;
}

export function DiscreetFloatingMenu({
  isSandboxActive = false,
  botVisible,
  onToggleBot,
  onOpenCmdPalette,
  onOpenVoiceIntro
}: DiscreetFloatingMenuProps) {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto-hide floating menu if user is actively interacting with the Developer Sandbox
  if (isSandboxActive) {
    return null;
  }

  const scrollToContact = () => {
    setMenuOpen(false);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Actions Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`w-64 rounded-2xl border p-3 shadow-xl backdrop-blur-xl ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900/95 text-slate-100'
                : 'border-slate-200 bg-white/95 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                Quick Actions
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                aria-label="Close action menu"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-2 space-y-1">
              {/* Mascot Toggle */}
              <button
                onClick={() => {
                  onToggleBot();
                  setMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors text-left cursor-pointer ${
                  theme === 'dark'
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-blue-500" />
                  <span>{botVisible ? 'Hide RoboX Mascot' : 'Show RoboX Mascot'}</span>
                </div>
                <span className={`text-[10px] rounded px-1.5 py-0.5 font-mono ${
                  botVisible ? 'bg-emerald-500/20 text-emerald-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  {botVisible ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* Voice Intro Option */}
              {onOpenVoiceIntro && (
                <button
                  onClick={() => {
                    onOpenVoiceIntro();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors text-left cursor-pointer ${
                    theme === 'dark'
                      ? 'hover:bg-slate-800 text-slate-200'
                      : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <Volume2 className="h-4 w-4 text-purple-500" />
                  <span>Voice Introduction</span>
                </button>
              )}

              {/* Search Command Palette Trigger */}
              {onOpenCmdPalette && (
                <button
                  onClick={() => {
                    onOpenCmdPalette();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors text-left cursor-pointer ${
                    theme === 'dark'
                      ? 'hover:bg-slate-800 text-slate-200'
                      : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-amber-500" />
                    <span>Search Commands</span>
                  </div>
                  <kbd className="text-[10px] font-mono opacity-60">⌘K</kbd>
                </button>
              )}

              {/* Quick Contact Link */}
              <button
                onClick={scrollToContact}
                className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors text-left cursor-pointer ${
                  theme === 'dark'
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-800'
                }`}
              >
                <Mail className="h-4 w-4 text-emerald-500" />
                <span>Contact Santhush</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Material 3 Floating Action Button (FAB) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 ${
          theme === 'dark'
            ? 'border-slate-700 bg-blue-600 text-white shadow-blue-900/30'
            : 'border-blue-500 bg-blue-600 text-white shadow-blue-500/20'
        }`}
        aria-label="Open quick actions menu"
        title="Quick Actions Menu"
      >
        {menuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Sparkles className="h-5 w-5 animate-pulse" />
        )}
      </button>
    </div>
  );
}
