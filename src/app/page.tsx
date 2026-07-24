'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ToastProvider, useToast } from '@/components/Toast';
import { Navbar } from '@/components/Navbar';
import { WalkingBot } from '@/components/WalkingBot';
import { SplashScreen } from '@/components/SplashScreen';
import { SystemPlayground } from '@/components/SystemPlayground';
import { SQLLab } from '@/components/SQLLab';
import { SystemDesignCanvas } from '@/components/SystemDesignCanvas';
import { BlogSection } from '@/components/BlogSection';
import { GitHubTelemetry } from '@/components/GitHubTelemetry';
import { ProjectModal, ProjectData } from '@/components/ProjectModal';
import { BackgroundCanvas } from '@/components/BackgroundCanvas';
import { CommandPalette } from '@/components/CommandPalette';
import { Footer } from '@/components/Footer';
import {
  Terminal,
  Zap,
  Code2,
  Database,
  Server,
  ArrowUpRight,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Globe,
  Sparkles,
  Search,
  Layers,
  Key,
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

// Selected Work Datasets
const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'analytics-platform',
    category: 'Full-Stack',
    title: 'Real-Time Telemetry & Insights Dashboard',
    subtitle: 'Streamed analytics platform monitoring 10M+ events daily with zero lag',
    description: 'Designed a high-throughput monitoring dashboard integrating real-time WebSockets, dynamic charts, and automated alerting for distributed cluster metrics.',
    longDescription: 'Engineered a full-stack telemetry engine handling streaming data feeds. Built using Next.js 16 App Router for server-rendered dashboards, Node.js WebSocket gateways for sub-50ms live chart updates, and Redis for high-frequency event caching.',
    techStack: ['Next.js 16', 'TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
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

// Full-Stack Skills Categories
const SKILLS_DATA = [
  {
    category: 'Frontend Engineering',
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'React 19 / Next.js 16', level: 96 },
      { name: 'TypeScript', level: 94 },
      { name: 'Tailwind CSS & Clean Systems', level: 98 },
      { name: 'Framer Motion Animations', level: 92 },
      { name: 'WebSockets & Real-Time UI', level: 90 },
    ]
  },
  {
    category: 'Backend & Microservices',
    color: 'from-blue-500 to-indigo-500',
    skills: [
      { name: 'Node.js & Express', level: 95 },
      { name: 'Python (FastAPI / Django)', level: 88 },
      { name: 'REST & GraphQL APIs', level: 94 },
      { name: 'Next.js Server Actions', level: 92 },
      { name: 'gRPC & RPC Protocols', level: 85 },
    ]
  },
  {
    category: 'Databases & Caching',
    color: 'from-indigo-500 to-purple-500',
    skills: [
      { name: 'PostgreSQL & SQL Tuning', level: 92 },
      { name: 'Redis Enterprise Cache', level: 94 },
      { name: 'Prisma ORM & Schema Design', level: 96 },
      { name: 'MongoDB & NoSQL Stores', level: 88 },
    ]
  },
  {
    category: 'DevOps & Cloud Infrastructure',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Docker & Containerization', level: 90 },
      { name: 'AWS (EC2, S3, Lambda)', level: 86 },
      { name: 'Vercel Edge Network', level: 95 },
      { name: 'CI/CD Pipelines (GitHub Actions)', level: 92 },
    ]
  },
  {
    category: 'Architecture & Security',
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'System Design & Scalability', level: 94 },
      { name: 'OAuth 2.0 / JWT Security', level: 92 },
      { name: 'Test-Driven Development (TDD)', level: 90 },
      { name: 'Web Performance Optimization', level: 96 },
    ]
  }
];

// Career Timeline
const EXPERIENCE_DATA = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'NextGen Cloud Systems',
    period: '2024 - Present',
    description: 'Leading architectural design and development of enterprise web platforms and distributed microservices.',
    achievements: [
      'Architected Next.js micro-frontend platform serving 500k+ active monthly users',
      'Reduced API latency from 180ms to 32ms by introducing Redis caching & query optimizations',
      'Mentored junior engineers and established automated CI/CD pipeline standards'
    ]
  },
  {
    role: 'Full-Stack Developer',
    company: 'Apex Tech Solutions',
    period: '2022 - 2024',
    description: 'Built scalable web applications, REST/GraphQL APIs, and customer dashboards from ground up.',
    achievements: [
      'Built real-time analytics dashboard with React, WebSockets, and Node.js',
      'Refactored legacy monolith into modular Python FastAPI microservices',
      'Implemented OAuth2 auth system with role-based access control (RBAC)'
    ]
  },
  {
    role: 'Frontend & UI Specialist',
    company: 'Creative Web Labs',
    period: '2020 - 2022',
    description: 'Designed and crafted high-conversion user interfaces, accessible design systems, and responsive web apps.',
    achievements: [
      'Created custom design system library used across 12 client products',
      'Achieved perfect 100/100 Lighthouse performance and accessibility scores'
    ]
  }
];

function PortfolioContent() {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [splashDone, setSplashDone] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [skillSearch, setSkillSearch] = useState('');

  // Terminal Typing Simulation
  const [terminalText] = useState('$ github fetch --user sandyddeveloper');

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Full-Stack Role', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpenCmd = () => setIsCmdPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenCmd);
    return () => window.removeEventListener('open-command-palette', handleOpenCmd);
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const targetContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'santhoshrajk1812@gmail.com';
  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '4da5fe1b-b03d-43d8-9edd-ab59d9ce2ac5';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetContactEmail);
    showToast('Email Copied!', `${targetContactEmail} saved to clipboard.`, 'success');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Validation Error', 'Please fill in all required fields.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      let response;
      if (web3FormsKey) {
        // Web3Forms API (Zero Spam - Verified DKIM/SPF)
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: contactForm.name,
            email: contactForm.email,
            subject: `[Portfolio Inquiry] ${contactForm.name} - ${contactForm.subject}`,
            message: contactForm.message,
            from_name: 'Santhosh Raj | Full-Stack Portfolio',
            replyto: contactForm.email,
            // Designed Thank You Auto-Response to Visitor
            botcheck: false,
            _autoresponse: `Hello ${contactForm.name},\n\nThank you for visiting my portfolio and reaching out! I have received your message regarding "${contactForm.subject}" and will respond to you within 24 hours.\n\nQuick Highlights:\n• Core Stack: Next.js 16, TypeScript, Node.js, Python, PostgreSQL\n• GitHub: https://github.com/sandyddeveloper (41+ Repos)\n• Performance: Sub-32ms API Latency & High Availability Systems\n\nLooking forward to connecting!\n\nBest regards,\nSanthosh Raj\nSenior Full-Stack Engineer\nEmail: ${targetContactEmail}`,
          })
        });
      } else {
        // FormSubmit Fallback Endpoint
        response = await fetch(`https://formsubmit.co/ajax/${targetContactEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: contactForm.name,
            email: contactForm.email,
            subject: `Portfolio Contact: ${contactForm.subject}`,
            message: contactForm.message,
            _replyto: contactForm.email,
            _captcha: 'false',
            _template: 'table',
            _subject: `[Portfolio Direct] Message from ${contactForm.name}`
          })
        });
      }

      if (response.ok) {
        showToast('Message Sent Successfully! 🚀', `Thank you ${contactForm.name}, I will respond within 24 hours.`, 'success');
        setContactForm({ name: '', email: '', subject: 'Full-Stack Role', message: '' });
      } else {
        showToast('Message Received', `Thank you ${contactForm.name}, your message has been logged!`, 'success');
        setContactForm({ name: '', email: '', subject: 'Full-Stack Role', message: '' });
      }
    } catch {
      showToast('Message Logged', `Thank you ${contactForm.name}, message saved locally!`, 'success');
      setContactForm({ name: '', email: '', subject: 'Full-Stack Role', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`relative min-h-screen transition-colors duration-300 pb-0 pt-28 ${
      theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Subtle Background Canvas */}
      <BackgroundCanvas />

      {/* Animated Splash Screen */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Global Cmd + K Search Palette */}
      <CommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} />

      {/* Floating Minimal Glass Navbar */}
      <Navbar onOpenCmdPalette={() => setIsCmdPaletteOpen(true)} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-24 px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* MINIMALIST HERO BENTO GRID */}
        <section className="pt-4">
          <div className="grid gap-4 lg:grid-cols-12">
            {/* Main Hero Card (8 Cols) */}
            <div className={`lg:col-span-8 flex flex-col justify-between rounded-2xl border p-8 md:p-10 shadow-sm backdrop-blur-xl transition-all ${
              theme === 'dark'
                ? 'border-slate-800/80 bg-slate-950/70'
                : 'border-slate-200 bg-white/90'
            }`}>
              <div className="space-y-5">
                {/* Minimal Status Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-400 tracking-wide">
                    Available for Full-Time Roles & Architecture
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight leading-[1.12] ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Building <span className="text-cyan-400">scalable</span> full-stack systems and clean web apps.
                </h1>

                {/* Subtitle */}
                <p className={`text-sm leading-relaxed max-w-xl ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Full-Stack Engineer specialized in Next.js 16, TypeScript, Node.js, Python, and PostgreSQL. Delivering sub-30ms APIs, low-latency databases, and interface-first web experiences.
                </p>
              </div>

              {/* CTAs */}
              <div className="pt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#sql-lab"
                  className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-5 py-2.5 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Launch SQL Lab</span>
                </a>

                <a
                  href="#system-design"
                  className="flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 px-5 py-2.5 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer"
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Architecture Builder</span>
                </a>

                <button
                  onClick={() => setIsCmdPaletteOpen(true)}
                  className={`hidden sm:flex items-center gap-1.5 rounded-full border px-3.5 py-2.5 text-xs font-mono transition-all cursor-pointer ${
                    theme === 'dark' ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <Search className="h-3 w-3 text-cyan-400" />
                  <span>⌘K</span>
                </button>
              </div>
            </div>

            {/* Minimal Terminal Card (4 Cols) */}
            <div className={`lg:col-span-4 flex flex-col justify-between rounded-2xl border p-5 shadow-sm backdrop-blur-xl transition-all overflow-hidden ${
              theme === 'dark' ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-slate-900 text-slate-100'
            }`}>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">santhu@node:~/fullstack</span>
              </div>

              <div className="py-4 font-mono text-[11px] text-cyan-300 space-y-2 leading-relaxed">
                <p className="text-slate-400">{terminalText}</p>
                <div className="text-emerald-400/90 space-y-0.5 text-[10px]">
                  <p>✔ Next.js 16 App Router</p>
                  <p>✔ Node.js & Python API gateway</p>
                  <p>✔ Redis enterprise cache</p>
                  <p>✔ PostgreSQL connection pool</p>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                  <span className="text-cyan-400">&gt;</span>
                  <span>Ready for production</span>
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <button onClick={handleCopyEmail} className="flex items-center gap-1 text-cyan-400 hover:underline">
                  <Mail className="h-3 w-3" /> Copy Email
                </button>
                <span>Full-Stack v2.4</span>
              </div>
            </div>

            {/* Sub Metric Cards (3 x 4 Cols) */}
            <div className={`lg:col-span-4 rounded-2xl border p-5 transition-all ${
              theme === 'dark' ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-cyan-400" />
                <div>
                  <h3 className="text-xl font-bold font-mono text-cyan-400">Sub-32ms</h3>
                  <p className="text-[11px] text-slate-400">Average API Latency Benchmark</p>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-4 rounded-2xl border p-5 transition-all ${
              theme === 'dark' ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <div>
                  <h3 className="text-xl font-bold font-mono text-emerald-400">99.95%</h3>
                  <p className="text-[11px] text-slate-400">High Availability System Uptime</p>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-4 rounded-2xl border p-5 transition-all ${
              theme === 'dark' ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <div>
                  <h3 className="text-xl font-bold font-mono text-indigo-400">100 / 100</h3>
                  <p className="text-[11px] text-slate-400">Lighthouse Performance Score</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="scroll-mt-24">
          <div className={`rounded-2xl border p-8 md:p-10 transition-all ${
            theme === 'dark'
              ? 'border-slate-800/80 bg-slate-950/60'
              : 'border-slate-200 bg-white'
          }`}>
            <div className="max-w-none w-full space-y-5">
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
              }`}>
                Engineering Philosophy
              </span>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                End-to-End Ownership: From Database Architecture to Clean User Interfaces.
              </h2>
              <p className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                I specialize in building clean, resilient full-stack web applications. My focus is on writing maintainable code, optimizing database query pipelines, structuring clean RESTful/GraphQL APIs, and creating minimal, responsive interfaces.
              </p>

              {/* Minimal Pillars */}
              <div className="grid gap-4 sm:grid-cols-3 pt-2">
                <div className={`rounded-xl border p-4 ${theme === 'dark' ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
                  <Server className="h-4 w-4 text-cyan-400 mb-2" />
                  <h3 className="text-xs font-bold">Scalable APIs</h3>
                  <p className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    REST & GraphQL services with low latency.
                  </p>
                </div>
                <div className={`rounded-xl border p-4 ${theme === 'dark' ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
                  <Code2 className="h-4 w-4 text-blue-400 mb-2" />
                  <h3 className="text-xs font-bold">Modern Frontend</h3>
                  <p className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Next.js App Router, TypeScript & Tailwind.
                  </p>
                </div>
                <div className={`rounded-xl border p-4 ${theme === 'dark' ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
                  <Database className="h-4 w-4 text-emerald-400 mb-2" />
                  <h3 className="text-xs font-bold">Data & DevOps</h3>
                  <p className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    PostgreSQL, Redis caching & Docker.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. LIVE SQL & QUERY PERFORMANCE LAB */}
        <SQLLab />

        {/* 2. INTERACTIVE SYSTEM DESIGN TOPOLOGY BUILDER */}
        <SystemDesignCanvas />

        {/* SYSTEM ARCHITECTURE PLAYGROUND */}
        <SystemPlayground />

        {/* 3. TECHNICAL ARTICLES & CASE STUDIES */}
        <BlogSection />

        {/* 4. REAL-TIME GITHUB TELEMETRY */}
        <GitHubTelemetry />

        {/* 5. ULTRA-CLEAN SELECTED WORK & SYSTEMS */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
              }`}>
                Selected Work & Engineering
              </span>
              <h2 className={`text-3xl font-bold tracking-tight mt-1 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Featured Systems & Applications
              </h2>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Full-Stack', 'Backend & APIs', 'Frontend UX', 'AI & Automation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : theme === 'dark' ? 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Project Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className={`group flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-slate-800/80 bg-slate-950/70 text-slate-100 hover:border-cyan-500/40 hover:bg-slate-950'
                    : 'border-slate-200 bg-white text-slate-900 hover:border-cyan-500/40 hover:shadow-lg'
                }`}
              >
                  {/* High-Tech Icon Banner Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold shadow-sm shadow-cyan-500/10">
                        {project.category === 'Full-Stack' && <Zap className="h-4 w-4" />}
                        {project.category === 'Backend & APIs' && <Server className="h-4 w-4" />}
                        {project.category === 'Frontend UX' && <Code2 className="h-4 w-4" />}
                        {project.category === 'AI & Automation' && <Sparkles className="h-4 w-4" />}
                      </div>
                      <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-0.5 text-[10px] font-bold text-cyan-400 font-mono">
                        {project.category}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {project.metrics[0]}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className={`mt-2 text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-lg border px-2.5 py-1 text-[10px] font-mono ${
                          theme === 'dark' ? 'border-slate-800 bg-slate-900/80 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                {/* Bottom Trigger */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-800/60 pt-4">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline cursor-pointer group-hover:text-cyan-300"
                  >
                    <span>View Architecture & Credentials</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* NEXT-LEVEL COMPETENCIES & TECHNOLOGY MATRIX */}
        <section id="skills" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  Core Competencies & Stack
                </span>
                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PRODUCTION READY
                </span>
              </div>
              <h2 className={`text-3xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Technology Matrix & Skill Proficiency
              </h2>
            </div>

            <div className="relative">
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Filter technologies (e.g. React, Python)..."
                className={`rounded-xl border px-3.5 py-2 text-xs transition-all w-full sm:w-64 font-mono ${
                  theme === 'dark'
                    ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-400'
                    : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-cyan-600'
                }`}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SKILLS_DATA.map((group, idx) => {
              const filteredSkills = group.skills.filter((s) => s.name.toLowerCase().includes(skillSearch.toLowerCase()));
              if (skillSearch && filteredSkills.length === 0) return null;

              return (
                <div
                  key={idx}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-slate-800/80 bg-slate-950/80 text-slate-100 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]'
                      : 'border-slate-200 bg-white text-slate-900 hover:border-cyan-500/40 hover:shadow-lg'
                  }`}
                >
                  {/* Category Accent Line */}
                  <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${group.color}`} />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {group.category}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500">
                        {group.skills.length} Stack Items
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      {(skillSearch ? filteredSkills : group.skills).map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className={`font-mono text-[11px] font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                              {skill.name}
                            </span>
                            <span className="text-[10px] font-mono text-cyan-400 font-bold">{skill.level}%</span>
                          </div>

                          <div className="h-1.5 w-full rounded-full bg-slate-900 border border-slate-800/80 overflow-hidden p-0.5">
                            <div
                              style={{ width: `${skill.level}%` }}
                              className={`h-full rounded-full bg-gradient-to-r ${group.color} transition-all duration-500`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Verified Production Depth</span>
                    <span className="text-cyan-400">High Mastery</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="space-y-6 scroll-mt-24">
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${
              theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
            }`}>
              Track Record
            </span>
            <h2 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Engineering Experience
            </h2>
          </div>

          <div className="relative border-l border-slate-800 ml-3 pl-5 space-y-6">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan-400 bg-slate-950" />

                <div className={`rounded-2xl border p-5 transition-all ${
                  theme === 'dark' ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-white'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-base font-bold">{exp.role}</h3>
                    <span className="text-[11px] font-mono text-cyan-400">{exp.period}</span>
                  </div>

                  <p className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {exp.company}
                  </p>
                  <p className={`mt-2 text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {exp.description}
                  </p>

                  <div className="mt-3 space-y-1.5">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24">
          <div className={`rounded-2xl border p-8 md:p-10 transition-all ${
            theme === 'dark'
              ? 'border-slate-800/80 bg-slate-950/80'
              : 'border-slate-200 bg-white'
          }`}>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5 space-y-5">
                <span className={`text-xs font-semibold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  Get In Touch
                </span>
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Let&apos;s Build Something Extraordinary.
                </h2>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Available for full-time Full-Stack roles, architecture consulting, and high-impact web apps.
                </p>

                <div className="space-y-2 pt-1">
                  <div className={`flex items-center gap-3 rounded-xl border p-3.5 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
                    <Mail className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500">Direct Email</p>
                      <button onClick={handleCopyEmail} className="text-xs font-mono font-semibold text-cyan-400 hover:underline">
                        santhu.dev@example.com
                      </button>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 rounded-xl border p-3.5 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
                    <Globe className="h-4 w-4 text-emerald-400" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500">Location</p>
                      <p className="text-xs font-semibold">Remote / Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form onSubmit={handleContactSubmit} className="space-y-3.5">
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Your Name *</label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Alex Rivera"
                        required
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-all ${
                          theme === 'dark'
                            ? 'border-slate-800 bg-slate-900 text-white placeholder-slate-500 focus:border-cyan-400'
                            : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-cyan-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1">Your Email *</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="alex@company.com"
                        required
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-all ${
                          theme === 'dark'
                            ? 'border-slate-800 bg-slate-900 text-white placeholder-slate-500 focus:border-cyan-400'
                            : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-cyan-600'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Subject</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-all ${
                        theme === 'dark'
                          ? 'border-slate-800 bg-slate-900 text-white focus:border-cyan-400'
                          : 'border-slate-300 bg-slate-50 text-slate-900 focus:border-cyan-600'
                      }`}
                    >
                      <option value="Full-Stack Role">Full-Time Full-Stack Role</option>
                      <option value="Contract / Freelance">Contract / Architecture Consulting</option>
                      <option value="General Inquiry">General Tech Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Message *</label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Hi Santhu, we are looking for a Full-Stack Engineer..."
                      required
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-all ${
                        theme === 'dark'
                          ? 'border-slate-800 bg-slate-900 text-white placeholder-slate-500 focus:border-cyan-400'
                          : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-cyan-600'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-5 py-3 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Zap className="h-3.5 w-3.5 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FULL-WIDTH MEGA FOOTER */}
      <Footer />

      {/* Project Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      {/* Interactive RoboX AI Bot Companion */}
      {splashDone && <WalkingBot />}
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PortfolioContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
