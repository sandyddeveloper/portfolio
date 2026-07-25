'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Server, Database, Cpu, Globe, Play, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface TopologyNode {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  loadMs: number;
  status: string;
}

const INITIAL_NODES: TopologyNode[] = [
  { id: 'client', name: 'Client Browser', type: 'Next.js 16 + React 19', enabled: true, loadMs: 12, status: 'OPTIMAL' },
  { id: 'lb', name: 'Global Load Balancer', type: 'Nginx / Anycast CDN', enabled: true, loadMs: 8, status: 'HEALTHY' },
  { id: 'api', name: 'API Server Cluster', type: 'Node.js & Python FastAPI', enabled: true, loadMs: 24, status: 'OPTIMAL' },
  { id: 'cache', name: 'Distributed Cache', type: 'Redis Enterprise Cluster', enabled: true, loadMs: 4, status: 'OPTIMAL' },
  { id: 'db', name: 'Primary Database', type: 'PostgreSQL + Prisma ORM', enabled: true, loadMs: 16, status: 'OPTIMAL' },
];

export function SystemDesignCanvas() {
  const { theme } = useTheme();
  const [nodes, setNodes] = useState<TopologyNode[]>(INITIAL_NODES);
  const [isSimulating, setIsSimulating] = useState(false);
  const [throughput, setThroughput] = useState(1420);
  const [activePackets, setActivePackets] = useState(false);

  const handleToggleNode = (id: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const handleSimulateLoad = () => {
    setIsSimulating(true);
    setActivePackets(true);
    setThroughput(10000);

    setTimeout(() => {
      setIsSimulating(false);
    }, 3000);
  };

  const enabledCount = nodes.filter((n) => n.enabled).length;

  return (
    <section id="system-design" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
              System Architecture Builder & Topology Lab
            </span>
            <span className="rounded-md bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-400 font-mono">
              MICROSERVICES SIMULATOR
            </span>
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Interactive Distributed System Topology
          </h2>
        </div>
        <p className={`max-w-md text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          Toggle topology nodes, configure infrastructure components, and simulate high-throughput traffic load in real-time.
        </p>
      </div>

      {/* Main Container */}
      <div className={`rounded-2xl border shadow-sm backdrop-blur-xl transition-all overflow-hidden ${
        theme === 'dark' ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-white'
      }`}>
        {/* Top Control Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-3 border-b px-6 py-3.5 ${
          theme === 'dark' ? 'border-slate-800/80 bg-slate-900/40' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> Active Topology: {enabledCount} / 5 Nodes
            </span>
            <span className="text-slate-500">•</span>
            <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
              Throughput: {throughput.toLocaleString()} req/sec
            </span>
          </div>

          <button
            onClick={handleSimulateLoad}
            disabled={isSimulating}
            className="flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <Zap className="h-3.5 w-3.5 animate-spin" />
                <span>Simulating 10k Traffic Load...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-cyan-400" />
                <span>Simulate 10k Traffic Load</span>
              </>
            )}
          </button>
        </div>

        {/* Nodes Canvas */}
        <div className="p-6 relative space-y-6">
          {/* Animated Packet Stream Line */}
          {activePackets && (
            <div className="hidden md:block absolute top-16 left-12 right-12 h-0.5 bg-cyan-500/20 z-0">
              <motion.div
                className="h-full w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                animate={{ x: ['0%', '400%'] }}
                transition={{ repeat: Infinity, duration: isSimulating ? 0.8 : 2.5, ease: 'linear' }}
              />
            </div>
          )}

          {/* Node Grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 relative z-10">
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => handleToggleNode(node.id)}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-all cursor-pointer ${
                  node.enabled
                    ? theme === 'dark'
                      ? 'border-slate-800 bg-slate-900/80 hover:border-cyan-500/40'
                      : 'border-slate-200 bg-slate-50 hover:border-cyan-500/40'
                    : 'border-slate-800/40 bg-slate-950/40 opacity-40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                      node.enabled ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {node.enabled ? 'ACTIVE' : 'OFFLINE'}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">{node.loadMs}ms</span>
                  </div>

                  <h3 className={`mt-3 text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {node.name}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">{node.type}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Toggle Node</span>
                  <CheckCircle2 className={`h-3 w-3 ${node.enabled ? 'text-emerald-400' : 'text-slate-600'}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Telemetry Log Footer */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">Topology Status: Optimal</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Zero bottle-necks detected</span>
            </div>
            <span className="text-[11px] text-slate-500">Auto-Balancing Engine</span>
          </div>
        </div>
      </div>
    </section>
  );
}
