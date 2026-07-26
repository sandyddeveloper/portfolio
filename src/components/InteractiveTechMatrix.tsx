'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  SquareTerminal,
  X,
  ShieldCheck,
  Search,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { GlowingEffect } from '@/components/ui/glowing-effect';

// OFFICIAL HIGH-QUALITY BRAND SVG TECH LOGOS
function PythonDjangoLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <path fill="#3776AB" d="M11.87 2c-5.06 0-4.75 2.19-4.75 2.19v2.27h4.82v.69H5.16S2 6.78 2 11.87c0 5.09 2.75 4.9 2.75 4.9h1.64v-2.31s-.09-2.75 2.75-2.75h4.72s2.62.05 2.62-2.53V4.62S16.96 2 11.87 2zm-2.6 1.47a.93.93 0 1 1 0 1.86.93.93 0 0 1 0-1.86z"/>
      <path fill="#FFD43B" d="M12.13 22c5.06 0 4.75-2.19 4.75-2.19v-2.27h-4.82v-.69h6.78s3.16.37 3.16-4.72c0-5.09-2.75-4.9-2.75-4.9h-1.64v2.31s.09 2.75-2.75 2.75h-4.72s-2.62-.05-2.62 2.53v4.66S7.04 22 12.13 22zm2.6-1.47a.93.93 0 1 1 0-1.86.93.93 0 0 1 0 1.86z"/>
    </svg>
  );
}

function PostgresLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <path fill="#336791" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-1.5 0-2.5-.5-3.5-1.5v2.5H8V9h1.5v1.5c1-1 2-1.5 3.5-1.5 2.5 0 4 1.5 4 3.75s-1.5 3.75-4 3.75z"/>
      <circle cx="13" cy="12.75" r="1.75" fill="#336791"/>
    </svg>
  );
}

function NodejsLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <path fill="#5FA04E" d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm5.7 13.7L12 19l-5.7-3.3V8.3L12 5l5.7 3.3v7.4z"/>
    </svg>
  );
}

function NginxLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#009639">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm6 13.5l-4-6v6h-2V8.5l4 6v-6h2v9z"/>
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)"/>
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
    </svg>
  );
}

function TypeScriptLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <rect width="20" height="20" x="2" y="2" fill="#3178C6" rx="4"/>
      <path fill="#FFF" d="M11.5 16.5h-2v-7h-2.5v-1.8h7v1.8h-2.5v7zm7.2-1.3c-.4.5-1.1.8-1.9.8-1.4 0-2.3-.8-2.3-2.1 0-1.4 1-2.1 2.5-2.5l.7-.2v-.4c0-.5-.3-.8-.9-.8-.5 0-.9.2-1.2.6l-1.3-1c.7-1 1.7-1.4 2.8-1.4 1.7 0 2.6.8 2.6 2.3v3.7c0 .7.1 1.1.2 1.3h-1.6c0-.2-.1-.5-.1-.7zm-.4-2.7l-.5.2c-.7.2-1.2.5-1.2 1.2 0 .5.4.8.9.8.7 0 1.2-.4 1.2-1.1v-1.1z"/>
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <path fill="#38BDF8" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
    </svg>
  );
}

function ViteLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <path fill="#BD34FE" d="M21.75 3.75L12 21.75 2.25 3.75h19.5z"/>
      <path fill="#FFD43B" d="M16.5 3.75l-4.5 8.25-2.25-3.75h6.75z"/>
    </svg>
  );
}

function DockerLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#2496ED">
      <path d="M13.98 11.08h2.12v2.05h-2.12zm-3.14 0h2.12v2.05h-2.12zm-3.14 0h2.12v2.05H7.7zm6.28-3.08h2.12v2.05h-2.12zm-3.14 0h2.12v2.05h-2.12zm-3.14 0h2.12v2.05H7.7zm6.28-3.08h2.12v2.05h-2.12zm-9.42 6.16h2.12v2.05H4.56zM24 13.08c-.46-.35-1.54-.42-2.38-.28-.35-1.26-1.4-2.1-2.66-2.1h-1.12v-1.4h-2.1v1.4h-2.12v-1.4h-2.1v1.4H9.42v-1.4H7.32v1.4H5.2v1.4H3.08v1.4H.98v1.82c0 3.36 2.38 6.16 6.3 6.16 6.02 0 10.08-3.08 12.32-6.58.77.14 2.17.07 2.87-.28l1.53-2.02z"/>
    </svg>
  );
}

function AWSLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <path fill="#FF9900" d="M18.75 14.25c-2.4 1.8-5.7 2.7-8.7 2.7-4.2 0-8-1.5-10.8-4-.2-.2-.05-.45.2-.3 3.1 1.8 7 2.8 11 2.8 2.7 0 5.6-.6 8.1-1.9.38-.2.63.2.2.7z"/>
      <path fill="#FF9900" d="M19.9 13.1c-.3-.4-1.9-.2-2.6 0-.2.05-.2-.15 0-.3.8-.9 2.2-.6 2.8-.1.6.5.4 2-.3 2.7-.2.2-.35.1-.25-.1.3-.6.6-1.8.3-2.2z"/>
    </svg>
  );
}

function FintechShieldLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function RagAiLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
      <circle cx="12" cy="12" r="3" fill="#A855F7"/>
    </svg>
  );
}

export interface TechItem {
  id: string;
  name: string;
  category: 'Backend & APIs' | 'Frontend UX' | 'DevOps & Cloud' | 'Fintech & RAG AI';
  categoryColor: string;
  level: number;
  tier: 'PRODUCTION READY' | 'ENTERPRISE DEPLOYED' | 'ACTIVE LEARNING & RAG';
  icon: React.ReactNode;
  shortDesc: string;
  productionImpact: string;
  architectureHighlights: string[];
  codeSnippet: string;
  codeLanguage: string;
}

const TECH_ITEMS: TechItem[] = [
  // BACKEND & APIS
  {
    id: 'django-drf',
    name: 'Python, Django & DRF',
    category: 'Backend & APIs',
    categoryColor: 'from-blue-500 to-cyan-500',
    level: 96,
    tier: 'PRODUCTION READY',
    icon: <PythonDjangoLogo />,
    shortDesc: 'High-throughput RESTful API gateways for Fintech Mutual Fund processing.',
    productionImpact: 'Engineered core backend APIs at DataMoo.ai handling financial mutual fund transactions with sub-30ms execution times.',
    architectureHighlights: [
      'Structured modular Django REST serializers with strict request schema validation',
      'Implemented custom authentication backends using JWT & role-based permissions',
      'Optimized ORM queries with select_related / prefetch_related to eliminate N+1 latency'
    ],
    codeLanguage: 'python',
    codeSnippet: `@api_view(['POST'])\n@permission_classes([IsAuthenticated])\ndef process_mutual_fund_order(request):\n    serializer = MutualFundOrderSerializer(data=request.data)\n    serializer.is_valid(raise_exception=True)\n    order = serializer.save(user=request.user)\n    dispatch_transaction_worker.delay(order.id)\n    return Response({"order_id": order.id, "status": "QUEUED"}, status=202)`
  },
  {
    id: 'postgresql-psql',
    name: 'PostgreSQL & Query Tuning',
    category: 'Backend & APIs',
    categoryColor: 'from-blue-500 to-cyan-500',
    level: 95,
    tier: 'PRODUCTION READY',
    icon: <PostgresLogo />,
    shortDesc: 'Relational data modeling, indexing & high-concurrency transaction locks.',
    productionImpact: 'Designed low-latency PostgreSQL schema topologies supporting millions of query logs with zero lock contention.',
    architectureHighlights: [
      'Created partial & B-Tree indexes for fast financial record lookups under 8ms',
      'Utilized JSONB document columns for schema-flexible payload caching',
      'Configured connection pooling with PgBouncer for high concurrency'
    ],
    codeLanguage: 'sql',
    codeSnippet: `CREATE INDEX CONCURRENTLY idx_orders_user_status\nON mutual_fund_orders (user_id, status)\nWHERE status = 'PROCESSING';\n\nEXPLAIN ANALYZE SELECT * FROM mutual_fund_orders\nWHERE user_id = 4091 AND status = 'PROCESSING';`
  },
  {
    id: 'nodejs-nestjs-flask',
    name: 'Node.js, Express & NestJS',
    category: 'Backend & APIs',
    categoryColor: 'from-blue-500 to-cyan-500',
    level: 92,
    tier: 'PRODUCTION READY',
    icon: <NodejsLogo />,
    shortDesc: 'Asynchronous event loops, microservices, and lightweight REST web servers.',
    productionImpact: 'Built asynchronous WebSockets & SSE event channels for real-time telemetry streaming and microservice communication.',
    architectureHighlights: [
      'Designed event-driven NestJS dependency injection modules for clean architecture',
      'Built Flask microservices for rapid payload validation & micro-task routing',
      'Configured rate limiting and CORS middleware for secure API gateway access'
    ],
    codeLanguage: 'typescript',
    codeSnippet: `@Injectable()\nexport class TelemetryGateway implements OnGatewayConnection {\n  @WebSocketServer() server: Server;\n  handleConnection(client: Socket) {\n    client.emit('status', { health: 'OK', pingMs: 14 });\n  }\n}`
  },
  {
    id: 'gunicorn-nginx-jwt',
    name: 'Gunicorn, Nginx & JWT Auth',
    category: 'Backend & APIs',
    categoryColor: 'from-blue-500 to-cyan-500',
    level: 90,
    tier: 'PRODUCTION READY',
    icon: <NginxLogo />,
    shortDesc: 'WSGI server process managers, reverse proxies & stateless JWT tokens.',
    productionImpact: 'Deployed high-availability production web servers with Gunicorn workers behind Nginx reverse proxy buffers.',
    architectureHighlights: [
      'Configured Gunicorn gevent/sync worker clusters for CPU-bound API execution',
      'Set up Nginx upstream load balancing, gzip compression, and rate limiting',
      'Implemented stateless RSA256 signed JWT token verification middleware'
    ],
    codeLanguage: 'nginx',
    codeSnippet: `upstream django_app {\n    server unix:/run/gunicorn.sock fail_timeout=0;\n}\nserver {\n    listen 443 ssl http2;\n    server_name api.datamoo.ai;\n    location / {\n        proxy_pass http://django_app;\n    }\n}`
  },

  // FRONTEND UX
  {
    id: 'react-nextjs',
    name: 'React 19 & Next.js 16',
    category: 'Frontend UX',
    categoryColor: 'from-cyan-500 to-blue-500',
    level: 95,
    tier: 'PRODUCTION READY',
    icon: <ReactLogo />,
    shortDesc: 'Server-rendered App Router dashboards, dynamic routes & Server Actions.',
    productionImpact: 'Engineered interface-first portfolio web apps and SaaS interfaces with zero layout shifts and sub-second page loads.',
    architectureHighlights: [
      'Leveraged Server Components (RSC) to reduce client JS bundle size by 65%',
      'Built accessible custom hooks for state management and theme switching',
      'Utilized Turbopack HMR and automated static page pre-rendering'
    ],
    codeLanguage: 'typescript',
    codeSnippet: `'use client';\nexport function RealtimeMetricBadge({ value }: { value: number }) {\n  return (\n    <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">\n      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />\n      <span>{value}ms Latency</span>\n    </div>\n  );\n}`
  },
  {
    id: 'ts-js-html',
    name: 'TypeScript & ESNext',
    category: 'Frontend UX',
    categoryColor: 'from-cyan-500 to-blue-500',
    level: 96,
    tier: 'PRODUCTION READY',
    icon: <TypeScriptLogo />,
    shortDesc: 'Strict type safety, ESNext features, semantic HTML5, and responsive layout math.',
    productionImpact: 'Enforced zero runtime type errors across complex web apps with TypeScript strict compiler flags.',
    architectureHighlights: [
      'Defined generic type schemas for API response payloads and database models',
      'Ensured full WAI-ARIA accessibility keyboard navigation compliance',
      'Optimized DOM rendering with React.memo and useCallback memoization'
    ],
    codeLanguage: 'typescript',
    codeSnippet: `export type APIResponse<T> = \n  | { status: 'success'; data: T; latencyMs: number }\n  | { status: 'error'; message: string; errorCode: number };\n\nexport async function fetchMetric<T>(url: string): Promise<APIResponse<T>> { ... }`
  },
  {
    id: 'tailwind-mui-bootstrap',
    name: 'Tailwind CSS & MUI',
    category: 'Frontend UX',
    categoryColor: 'from-cyan-500 to-blue-500',
    level: 94,
    tier: 'PRODUCTION READY',
    icon: <TailwindLogo />,
    shortDesc: 'Glassmorphic design tokens, dark mode themes, and responsive utility design.',
    productionImpact: 'Designed cohesive, visually wowed dark-mode design systems with micro-animations and custom tokens.',
    architectureHighlights: [
      'Constructed custom Tailwind utility tokens for glassmorphic backdrops',
      'Customized Material UI (MUI) components with dark cyan theme palettes',
      'Ensured seamless cross-browser responsiveness from mobile to 4K monitors'
    ],
    codeLanguage: 'css',
    codeSnippet: `.glass-panel {\n  background: rgba(2, 6, 23, 0.85);\n  backdrop-filter: blur(16px);\n  border: 1px solid rgba(6, 182, 212, 0.2);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}`
  },
  {
    id: 'vite-three-chart',
    name: 'Vite & Three.js',
    category: 'Frontend UX',
    categoryColor: 'from-cyan-500 to-blue-500',
    level: 88,
    tier: 'PRODUCTION READY',
    icon: <ViteLogo />,
    shortDesc: 'Rapid bundlers, WebGL 3D graphics rendering & interactive telemetry charts.',
    productionImpact: 'Rendered interactive telemetry charts and 3D animated canvas elements for engaging user experiences.',
    architectureHighlights: [
      'Configured ultra-fast Vite HMR build pipelines with Rollup code splitting',
      'Rendered 60fps WebGL particle background animations using Three.js / Canvas API',
      'Integrated Chart.js dynamic time-series charts for live metric displays'
    ],
    codeLanguage: 'javascript',
    codeSnippet: `const chart = new Chart(ctx, {\n  type: 'line',\n  data: { datasets: [{ label: 'RPS Throughput', data: telemetryPoints }] },\n  options: { responsive: true, animation: { duration: 250 } }\n});`
  },

  // DEVOPS & CLOUD
  {
    id: 'docker-compose',
    name: 'Docker & Containers',
    category: 'DevOps & Cloud',
    categoryColor: 'from-indigo-500 to-purple-500',
    level: 92,
    tier: 'ENTERPRISE DEPLOYED',
    icon: <DockerLogo />,
    shortDesc: 'Multi-stage Dockerfiles, Docker Compose clusters & environment consistency.',
    productionImpact: 'Containerized Django, Node.js, PostgreSQL, and Redis applications into portable, lightweight Docker containers.',
    architectureHighlights: [
      'Built multi-stage Docker images reducing production container size under 150MB',
      'Orchestrated multi-container web, celery worker, and database services with Docker Compose',
      'Secured container runtimes with non-root user execution flags'
    ],
    codeLanguage: 'dockerfile',
    codeSnippet: `FROM python:3.11-slim AS builder\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD ["gunicorn", "config.wsgi:application", "-b", "0.0.0.0:8000"]`
  },
  {
    id: 'aws-render-netlify-vercel',
    name: 'AWS & Multi-Cloud',
    category: 'DevOps & Cloud',
    categoryColor: 'from-indigo-500 to-purple-500',
    level: 90,
    tier: 'ENTERPRISE DEPLOYED',
    icon: <AWSLogo />,
    shortDesc: 'Multi-cloud hosting, serverless edge functions & automated git deployments.',
    productionImpact: 'Managed production cloud infrastructure on AWS, Render, and Vercel Edge with zero downtime.',
    architectureHighlights: [
      'Configured AWS EC2 instances, S3 asset storage, and Security Groups',
      'Automated Git push-to-deploy pipelines on Render, Netlify, and Vercel',
      'Configured custom SSL domains, DNS CNAME records, and edge caching'
    ],
    codeLanguage: 'bash',
    codeSnippet: `# Git automated deployment trigger\ngit push origin main\n# Vercel & Render edge routing automatically deploys sub-30ms CDN build`
  },

  // FINTECH & RAG AI
  {
    id: 'fintech-mutual-funds',
    name: 'Fintech Mutual Funds',
    category: 'Fintech & RAG AI',
    categoryColor: 'from-purple-500 to-pink-500',
    level: 95,
    tier: 'PRODUCTION READY',
    icon: <FintechShieldLogo />,
    shortDesc: 'Financial transaction security, mutual fund order routing & audit logging.',
    productionImpact: 'Architected production backend services at DataMoo.ai processing financial mutual fund transactions securely.',
    architectureHighlights: [
      'Implemented immutable audit logging for every financial order state change',
      'Designed ACID compliant database transactions for zero financial data loss',
      'Integrated strict data encryption for sensitive financial user payloads'
    ],
    codeLanguage: 'python',
    codeSnippet: `@transaction.atomic\ndef execute_fund_purchase(user, fund_code, amount):\n    user_wallet = Wallet.objects.select_for_update().get(user=user)\n    user_wallet.deduct(amount)\n    order = MutualFundOrder.objects.create(user=user, fund_code=fund_code, amount=amount)\n    return order`
  },
  {
    id: 'rag-ai-llm',
    name: 'RAG AI & Vector DBs',
    category: 'Fintech & RAG AI',
    categoryColor: 'from-purple-500 to-pink-500',
    level: 86,
    tier: 'ACTIVE LEARNING & RAG',
    icon: <RagAiLogo />,
    shortDesc: 'Retrieval-Augmented Generation, vector embeddings & context-aware LLM agents.',
    productionImpact: 'Engineering RAG AI pipelines to query enterprise documents and codebases with semantic similarity search.',
    architectureHighlights: [
      'Constructed document chunking & vector embedding pipelines using Pinecone / FAISS',
      'Engineered prompt orchestration workflows for context-grounded LLM responses',
      'Currently exploring autonomous AI agent tools and vector retrieval optimizations'
    ],
    codeLanguage: 'python',
    codeSnippet: `from langchain.vectorstores import Pinecone\nfrom langchain.embeddings import OpenAIEmbeddings\n\ndef query_enterprise_rag(user_prompt):\n    docsearch = Pinecone.from_existing_index("knowledge-base", OpenAIEmbeddings())\n    docs = docsearch.similarity_search(user_prompt, k=4)\n    return generate_grounded_answer(user_prompt, docs)`
  }
];

export function InteractiveTechMatrix() {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);

  useBodyScrollLock(!!activeItem);

  const categories = ['All', 'Backend & APIs', 'Frontend UX', 'DevOps & Cloud', 'Fintech & RAG AI'];

  const filteredItems = TECH_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productionImpact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="space-y-8 scroll-mt-24">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b pb-4 border-purple-100 dark:border-purple-900/30">
        <div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            Technology Matrix & Enterprise Stack
          </h2>
          <p className={`text-xs sm:text-sm font-medium mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Click any item to inspect architecture specs, performance metrics, and production code.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className={`absolute left-3 top-3 h-3.5 w-3.5 ${theme === 'dark' ? 'text-slate-400' : 'text-purple-600'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack (e.g. Django, RAG, Docker)..."
            className={`w-full rounded-xl border pl-9 pr-3.5 py-2 text-xs font-mono font-bold transition-all ${theme === 'dark'
                ? 'border-purple-900/40 bg-slate-950 text-white placeholder-slate-500 focus:border-purple-500'
                : 'border-purple-200 bg-white text-slate-950 placeholder-slate-400 focus:border-purple-500'
              }`}
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${selectedCategory === cat
                ? 'bg-purple-600 text-white border border-purple-500 shadow-sm shadow-purple-500/20'
                : theme === 'dark'
                  ? 'bg-slate-950 border border-purple-900/40 text-slate-300 hover:text-white'
                  : 'bg-white border border-purple-200 text-slate-900 hover:bg-purple-50'
              }`}
          >
            {cat === 'All' ? 'All Technologies' : cat}
          </button>
        ))}
      </div>

      {/* Spacious 3-Card Per Row Responsive Grid */}
      <div className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -3, scale: 1.01 }}
            onClick={() => setActiveItem(item)}
            className={`group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-300 cursor-pointer overflow-hidden min-h-[170px] ${theme === 'dark'
                ? 'border-purple-900/40 bg-slate-950/90 text-slate-100 hover:border-purple-500/50 hover:bg-slate-950 hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]'
                : 'border-purple-200 bg-white text-slate-950 hover:border-purple-400 hover:shadow-xl shadow-purple-500/10'
              }`}
          >
            {/* Glowing Effect Overlay */}
            <GlowingEffect
              blur={0}
              borderWidth={2}
              spread={70}
              glow={true}
              disabled={false}
              proximity={70}
              inactiveZone={0.01}
            />

            <div className="relative z-10">
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl border ${theme === 'dark' ? 'border-purple-900/40 bg-slate-900/80 text-purple-400' : 'border-purple-200 bg-purple-50 text-purple-700'
                  }`}>
                  {item.icon}
                </div>
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-mono font-bold ${item.tier === 'PRODUCTION READY'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : item.tier === 'ENTERPRISE DEPLOYED'
                      ? 'border-purple-500/30 bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
                      : 'border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 animate-pulse'
                  }`}>
                  {item.tier}
                </span>
              </div>

              {/* Title & Short Desc */}
              <h3 className={`text-sm sm:text-base font-extrabold group-hover:text-purple-600 transition-colors leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-950'
                }`}>
                {item.name}
              </h3>
              <p className={`text-xs mt-1.5 leading-relaxed line-clamp-2 font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
                }`}>
                {item.shortDesc}
              </p>
            </div>

            {/* Bottom Inspection Prompt */}
            <div className={`relative z-10 mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono font-bold ${theme === 'dark' ? 'border-purple-900/30 text-purple-400 group-hover:text-purple-300' : 'border-purple-100 text-purple-700 group-hover:text-purple-900'
              }`}>
              <span className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" /> Inspect Architecture
              </span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Edge-to-Edge Fullscreen Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[120]"
            />

            {/* Inspection Card Window */}
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`relative z-[125] w-full max-w-4xl rounded-2xl border p-5 sm:p-7 shadow-2xl backdrop-blur-2xl font-sans space-y-5 max-h-[85vh] overflow-y-auto my-auto transition-colors duration-300 ${theme === 'dark'
                  ? 'border-purple-900/50 bg-slate-950 text-slate-100 shadow-[0_0_50px_rgba(147,51,234,0.3)]'
                  : 'border-purple-200 bg-white text-slate-950 shadow-2xl shadow-purple-500/15'
                }`}
            >
              {/* Header Navigation & Title Bar */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4 ${theme === 'dark' ? 'border-purple-900/40' : 'border-purple-100'
                }`}>
                <div className="flex items-start gap-3.5">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    {activeItem.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        {activeItem.category}
                      </span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400">
                        {activeItem.tier}
                      </span>
                    </div>

                    <h2 className={`text-xl sm:text-2xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                      {activeItem.name}
                    </h2>
                    <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      {activeItem.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(activeItem.codeSnippet);
                      showToast('Code Copied!', 'Production code spec saved to clipboard.', 'success');
                    }}
                    className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${theme === 'dark'
                        ? 'border-purple-900/40 bg-slate-900 text-purple-300 hover:border-purple-500'
                        : 'border-purple-200 bg-purple-50 text-purple-900 hover:bg-purple-100'
                      }`}
                  >
                    <SquareTerminal className="h-3.5 w-3.5 text-purple-600" />
                    <span>Copy Spec Code</span>
                  </button>

                  <button
                    onClick={() => setActiveItem(null)}
                    className={`rounded-xl border p-2 transition-colors cursor-pointer ${theme === 'dark'
                        ? 'border-purple-900/40 bg-slate-900 text-slate-400 hover:text-white hover:border-purple-500'
                        : 'border-purple-200 bg-purple-50 text-slate-700 hover:bg-purple-100'
                      }`}
                    title="Close Window"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* 2-COLUMN BALANCED LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
                {/* LEFT COLUMN: Impact & Architecture Highlights (6 Cols) */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Production Impact Card */}
                  <div className={`rounded-xl border p-4 space-y-1.5 ${theme === 'dark'
                      ? 'border-purple-900/40 bg-purple-950/40 text-slate-200'
                      : 'border-purple-200 bg-purple-50/70 text-slate-900'
                    }`}>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Production Impact & Enterprise Usage</span>
                    </span>
                    <p className={`text-xs sm:text-sm leading-relaxed font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
                      {activeItem.productionImpact}
                    </p>
                  </div>

                  {/* Key Architecture Highlights */}
                  <div className="space-y-2">
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                      <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Key Architecture Highlights & Patterns</span>
                    </span>

                    <div className="space-y-2">
                      {activeItem.architectureHighlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs font-semibold transition-all ${theme === 'dark'
                              ? 'border-purple-900/30 bg-slate-900/70 text-slate-200'
                              : 'border-purple-100 bg-slate-50/80 text-slate-900'
                            }`}
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mastery Score Progress */}
                  <div className={`rounded-xl border p-3 space-y-1.5 ${theme === 'dark' ? 'border-purple-900/30 bg-slate-900/40' : 'border-purple-200 bg-purple-50/30'}`}>
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-800'}>
                        Mastery Score: {activeItem.level}%
                      </span>
                      <span className="text-purple-600 dark:text-purple-400 font-extrabold">{activeItem.tier}</span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-900 overflow-hidden border border-purple-500/20">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${activeItem.level}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Code Editor Box (6 Cols) */}
                <div className="lg:col-span-6 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold px-0.5">
                    <span className={`flex items-center gap-1.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                      <SquareTerminal className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>PRODUCTION_SPEC.{activeItem.codeLanguage.toUpperCase()}</span>
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">
                      VERIFIED SPEC CODE
                    </span>
                  </div>

                  {/* Code Editor Box */}
                  <div className="flex-1 flex flex-col rounded-xl border border-purple-900/50 bg-slate-950 overflow-hidden shadow-xl min-h-[220px]">
                    <div className="flex items-center justify-between border-b border-purple-900/40 bg-slate-900/90 px-3.5 py-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">
                        {activeItem.codeLanguage}
                      </span>
                    </div>

                    <div className="p-4 font-mono text-xs text-purple-200 leading-relaxed font-bold overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-words">{activeItem.codeSnippet}</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className={`pt-3 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${theme === 'dark' ? 'border-purple-900/40' : 'border-purple-100'}`}>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Info className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Santhosh Raj • Architecture Spec Inspector</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <a
                    href="#contact"
                    onClick={() => setActiveItem(null)}
                    className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${theme === 'dark'
                        ? 'border-purple-900/40 bg-slate-900 text-slate-300 hover:text-white'
                        : 'border-purple-200 bg-purple-50 text-slate-900 hover:bg-purple-100'
                      }`}
                  >
                    Inquire About Stack
                  </a>

                  <button
                    onClick={() => setActiveItem(null)}
                    className="rounded-xl bg-purple-600 border border-purple-500 px-5 py-2 text-xs font-bold text-white hover:bg-purple-700 cursor-pointer shadow-md shadow-purple-500/20"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
