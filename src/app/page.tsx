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
import { DiscreetFloatingMenu } from '@/components/DiscreetFloatingMenu';

// Lazy-loaded interactive components for sub-second FCP/LCP performance
const SQLLab = dynamic(() => import('@/components/SQLLab').then((m) => m.SQLLab), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 animate-pulse" />
});

const SystemDesignCanvas = dynamic(() => import('@/components/SystemDesignCanvas').then((m) => m.SystemDesignCanvas), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 animate-pulse" />
});

const InteractiveTechMatrix = dynamic(() => import('@/components/InteractiveTechMatrix').then((m) => m.InteractiveTechMatrix), {
  ssr: false,
  loading: () => <div className="h-96 w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 animate-pulse" />
});

const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline').then((m) => m.ExperienceTimeline), {
  ssr: false,
  loading: () => <div className="h-64 w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 animate-pulse" />
});

import {
  Zap,
  Code2,
  Database,
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

function DeveloperSandboxContainer({ onActiveChange }: { onActiveChange?: (active: boolean) => void }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'sql' | 'design' | 'playground'>('sql');

  return (
    <div 
      className="space-y-6 w-full"
      onMouseEnter={() => onActiveChange?.(true)}
      onMouseLeave={() => onActiveChange?.(false)}
      onFocus={() => onActiveChange?.(true)}
      onBlur={() => onActiveChange?.(false)}
    >
      {/* Segmented Tab Control (Material 3 Style) */}
      <div className={`w-full p-1.5 rounded-2xl border flex flex-wrap sm:flex-nowrap items-center gap-1.5 backdrop-blur-md ${
        theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100/80 border-slate-200'
      }`}>
        <button
          onClick={() => setActiveTab('sql')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'sql'
              ? 'bg-blue-600 text-white shadow-sm'
              : theme === 'dark'
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Database className="h-4 w-4" />
          <span>SQL Query Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('design')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'design'
              ? 'bg-blue-600 text-white shadow-sm'
              : theme === 'dark'
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>System Topology</span>
        </button>

        <button
          onClick={() => setActiveTab('playground')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'playground'
              ? 'bg-blue-600 text-white shadow-sm'
              : theme === 'dark'
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>API & Event Playground</span>
        </button>
      </div>

      {/* Active Tab Workspace Container */}
      <div className={`w-full rounded-3xl border p-4 sm:p-6 shadow-sm ${
        theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
      }`}>
        {activeTab === 'sql' && <SQLLab />}
        {activeTab === 'design' && <SystemDesignCanvas />}
        {activeTab === 'playground' && <SystemPlayground />}
      </div>
    </div>
  );
}

// Capped to max 4 tech tags per project card for optimal scannability
const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'analytics-platform',
    category: 'Full-Stack',
    title: 'Real-Time Telemetry & Insights Dashboard',
    subtitle: 'Streamed analytics platform monitoring 10M+ events daily with sub-50ms latency',
    description: 'Designed a high-throughput monitoring dashboard integrating real-time WebSockets, dynamic charts, and automated alerting for distributed cluster metrics.',
    longDescription: 'Engineered a full-stack telemetry engine handling streaming data feeds. Built using Next.js 16 App Router for server-rendered dashboards, Node.js WebSocket gateways for sub-50ms live chart updates, and Redis for high-frequency event caching.',
    techStack: ['Next.js 16', 'TypeScript', 'Redis', 'PostgreSQL'],
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
    demoUser: 'admin@santhush.dev',
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
    techStack: ['Python', 'FastAPI', 'Redis', 'Docker'],
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
    demoUser: 'engineer@santhush.dev',
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
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
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
    demoUser: 'designer@santhush.dev',
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
    techStack: ['TypeScript', 'Node.js', 'Vector DB', 'Next.js'],
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
    demoUser: 'ai_auditor@santhush.dev',
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
  
  // Controls overlay visibility when user is in Sandbox workspace
  const [isSandboxActive, setIsSandboxActive] = useState(false);
  const [botVisible, setBotVisible] = useState(true);

  useEffect(() => {
    const handleOpenCmd = () => setIsCmdPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenCmd);
    return () => window.removeEventListener('open-command-palette', handleOpenCmd);
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <main className={`relative min-h-screen transition-colors duration-300 pb-0 pt-24 ${
      theme === 'dark' ? 'text-slate-100 bg-slate-950' : 'text-slate-900 bg-slate-50/50'
    }`}>
      {/* Background Canvas */}
      <BackgroundCanvas />

      {/* Animated Splash Screen */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Global Cmd + K Search Palette */}
      <CommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} />

      {/* Material 3 Simplified Navbar */}
      <Navbar onOpenCmdPalette={() => setIsCmdPaletteOpen(true)} />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        
        {/* 1. HERO SECTION - Single Authoritative Headline */}
        <section id="hero" className="relative pt-6 overflow-hidden rounded-3xl">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill={theme === 'dark' ? '#3b82f6' : '#60a5fa'}
          />
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">
            
            {/* Headline & Primary Intro (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 w-fit">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Backend Engineer • Scalable Systems & AI</span>
              </div>

              {/* Single Authoritative Headline */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] ${
                theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Architecting <span className="text-blue-600">Scalable Systems</span> & High-Performance APIs.
              </h1>

              {/* Concise Body Subtitle */}
              <p className={`text-base sm:text-lg leading-relaxed font-normal ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Backend & Full-Stack Specialist engineering low-latency Python/Django REST microservices, PostgreSQL time-series indexing, and intelligent RAG AI integrations.
              </p>

              {/* Primary Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 text-sm transition-all shadow-sm flex items-center gap-2"
                >
                  <Code2 className="h-4 w-4" />
                  <span>View Projects</span>
                </a>

                <a
                  href="#sandbox"
                  className={`rounded-full border font-semibold px-5 py-2.5 text-sm transition-all flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800'
                      : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="h-4 w-4 text-blue-600" />
                  <span>Developer Sandbox</span>
                </a>

                <a
                  href="#contact"
                  className={`rounded-full border font-semibold px-5 py-2.5 text-sm transition-all flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800'
                      : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span>Contact</span>
                </a>
              </div>
            </div>

            {/* Profile Avatar / Voice Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <HeroAvatarVoiceCard />
            </div>
          </div>

          {/* Metric Telemetry Strip - Material 3 Surface */}
          <div className="w-full mt-10">
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl border ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900/60'
                : 'border-slate-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">Sub-30ms</span>
                <span className="text-xs text-slate-500 font-medium">API Latency</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">99.99%</span>
                <span className="text-xs text-slate-500 font-medium">System Uptime</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-mono text-slate-800 dark:text-slate-200">PostgreSQL</span>
                <span className="text-xs text-slate-500 font-medium">Mutual Funds Stack</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  RAG AI
                </span>
                <span className="text-xs text-slate-500 font-medium">Vector Search</span>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 2. ABOUT SECTION */}
        <section id="about" className="scroll-mt-24 space-y-6">
          <div className={`border-b pb-3 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
              Engineering Philosophy
            </h2>
            <p className="text-sm font-normal text-slate-500 mt-1">
              Building resilient backend services with clean architecture and performance-first design.
            </p>
          </div>

          <GlowingEffectDemo />
        </section>

        <SectionDivider />

        {/* 3. EXPERIENCE TIMELINE */}
        <section id="experience" className="scroll-mt-24 space-y-6">
          <div className={`border-b pb-3 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
              Production Experience
            </h2>
            <p className="text-sm font-normal text-slate-500 mt-1">
              Track record of delivering high-concurrency APIs, microservices, and databases.
            </p>
          </div>

          <ExperienceTimeline />
        </section>

        <SectionDivider />

        {/* 4. FEATURED PROJECTS - Material You Cards */}
        <section id="projects" className="scroll-mt-24 space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-3 ${
            theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div>
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
                Featured Work
              </h2>
              <p className="text-sm font-normal text-slate-500 mt-1">
                Production systems and applications engineered for scale and speed.
              </p>
            </div>

            {/* Filter Category Chips */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Full-Stack', 'Backend & APIs', 'Frontend UX', 'AI & Automation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : theme === 'dark'
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clean 2-Column Responsive Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`flex flex-col justify-between rounded-3xl border p-6 transition-all duration-200 ${
                  theme === 'dark'
                    ? 'border-slate-800 bg-slate-900/80 text-slate-100 shadow-sm hover:shadow-md'
                    : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-md'
                }`}
              >
                <article className="flex flex-col justify-between h-full space-y-4">
                  <div>
                    {/* Category Pill & Top Metric */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {project.metrics[0]}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold transition-colors ${
                      theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      {project.title}
                    </h3>

                    <p className={`mt-2 text-xs sm:text-sm leading-relaxed font-normal ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {project.description}
                    </p>

                    {/* Capped Tech Tags (Max 4 for crisp scannability) */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-mono font-medium ${
                            theme === 'dark'
                              ? 'border-slate-800 bg-slate-800/60 text-slate-300'
                              : 'border-slate-200 bg-slate-100 text-slate-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className={`pt-4 flex items-center justify-between border-t ${
                    theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    <button
                      onClick={() => setActiveProject(project)}
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                          title="GitHub Repository"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* 5. SKILLS MATRIX */}
        <section id="skills" className="scroll-mt-24 space-y-6">
          <InteractiveTechMatrix />
        </section>

        <SectionDivider />

        {/* 6. INTERACTIVE DEVELOPER SANDBOX */}
        <section id="sandbox" className="scroll-mt-24 space-y-6">
          <div className={`border-b pb-3 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
              Developer Sandbox
            </h2>
            <p className="text-sm font-normal text-slate-500 mt-1">
              Simulate live SQL indexing queries, system topologies, and event payloads in an isolated workspace.
            </p>
          </div>

          <DeveloperSandboxContainer onActiveChange={(active) => setIsSandboxActive(active)} />
        </section>

        <SectionDivider />

        {/* 7. CONTACT SECTION */}
        <UniqueContactSection />
      </div>

      <div className="mt-20" />

      {/* FOOTER */}
      <Footer />

      {/* Project Specs Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      {/* Mascot Companion - Auto-hidden during Sandbox interaction */}
      {splashDone && botVisible && <WalkingBot isHidden={isSandboxActive} />}

      {/* Discreet Consolidated Floating Action Menu */}
      <DiscreetFloatingMenu
        isSandboxActive={isSandboxActive}
        botVisible={botVisible}
        onToggleBot={() => setBotVisible(!botVisible)}
        onOpenCmdPalette={() => setIsCmdPaletteOpen(true)}
      />
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
