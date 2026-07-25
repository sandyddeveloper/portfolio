'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Play, Zap, CheckCircle2, RefreshCw, Layers, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface QueryPreset {
  id: string;
  name: string;
  query: string;
  indexedMs: number;
  unindexedMs: number;
  rows: Record<string, unknown>[];
}

const PRESETS: QueryPreset[] = [
  {
    id: 'telemetry',
    name: 'Fetch Telemetry Metrics',
    query: "SELECT tenant_id, AVG(latency_ms) as avg_latency, COUNT(*) as total_reqs FROM telemetry_events WHERE created_at >= NOW() - INTERVAL '1 hour' GROUP BY tenant_id;",
    indexedMs: 4,
    unindexedMs: 142,
    rows: [
      { tenant_id: 'tnt_alpha_99', avg_latency: '24.2ms', total_reqs: 45210, status: 'OPTIMAL' },
      { tenant_id: 'tnt_beta_42', avg_latency: '31.8ms', total_reqs: 32100, status: 'OPTIMAL' },
      { tenant_id: 'tnt_gamma_12', avg_latency: '19.5ms', total_reqs: 18950, status: 'HEALTHY' },
    ]
  },
  {
    id: 'users',
    name: 'Query Active User Sessions',
    query: "SELECT u.id, u.email, s.token_hash, s.expires_at FROM users u JOIN sessions s ON u.id = s.user_id WHERE s.is_active = TRUE AND u.role = 'ADMIN';",
    indexedMs: 2,
    unindexedMs: 98,
    rows: [
      { id: 'usr_8812', email: 'alex@enterprise.com', token_hash: 'sha256_88a91b', expires_at: '2026-07-25 12:00:00', role: 'ADMIN' },
      { id: 'usr_9941', email: 'santhu@developer.io', token_hash: 'sha256_77c22d', expires_at: '2026-07-25 14:30:00', role: 'ADMIN' },
    ]
  },
  {
    id: 'deployments',
    name: 'Audit High-Frequency Deployments',
    query: "SELECT id, environment, commit_sha, duration_sec FROM deployments WHERE status = 'SUCCESS' ORDER BY created_at DESC LIMIT 5;",
    indexedMs: 3,
    unindexedMs: 115,
    rows: [
      { id: 'dpl_99a8', environment: 'production', commit_sha: '7f9c2d1', duration_sec: 12, status: 'SUCCESS' },
      { id: 'dpl_88f2', environment: 'staging', commit_sha: '4a1b2c3', duration_sec: 9, status: 'SUCCESS' },
      { id: 'dpl_77d1', environment: 'production', commit_sha: '2d3e4f5', duration_sec: 14, status: 'SUCCESS' },
    ]
  }
];

export function SQLLab() {
  const { theme } = useTheme();
  const [selectedPreset, setSelectedPreset] = useState<QueryPreset>(PRESETS[0]);
  const [customQuery, setCustomQuery] = useState(PRESETS[0].query);
  const [isIndexed, setIsIndexed] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastExecutionTime, setLastExecutionTime] = useState<number | null>(PRESETS[0].indexedMs);

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setLastExecutionTime(isIndexed ? selectedPreset.indexedMs : selectedPreset.unindexedMs);
    }, 250);
  };

  const handleSelectPreset = (preset: QueryPreset) => {
    setSelectedPreset(preset);
    setCustomQuery(preset.query);
    setLastExecutionTime(isIndexed ? preset.indexedMs : preset.unindexedMs);
  };

  return (
    <section id="sql-lab" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
              Database & Query Performance Lab
            </span>
            <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold text-cyan-400 font-mono">
              POSTGRESQL + PRISMA
            </span>
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Live SQL Performance Sandbox
          </h2>
        </div>
        <p className={`max-w-md text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          Run live simulated PostgreSQL queries and toggle B-Tree Indexing to see real-time query optimization benchmarks.
        </p>
      </div>

      {/* Main Container */}
      <div className={`rounded-2xl border shadow-sm backdrop-blur-xl transition-all overflow-hidden ${
        theme === 'dark' ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-white'
      }`}>
        {/* Control Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-3 border-b px-6 py-3.5 ${
          theme === 'dark' ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-slate-50'
        }`}>
          {/* Query Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  selectedPreset.id === preset.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Indexing Benchmark Toggle */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>B-Tree Indexing:</span>
            <button
              onClick={() => {
                setIsIndexed(!isIndexed);
                setLastExecutionTime(!isIndexed ? selectedPreset.indexedMs : selectedPreset.unindexedMs);
              }}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                isIndexed
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
              }`}
            >
              <Zap className="h-3 w-3" />
              <span>{isIndexed ? 'INDEX ON (4ms)' : 'INDEX OFF (142ms)'}</span>
            </button>
          </div>
        </div>

        {/* Query Input & Terminal */}
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 text-xs font-mono transition-all ${
                  theme === 'dark'
                    ? 'border-slate-800 bg-slate-900 text-cyan-300 focus:border-cyan-400'
                    : 'border-slate-300 bg-slate-50 text-slate-900 focus:border-cyan-600'
                }`}
              />
            </div>
            <button
              onClick={handleRunQuery}
              disabled={isExecuting}
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-5 py-3 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-cyan-400" />
                  <span>Run Query</span>
                </>
              )}
            </button>
          </div>

          {/* Results Table & Telemetry */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Query Execution Completed</span>
                <span>•</span>
                <span className="text-cyan-400">{lastExecutionTime}ms execution speed</span>
              </div>
              <span className="text-[11px] text-slate-500">
                {isIndexed ? '⚡ B-Tree Scan' : '⚠️ Sequential Table Scan'}
              </span>
            </div>

            {/* Table Format Output */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    {Object.keys(selectedPreset.rows[0] || {}).map((col) => (
                      <th key={col} className="pb-2 font-bold uppercase">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {selectedPreset.rows.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="py-2">{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
