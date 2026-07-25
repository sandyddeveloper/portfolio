'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Code2,
  Database,
  Cloud,
  Sparkles,
  Zap,
  CheckCircle2,
  SquareTerminal,
  X,
  ExternalLink,
  ShieldCheck,
  Search,
  Layers,
  Cpu,
  ArrowRight,
  Info,
  Radio,
  FileCode,
  Lock
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/Toast';

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
    name: 'Python, Django & Django REST (DRF)',
    category: 'Backend & APIs',
    categoryColor: 'from-blue-500 to-cyan-500',
    level: 96,
    tier: 'PRODUCTION READY',
    icon: <Server className="h-5 w-5 text-blue-400" />,
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
    name: 'PostgreSQL (psql), SQL & Query Tuning',
    category: 'Backend & APIs',
    categoryColor: 'from-blue-500 to-cyan-500',
    level: 95,
    tier: 'PRODUCTION READY',
    icon: <Database className="h-5 w-5 text-cyan-400" />,
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
    name: 'Node.js, Express, NestJS & Flask',
    category: 'Backend & APIs',
    categoryColor: 'from-blue-500 to-cyan-500',
    level: 92,
    tier: 'PRODUCTION READY',
    icon: <Cpu className="h-5 w-5 text-indigo-400" />,
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
    icon: <Lock className="h-5 w-5 text-emerald-400" />,
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
    name: 'React 19 & Next.js 16 (App Router)',
    category: 'Frontend UX',
    categoryColor: 'from-cyan-500 to-blue-500',
    level: 95,
    tier: 'PRODUCTION READY',
    icon: <Code2 className="h-5 w-5 text-cyan-400" />,
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
    name: 'TypeScript, JavaScript (HTML5/CSS3)',
    category: 'Frontend UX',
    categoryColor: 'from-cyan-500 to-blue-500',
    level: 96,
    tier: 'PRODUCTION READY',
    icon: <FileCode className="h-5 w-5 text-blue-400" />,
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
    name: 'Tailwind CSS, MUI & Bootstrap',
    category: 'Frontend UX',
    categoryColor: 'from-cyan-500 to-blue-500',
    level: 94,
    tier: 'PRODUCTION READY',
    icon: <Sparkles className="h-5 w-5 text-indigo-400" />,
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
    name: 'Vite, Three.js & Chart.js',
    category: 'Frontend UX',
    categoryColor: 'from-cyan-500 to-blue-500',
    level: 88,
    tier: 'PRODUCTION READY',
    icon: <Zap className="h-5 w-5 text-pink-400" />,
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
    name: 'Docker & Containerization',
    category: 'DevOps & Cloud',
    categoryColor: 'from-indigo-500 to-purple-500',
    level: 92,
    tier: 'ENTERPRISE DEPLOYED',
    icon: <Cloud className="h-5 w-5 text-purple-400" />,
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
    name: 'AWS, Render, Netlify & Vercel',
    category: 'DevOps & Cloud',
    categoryColor: 'from-indigo-500 to-purple-500',
    level: 90,
    tier: 'ENTERPRISE DEPLOYED',
    icon: <Cloud className="h-5 w-5 text-indigo-400" />,
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
    name: 'Fintech Domain & Mutual Funds',
    category: 'Fintech & RAG AI',
    categoryColor: 'from-purple-500 to-pink-500',
    level: 95,
    tier: 'PRODUCTION READY',
    icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
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
    name: 'RAG AI, Vector DBs & LLMs',
    category: 'Fintech & RAG AI',
    categoryColor: 'from-purple-500 to-pink-500',
    level: 86,
    tier: 'ACTIVE LEARNING & RAG',
    icon: <Sparkles className="h-5 w-5 text-cyan-400" />,
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-xs font-semibold uppercase tracking-wider ${
              theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
            }`}>
              Interactive Competencies & Stack Inspector
            </span>
            <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              CLICK ITEM TO INSPECT ARCHITECTURE & CODE
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Technology Matrix & Enterprise Stack
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack (e.g. Django, RAG, Docker)..."
            className={`w-full rounded-xl border pl-9 pr-3.5 py-2 text-xs font-mono transition-all ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-400'
                : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-cyan-600'
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
            className={`rounded-xl px-4 py-2 text-xs font-mono font-medium transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                : theme === 'dark'
                ? 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat === 'All' ? '🌐 All Technologies' : cat}
          </button>
        ))}
      </div>

      {/* Futuristic Interactive Grid of Tech Items */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -3, scale: 1.01 }}
            onClick={() => setActiveItem(item)}
            className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 cursor-pointer overflow-hidden ${
              theme === 'dark'
                ? 'border-slate-800/90 bg-slate-950/80 text-slate-100 hover:border-cyan-500/50 hover:bg-slate-950 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]'
                : 'border-slate-200 bg-white text-slate-900 hover:border-cyan-500/50 hover:shadow-lg'
            }`}
          >
            {/* Top Glowing Category Bar */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.categoryColor}`} />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm">
                  {item.icon}
                </div>
                <span className={`rounded-md border px-2 py-0.5 text-[9px] font-mono font-bold ${
                  item.tier === 'PRODUCTION READY'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    : item.tier === 'ENTERPRISE DEPLOYED'
                    ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                    : 'border-purple-500/30 bg-purple-500/10 text-purple-400 animate-pulse'
                }`}>
                  {item.tier}
                </span>
              </div>

              {/* Title & Short Desc */}
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {item.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {item.shortDesc}
              </p>
            </div>

            {/* Bottom Inspection Prompt */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-cyan-400 group-hover:text-cyan-300">
              <span className="flex items-center gap-1 font-semibold">
                <Info className="h-3 w-3" /> Inspect Architecture
              </span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* INTERACTIVE TECH EXPLANATION POPUP CONTAINER */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl border border-cyan-500/40 bg-slate-950 p-6 md:p-8 shadow-2xl backdrop-blur-2xl text-slate-100 font-sans space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-md">
                    {activeItem.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                        {activeItem.category}
                      </span>
                      <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400">
                        {activeItem.tier}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white mt-0.5">
                      {activeItem.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveItem(null)}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* 1. Production Impact Section */}
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-cyan-400" />
                  <span>Production Impact & Real-World Usage</span>
                </span>
                <p className="text-xs leading-relaxed text-slate-200 pt-1">
                  {activeItem.productionImpact}
                </p>
              </div>

              {/* 2. Key Architecture Specs */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span>Key Architecture Specs</span>
                </span>
                <div className="space-y-2">
                  {activeItem.architectureHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Terminal Code / Config Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <SquareTerminal className="h-4 w-4 text-cyan-400" />
                    <span>PRODUCTION_SPEC // {activeItem.codeLanguage.toUpperCase()}</span>
                  </span>
                  <span className="text-cyan-400 font-bold">VERIFIED PRODUCTION SPEC</span>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto">
                  <pre>{activeItem.codeSnippet}</pre>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveItem(null)}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
