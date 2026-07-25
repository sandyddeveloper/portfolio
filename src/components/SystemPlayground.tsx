'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
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
  const [requestHistory, setRequestHistory] = useState<number[]>([24, 32, 28, 45, 19, 28]);

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
      setRequestHistory((prev) => [...prev.slice(1), selectedEndpoint.latencyMs + Math.floor(Math.random() * 10 - 5)]);
    }, 450);
  };

  return (
    <section id="playground" className="space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
              Full-Stack Engineering Sandbox
            </span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 animate-pulse">
              LIVE SIMULATOR
            </span>
          </div>
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Interactive Architecture & API Lab
          </h2>
        </div>
        <p className={`max-w-md text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          Test live simulated API endpoints, explore full-stack system data flow, and inspect clean server-side code.
        </p>
      </div>

      {/* Main Sandbox Container */}
      <div className={`rounded-2xl border shadow-sm backdrop-blur-xl transition-all overflow-hidden ${
        theme === 'dark' ? 'border-divider bg-darkBg/95 text-silver shadow-lg shadow-black/40' : 'border-slate-200 bg-white'
      }`}>
        {/* Top Control Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 border-b px-6 py-3.5 ${
          theme === 'dark' ? 'border-divider bg-umber/30' : 'border-slate-200 bg-slate-50'
        }`}>
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'api'
                  ? theme === 'dark' ? 'bg-umber text-silver border border-cedar font-bold shadow-md' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : theme === 'dark' ? 'text-slate-400 hover:text-silver hover:bg-umber/50' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="h-4 w-4" />
              API Endpoint Tester
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="h-4 w-4" />
              System Architecture
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="h-4 w-4" />
              Server Actions Code
            </button>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Activity className="h-3.5 w-3.5" />
              <span>99.98% Latency SLA</span>
            </div>
            <div className={`hidden sm:flex items-center gap-1.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span>Avg 28ms Response</span>
            </div>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* TAB 1: API ENDPOINT TESTER */}
            {activeTab === 'api' && (
              <motion.div
                key="api-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-6 lg:grid-cols-12"
              >
                {/* Left Selector List */}
                <div className="lg:col-span-5 space-y-3">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Select Microservice Endpoint
                  </p>
                  {ENDPOINTS.map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => setSelectedEndpoint(ep)}
                      className={`w-full text-left rounded-2xl border p-4 transition-all cursor-pointer ${
                        selectedEndpoint.id === ep.id
                          ? theme === 'dark' ? 'border-cedar bg-umber/80 text-silver shadow-md' : 'border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                          : theme === 'dark'
                          ? 'border-divider bg-darkBg hover:bg-umber/40'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold font-mono ${
                          ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {ep.method}
                        </span>
                        <span className={`text-xs font-mono ${theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'}`}>{ep.latencyMs}ms</span>
                      </div>
                      <p className={`mt-2 text-xs font-mono font-semibold ${theme === 'dark' ? 'text-silver' : 'text-slate-900'}`}>
                        {ep.url}
                      </p>
                      <p className={`mt-1 text-[11px] leading-relaxed line-clamp-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-500'}`}>
                        {ep.desc}
                      </p>
                    </button>
                  ))}

                  {/* Latency History Graph Mock */}
                  <div className={`mt-4 rounded-2xl border p-4 ${theme === 'dark' ? 'border-divider bg-darkBg' : 'border-slate-200 bg-slate-50'}`}>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className={`font-semibold ${theme === 'dark' ? 'text-silver' : 'text-slate-700'}`}>Live Request Latency</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Real-time telemetry</span>
                    </div>
                    <div className="flex items-end gap-2 h-14 pt-2">
                      {requestHistory.map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                          <div
                            style={{ height: `${Math.min(100, (val / 60) * 100)}%` }}
                            className={`w-full rounded-t-sm transition-all ${theme === 'dark' ? 'bg-amber-700 group-hover:bg-amber-600' : 'bg-gradient-to-t from-cyan-600 to-emerald-400 group-hover:bg-cyan-300'}`}
                          />
                          <span className="text-[9px] font-mono text-slate-400">{val}ms</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Request Executer & JSON Viewer */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Endpoint Request Bar */}
                  <div className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3.5 ${
                    theme === 'dark' ? 'border-divider bg-darkBg' : 'border-slate-200 bg-slate-100'
                  }`}>
                    <div className="flex items-center gap-2 flex-1 min-w-0 font-mono text-xs">
                      <span className={`rounded-md px-2 py-1 font-bold ${
                        selectedEndpoint.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {selectedEndpoint.method}
                      </span>
                      <span className={`truncate font-semibold ${theme === 'dark' ? 'text-silver' : 'text-slate-900'}`}>
                        https://api.santhu.dev{selectedEndpoint.url}
                      </span>
                    </div>

                    <button
                      onClick={handleRunRequest}
                      disabled={isLoading}
                      className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50 ${
                        theme === 'dark'
                          ? 'bg-umber border-cedar text-silver hover:bg-mocha'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/20 hover:brightness-110'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Zap className="h-3.5 w-3.5 animate-spin" />
                          <span>Executing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Run Request</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Response Terminal Box */}
                  <div className={`flex-1 rounded-2xl border p-4 font-mono text-xs shadow-inner overflow-hidden flex flex-col ${
                    theme === 'dark' ? 'border-divider bg-darkBg text-silver' : 'border-slate-800 bg-slate-950 text-slate-200'
                  }`}>
                    <div className={`flex items-center justify-between border-b pb-3 mb-3 ${theme === 'dark' ? 'border-divider text-slate-400' : 'border-slate-800 text-slate-400'}`}>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-400 font-bold">
                          {lastResponse?.status || 200} OK
                        </span>
                        <span className="text-slate-500">•</span>
                        <span>{selectedEndpoint.latencyMs}ms latency</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        <span>JSON Payload</span>
                      </div>
                    </div>

                    <pre className={`flex-1 overflow-x-auto leading-relaxed font-mono p-1 ${theme === 'dark' ? 'text-amber-200/90' : 'text-cyan-300/90'}`}>
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
                className="space-y-6"
              >
                <div className="text-center max-w-xl mx-auto space-y-1">
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    End-to-End Distributed Architecture Flow
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Designed for high performance, sub-100ms response times, and zero single points of failure.
                  </p>
                </div>

                {/* Architecture Nodes Flow Diagram */}
                <div className="relative pt-4">
                  {/* Glowing Connection Stream Line */}
                  <div className={`hidden md:block absolute top-[52px] left-12 right-12 h-0.5 z-0 ${
                    theme === 'dark' ? 'bg-amber-800/40' : 'bg-slate-800'
                  }`}>
                    <motion.div
                      className={`h-full w-24 ${
                        theme === 'dark' ? 'bg-gradient-to-r from-transparent via-amber-200 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent'
                      }`}
                      animate={{ x: ['0%', '400%'] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 relative z-10">
                    {/* Node 1: Client UI */}
                    <div className={`flex flex-col items-center justify-between rounded-2xl border p-4 text-center transition-all ${
                      theme === 'dark' ? 'border-divider bg-darkBg text-silver' : 'border-slate-200 bg-slate-50'
                    }`}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        theme === 'dark' ? 'bg-umber border border-cedar text-silver' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        <Globe className="h-6 w-6" />
                      </div>
                      <div className="my-3">
                        <h4 className={`text-xs font-bold ${theme === 'dark' ? 'text-silver' : 'text-slate-900'}`}>Client Browser</h4>
                        <p className={`text-[10px] font-mono mt-0.5 ${theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'}`}>Next.js 16 + React 19</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Edge Hydration</span>
                    </div>

                    {/* Node 2: CDN Edge */}
                    <div className={`flex flex-col items-center justify-between rounded-2xl border p-4 text-center transition-all ${
                      theme === 'dark' ? 'border-divider bg-darkBg text-silver' : 'border-slate-200 bg-slate-50'
                    }`}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        theme === 'dark' ? 'bg-umber border border-cedar text-silver' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}>
                        <Zap className="h-6 w-6" />
                      </div>
                      <div className="my-3">
                        <h4 className={`text-xs font-bold ${theme === 'dark' ? 'text-silver' : 'text-slate-900'}`}>Vercel Edge Network</h4>
                        <p className={`text-[10px] font-mono mt-0.5 ${theme === 'dark' ? 'text-amber-200' : 'text-blue-400'}`}>Global Anycast CDN</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">&lt; 15ms TTFB</span>
                    </div>

                    {/* Node 3: API Gateway */}
                    <div className={`flex flex-col items-center justify-between rounded-2xl border p-4 text-center transition-all shadow-lg ${
                      theme === 'dark' ? 'border-cedar bg-umber/90 text-silver shadow-black/60' : 'border-cyan-500/40 bg-cyan-50'
                    }`}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        theme === 'dark' ? 'bg-mocha text-silver border border-cedar' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      }`}>
                        <Server className="h-6 w-6" />
                      </div>
                      <div className="my-3">
                        <h4 className={`text-xs font-bold ${theme === 'dark' ? 'text-silver' : 'text-slate-900'}`}>API Gateway / Server</h4>
                        <p className={`text-[10px] font-mono mt-0.5 ${theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'}`}>Node.js & Python API</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Server Actions + JWT</span>
                    </div>

                    {/* Node 4: Redis Cache */}
                    <div className={`flex flex-col items-center justify-between rounded-2xl border p-4 text-center transition-all ${
                      theme === 'dark' ? 'border-divider bg-darkBg text-silver' : 'border-slate-200 bg-slate-50'
                    }`}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <Cpu className="h-6 w-6" />
                      </div>
                      <div className="my-3">
                        <h4 className={`text-xs font-bold ${theme === 'dark' ? 'text-silver' : 'text-slate-900'}`}>Distributed Cache</h4>
                        <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Redis Enterprise</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Sub-5ms Memory Lookup</span>
                    </div>

                    {/* Node 5: Database */}
                    <div className={`flex flex-col items-center justify-between rounded-2xl border p-4 text-center transition-all ${
                      theme === 'dark' ? 'border-divider bg-darkBg text-silver' : 'border-slate-200 bg-slate-50'
                    }`}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        theme === 'dark' ? 'bg-umber border border-cedar text-silver' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                      }`}>
                        <Database className="h-6 w-6" />
                      </div>
                      <div className="my-3">
                        <h4 className={`text-xs font-bold ${theme === 'dark' ? 'text-silver' : 'text-slate-900'}`}>Primary Store</h4>
                        <p className={`text-[10px] font-mono mt-0.5 ${theme === 'dark' ? 'text-amber-200' : 'text-indigo-400'}`}>PostgreSQL + Prisma</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">ACID + Connection Pool</span>
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
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 text-xs font-mono ${theme === 'dark' ? 'text-amber-200' : 'text-cyan-400'}`}>
                    <HardDrive className="h-4 w-4" />
                    <span>server/actions/telemetry.ts</span>
                  </div>
                  <span className="text-[11px] text-slate-400">TypeScript 5.0 • Strict Mode</span>
                </div>

                <div className={`rounded-2xl border p-5 font-mono text-xs shadow-inner overflow-x-auto ${
                  theme === 'dark' ? 'border-divider bg-darkBg text-silver' : 'border-slate-800 bg-slate-950 text-slate-200'
                }`}>
                  <pre className={`leading-relaxed ${theme === 'dark' ? 'text-amber-200/90' : 'text-cyan-300'}`}>{CODE_SNIPPET}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
