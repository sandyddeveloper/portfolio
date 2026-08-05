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

  return (
    <div className="w-full space-y-4">
      {/* Header section with typography hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
        <div>
          <span className="text-eyebrow">Verified Production Benchmarks</span>
          <h3 className={`text-xl font-bold tracking-tight mt-0.5 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            System Performance & Load Test Results
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span>Verified via k6 & Locust Load Suites</span>
        </div>
      </div>

      {/* Grid of 4 Key Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <MetricCard
          label="API Latency (P99)"
          value="140ms"
          subtitle="Cut from 1.8s under peak load"
          trend="k6 Benchmarked"
          statusColor="text-blue-500 dark:text-blue-400"
          icon={<Zap className="h-3.5 w-3.5 text-blue-500" />}
        />

        <MetricCard
          label="System Availability"
          value="99.95%"
          subtitle="PostgreSQL Failover Cluster"
          trend="Production SLA"
          statusColor="text-emerald-500 dark:text-emerald-400"
          icon={<Server className="h-3.5 w-3.5 text-emerald-500" />}
        />

        <MetricCard
          label="Ingestion Throughput"
          value="10M+"
          subtitle="Daily Event Telemetry Points"
          trend="Redis In-Memory"
          statusColor="text-indigo-500 dark:text-indigo-400"
          icon={<ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />}
        />

        <MetricCard
          label="Test Suite Coverage"
          value="96.4%"
          subtitle="242 Integration & Unit Tests"
          trend="CI/CD Enforced"
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
          <span>Max Load Test Concurrency: <strong className="text-slate-900 dark:text-slate-100">10,000 Virtual Users (VU)</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <Cpu className="h-4 w-4 text-emerald-500" />
          <span>Worker Pool Topology: <strong className="text-slate-900 dark:text-slate-100">16 Celery Workers (Docker Compose)</strong></span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>PostgreSQL B-Tree Indexing Verified</span>
        </div>
      </div>
    </div>
  );
}
