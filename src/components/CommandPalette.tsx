'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sun,
  Moon,
  SquareTerminal,
  Layers,
  Code2,
  Mail,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [query, setQuery] = useState('');

  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state toggle
          const openEvent = new CustomEvent('open-command-palette');
          window.dispatchEvent(openEvent);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const COMMANDS = [
    {
      id: 'sql-lab',
      title: 'Run Live SQL Query & Index Performance Sandbox',
      category: 'Database & Systems',
      icon: SquareTerminal,
      action: () => {
        onClose();
        document.querySelector('#sql-lab')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'system-design',
      title: 'Open Interactive Distributed System Topology Sandbox',
      category: 'Architecture',
      icon: Layers,
      action: () => {
        onClose();
        document.querySelector('#system-design')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'blog',
      title: 'Read System Architecture Case Studies',
      category: 'Engineering Articles',
      icon: Code2,
      action: () => {
        onClose();
        document.querySelector('#blog')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'telemetry',
      title: 'View Live GitHub Activity & Commit Feed',
      category: 'GitHub Telemetry',
      icon: Sparkles,
      action: () => {
        onClose();
        document.querySelector('#telemetry')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'projects',
      title: 'View Selected Work & Projects',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        onClose();
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'contact',
      title: 'Get in Touch / Hire Me',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        onClose();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme Mode`,
      category: 'Preferences',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        showToast('Theme Updated', `Switched to ${theme === 'dark' ? 'Light' : 'Dark'} mode`, 'info');
      },
    },
    {
      id: 'copy-email',
      title: 'Copy Email to Clipboard (santhu.dev@example.com)',
      category: 'Actions',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText('santhu.dev@example.com');
        showToast('Email Copied!', 'santhu.dev@example.com saved to clipboard.', 'success');
      },
    },
  ];

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) || cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`relative z-10 w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-2xl transition-all ${
            theme === 'dark'
              ? 'border-purple-900/40 bg-slate-950/95 text-slate-100 shadow-purple-950/40'
              : 'border-purple-200 bg-white text-slate-950 shadow-purple-500/20'
          }`}
        >
          {/* Search Header */}
          <div className={`flex items-center gap-3 border-b px-5 py-4 ${
            theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
          }`}>
            <Search className="h-5 w-5 text-purple-600 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search (e.g. projects, theme, contact)..."
              className={`w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400 font-mono font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-950'
              }`}
            />
            <div className="flex items-center gap-1">
              <kbd className={`rounded-lg border px-2 py-0.5 text-[10px] font-mono font-bold ${
                theme === 'dark' ? 'border-purple-900/40 bg-slate-800 text-slate-400' : 'border-purple-200 bg-purple-50 text-purple-900'
              }`}>
                ESC
              </kbd>
              <button onClick={onClose} className={`rounded-lg p-1 transition-colors ${
                theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
              }`}>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Command List */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-1">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 font-mono">
                No matching commands found for &quot;{query}&quot;
              </div>
            ) : (
              filteredCommands.map((cmd) => {
                const IconComponent = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className={`w-full flex items-center justify-between rounded-2xl p-3 text-left transition-all cursor-pointer group ${
                      theme === 'dark'
                        ? 'hover:bg-slate-800/80 text-slate-200 hover:text-white'
                        : 'hover:bg-purple-50 text-slate-950 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 border border-purple-500/30 group-hover:scale-105 transition-transform">
                        <IconComponent className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className={`text-xs font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{cmd.title}</p>
                        <span className="text-[10px] font-mono text-purple-600 font-bold uppercase tracking-wider">{cmd.category}</span>
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-purple-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className={`flex items-center justify-between border-t px-5 py-2.5 text-[11px] font-mono ${
            theme === 'dark' ? 'border-purple-900/30 bg-slate-950/60 text-slate-400' : 'border-purple-100 bg-purple-50/60 text-slate-700 font-bold'
          }`}>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-purple-600" />
              <span>Santhu.dev Command Engine</span>
            </div>
            <span>Use ↑ ↓ to navigate</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
