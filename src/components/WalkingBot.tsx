'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Volume2,
  VolumeX,
  Send,
  ArrowDownRight,
  Scan,
  UserCheck,
  Briefcase,
  Code2,
  Mail,
  Calendar,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

type Persona = 'hr' | 'client' | 'developer';
type BotAction = 'idle' | 'dance' | 'scan';

interface VisitorData {
  firstName: string;
  lastName: string;
  contact: string;
  persona: Persona;
  reason: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  default: "Greetings! 👋 I'm RoboX 3D. Click 'Scan & Tailor Briefing' to get a customized profile overview for your role!",
  skills: "🛠️ Santhosh's Stack: Next.js 16, TypeScript, Node.js, Python, PostgreSQL, Redis & Docker!",
  projects: "💼 Projects: Telemetry Dashboard, Workflow Engine, UI Framework & AI Copilot!",
  contact: "📬 Contact Santhosh directly at santhu.dev@example.com for Full-Time Roles!",
  joke: "🤖 Why do robots love Next.js 16? Because Server Actions execute at sub-20ms warp speed! ⚡",
};

export function WalkingBot() {
  const { theme } = useTheme();

  // Widget & Modal States
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<BotAction>('idle');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Form & Briefing Modals
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [showBriefingModal, setShowBriefingModal] = useState(false);

  const [visitor, setVisitor] = useState<VisitorData>({
    firstName: '',
    lastName: '',
    contact: '',
    persona: 'hr',
    reason: '',
  });

  const [speechText, setSpeechText] = useState(KNOWLEDGE_BASE.default);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'actions' | 'nav'>('chat');

  const playSound = (type: 'beep' | 'scan') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'beep') {
        osc.frequency.setValueAtTime(850, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'scan') {
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1000, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // Audio context fallback
    }
  };

  const handleOpenScanForm = () => {
    playSound('scan');
    setAction('scan');
    setShowIntakeModal(true);
    setIsOpen(false);
  };

  const targetContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitor.firstName.trim() || !visitor.contact.trim()) return;

    playSound('beep');
    setShowIntakeModal(false);
    setShowBriefingModal(true);

    try {
      if (web3FormsKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: `${visitor.firstName} ${visitor.lastName}`,
            email: visitor.contact.includes('@') ? visitor.contact : 'visitor@portfolio.dev',
            phone: !visitor.contact.includes('@') ? visitor.contact : '',
            subject: `[Portfolio Scan Lead] ${visitor.firstName} (${visitor.persona.toUpperCase()})`,
            message: `Persona Role: ${visitor.persona.toUpperCase()}\nContact Info: ${visitor.contact}\nProject Note: ${visitor.reason || 'Portfolio Scan Visit'}`,
            from_name: 'Santhosh Raj | Full-Stack Engineering',
            replyto: visitor.contact.includes('@') ? visitor.contact : targetContactEmail,
            // Designed Thank You Auto-Response to Visitor
            _autoresponse: `Hello ${visitor.firstName} ${visitor.lastName},\n\nThank you for visiting my portfolio and running the RoboX 3D Scanner! I have logged your visitor intake as [${visitor.persona.toUpperCase()}] and will be in touch shortly.\n\nSanthosh Raj's Briefing Snapshot:\n• Role: Senior Full-Stack Engineer (@sandyddeveloper)\n• Technical Stack: Next.js 16, TypeScript, Node.js, Python, PostgreSQL, Redis, Docker\n• Systems Track Record: Sub-32ms API Latency, 99.95% Availability, 41+ Repos\n\nDirect Email: ${targetContactEmail}\nGitHub: https://github.com/sandyddeveloper\n\nBest regards,\nSanthosh Raj`
          })
        });
      } else {
        await fetch(`https://formsubmit.co/ajax/${targetContactEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: `${visitor.firstName} ${visitor.lastName}`,
            contact: visitor.contact,
            personaRole: visitor.persona,
            reason: visitor.reason || 'Portfolio Scan Visit',
            _replyto: visitor.contact,
            _captcha: 'false',
            _template: 'table',
            _subject: `[Portfolio Lead] ${visitor.firstName} (${visitor.persona.toUpperCase()})`,
          })
        });
      }
    } catch {
      // Retain briefing modal UI display
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    playSound('beep');

    const inputLower = chatInput.toLowerCase();
    if (inputLower.includes('scan') || inputLower.includes('form')) {
      handleOpenScanForm();
    } else if (inputLower.includes('skill') || inputLower.includes('stack')) setSpeechText(KNOWLEDGE_BASE.skills);
    else if (inputLower.includes('project') || inputLower.includes('work')) setSpeechText(KNOWLEDGE_BASE.projects);
    else if (inputLower.includes('contact') || inputLower.includes('email')) setSpeechText(KNOWLEDGE_BASE.contact);
    else if (inputLower.includes('joke')) setSpeechText(KNOWLEDGE_BASE.joke);
    else setSpeechText(`🤖 "${chatInput}" -> Synced with Santhosh Raj's architecture!`);

    setChatInput('');
  };

  const handleJumpTo = (href: string) => {
    playSound('beep');
    setIsOpen(false);
    setShowBriefingModal(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto flex flex-col items-end">
      {/* 1. VISITOR INTAKE FORM MODAL */}
      <AnimatePresence>
        {showIntakeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkBg/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md rounded-2xl border border-cedar bg-darkBg/95 p-6 shadow-2xl backdrop-blur-2xl text-silver font-sans space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-divider pb-3">
                <div className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-amber-200" />
                  <div>
                    <h3 className="text-sm font-bold text-silver">Portfolio Intake & Scan</h3>
                    <p className="text-[11px] text-slate-400 font-mono">Tailors information for your specific visit</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIntakeModal(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-mocha hover:text-silver transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Intake Form */}
              <form onSubmit={handleIntakeSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-silver mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={visitor.firstName}
                      onChange={(e) => setVisitor({ ...visitor, firstName: e.target.value })}
                      placeholder="e.g. Alex"
                      className="w-full rounded-xl bg-umber/50 border border-divider px-3 py-2 text-silver placeholder-slate-500 focus:outline-none focus:border-cedar"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-silver mb-1">Last Name</label>
                    <input
                      type="text"
                      value={visitor.lastName}
                      onChange={(e) => setVisitor({ ...visitor, lastName: e.target.value })}
                      placeholder="e.g. Morgan"
                      className="w-full rounded-xl bg-umber/50 border border-divider px-3 py-2 text-silver placeholder-slate-500 focus:outline-none focus:border-cedar"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-silver mb-1">Email or Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={visitor.contact}
                    onChange={(e) => setVisitor({ ...visitor, contact: e.target.value })}
                    placeholder="alex@company.com or +1 555..."
                    className="w-full rounded-xl bg-umber/50 border border-divider px-3 py-2 text-silver placeholder-slate-500 focus:outline-none focus:border-cedar"
                  />
                </div>

                {/* Persona Selector */}
                <div>
                  <label className="block text-[11px] font-medium text-silver mb-1.5">I am visiting as a:</label>
                  <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
                    <button
                      type="button"
                      onClick={() => setVisitor({ ...visitor, persona: 'hr' })}
                      className={`flex flex-col items-center gap-1 rounded-xl border p-2.5 transition-all ${visitor.persona === 'hr'
                          ? 'border-cedar bg-umber text-silver font-bold shadow-md'
                          : 'border-divider bg-darkBg text-slate-400 hover:text-silver hover:bg-umber/50'
                        }`}
                    >
                      <UserCheck className="h-4 w-4 text-amber-200" />
                      <span>HR / Recruiter</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisitor({ ...visitor, persona: 'client' })}
                      className={`flex flex-col items-center gap-1 rounded-xl border p-2.5 transition-all ${visitor.persona === 'client'
                          ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 font-bold shadow-md'
                          : 'border-divider bg-darkBg text-slate-400 hover:text-silver hover:bg-umber/50'
                        }`}
                    >
                      <Briefcase className="h-4 w-4 text-emerald-400" />
                      <span>Client / Founder</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisitor({ ...visitor, persona: 'developer' })}
                      className={`flex flex-col items-center gap-1 rounded-xl border p-2.5 transition-all ${visitor.persona === 'developer'
                          ? 'border-purple-400 bg-purple-500/10 text-purple-300 font-bold shadow-md'
                          : 'border-divider bg-darkBg text-slate-400 hover:text-silver hover:bg-umber/50'
                        }`}
                    >
                      <Code2 className="h-4 w-4 text-purple-400" />
                      <span>Developer / Peer</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-silver mb-1">Reason for Visit / Project Inquiry (Optional)</label>
                  <textarea
                    rows={2}
                    value={visitor.reason}
                    onChange={(e) => setVisitor({ ...visitor, reason: e.target.value })}
                    placeholder="e.g. Looking for a Full-Stack Lead / Planning a web app..."
                    className="w-full rounded-xl bg-umber/50 border border-divider px-3 py-2 text-silver placeholder-slate-500 focus:outline-none focus:border-cedar resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-umber border border-cedar py-2.5 text-xs font-bold text-silver hover:bg-mocha transition-all cursor-pointer shadow-lg shadow-black/40"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Tailored Briefing
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. PERSONA-TAILORED BRIEFING POP-UP CONTAINER */}
      <AnimatePresence>
        {showBriefingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkBg/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-2xl border border-divider bg-darkBg/95 p-6 shadow-2xl backdrop-blur-2xl text-silver font-sans space-y-4 max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-divider pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-bold text-silver">
                      Briefing for {visitor.firstName || 'Visitor'} {visitor.lastName}
                    </h3>
                    <span className="text-[10px] font-mono text-amber-200 uppercase tracking-wider">
                      Tailored Persona: {visitor.persona === 'hr' ? '👔 HR / Recruiter' : visitor.persona === 'client' ? '💼 Client / Project Founder' : '💻 Developer / Tech Peer'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowBriefingModal(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-mocha hover:text-silver transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* PERSONA CONTENT 1: HR / RECRUITER */}
              {visitor.persona === 'hr' && (
                <div className="space-y-4 text-xs">
                  <div className="rounded-xl border border-cedar bg-umber/40 p-3.5 leading-relaxed text-silver">
                    <p className="font-semibold text-amber-200 mb-1">🎯 Executive Hiring Summary</p>
                    Santhosh Raj is a <strong>Senior Full-Stack Engineer (@sandyddeveloper)</strong> specializing in building high-concurrency Node.js/Python backends, sub-32ms SQL performance, and modern Next.js 16 frontend systems.
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between rounded-lg border border-divider bg-umber/30 p-2.5">
                      <span className="text-slate-400">Target Roles:</span>
                      <span className="font-bold text-silver">Full-Stack Lead / Senior Engineer</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-divider bg-umber/30 p-2.5">
                      <span className="text-slate-400">Primary Stack:</span>
                      <span className="text-amber-200 font-bold">Next.js 16, TS, Node, Python, SQL</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-divider bg-umber/30 p-2.5">
                      <span className="text-slate-400">GitHub Activity:</span>
                      <span className="text-emerald-400 font-bold">41 Public Repositories</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-divider bg-umber/30 p-2.5">
                      <span className="text-slate-400">Production Availability:</span>
                      <span className="text-purple-400 font-bold">99.95% High Uptime Track Record</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-divider flex flex-wrap gap-2">
                    <a
                      href={`mailto:${targetContactEmail}?subject=Full-Stack Role Inquiry`}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-umber border border-cedar py-2 text-xs font-bold text-silver hover:bg-mocha transition-all"
                    >
                      <Mail className="h-3.5 w-3.5" /> Email Candidate
                    </a>
                    <button
                      onClick={() => handleJumpTo('#projects')}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-darkBg border border-divider py-2 text-xs font-bold text-silver hover:bg-umber/50 transition-all"
                    >
                      <Briefcase className="h-3.5 w-3.5" /> View Projects
                    </button>
                  </div>
                </div>
              )}

              {/* PERSONA CONTENT 2: CLIENT / PROJECT FOUNDER */}
              {visitor.persona === 'client' && (
                <div className="space-y-4 text-xs">
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 leading-relaxed text-emerald-200">
                    <p className="font-semibold text-white mb-1">🚀 Product & Engineering Services</p>
                    Santhosh Raj partners with clients & startup founders to take product concepts from zero-to-one into <strong>scalable, high-performance web applications</strong>.
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="rounded-lg border border-divider bg-umber/30 p-2.5">
                      <span className="text-emerald-400 font-bold block mb-0.5">1. Full-Stack Web Development</span>
                      <span className="text-slate-400">Next.js 16, React, Node.js, Python backends & clean modern styling.</span>
                    </div>

                    <div className="rounded-lg border border-divider bg-umber/30 p-2.5">
                      <span className="text-amber-200 font-bold block mb-0.5">2. Database & API Performance</span>
                      <span className="text-slate-400">PostgreSQL indexing, Redis caching, zero-lock query optimization.</span>
                    </div>

                    <div className="rounded-lg border border-divider bg-umber/30 p-2.5">
                      <span className="text-purple-400 font-bold block mb-0.5">3. Rapid Time-to-Market</span>
                      <span className="text-slate-400">High-velocity shipping, clean maintainable code, zero technical debt.</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-divider flex flex-wrap gap-2">
                    <a
                      href={`mailto:${targetContactEmail}?subject=Project Discovery Consultation`}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-all"
                    >
                      <PhoneCall className="h-3.5 w-3.5" /> Book Project Call
                    </a>
                    <button
                      onClick={() => handleJumpTo('#sql-lab')}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-darkBg border border-divider py-2 text-xs font-bold text-silver hover:bg-umber/50 transition-all"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> Test SQL Sandbox
                    </button>
                  </div>
                </div>
              )}

              {/* PERSONA CONTENT 3: DEVELOPER / PEER */}
              {visitor.persona === 'developer' && (
                <div className="space-y-4 text-xs">
                  <div className="rounded-xl border border-cedar bg-umber/40 p-3.5 leading-relaxed text-silver">
                    <p className="font-semibold text-amber-200 mb-1">💻 Developer Tech Specs</p>
                    Welcome fellow dev! Explore Santhosh Raj&apos;s real-time GitHub telemetry (`@sandyddeveloper`), interactive SQL sandbox, and distributed architecture topology.
                  </div>

                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between rounded-lg border border-divider bg-umber/30 p-2.5">
                      <span className="text-slate-400">GitHub Profile:</span>
                      <a
                        href="https://github.com/sandyddeveloper"
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-200 font-bold hover:underline flex items-center gap-1"
                      >
                        @sandyddeveloper <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-divider bg-umber/30 p-2.5">
                      <span className="text-slate-400">Interactive Demos:</span>
                      <span className="text-amber-200 font-bold">SQL Lab & System Topology</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-divider flex flex-wrap gap-2">
                    <button
                      onClick={() => handleJumpTo('#system-design')}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-umber border border-cedar py-2 text-xs font-bold text-silver hover:bg-mocha transition-all"
                    >
                      <Code2 className="h-3.5 w-3.5" /> System Design Sandbox
                    </button>
                    <button
                      onClick={() => handleJumpTo('#telemetry')}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-darkBg border border-divider py-2 text-xs font-bold text-silver hover:bg-umber/50 transition-all"
                    >
                      <ChevronRight className="h-3.5 w-3.5" /> GitHub Telemetry
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SPEECH BUBBLE & DASHBOARD CARD */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mb-3 w-72 sm:w-80 rounded-2xl border border-divider bg-darkBg/95 p-4 shadow-2xl backdrop-blur-2xl text-silver font-sans"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-divider pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
                <span className="text-xs font-bold tracking-tight text-silver">
                  RoboX 3D Companion
                </span>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 bg-umber border border-divider p-0.5 rounded-lg text-[11px]">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all ${activeTab === 'chat' ? 'bg-cedar text-silver font-bold' : 'text-slate-400 hover:text-silver'
                    }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('actions')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all ${activeTab === 'actions' ? 'bg-cedar text-silver font-bold' : 'text-slate-400 hover:text-silver'
                    }`}
                >
                  Actions
                </button>
                <button
                  onClick={() => setActiveTab('nav')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-all ${activeTab === 'nav' ? 'bg-cedar text-silver font-bold' : 'text-slate-400 hover:text-silver'
                    }`}
                >
                  Nav
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-mocha hover:text-silver transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Message Bubble Box */}
            <div className="rounded-xl border border-divider bg-umber/40 p-3 text-xs leading-relaxed text-silver">
              {speechText}
            </div>

            {/* TAB 1: AI CHAT */}
            {activeTab === 'chat' && (
              <div className="mt-3 space-y-2.5 border-t border-slate-800/80 pt-2.5">
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={handleOpenScanForm}
                    className="rounded-lg border border-cedar bg-umber px-2 py-1 text-[11px] font-bold text-silver hover:bg-mocha transition-all flex items-center gap-1 shadow-sm"
                  >
                    🔍 Scan & Tailor Briefing
                  </button>
                  <button
                    onClick={() => setSpeechText(KNOWLEDGE_BASE.skills)}
                    className="rounded-lg border border-divider bg-darkBg px-2 py-1 text-[11px] text-slate-300 hover:border-cedar hover:text-silver transition-all"
                  >
                    🛠️ Tech Stack
                  </button>
                  <button
                    onClick={() => setSpeechText(KNOWLEDGE_BASE.projects)}
                    className="rounded-lg border border-divider bg-darkBg px-2 py-1 text-[11px] text-slate-300 hover:border-cedar hover:text-silver transition-all"
                  >
                    💼 Projects
                  </button>
                </div>

                <form onSubmit={handleChatSubmit} className="flex gap-1.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask RoboX or type 'scan'..."
                    className="w-full rounded-xl bg-umber/50 border border-divider px-3 py-1.5 text-xs text-silver placeholder-slate-500 focus:outline-none focus:border-cedar"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-umber border border-cedar px-2.5 py-1.5 text-silver hover:bg-mocha transition-all"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: 3D ACTIONS */}
            {activeTab === 'actions' && (
              <div className="mt-3 space-y-2.5 border-t border-divider pt-2.5 text-xs">
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={handleOpenScanForm}
                    className="col-span-2 rounded-xl border border-cedar bg-umber px-3 py-2 text-[11px] font-bold text-silver hover:bg-mocha transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Scan className="h-3.5 w-3.5 text-amber-200" /> 🔍 Scan & Tailor Briefing
                  </button>

                  <button
                    onClick={() => { setAction('dance'); playSound('beep'); }}
                    className={`rounded-xl border px-3 py-2 text-[11px] font-semibold transition-all ${action === 'dance' ? 'bg-pink-500/10 border-pink-500/40 text-pink-400' : 'bg-darkBg border-divider text-slate-300 hover:text-silver hover:bg-umber/50'
                      }`}
                  >
                    💃 3D Dance Party
                  </button>

                  <button
                    onClick={() => { setAction('idle'); playSound('beep'); }}
                    className={`rounded-xl border px-3 py-2 text-[11px] font-semibold transition-all ${action === 'idle' ? 'bg-umber text-silver border-cedar font-bold' : 'bg-darkBg text-slate-400 border-divider'
                      }`}
                  >
                    ⏸️ Reset Action
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: NAVIGATION JUMPS */}
            {activeTab === 'nav' && (
              <div className="mt-3 space-y-1.5 border-t border-divider pt-2.5 text-xs">
                <button
                  onClick={() => handleJumpTo('#sql-lab')}
                  className="w-full flex items-center justify-between rounded-xl border border-divider bg-darkBg px-3 py-2 text-[11px] text-slate-300 hover:border-cedar hover:text-silver hover:bg-umber/40 transition-all"
                >
                  <span>1. SQL Performance Lab</span>
                  <ArrowDownRight className="h-3.5 w-3.5 text-amber-200" />
                </button>

                <button
                  onClick={() => handleJumpTo('#system-design')}
                  className="w-full flex items-center justify-between rounded-xl border border-divider bg-darkBg px-3 py-2 text-[11px] text-slate-300 hover:border-cedar hover:text-silver hover:bg-umber/40 transition-all"
                >
                  <span>2. System Design Sandbox</span>
                  <ArrowDownRight className="h-3.5 w-3.5 text-amber-200" />
                </button>

                <button
                  onClick={() => handleJumpTo('#blog')}
                  className="w-full flex items-center justify-between rounded-xl border border-divider bg-darkBg px-3 py-2 text-[11px] text-slate-300 hover:border-cedar hover:text-silver hover:bg-umber/40 transition-all"
                >
                  <span>3. Engineering Case Studies</span>
                  <ArrowDownRight className="h-3.5 w-3.5 text-amber-200" />
                </button>

                <button
                  onClick={() => handleJumpTo('#projects')}
                  className="w-full flex items-center justify-between rounded-xl border border-divider bg-darkBg px-3 py-2 text-[11px] text-slate-300 hover:border-cedar hover:text-silver hover:bg-umber/40 transition-all"
                >
                  <span>4. Selected Work & Projects</span>
                  <ArrowDownRight className="h-3.5 w-3.5 text-amber-200" />
                </button>
              </div>
            )}

            {/* Footer Audio Control */}
            <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px] text-slate-400 font-mono">
              <span className="text-[10px]">RoboX 3D Intake</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              >
                {soundEnabled ? <Volume2 className="h-3 w-3 text-cyan-400" /> : <VolumeX className="h-3 w-3" />} Sound: {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL STATIC 3D ROBOT STRUCTURE IN BOTTOM RIGHT */}
      <button
        onClick={() => {
          playSound('beep');
          setIsOpen(!isOpen);
        }}
        className="group relative flex items-center justify-center cursor-pointer transition-all active:scale-95 p-1"
        title="Click to open RoboX 3D Scanner & AI Companion"
      >
        {/* Glow Aura */}
        <div className="absolute -inset-2 rounded-full bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/35 transition-all" />

        {/* JETPACK FIRE THRUSTER PARTICLES */}
        <div className="absolute -bottom-3 z-0 flex gap-4 pointer-events-none">
          <motion.div
            className="h-6 w-2.5 rounded-b-full bg-gradient-to-t from-cyan-400 via-orange-500 to-transparent blur-[1px]"
            animate={{ height: [12, 22, 12], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 0.15 }}
          />
          <motion.div
            className="h-6 w-2.5 rounded-b-full bg-gradient-to-t from-cyan-400 via-orange-500 to-transparent blur-[1px]"
            animate={{ height: [12, 22, 12], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 0.15, delay: 0.05 }}
          />
        </div>

        {/* ROBOT STRUCTURE SVG */}
        <motion.div
          animate={
            action === 'dance'
              ? { rotate: [-15, 15, -15], y: [0, -8, 0] }
              : { y: [-4, 4, -4] }
          }
          transition={
            action === 'dance'
              ? { repeat: Infinity, duration: 0.45, ease: 'easeInOut' }
              : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
          }
          className="relative z-10"
        >
          <svg
            width="72"
            height="94"
            viewBox="0 0 100 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
          >
            <defs>
              <linearGradient id="bodyGradient" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#F1F5F9" />
                <stop offset="85%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>

              <linearGradient id="helmetGradient" x1="30%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>

              <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="35%" stopColor="#94A3B8" />
                <stop offset="70%" stopColor="#475569" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>

              <linearGradient id="visorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B1329" />
                <stop offset="60%" stopColor="#020617" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>

              <filter id="eyeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* HEAD GROUP */}
            <g id="RobotHead">
              <rect x="18" y="16" width="6" height="12" rx="3" fill="url(#chromeGradient)" />
              <rect x="76" y="16" width="6" height="12" rx="3" fill="url(#chromeGradient)" />

              <rect x="22" y="6" width="56" height="34" rx="16" fill="url(#helmetGradient)" stroke="#94A3B8" strokeWidth="1.5" />
              <ellipse cx="50" cy="10" rx="18" ry="3.5" fill="#FFFFFF" opacity="0.9" />

              <rect x="28" y="12" width="44" height="22" rx="10" fill="url(#visorGradient)" stroke="#334155" strokeWidth="1.5" />
              <path d="M32 14 H68 C70 14, 71 16, 70 17 L30 17 C29 16, 30 14, 32 14 Z" fill="#FFFFFF" opacity="0.25" />

              {/* Glowing 3D Eyes */}
              {action === 'dance' ? (
                <g fill="#F472B6" filter="url(#eyeGlow)">
                  <text x="39" y="27" textAnchor="middle" fontSize="11" fontWeight="bold">★</text>
                  <text x="61" y="27" textAnchor="middle" fontSize="11" fontWeight="bold">★</text>
                </g>
              ) : (
                <g fill="#38bdf8" filter="url(#eyeGlow)">
                  <rect x="34" y="17" width="4" height="4" rx="1" />
                  <rect x="40" y="17" width="4" height="4" rx="1" />
                  <rect x="34" y="23" width="4" height="4" rx="1" />
                  <rect x="40" y="23" width="4" height="4" rx="1" />

                  <rect x="56" y="17" width="4" height="4" rx="1" />
                  <rect x="62" y="17" width="4" height="4" rx="1" />
                  <rect x="56" y="23" width="4" height="4" rx="1" />
                  <rect x="62" y="23" width="4" height="4" rx="1" />
                </g>
              )}
            </g>

            {/* NECK JOINT */}
            <rect x="44" y="39" width="12" height="4" rx="2" fill="url(#chromeGradient)" />

            {/* CHEST ARMOR & ARC REACTOR */}
            <g id="RobotChest">
              <rect x="18" y="42" width="14" height="8" rx="3" fill="url(#chromeGradient)" stroke="#64748B" strokeWidth="0.8" />
              <rect x="68" y="42" width="14" height="8" rx="3" fill="url(#chromeGradient)" stroke="#64748B" strokeWidth="0.8" />

              <path
                d="M26 43 H74 L68 76 H32 L26 43 Z"
                fill="url(#bodyGradient)"
                stroke="#94A3B8"
                strokeWidth="1.5"
              />

              <path d="M30 45 H70 L67 52 H33 Z" fill="#FFFFFF" opacity="0.4" />

              {/* Central Power Arc Reactor */}
              <motion.circle
                cx="50"
                cy="60"
                r="5.5"
                fill="#38bdf8"
                stroke="url(#chromeGradient)"
                strokeWidth="1"
                filter="url(#eyeGlow)"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />

              <text x="50" y="70" textAnchor="middle" fill="#64748B" fontSize="5.5" fontWeight="bold" letterSpacing="0.5">
                RoboX 3D
              </text>
            </g>

            {/* LEFT ARM */}
            <g id="LeftArm">
              <rect x="14" y="46" width="10" height="14" rx="5" fill="url(#bodyGradient)" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="19" cy="61" r="3.5" fill="url(#chromeGradient)" />
              <rect x="12" y="63" width="12" height="16" rx="5" fill="url(#bodyGradient)" stroke="#94A3B8" strokeWidth="1" />
              <path d="M14 79 C12 83, 14 86, 17 86 C19 86, 21 83, 20 79" fill="url(#chromeGradient)" stroke="#64748B" strokeWidth="1" />
            </g>

            {/* RIGHT ARM */}
            <g id="RightArm">
              <rect x="76" y="46" width="10" height="14" rx="5" fill="url(#bodyGradient)" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="81" cy="61" r="3.5" fill="url(#chromeGradient)" />
              <rect x="76" y="63" width="12" height="16" rx="5" fill="url(#bodyGradient)" stroke="#94A3B8" strokeWidth="1" />
              <path d="M80 79 C78 83, 80 86, 83 86 C85 86, 87 83, 86 79" fill="url(#chromeGradient)" stroke="#64748B" strokeWidth="1" />
            </g>

            {/* PELVIS */}
            <rect x="34" y="75" width="32" height="8" rx="3" fill="url(#chromeGradient)" />

            {/* LEFT LEG */}
            <g id="LeftLeg">
              <rect x="31" y="80" width="14" height="16" rx="4" fill="url(#bodyGradient)" stroke="#94A3B8" strokeWidth="1" />
              <rect x="33" y="84" width="10" height="10" rx="2" fill="url(#chromeGradient)" />
              <rect x="30" y="95" width="16" height="20" rx="5" fill="url(#bodyGradient)" stroke="#94A3B8" strokeWidth="1.2" />
              <path d="M26 114 C26 110, 42 110, 44 114 L45 122 C45 125, 25 125, 26 122 Z" fill="url(#bodyGradient)" stroke="#64748B" strokeWidth="1.2" />
            </g>

            {/* RIGHT LEG */}
            <g id="RightLeg">
              <rect x="55" y="80" width="14" height="16" rx="4" fill="url(#bodyGradient)" stroke="#94A3B8" strokeWidth="1" />
              <rect x="57" y="84" width="10" height="10" rx="2" fill="url(#chromeGradient)" />
              <rect x="54" y="95" width="16" height="20" rx="5" fill="url(#bodyGradient)" stroke="#94A3B8" strokeWidth="1.2" />
              <path d="M56 114 C56 110, 72 110, 74 114 L75 122 C75 125, 55 125, 56 122 Z" fill="url(#bodyGradient)" stroke="#64748B" strokeWidth="1.2" />
            </g>
          </svg>
        </motion.div>
      </button>
    </div>
  );
}
