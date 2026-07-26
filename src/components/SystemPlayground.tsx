'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SquareTerminal,
  Activity,
  Server,
  Database,
  Cpu,
  Globe,
  Zap,
  Code2,
  Layers,
  Play,
  CheckCircle2,
  Clock,
  HardDrive
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

type Tab = 'api' | 'architecture' | 'code';

interface Endpoint {
  id: string;
  method: 'GET' | 'POST';
  url: string;
  desc: string;
  latencyMs: number;
  status: number;
  response: Record<string, unknown>;
}

const ENDPOINTS: Endpoint[] = [
  {
    id: 'metrics',
    method: 'GET',
    url: '/api/v1/system/metrics',
    desc: 'Fetches cluster telemetry, memory stats & request throughput',
    latencyMs: 28,
    status: 200,
    response: {
      status: 'healthy',
      timestamp: '2026-07-24T12:00:00.000Z',
      cluster: {
        nodes: 4,
        activeConnections: 1420,
        cpuUsage: '14.2%',
        memoryAllocated: '412MB / 2048MB',
      },
      latencyP99: '34ms',
      cacheHitRatio: '98.4%',
    },
  },
  {
    id: 'deploy',
    method: 'POST',
    url: '/api/v1/deployments/trigger',
    desc: 'Triggers atomic zero-downtime deployment pipeline',
    latencyMs: 64,
    status: 201,
    response: {
      event: 'DEPLOYMENT_INITIALIZED',
      deploymentId: 'dpl_99a8b1c4',
      environment: 'production',
      strategy: 'blue-green',
      verificationPassed: true,
      estimatedTimeSec: 12,
    },
  },
  {
    id: 'cache',
    method: 'GET',
    url: '/api/v1/cache/health',
    desc: 'Queries Redis cluster memory allocation and keyspace stats',
    latencyMs: 12,
    status: 200,
    response: {
      redisVersion: '7.2.4',
      connectedClients: 86,
      usedMemoryHuman: '128.4MB',
      totalKeys: 45210,
      evictionPolicy: 'volatile-lru',
      health: 'OPTIMAL',
    },
  },
];

const CODE_SNIPPET = `// Production Server Action & Cache Layer Example
import { revalidateTag, unstable_cache } from 'next/cache';
import { db } from '@/lib/db';

export const getSystemMetrics = unstable_cache(
  async (tenantId: string) => {
    const metrics = await db.telemetry.aggregate({
      where: { tenantId, createdAt: { gte: new Date(Date.now() - 3600 * 1000) } },
      _avg: { latencyMs: true, throughput: true },
    });
    return { status: '200 OK', metrics };
  },
  ['system-telemetry-key'],
  { revalidate: 60, tags: ['telemetry'] }
);`;

export function SystemPlayground() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('api');
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(ENDPOINTS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<Endpoint | null>(ENDPOINTS[0]);

  const handleRunRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastResponse({
        ...selectedEndpoint,
        response: {
          ...selectedEndpoint.response,
          timestamp: new Date().toISOString(),
        },
      });
    }, 450);
  };

  return (
    <section id="playground" className="space-y-8 scroll-mt-24">
      {/* Sleek Mobile-Optimized Header */}
      <div className={`flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between border-b pb-4 ${
        theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>
              Full-Stack Engineering Sandbox
            </span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-600 animate-pulse">
              LIVE SIMULATOR
            </span>
          </div>
          <h2 className={`text-xl xs:text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            Interactive Architecture & API Lab
          </h2>
        </div>
        <p className={`max-w-md text-xs sm:text-sm leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
          Test live simulated API endpoints, explore full-stack system data flow, and inspect clean server-side code.
        </p>
      </div>

      {/* Main Sandbox Container */}
      <div className={`rounded-2xl border shadow-sm backdrop-blur-xl transition-all overflow-hidden ${
        theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80 text-slate-100' : 'border-purple-200 bg-white text-slate-950 shadow-purple-500/10'
      }`}>
        {/* Top Control Bar */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b px-3 sm:px-6 py-3 ${
          theme === 'dark' ? 'border-purple-900/30 bg-slate-900/40' : 'border-purple-100 bg-purple-50/50'
        }`}>
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shrink-0 transition-all cursor-pointer ${
                activeTab === 'api'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-900 hover:bg-purple-100'
              }`}
            >
              <SquareTerminal className="h-3.5 w-3.5 shrink-0" />
              <span>API Tester</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shrink-0 transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-900 hover:bg-purple-100'
              }`}
            >
              <Layers className="h-3.5 w-3.5 shrink-0" />
              <span>Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shrink-0 transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-900 hover:bg-purple-100'
              }`}
            >
              <Code2 className="h-3.5 w-3.5 shrink-0" />
              <span>Server Code</span>
            </button>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] sm:text-xs font-mono pt-1 sm:pt-0">
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <Activity className="h-3.5 w-3.5 shrink-0" />
              <span>99.98% SLA</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-700 font-bold">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>28ms Latency</span>
            </div>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="p-3 sm:p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* TAB 1: API ENDPOINT TESTER */}
            {activeTab === 'api' && (
              <motion.div
                key="api-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-5 lg:grid-cols-12"
              >
                {/* Left Selector List */}
                <div className="lg:col-span-5 space-y-3">
                  <p className={`text-xs font-mono font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-purple-700'}`}>
                    Select Microservice Endpoint
                  </p>
                  {ENDPOINTS.map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => setSelectedEndpoint(ep)}
                      className={`w-full text-left rounded-2xl border p-3 xs:p-4 transition-all cursor-pointer ${
                        selectedEndpoint.id === ep.id
                          ? theme === 'dark'
                            ? 'border-purple-500/50 bg-purple-500/20 shadow-lg shadow-purple-500/10'
                            : 'border-purple-400 bg-purple-100 text-slate-950 font-bold shadow-purple-500/10'
                          : theme === 'dark'
                          ? 'border-purple-900/40 bg-slate-950/40 hover:bg-slate-800/50'
                          : 'border-purple-200 bg-purple-50/40 text-slate-950 hover:bg-purple-100/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-md px-2 py-0.5 text-[10px] sm:text-[11px] font-bold font-mono bg-purple-600 text-white">
                          {ep.method}
                        </span>
                        <span className="text-[11px] font-mono text-purple-600 font-bold">{ep.latencyMs}ms</span>
                      </div>
                      <p className={`mt-2 text-xs font-mono font-bold break-all leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                        {ep.url}
                      </p>
                      <p className={`mt-1 text-[11px] leading-relaxed font-medium line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                        {ep.desc}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Right Request Executer & JSON Viewer */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Endpoint Request Bar */}
                  <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border p-3 sm:p-3.5 ${
                    theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80' : 'border-purple-200 bg-purple-50/60'
                  }`}>
                    <div className="flex items-center gap-2 flex-1 min-w-0 font-mono text-[11px] sm:text-xs">
                      <span className="rounded-md px-2 py-0.5 font-bold shrink-0 bg-purple-600 text-white">
                        {selectedEndpoint.method}
                      </span>
                      <span className={`break-all font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                        https://api.santhu.dev{selectedEndpoint.url}
                      </span>
                    </div>

                    <button
                      onClick={handleRunRequest}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 border border-purple-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:bg-purple-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                    >
                      {isLoading ? (
                        <>
                          <Zap className="h-3.5 w-3.5 animate-spin" />
                          <span>Executing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 fill-white" />
                          <span>Run Request</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Response Terminal Box */}
                  <div className="flex-1 rounded-2xl border border-purple-900/40 bg-slate-950 p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs text-slate-200 shadow-inner overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between border-b border-purple-900/30 pb-2.5 mb-2.5 text-slate-400 gap-2">
                      <div className="flex items-center gap-2 flex-wrap text-[11px]">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-400 font-bold">
                          {lastResponse?.status || 200} OK
                        </span>
                        <span className="text-slate-500">•</span>
                        <span>{selectedEndpoint.latencyMs}ms latency</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-purple-400 font-bold shrink-0">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        <span>JSON Payload</span>
                      </div>
                    </div>

                    <pre className="flex-1 overflow-x-auto text-purple-300 leading-relaxed font-mono p-1 max-w-full">
                      {JSON.stringify(lastResponse?.response || selectedEndpoint.response, null, 2)}
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SYSTEM ARCHITECTURE VISUALIZER */}
            {activeTab === 'architecture' && (
              <motion.div
                key="arch-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div className="text-center max-w-xl mx-auto space-y-1">
                  <h3 className={`text-base sm:text-lg font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                    End-to-End Distributed Architecture Flow
                  </h3>
                  <p className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                    Designed for high performance, sub-100ms response times, and zero single points of failure.
                  </p>
                </div>

                {/* Architecture Nodes Flow Diagram */}
                <div className="relative pt-2">
                  <div className="hidden md:block absolute top-[48px] left-12 right-12 h-0.5 bg-purple-500/20 -z-0">
                    <motion.div
                      className="h-full w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-sm shadow-purple-500"
                      animate={{ x: ['0%', '400%'] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-4 relative z-10">
                    {/* Node 1: Client UI */}
                    <div className={`flex flex-col items-center justify-between rounded-2xl border p-3 sm:p-4 text-center transition-all ${
                      theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80' : 'border-purple-200 bg-white shadow-purple-500/5'
                    }`}>
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-500/30">
                        <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="my-2">
                        <h4 className={`text-xs font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Client Browser</h4>
                        <p className="text-[9px] sm:text-[10px] text-purple-600 font-mono font-bold mt-0.5">Next.js 16 + React 19</p>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">Edge Hydration</span>
                    </div>

                    {/* Node 2: CDN Edge */}
                    <div className={`flex flex-col items-center justify-between rounded-2xl border p-3 sm:p-4 text-center transition-all ${
                      theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80' : 'border-purple-200 bg-white shadow-purple-500/5'
                    }`}>
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-500/30">
                        <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="my-2">
                        <h4 className={`text-xs font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Vercel Edge</h4>
                        <p className="text-[9px] sm:text-[10px] text-purple-600 font-mono font-bold mt-0.5">Global CDN</p>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">&lt; 15ms TTFB</span>
                    </div>

                    {/* Node 3: API Gateway */}
                    <div className={`flex flex-col items-center justify-between rounded-2xl border p-3 sm:p-4 text-center transition-all shadow-lg ${
                      theme === 'dark' ? 'border-purple-500/40 bg-purple-500/10' : 'border-purple-300 bg-purple-50'
                    }`}>
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-purple-600 text-white border border-purple-500">
                        <Server className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="my-2">
                        <h4 className={`text-xs font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>API Gateway</h4>
                        <p className="text-[9px] sm:text-[10px] text-purple-700 font-mono font-bold mt-0.5">Node & Python API</p>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">Actions + JWT</span>
                    </div>

                    {/* Node 4: Redis Cache */}
                    <div className={`flex flex-col items-center justify-between rounded-2xl border p-3 sm:p-4 text-center transition-all ${
                      theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80' : 'border-purple-200 bg-white shadow-purple-500/5'
                    }`}>
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                        <Cpu className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="my-2">
                        <h4 className={`text-xs font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Distributed Cache</h4>
                        <p className="text-[9px] sm:text-[10px] text-emerald-600 font-mono font-bold mt-0.5">Redis Cluster</p>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">Sub-5ms Memory</span>
                    </div>

                    {/* Node 5: Database */}
                    <div className={`col-span-2 md:col-span-1 flex flex-col items-center justify-between rounded-2xl border p-3 sm:p-4 text-center transition-all ${
                      theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80' : 'border-purple-200 bg-white shadow-purple-500/5'
                    }`}>
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-500/30">
                        <Database className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="my-2">
                        <h4 className={`text-xs font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Primary Store</h4>
                        <p className="text-[9px] sm:text-[10px] text-purple-600 font-mono font-bold mt-0.5">PostgreSQL Engine</p>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">ACID + Connection Pool</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: CODE SNIPPET */}
            {activeTab === 'code' && (
              <motion.div
                key="code-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-600">
                    <HardDrive className="h-3.5 w-3.5" />
                    <span>server/actions/telemetry.ts</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono">TypeScript 5.0 • Strict Mode</span>
                </div>

                <div className="rounded-2xl border border-purple-900/40 bg-slate-950 p-3.5 sm:p-5 font-mono text-[11px] sm:text-xs text-purple-300 shadow-inner overflow-x-auto max-w-full">
                  <pre className="leading-relaxed max-w-full">{CODE_SNIPPET}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
