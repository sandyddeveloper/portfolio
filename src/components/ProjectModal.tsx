'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, Database, Shield, Zap, CheckCircle2, Key, SquareTerminal, Eye } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export interface ProjectData {
  id: string;
  category: 'Full-Stack' | 'Backend & APIs' | 'Frontend UX' | 'AI & Automation';
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  metrics: string[];
  architectureHighlights: string[];
  databaseChoice: string;
  securityFeatures: string[];
  videoIntroJson?: Record<string, unknown>;
  demoUser?: string;
  demoPass?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'demo' | 'jsonVideo'>('overview');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`relative z-10 w-full max-w-3xl rounded-2xl border shadow-xl overflow-hidden backdrop-blur-2xl transition-all max-h-[90vh] flex flex-col ${
            theme === 'dark'
              ? 'border-slate-800 bg-slate-950/95 text-slate-100'
              : 'border-slate-200 bg-white/95 text-slate-900'
          }`}
        >
          {/* Header Bar */}
          <div className={`flex items-center justify-between border-b px-6 py-4 ${
            theme === 'dark' ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-emerald-400">{project.metrics[0]}</span>
              </div>
              <h3 className="text-xl font-bold mt-1">{project.title}</h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {project.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-slate-800 p-0.5 bg-slate-900 text-xs">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'overview' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  Architecture
                </button>
                <button
                  onClick={() => setActiveTab('jsonVideo')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'jsonVideo' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  ▶ JSON Video Intro
                </button>
                <button
                  onClick={() => setActiveTab('demo')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'demo' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  Live Lab 🔑
                </button>
              </div>

              <button
                onClick={onClose}
                className={`rounded-lg p-1.5 transition-colors ${
                  theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'overview' ? (
              <>
                {/* System Overview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-500">
                    System Architecture Overview
                  </h4>
                  <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {project.longDescription}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className={`rounded-xl border p-3 text-center ${
                        theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <Zap className="h-3.5 w-3.5 text-cyan-400 mx-auto mb-1" />
                      <p className="text-[11px] font-bold font-mono text-cyan-400">{metric}</p>
                    </div>
                  ))}
                </div>

                {/* Architecture Highlights */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-500 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" /> Key Architectural Highlights
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {project.architectureHighlights.map((hl, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2 rounded-xl border p-3 text-xs leading-relaxed ${
                          theme === 'dark' ? 'border-slate-800/80 bg-slate-900/30 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data & Security Specs */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className={`rounded-xl border p-4 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
                    <h5 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 mb-1.5">
                      <Database className="h-3.5 w-3.5" /> Data Pipeline Strategy
                    </h5>
                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                      {project.databaseChoice}
                    </p>
                  </div>

                  <div className={`rounded-xl border p-4 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
                    <h5 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 mb-1.5">
                      <Shield className="h-3.5 w-3.5" /> Security Controls
                    </h5>
                    <ul className="space-y-1 text-xs">
                      {project.securityFeatures.map((sec, idx) => (
                        <li key={idx} className={`flex items-center gap-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                          <span className="h-1 w-1 rounded-full bg-cyan-400" />
                          {sec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Production Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-mono font-medium ${
                          theme === 'dark' ? 'border-slate-800 bg-slate-900 text-cyan-300' : 'border-slate-200 bg-slate-100 text-cyan-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : activeTab === 'jsonVideo' ? (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <SquareTerminal className="h-4 w-4" /> Live System Payload Stream Video Intro
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    ● STREAM ACTIVE
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>EVENT_TYPE: SYSTEM_STREAM_PAYLOAD</span>
                    <span>TIMESTAMP: 2026-07-24T18:14:00Z</span>
                  </div>

                  <pre className="text-cyan-300 text-[11px] overflow-x-auto p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 leading-relaxed">
{JSON.stringify(
  project.videoIntroJson || {
    system: project.title,
    status: '200 OK',
    latency: '32ms',
    pipeline: 'Active Node Gateway',
    metrics: project.metrics,
    techStack: project.techStack,
    security: project.securityFeatures
  },
  null,
  2
)}
                  </pre>
                </div>
              </div>
            ) : (
              /* Live Demo Credentials Tab */
              <div className="space-y-6">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Key className="h-4 w-4" />
                    <h4 className="text-sm font-bold">Interactive Sandbox Credentials</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Test live system features, administrative permissions, and API endpoints using the pre-configured credentials below:
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 font-mono text-xs">
                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                      <span className="text-[10px] text-slate-500 uppercase block">Demo Admin User</span>
                      <span className="text-cyan-300 font-bold">{project.demoUser || 'admin@santhu.dev'}</span>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                      <span className="text-[10px] text-slate-500 uppercase block">Demo Access Pass</span>
                      <span className="text-emerald-300 font-bold">{project.demoPass || 'demo2026_pass'}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-5 py-2.5 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all"
                      >
                        <ExternalLink className="h-4 w-4" /> Launch Interactive Live App
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className={`flex items-center justify-end gap-3 border-t p-4 sm:px-6 ${
            theme === 'dark' ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
          }`}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  theme === 'dark' ? 'border-slate-800 bg-slate-900 text-white hover:bg-slate-800' : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                }`}
              >
                <GithubIcon className="h-3.5 w-3.5" /> Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live System Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
