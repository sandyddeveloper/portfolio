"use client";

import React from "react";
import { Server, Code2, Database, Sparkles, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Server className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
        title="Scalable API & Backend Architecture"
        description="Software Developer at DataMoo.ai specializing in Python, Django REST Framework, PostgreSQL, and sub-30ms fintech APIs."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Code2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
        title="Next.js 16 & React 19 UI Frameworks"
        description="Building responsive, accessible web applications with Tailwind CSS, Framer Motion animations, and custom design tokens."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
        title="PostgreSQL Indexing & Docker DevOps"
        description="Optimizing relational time-series query pipelines, Redis event caching, Docker containerization, and AWS zero-downtime deployments."
        extraContent={
          <div className="mt-3 space-y-2.5 pt-2 border-t border-purple-500/20">
            <div className="flex items-start gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Sub-30ms time-series indexing & query execution</span>
            </div>
            <div className="flex items-start gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
              <span>Redis in-memory caching for high-frequency transactions</span>
            </div>
            <div className="flex items-start gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
              <Cpu className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
              <span>Docker Compose, Gunicorn & Nginx proxy routing</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['PostgreSQL', 'Redis', 'Docker', 'Nginx'].map((tag) => (
                <span key={tag} className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
        title="RAG AI & Vector Embeddings"
        description="Engineering Retrieval-Augmented Generation (RAG) pipelines, vector database search, and autonomous LLM agent workflows."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<ShieldCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
        title="Production Fintech & High Availability"
        description="Engineering financial mutual fund transaction engines with JWT authentication, role-based security, and 99.99% uptime."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  extraContent?: React.ReactNode;
}

const GridItem = ({ area, icon, title, description, extraContent }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-purple-900/30 bg-white/60 dark:bg-slate-950/80 p-2 md:rounded-3xl md:p-3 backdrop-blur-xl shadow-lg">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_rgba(147,51,234,0.15)]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-xl border border-purple-500/30 bg-purple-500/10 p-3 shadow-inner">
              {icon}
            </div>
            <div className="space-y-2.5">
              <h3 className="-tracking-4 pt-0.5 font-sans text-lg/[1.375rem] font-extrabold text-balance text-slate-950 md:text-xl/[1.75rem] dark:text-white">
                {title}
              </h3>
              <p className="font-sans text-xs/[1.25rem] font-medium text-slate-700 md:text-sm/[1.375rem] dark:text-slate-300">
                {description}
              </p>
              {extraContent}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
