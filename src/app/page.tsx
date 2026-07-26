'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ToastProvider } from '@/components/Toast';
import { Navbar } from '@/components/Navbar';
import { WalkingBot } from '@/components/WalkingBot';
import { SplashScreen } from '@/components/SplashScreen';
import { SystemPlayground } from '@/components/SystemPlayground';
import { ProjectModal, ProjectData } from '@/components/ProjectModal';
import { BackgroundCanvas } from '@/components/BackgroundCanvas';
import { CommandPalette } from '@/components/CommandPalette';
import { Footer } from '@/components/Footer';
import { HeroAvatarVoiceCard } from '@/components/HeroAvatarVoiceCard';
import { UniqueContactSection } from '@/components/UniqueContactSection';
import { SectionDivider } from '@/components/SectionDivider';
import { SmoothScroll } from '@/components/SmoothScroll';
import GlowingEffectDemo from '@/components/glowing-effect-demo';
import { Spotlight } from '@/components/ui/spotlight';
import { MagicButton } from '@/components/ui/border-magic-button';
import { WobbleCard } from '@/components/ui/wobble-card';

// Lazy-loaded heavy interactive components for sub-second FCP/LCP performance
const SQLLab = dynamic(() => import('@/components/SQLLab').then((m) => m.SQLLab), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-3xl border border-slate-800 bg-slate-950/60 animate-pulse" />
});

const SystemDesignCanvas = dynamic(() => import('@/components/SystemDesignCanvas').then((m) => m.SystemDesignCanvas), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-3xl border border-slate-800 bg-slate-950/60 animate-pulse" />
});

const InteractiveTechMatrix = dynamic(() => import('@/components/InteractiveTechMatrix').then((m) => m.InteractiveTechMatrix), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-3xl border border-slate-800 bg-slate-950/60 animate-pulse" />
});

const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline').then((m) => m.ExperienceTimeline), {
  ssr: false,
  loading: () => <div className="h-64 w-full rounded-3xl border border-slate-800 bg-slate-950/60 animate-pulse" />
});

import {
  SquareTerminal,
  Zap,
  Code2,
  Database,
  Server,
  Mail,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';



function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function DeveloperSandboxContainer() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'sql' | 'design' | 'playground'>('sql');

  return (
    <div className="space-y-6">
      {/* Sleek Tab Bar Switcher */}
      <div className={`flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-950/80 border-purple-900/40' : 'bg-purple-50/60 border-purple-200'
        }`}>
        <button
          onClick={() => setActiveTab('sql')}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'sql'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : theme === 'dark'
                ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
        >
          <Database className="h-4 w-4" />
          <span>SQL Query Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('design')}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'design'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : theme === 'dark'
                ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
        >
          <Layers className="h-4 w-4" />
          <span>System Topology</span>
        </button>

        <button
          onClick={() => setActiveTab('playground')}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'playground'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : theme === 'dark'
                ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
        >
          <Zap className="h-4 w-4" />
          <span>API & Event Playground</span>
        </button>
      </div>

      {/* Active Tab Component Render */}
      <div className="transition-all duration-300">
        {activeTab === 'sql' && <SQLLab />}
        {activeTab === 'design' && <SystemDesignCanvas />}
        {activeTab === 'playground' && <SystemPlayground />}
      </div>
    </div>
  );
}

const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'analytics-platform',
    category: 'Full-Stack',
    title: 'Real-Time Telemetry & Insights Dashboard',
    subtitle: 'Streamed analytics platform monitoring 10M+ events daily with zero lag',
    description: 'Designed a high-throughput monitoring dashboard integrating real-time WebSockets, dynamic charts, and automated alerting for distributed cluster metrics.',
    longDescription: 'Engineered a full-stack telemetry engine handling streaming data feeds. Built using Next.js 16 App Router for server-rendered dashboards, Node.js WebSocket gateways for sub-50ms live chart updates, and Redis for high-frequency event caching.',
    techStack: ['Next.js 16', 'TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Tailwind CSS'],
    metrics: ['Sub-50ms Event Delivery', '10M+ Daily Telemetry Points', '99.95% Uptime'],
    architectureHighlights: [
      'Built a hybrid WebSocket / Server-Sent Events (SSE) router for instant metric dispatch',
      'Optimized PostgreSQL time-series indexing to speed up multi-tenant queries by 450%',
      'Designed minimal UI components with custom dark/light theme tokens'
    ],
    videoIntroJson: {
      streamTitle: 'Telemetry Event Stream v3',
      throughput: '10.4M Events/Day',
      ingestionLatency: '18ms',
      activeSockets: 1420,
      systemHealth: 'NORMAL (99.95% Uptime)',
      samplePayload: {
        eventId: 'evt_9948172',
        cluster: 'us-east-edge-01',
        metrics: { cpu: '24%', memory: '1.2GB', rps: 4850 },
        timestamp: '2026-07-24T18:14:20Z'
      }
    },
    databaseChoice: 'PostgreSQL for relational integrity paired with Redis for sub-millisecond memory caching.',
    securityFeatures: ['OAuth 2.0 / JWT Auth', 'Role-Based Access Control (RBAC)', 'Rate Limiting Middleware'],
    demoUser: 'admin@santhu.dev',
    demoPass: 'demo2026_pass',
    liveUrl: 'https://example.com/analytics',
    githubUrl: 'https://github.com/example/analytics-engine'
  },
  {
    id: 'workflow-engine',
    category: 'Backend & APIs',
    title: 'Automated Microservice Workflow Engine',
    subtitle: 'Distributed event-driven pipeline system with retry queues & DAG execution',
    description: 'Built a reliable data ingestion pipeline that validates incoming payloads, routes heavy jobs to asynchronous worker pools, and persists state.',
    longDescription: 'Architected a resilient backend workflow system designed to automate data processing across third-party APIs. Implemented Python FastAPI services with Celery + Redis task queues, containerized with Docker, and monitored via OpenTelemetry.',
    techStack: ['Python', 'FastAPI', 'Redis', 'Docker', 'PostgreSQL', 'Celery', 'AWS S3'],
    metrics: ['100k Jobs/Hour', 'Zero Data Loss SLA', '3x Faster Ingestion'],
    architectureHighlights: [
      'Implemented exponential backoff retry queues for flaky downstream APIs',
      'Containerized worker pools scaling dynamically based on queue depth metrics',
      'Structured RESTful & GraphQL endpoints with automated OpenAPI spec generation'
    ],
    videoIntroJson: {
      pipelineName: 'FastAPI Microservice DAG Engine',
      processedJobs: 104820,
      activeWorkers: 16,
      queueStatus: 'DRAINED (0 Pending)',
      sampleTask: {
        taskId: 'dag_job_4091',
        workerId: 'docker_celery_04',
        retries: 0,
        status: 'SUCCESS'
      }
    },
    databaseChoice: 'PostgreSQL with JSONB document support for schema-flexible task payloads.',
    securityFeatures: ['HMAC Signature Validation', 'API Key Throttling', 'AES-256 Payload Encryption'],
    demoUser: 'engineer@santhu.dev',
    demoPass: 'fastapi_token_2026',
    liveUrl: 'https://example.com/workflow',
    githubUrl: 'https://github.com/example/workflow-engine'
  },
  {
    id: 'dev-component-library',
    category: 'Frontend UX',
    title: 'High-Performance UI Design System',
    subtitle: 'Accessible, dark-mode first component framework with zero layout shifts',
    description: 'Created a polished, reusable component system with custom theme tokens, micro-animations, and full keyboard navigation support.',
    longDescription: 'Developed a comprehensive React & Tailwind CSS component library used across multiple production web apps. Features strict TypeScript typings, Framer Motion animations, comprehensive WAI-ARIA compliance, and sub-10kB bundle footprint.',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Storybook'],
    metrics: ['100/100 Lighthouse UX Score', '0ms Cumulative Layout Shift', '< 10kB Gzipped'],
    architectureHighlights: [
      'Designed scalable CSS design tokens for seamless light & dark mode switching',
      'Implemented accessible focus management and keyboard shortcuts for power users',
      'Built interactive storybook docs with automated visual regression tests'
    ],
    videoIntroJson: {
      libraryName: 'Anthopi UI Component Framework',
      bundleSize: '9.4kB gzipped',
      lighthousePerf: 100,
      componentsExported: 48,
      themeSupport: ['Dark Glassmorphic', 'Minimal Light', 'Cyberpunk Neon']
    },
    databaseChoice: 'Static bundle distribution via global CDN edge nodes.',
    securityFeatures: ['Zero Third-Party Runtime Vulnerabilities', 'Content Security Policy (CSP) Friendly'],
    demoUser: 'designer@santhu.dev',
    demoPass: 'storybook_guest',
    liveUrl: 'https://example.com/design-system',
    githubUrl: 'https://github.com/example/ui-framework'
  },
  {
    id: 'ai-code-copilot',
    category: 'AI & Automation',
    title: 'AI Code Review & Security Assistant',
    subtitle: 'Intelligent code audit agent analyzing PRs for vulnerabilities & performance',
    description: 'Integrated LLM agent pipelines with Git hooks to automatically audit pull requests, generate unit tests, and flag security vulnerabilities.',
    longDescription: 'Created a developer productivity tool that analyzes code context in real-time. Combines vector embeddings for codebase indexing, Node.js middleware for GitHub webhook orchestration, and interactive web report outputs.',
    techStack: ['TypeScript', 'Node.js', 'Vector DB', 'OpenAI API', 'Next.js', 'Docker'],
    metrics: ['70% Faster PR Reviews', '100% Automated Security Scans', 'Over 1k Commits Audited'],
    architectureHighlights: [
      'Constructed AST code parser to extract syntax trees before sending prompts',
      'Cached vector embeddings to eliminate redundant AI inference API costs',
      'Rendered interactive web report diffs directly inside developer dashboards'
    ],
    videoIntroJson: {
      agentName: 'RoboX AI Audit Copilot',
      vectorIndex: 'Pinecone Embeddings',
      prsAudited: 1240,
      vulnerabilitiesPrevented: 89,
      aiLatency: '420ms (Streamed)'
    },
    databaseChoice: 'Pinecone Vector DB for semantic code search + SQLite local cache.',
    securityFeatures: ['Local Prompt Anonymization', 'Encrypted Webhooks', 'Token Budget Limits'],
    demoUser: 'ai_auditor@santhu.dev',
    demoPass: 'copilot_pass_key',
    liveUrl: 'https://example.com/ai-copilot',
    githubUrl: 'https://github.com/example/ai-copilot'
  }
];

function PortfolioContent() {
  const { theme } = useTheme();
  const [splashDone, setSplashDone] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const handleOpenCmd = () => setIsCmdPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenCmd);
    return () => window.removeEventListener('open-command-palette', handleOpenCmd);
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <main className={`relative min-h-screen transition-colors duration-300 pb-0 pt-28 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
      }`}>
      {/* Subtle Background Canvas */}
      <BackgroundCanvas />

      {/* Animated Splash Screen */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Global Cmd + K Search Palette */}
      <CommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} />

      {/* Floating Minimal Glass Navbar */}
      <Navbar onOpenCmdPalette={() => setIsCmdPaletteOpen(true)} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-16 sm:gap-24 px-4 sm:px-8 lg:px-12">
        {/* 1. HERO SECTION */}
        <section id="hero" className="relative pt-4 sm:pt-8 overflow-hidden rounded-3xl">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill={theme === 'dark' ? '#a855f7' : '#c084fc'}
          />
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-stretch">
            {/* Main Hero Headline (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2">
              <div className="space-y-6">
                {/* Status Badge */}
                <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 transition-colors ${theme === 'dark' ? 'border-purple-900/50 bg-purple-950/40 text-purple-300' : 'border-purple-200 bg-purple-50 text-purple-800'
                  }`}>
                  <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
                  <span className="text-xs font-bold font-mono tracking-wide">
                    Backend Developer @ DataMoo.ai • Fintech & Scalable APIs
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className={`text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] ${theme === 'dark' ? 'text-white' : 'text-slate-950'
                  }`}>
                  Architecting <span className="text-purple-600">scalable APIs</span> & high-performance backend systems.
                </h1>

                {/* Subtitle */}
                <p className={`text-base sm:text-lg leading-relaxed max-w-xl font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                  Software Developer at <strong className={theme === 'dark' ? 'text-white' : 'text-slate-950'}>DataMoo.ai</strong> specialized in Python, Django REST Framework, PostgreSQL, Scalable Fintech (Mutual Funds) APIs, Docker, Next.js 16, and RAG AI Systems.
                </p>
              </div>

              {/* CTAs */}
              <div className={`pt-6 flex flex-wrap items-center gap-3 border-t mt-6 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
                }`}>
                <MagicButton href="#projects">
                  <Code2 className="h-4 w-4 text-purple-500" />
                  <span>View Selected Work</span>
                </MagicButton>

                <MagicButton href="#sandbox">
                  <SquareTerminal className="h-4 w-4 text-purple-500" />
                  <span>Interactive Sandbox</span>
                </MagicButton>

                <MagicButton href="#contact">
                  <Mail className="h-4 w-4 text-purple-500" />
                  <span>Contact Direct</span>
                </MagicButton>
              </div>
            </div>

            {/* Interactive Profile Photo & Voice Bio Avatar (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <HeroAvatarVoiceCard />
            </div>
          </div>

          {/* Full-Width Telemetry & Metrics Strip */}
          <div className="w-full mt-8">
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl border transition-all ${theme === 'dark'
                ? 'border-purple-900/40 bg-slate-950/70 shadow-inner'
                : 'border-purple-200 bg-white shadow-sm'
              }`}>
              <div className="flex flex-col gap-1">
                <span className={`text-xl sm:text-2xl font-extrabold font-mono block ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>Sub-30ms</span>
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>API Latency</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`text-xl sm:text-2xl font-extrabold font-mono block ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>99.99%</span>
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>System Uptime</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`text-xl sm:text-2xl font-extrabold font-mono block ${theme === 'dark' ? 'text-purple-300' : 'text-purple-800'}`}>PostgreSQL</span>
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>Mutual Funds Stack</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`text-xl sm:text-2xl font-extrabold font-mono flex items-center gap-2 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  RAG AI
                </span>
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>Active Learning</span>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 2. ABOUT & ENGINEERING BACKGROUND */}
        <section id="about" className="scroll-mt-24 space-y-6">
          <div className={`border-b pb-4 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'}`}>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              About & Engineering Background
            </h2>
            <p className={`text-xs sm:text-sm font-medium mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Software Developer at DataMoo.ai focused on backend architecture, API design, and full-stack performance.
            </p>
          </div>

          <GlowingEffectDemo />
        </section>

        <SectionDivider />

        {/* 3. WORK EXPERIENCE TIMELINE */}
        <section id="experience" className="scroll-mt-24 space-y-6">
          <div className={`border-b pb-4 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'}`}>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              Career Journey & Experience
            </h2>
            <p className={`text-xs sm:text-sm font-medium mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Professional backend development experience and production system engineering.
            </p>
          </div>
          <ExperienceTimeline />
        </section>

        <SectionDivider />

        {/* 4. FEATURED PROJECTS & PORTFOLIO */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b pb-4 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
            }`}>
            <div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                Featured Systems & Applications
              </h2>
              <p className={`text-xs sm:text-sm font-medium mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Production systems, API gateways, and web applications engineered for scalability.
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Full-Stack', 'Backend & APIs', 'Frontend UX', 'AI & Automation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-mono font-bold transition-all cursor-pointer ${selectedCategory === cat
                      ? 'bg-purple-600 text-white border border-purple-500 shadow-md shadow-purple-500/20 scale-[1.02]'
                      : theme === 'dark'
                        ? 'bg-slate-950 border border-purple-900/40 text-slate-300 hover:text-white'
                        : 'bg-white border border-purple-200 text-slate-900 font-bold hover:bg-purple-50'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Interactive Wobble Project Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <WobbleCard
                key={project.id}
                containerClassName={`border transition-all duration-300 ${theme === 'dark'
                    ? 'border-purple-900/40 bg-slate-950/80 text-slate-100 shadow-xl'
                    : 'border-purple-200 bg-white text-slate-950 shadow-2xl shadow-purple-500/10'
                  }`}
                className="p-2 sm:p-4 flex flex-col justify-between"
              >
                <article className="group flex flex-col justify-between h-full">
                  <div>
                    {/* Category Pill */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="rounded-full bg-purple-100 border border-purple-300 px-3.5 py-1 text-xs font-bold text-purple-900 font-mono">
                        {project.category}
                      </span>

                      <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        {project.metrics[0]}
                      </span>
                    </div>

                    <h3 className={`text-xl font-extrabold transition-colors ${theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-slate-950 group-hover:text-purple-700'
                      }`}>
                      {project.title}
                    </h3>

                    <p className={`mt-2.5 text-sm leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                      {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-lg border px-3 py-1 text-xs font-mono font-bold ${theme === 'dark'
                              ? 'border-purple-900/40 bg-slate-900/80 text-slate-300'
                              : 'border-purple-200 bg-purple-50 text-purple-900 font-bold'
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Link */}
                  <div className={`mt-8 flex items-center justify-between border-t pt-4 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
                    }`}>
                    <button
                      onClick={() => setActiveProject(project)}
                      className={`flex items-center gap-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'
                        }`}
                    >
                      <span>View Architecture Specs</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-purple-700'}
                          title="GitHub Repository"
                        >
                          <GithubIcon className="h-4.5 w-4.5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-purple-700'}
                          title="Live System Demo"
                        >
                          <ExternalLink className="h-4.5 w-4.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </WobbleCard>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* 5. SKILLS & TECHNOLOGY MATRIX */}
        <section id="skills" className="scroll-mt-24 space-y-6">
          <InteractiveTechMatrix />
        </section>

        <SectionDivider />

        {/* 6. INTERACTIVE DEVELOPER SANDBOX (Tabbed Tools Container) */}
        <section id="sandbox" className="scroll-mt-24 space-y-6">
          <div className={`border-b pb-4 ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'}`}>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              Interactive Developer Sandbox
            </h2>
            <p className={`text-xs sm:text-sm font-medium mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Test live SQL query indexing, simulate microservice system design topologies, and run architecture experiments.
            </p>
          </div>

          <DeveloperSandboxContainer />
        </section>

        <SectionDivider />

        {/* 7. CONTACT & CONNECT SECTION */}
        <UniqueContactSection />
      </div>

      <div className="mt-16 sm:mt-24" />

      {/* FULL-WIDTH FOOTER */}
      <Footer />

      {/* Project Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      {/* Interactive Bot Companion */}
      {splashDone && <WalkingBot />}
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SmoothScroll>
          <PortfolioContent />
        </SmoothScroll>
      </ToastProvider>
    </ThemeProvider>
  );
}
