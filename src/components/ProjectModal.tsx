'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, Database, Shield, Zap, CheckCircle2, Key, SquareTerminal, Play, KeyRound, ArrowRight, Activity, GitCommit } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

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
  problemStory: string; // Problem story with real client context
  solutionOutcome: string; // Clear outcome narrative
  longDescription: string;
  techStack: string[];
  metrics: string[];
  architectureHighlights: string[];
  tradeOffs?: string[];
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
  const [activeTab, setActiveTab] = useState<'caseStudy' | 'architecture' | 'liveLab'>('caseStudy');

  useBodyScrollLock(!!project);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`relative z-10 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl transition-all max-h-[92vh] flex flex-col ${
            theme === 'dark'
              ? 'bg-slate-950/95 text-slate-100 shadow-blue-950/20'
              : 'bg-white text-slate-950 shadow-slate-300/50'
          }`}
        >
          {/* Header Bar */}
          <div className={`flex items-center justify-between px-6 py-5 border-b ${
            theme === 'dark' ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-100 bg-slate-50/80'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-eyebrow">
                  {project.category}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-500">
                  {project.metrics[0]}
                </span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {/* Segmented Control */}
              <div className={`flex rounded-xl p-1 text-xs font-mono ${
                theme === 'dark' ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
              }`}>
                <button
                  onClick={() => setActiveTab('caseStudy')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTab === 'caseStudy'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Case Study
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTab === 'architecture'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Topology
                </button>
                <button
                  onClick={() => setActiveTab('liveLab')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeTab === 'liveLab'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Sandbox
                </button>
              </div>

              <button
                onClick={onClose}
                className={`rounded-full p-2 transition-colors cursor-pointer ${
                  theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'caseStudy' ? (
              <>
                {/* Story & Problem Statement */}
                <div className={`p-5 rounded-2xl ${
                  theme === 'dark' ? 'bg-slate-900/60' : 'bg-slate-50'
                }`}>
                  <span className="text-eyebrow text-amber-500 dark:text-amber-400">
                    The Challenge & Problem
                  </span>
                  <p className={`mt-2 text-sm sm:text-base leading-relaxed font-normal ${
                    theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {project.problemStory}
                  </p>
                </div>

                {/* Outcome & Impact */}
                <div className={`p-5 rounded-2xl ${
                  theme === 'dark' ? 'bg-blue-950/20' : 'bg-blue-50/60'
                }`}>
                  <span className="text-eyebrow text-blue-600 dark:text-blue-400">
                    Engineered Solution & Outcome
                  </span>
                  <p className={`mt-2 text-sm sm:text-base leading-relaxed font-normal ${
                    theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {project.solutionOutcome}
                  </p>
                </div>

                {/* Metrics Proof Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl p-4 text-center ${
                        theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-100/70'
                      }`}
                    >
                      <Zap className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                      <p className="text-xs sm:text-sm font-bold font-mono text-blue-600 dark:text-blue-400">{metric}</p>
                    </div>
                  ))}
                </div>

                {/* Architecture Highlights & Tradeoffs */}
                <div className="space-y-3">
                  <h4 className="text-eyebrow flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" /> Architectural Engineering Highlights
                  </h4>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {project.architectureHighlights.map((hl, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          theme === 'dark' ? 'bg-slate-900/40 text-slate-300' : 'bg-slate-50 text-slate-700'
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trade-Off Analysis */}
                {project.tradeOffs && project.tradeOffs.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-eyebrow text-sky-500 dark:text-sky-400">
                      System Trade-Offs & Decisions
                    </h4>
                    <div className="space-y-2">
                      {project.tradeOffs.map((trade, idx) => (
                        <div key={idx} className={`p-3.5 rounded-xl text-xs sm:text-sm font-mono ${
                          theme === 'dark' ? 'bg-slate-900/60 text-slate-300' : 'bg-slate-100/80 text-slate-700'
                        }`}>
                          • {trade}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Data & Security Specs */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={`rounded-2xl p-5 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                    <h5 className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-2">
                      <Database className="h-4 w-4" /> Data Strategy & Choice
                    </h5>
                    <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      {project.databaseChoice}
                    </p>
                  </div>

                  <div className={`rounded-2xl p-5 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                    <h5 className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-2">
                      <Shield className="h-4 w-4" /> Security & Resiliency Controls
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm">
                      {project.securityFeatures.map((sec, idx) => (
                        <li key={idx} className={`flex items-center gap-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          {sec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-2">
                  <span className="text-eyebrow">
                    Tech Stack & Tools
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-xl px-3 py-1 text-xs font-mono font-semibold ${
                          theme === 'dark' ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : activeTab === 'architecture' ? (
              /* Architecture Topology Visualizer */
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-eyebrow">System Topology Map</span>
                    <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Request Pipeline & Data Flow
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    ● ACTIVE NODE ROUTING
                  </span>
                </div>

                {/* Topology Map Diagram Canvas */}
                <div className={`p-6 rounded-3xl border flex flex-col items-center space-y-6 ${
                  theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-xs font-mono">
                    <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-blue-500/30 text-blue-400' : 'bg-white border-blue-200 text-blue-700'}`}>
                      <span className="font-bold text-sm block mb-1">1. Client / Web App</span>
                      <span>Next.js 16 Edge / App Router</span>
                    </div>

                    <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-sky-500/30 text-sky-400' : 'bg-white border-sky-200 text-sky-700'}`}>
                      <span className="font-bold text-sm block mb-1">2. API Gateway</span>
                      <span>Django REST / FastAPI Auth</span>
                    </div>

                    <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-indigo-500/30 text-indigo-400' : 'bg-white border-indigo-200 text-indigo-700'}`}>
                      <span className="font-bold text-sm block mb-1">3. Worker Pool & Cache</span>
                      <span>Redis In-Memory & Celery DAG</span>
                    </div>

                    <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-emerald-500/30 text-emerald-400' : 'bg-white border-emerald-200 text-emerald-700'}`}>
                      <span className="font-bold text-sm block mb-1">4. Database & Storage</span>
                      <span>PostgreSQL Timescale / Vector DB</span>
                    </div>
                  </div>

                  <div className={`w-full p-4 rounded-2xl font-mono text-xs overflow-x-auto ${
                    theme === 'dark' ? 'bg-slate-950 text-slate-300' : 'bg-slate-900 text-slate-100'
                  }`}>
                    <pre>
{JSON.stringify(
  project.videoIntroJson || {
    pipeline: 'Request Lifecycle',
    latencyP99: '14ms',
    concurrencyLocks: 'Optimistic DB Locking',
    healthStatus: 'ALL NODES HEALTHY'
  },
  null,
  2
)}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              /* Live Demo Credentials Sandbox */
              <div className="space-y-6">
                <div className={`p-6 rounded-3xl space-y-4 ${
                  theme === 'dark' ? 'bg-slate-900/60' : 'bg-slate-50'
                }`}>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Key className="h-5 w-5" />
                    <h4 className="text-base font-bold">Interactive Sandbox Credentials</h4>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Test live system features, administrative permissions, and API endpoints using the pre-configured credentials below:
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 font-mono text-xs">
                    <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white border border-slate-200'}`}>
                      <span className="text-[10px] uppercase block text-slate-500 font-semibold">Demo User</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{project.demoUser || 'admin@santhu.dev'}</span>
                    </div>

                    <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white border border-slate-200'}`}>
                      <span className="text-[10px] uppercase block text-slate-500 font-semibold">Access Pass</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{project.demoPass || 'demo2026_pass'}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
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
          <div className={`flex items-center justify-between border-t p-4 sm:px-8 ${
            theme === 'dark' ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-slate-50'
          }`}>
            <span className="text-xs text-slate-500 font-medium">
              Verified Production Architecture
            </span>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    theme === 'dark' ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-100'
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
                  className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-all shadow-sm"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

