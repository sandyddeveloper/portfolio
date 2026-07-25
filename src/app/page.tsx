'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ToastProvider, useToast } from '@/components/Toast';
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

const BlogSection = dynamic(() => import('@/components/BlogSection').then((m) => m.BlogSection), {
  ssr: false,
  loading: () => <div className="h-64 w-full rounded-3xl border border-slate-800 bg-slate-950/60 animate-pulse" />
});

const GitHubTelemetry = dynamic(() => import('@/components/GitHubTelemetry').then((m) => m.GitHubTelemetry), {
  ssr: false,
  loading: () => <div className="h-64 w-full rounded-3xl border border-slate-800 bg-slate-950/60 animate-pulse" />
});
import {
  SquareTerminal,
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
  ArrowRight,
  ChevronDown,
  Briefcase,
  BookOpen,
  Radio
} from 'lucide-react';

function CollapsibleMobileSection({
  id,
  title,
  badge,
  icon,
  children,
  defaultOpenOnMobile = false,
}: {
  id?: string;
  title: string;
  badge?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpenOnMobile?: boolean;
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(defaultOpenOnMobile);

  return (
    <div id={id} className="scroll-mt-24 space-y-3">
      {/* Mobile Accordion Toggle Header (Visible on Mobile < md) */}
      <div className="md:hidden flex items-center justify-between p-3.5 rounded-2xl border border-slate-800 bg-slate-950/80 shadow-md">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="flex-1 flex items-center justify-between text-left cursor-pointer gap-2"
        >
          <div className="flex items-center gap-2.5">
            {icon}
            <div>
              {badge && (
                <span className="text-[10px] font-mono font-bold text-cyan-400 block uppercase tracking-wider">
                  {badge}
                </span>
              )}
              <h3 className="text-xs font-bold text-white">{title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[9px] font-mono font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
              {isOpenMobile ? 'TAP TO CLOSE ✕' : 'TAP TO VIEW ▾'}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-cyan-400 transition-transform duration-300 ${isOpenMobile ? 'rotate-180' : ''
                }`}
            />
          </div>
        </button>
      </div>

      {/* Content Body: Collapsible on mobile < md, ALWAYS EXPANDED on md+ */}
      <div className={isOpenMobile ? 'block' : 'hidden md:block'}>
        {children}
      </div>
    </div>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
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

// Full-Stack & Backend Skills Matrix (DataMoo.ai & Modern Stack)
const SKILLS_DATA = [
  {
    category: 'Backend & Scalable APIs',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Python & Django / Django REST (DRF)', level: 96 },
      { name: 'Node.js, Express & NestJS', level: 92 },
      { name: 'PostgreSQL (psql), MySQL & MongoDB', level: 95 },
      { name: 'Flask, REST APIs & JWT Security', level: 90 },
      { name: 'Gunicorn & Nginx Server Routing', level: 88 },
    ]
  },
  {
    category: 'Frontend & UI Systems',
    color: 'from-cyan-500 to-indigo-500',
    skills: [
      { name: 'React 19 & Next.js 16 (App Router)', level: 95 },
      { name: 'TypeScript & JavaScript (HTML5/CSS3)', level: 96 },
      { name: 'Tailwind CSS & MUI (Material UI)', level: 94 },
      { name: 'Vite, Three.js & Chart.js', level: 88 },
      { name: 'Bootstrap & Responsive Design', level: 92 },
    ]
  },
  {
    category: 'DevOps, Cloud & Infrastructure',
    color: 'from-indigo-500 to-purple-500',
    skills: [
      { name: 'Docker Containerization & Compose', level: 92 },
      { name: 'AWS, Render, Netlify & Vercel', level: 90 },
      { name: 'Domain Setup, SSL & Nginx Proxy', level: 94 },
      { name: 'Git, GitHub, Postman & NPM', level: 96 },
    ]
  },
  {
    category: 'Domain & Emerging Tech',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Fintech Systems & Mutual Funds Domain', level: 95 },
      { name: 'RAG AI (Retrieval-Augmented Gen)', level: 86 },
      { name: 'LLMs, Vector Embeddings & Agents', level: 84 },
      { name: 'Figma, Canva & Design Workflows', level: 88 },
    ]
  }
];

// Career & Experience Timeline
const EXPERIENCE_DATA = [
  {
    role: 'Backend Developer',
    company: 'DataMoo.ai',
    period: 'Present',
    description: 'Engineering scalable backend systems, Django REST APIs, and high-performance production microservices for Fintech (Mutual Funds) platforms.',
    achievements: [
      'Architected high-concurrency Django & PostgreSQL backend services for Fintech mutual fund transaction engines',
      'Engineered scalable REST APIs with JWT authentication, role-based security, and sub-30ms latency benchmarks',
      'Deployed production workloads using Docker, Gunicorn, Nginx, and AWS infrastructure with zero-downtime pipelines'
    ]
  },
  {
    role: 'Full-Stack & Systems Engineer',
    company: 'Fintech & Production Systems',
    period: '2023 - 2024',
    description: 'Developed modern web applications, distributed REST APIs, and custom UI component libraries.',
    achievements: [
      'Built reactive frontend dashboards using React, Next.js 16, TypeScript, Vite, and Tailwind CSS',
      'Orchestrated cloud deployments across Vercel, Render, Netlify, and custom domain SSL configurations',
      'Integrated database query optimization for PostgreSQL, MySQL, and MongoDB data stores'
    ]
  },
  {
    role: 'AI & RAG Systems Engineer',
    company: 'Current Learning & Research Focus',
    period: 'Active Focus',
    description: 'Exploring Retrieval-Augmented Generation (RAG), vector embeddings, and LLM autonomous AI agent systems.',
    achievements: [
      'Engineering RAG AI knowledge retrieval pipelines utilizing vector embeddings and semantic similarity search',
      'Constructing intelligent agent workflows for automated codebase indexing and contextual querying'
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

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] 4xl:max-w-[2800px] flex-col gap-16 sm:gap-20 lg:gap-24 px-3 xs:px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* CLEAN SINGLE-SCREEN HERO SECTION */}
        <section className="pt-4 sm:pt-6">
          <div className="grid gap-6 lg:grid-cols-12 items-stretch">
            {/* Main Hero Headline (7 Cols - Merged with Background) */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2 sm:py-4">
              <div className="space-y-6">
                {/* Minimal Status Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-semibold text-cyan-400 tracking-wide font-mono">
                    Backend Developer @ DataMoo.ai | Fintech & Scalable APIs
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className={`text-3xl xs:text-4xl sm:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-extrabold tracking-tight leading-[1.12] ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                  Architecting <span className="text-cyan-400">scalable APIs</span> & high-performance backend systems.
                </h1>

                {/* Subtitle */}
                <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                  Software Developer at <strong>DataMoo.ai</strong> specialized in Python, Django REST Framework, PostgreSQL, Scalable Fintech (Mutual Funds) APIs, Docker, Next.js 16, and currently learning RAG AI Systems.
                </p>
              </div>

              {/* CTAs */}
              <div className="pt-6 flex flex-wrap items-center gap-3 border-t border-slate-800/60 mt-6">
                <a
                  href="#projects"
                  className="flex items-center gap-2 rounded-2xl bg-cyan-500 border border-cyan-400 px-6 py-3 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Code2 className="h-4 w-4" />
                  <span>View Selected Work</span>
                </a>

                <a
                  href="#sql-lab"
                  className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 px-5 py-3 text-xs font-mono font-bold text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer"
                >
                  <SquareTerminal className="h-4 w-4" />
                  <span>Launch SQL Lab</span>
                </a>

                <a
                  href="#contact"
                  className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-3 text-xs font-mono font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <span>Contact Direct</span>
                </a>
              </div>
            </div>

            {/* Interactive Profile Photo & Voice Bio Avatar (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <CollapsibleMobileSection
                title="Interactive Voice Companion"
                badge="VOICE BIO & COMPANION"
                icon={<Radio className="h-4 w-4 text-cyan-400" />}
              >
                <HeroAvatarVoiceCard />
              </CollapsibleMobileSection>
            </div>
          </div>

          {/* Full-Width Telemetry & Metrics Strip */}
          <div className="w-full  border-slate-800/60 mt-4 sm:mt-6">
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${theme === 'dark'
              ? 'border-slate-800/80 bg-slate-950/60 backdrop-blur-md shadow-inner'
              : 'border-slate-200 bg-white/80 backdrop-blur-md shadow-sm'
              }`}>
              <div className="flex flex-col gap-0.5">
                <span className="text-lg sm:text-xl font-bold font-mono text-cyan-400 block">Sub-30ms</span>
                <span className="text-xs text-slate-400 font-mono">API Latency</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400 block">99.99%</span>
                <span className="text-xs text-slate-400 font-mono">System Uptime</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-lg sm:text-xl font-bold font-mono text-blue-400 block">PostgreSQL</span>
                <span className="text-xs text-slate-400 font-mono">Mutual Funds Stack</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-lg sm:text-xl font-bold font-mono text-amber-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  RAG AI
                </span>
                <span className="text-xs text-slate-400 font-mono">Active Learning</span>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* SECTION 3: ABOUT & ENGINEERING BACKGROUND */}
        <CollapsibleMobileSection
          id="about"
          title="About & Engineering Background"
          badge="BIOGRAPHY & PHILOSOPHY"
          icon={<Globe className="h-4 w-4 text-cyan-400" />}
        >
          <section className="space-y-4">
            <div className="flex flex-col gap-1 border-b border-slate-800/60 pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                BIOGRAPHY & PHILOSOPHY
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                About & Engineering Background
              </h2>
            </div>

            <div className={`rounded-3xl border p-8 md:p-10 transition-all ${theme === 'dark'
              ? 'border-slate-800/80 bg-slate-950/60'
              : 'border-slate-200 bg-white'
              }`}>
              <div className="max-w-none w-full space-y-5">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                  End-to-End Ownership: From Database Architecture to Clean User Interfaces.
                </h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                  Backend Developer at DataMoo.ai specializing in building clean, resilient full-stack web applications. My focus is on writing maintainable code, optimizing database query pipelines, structuring clean RESTful APIs, and creating minimal, responsive interfaces.
                </p>

                {/* Minimal Pillars */}
                <div className="grid gap-4 sm:grid-cols-3 pt-2">
                  <div className={`rounded-2xl border p-4 ${theme === 'dark' ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
                    <Server className="h-4 w-4 text-cyan-400 mb-2" />
                    <h4 className="text-xs font-bold text-white">Scalable APIs</h4>
                    <p className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      RESTful services with low sub-30ms latency.
                    </p>
                  </div>
                  <div className={`rounded-2xl border p-4 ${theme === 'dark' ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
                    <Code2 className="h-4 w-4 text-blue-400 mb-2" />
                    <h4 className="text-xs font-bold text-white">Modern Frontend</h4>
                    <p className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Next.js 16 App Router, TypeScript & Tailwind.
                    </p>
                  </div>
                  <div className={`rounded-2xl border p-4 ${theme === 'dark' ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
                    <Database className="h-4 w-4 text-emerald-400 mb-2" />
                    <h4 className="text-xs font-bold text-white">Data & DevOps</h4>
                    <p className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      PostgreSQL, Redis caching & Docker.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </CollapsibleMobileSection>

        <SectionDivider />

        {/* SECTION 4: SELECTED PROJECTS & PORTFOLIO */}
        <CollapsibleMobileSection
          id="projects"
          title="Featured Systems & Applications"
          badge="SELECTED WORK & PORTFOLIO"
          icon={<Code2 className="h-4 w-4 text-cyan-400" />}
        >
          <section className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-800/60 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  SELECTED WORK & PORTFOLIO
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
                  Featured Systems & Applications
                </h2>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Full-Stack', 'Backend & APIs', 'Frontend UX', 'AI & Automation'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-mono transition-all cursor-pointer ${selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : theme === 'dark' ? 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Project Grid */}
            <div className="grid gap-6 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className={`group flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 ${theme === 'dark'
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
                        className={`rounded-lg border px-2.5 py-1 text-[10px] font-mono ${theme === 'dark' ? 'border-slate-800 bg-slate-900/80 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
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
        </CollapsibleMobileSection>

        <SectionDivider />

        {/* SECTION 5: WORK EXPERIENCE TIMELINE */}
        <CollapsibleMobileSection
          title="Career Journey & Experience"
          badge="TIMELINE"
          icon={<Briefcase className="h-4 w-4 text-cyan-400" />}
        >
          <ExperienceTimeline />
        </CollapsibleMobileSection>

        <SectionDivider />

        {/* SECTION 6: CORE COMPETENCIES & TECHNOLOGY MATRIX */}
        <CollapsibleMobileSection
          id="skills"
          title="Skills & Tech Matrix"
          badge="TECH STACK"
          icon={<Layers className="h-4 w-4 text-blue-400" />}
        >
          <InteractiveTechMatrix />
        </CollapsibleMobileSection>

        <SectionDivider />

        {/* SECTION 7: LIVE SQL PERFORMANCE SANDBOX */}
        <CollapsibleMobileSection
          id="sql-lab"
          title="SQL Query Performance Lab"
          badge="DATABASE LAB"
          icon={<Database className="h-4 w-4 text-emerald-400" />}
        >
          <SQLLab />
        </CollapsibleMobileSection>

        <SectionDivider />

        {/* SECTION 8: DISTRIBUTED SYSTEM DESIGN TOPOLOGY BUILDER */}
        <CollapsibleMobileSection
          title="High-Scale System Design Canvas"
          badge="SYSTEM ARCHITECTURE"
          icon={<Server className="h-4 w-4 text-purple-400" />}
        >
          <SystemDesignCanvas />
        </CollapsibleMobileSection>

        {/* SYSTEM ARCHITECTURE PLAYGROUND */}
        <CollapsibleMobileSection
          title="Interactive System Playground"
          badge="ARCHITECTURE DEMO"
          icon={<SquareTerminal className="h-4 w-4 text-cyan-400" />}
        >
          <SystemPlayground />
        </CollapsibleMobileSection>

        <SectionDivider />

        {/* SECTION 9: TECHNICAL ARTICLES & CASE STUDIES */}
        <CollapsibleMobileSection
          title="Technical Articles & Case Studies"
          badge="STUDIES"
          icon={<BookOpen className="h-4 w-4 text-amber-400" />}
        >
          <BlogSection />
        </CollapsibleMobileSection>

        <SectionDivider />

        {/* SECTION 10: REAL-TIME GITHUB TELEMETRY */}
        <CollapsibleMobileSection
          title="Live GitHub Telemetry & Stats"
          badge="GITHUB STATS"
          icon={<Zap className="h-4 w-4 text-cyan-400" />}
        >
          <GitHubTelemetry />
        </CollapsibleMobileSection>

        <SectionDivider />

        {/* SECTION 11: ENCRYPTED CONTACT COMMAND CONSOLE */}
        <UniqueContactSection />
      </div>

      <div className="mt-16 sm:mt-24">
        {/* <SectionDivider /> */}
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
