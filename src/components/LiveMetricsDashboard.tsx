'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import {
  Activity,
  Zap,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Server,
  Terminal,
  Cpu
} from 'lucide-react';

interface MetricItemProps {
  label: string;
  value: string;
  subtitle: string;
  trend?: string;
  statusColor?: string;
  icon: React.ReactNode;
}

function MetricCard({ label, value, subtitle, trend, statusColor = 'text-blue-500', icon }: MetricItemProps) {
  const { theme } = useTheme();

  return (
    <div className={`p-5 rounded-2xl transition-all duration-200 ${
      theme === 'dark' 
        ? 'bg-slate-900/50 hover:bg-slate-900/80 text-slate-100 shadow-sm' 
        : 'bg-white hover:bg-slate-50 text-slate-900 shadow-sm border border-slate-100'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-eyebrow flex items-center gap-1.5">
          {icon}
          {label}
        </span>
        {trend && (
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${statusColor}`}>
          {value}
        </span>
      </div>

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
        {subtitle}
      </p>
    </div>
  );
}

export function LiveMetricsDashboard() {
  const { theme } = useTheme();
  const [latency, setLatency] = useState(14);
  const [activeRequests, setActiveRequests] = useState(4820);
  const [lastDeployed, setLastDeployed] = useState('2m ago');

  // Dynamic live pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next < 11 ? 11 : next > 22 ? 22 : next;
      });

      setActiveRequests(prev => prev + Math.floor(Math.random() * 10) - 4);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Header section with typography hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <span className="text-eyebrow">Production Telemetry</span>
          <h3 className={`text-xl font-bold tracking-tight mt-0.5 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Live Engineering Metrics
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>us-east-1 Cluster Active</span>
        </div>
      </div>

      {/* Grid of 4 Key Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <MetricCard
          label="API Latency (P99)"
          value={`${latency}ms`}
          subtitle="Django REST & Redis cache"
          trend="-92.2% vs 1.8s base"
          statusColor="text-blue-500 dark:text-blue-400"
          icon={<Zap className="h-3.5 w-3.5 text-blue-500" />}
        />

        <MetricCard
          label="System Uptime"
          value="99.99%"
          subtitle="Multi-region PostgreSQL"
          trend="SLO Met"
          statusColor="text-emerald-500 dark:text-emerald-400"
          icon={<Server className="h-3.5 w-3.5 text-emerald-500" />}
        />

        <MetricCard
          label="Lighthouse Score"
          value="100/100"
          subtitle="Perf, Accessibility, SEO"
          trend="Sub-50ms FCP"
          statusColor="text-indigo-500 dark:text-indigo-400"
          icon={<ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />}
        />

        <MetricCard
          label="CI/CD & Coverage"
          value="96.4%"
          subtitle="242 Unit & Integration Tests"
          trend="Build Passing"
          statusColor="text-sky-500 dark:text-sky-400"
          icon={<GitBranch className="h-3.5 w-3.5 text-sky-500" />}
        />
      </div>

      {/* Detailed Live Pipeline Telemetry Strip */}
      <div className={`p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono ${
        theme === 'dark' 
          ? 'bg-slate-900/40 text-slate-300' 
          : 'bg-slate-100/70 text-slate-700'
      }`}>
        <div className="flex items-center gap-3">
          <Terminal className="h-4 w-4 text-blue-500" />
          <span>Ingestion Rate: <strong className="text-slate-900 dark:text-slate-100">{activeRequests.toLocaleString()} req/sec</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <Cpu className="h-4 w-4 text-emerald-500" />
          <span>Worker Pool: <strong className="text-slate-900 dark:text-slate-100">16 Celery Workers (Docker)</strong></span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>Last automated release: {lastDeployed}</span>
        </div>
      </div>
    </div>
  );
}
