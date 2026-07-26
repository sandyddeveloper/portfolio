import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "Dec 2025 – Present",
      content: (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-bold text-emerald-600">
              PRESENT • ACTIVE ROLE
            </span>
            <span className="text-xs font-mono font-bold text-purple-600">DataMoo.ai</span>
          </div>
          <h4 className="text-xl font-extrabold text-slate-950 dark:text-white mb-2">
            Software Developer @ DataMoo.ai
          </h4>
          <p className="mb-6 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            Engineering scalable backend systems, Django REST APIs, and high-concurrency production microservices for Fintech (Mutual Funds) platforms.
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              ✅ Architected high-concurrency Django & PostgreSQL backend services
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              ✅ Engineered sub-30ms latency REST APIs with JWT & RBAC security
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              ✅ Deployed production workloads with Docker, Gunicorn, Nginx & AWS
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Python', 'Django REST', 'PostgreSQL', 'Fintech APIs', 'Docker', 'AWS'].map((tag) => (
              <span key={tag} className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Nov 2024 – Oct 2025",
      content: (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs font-mono font-bold text-purple-600">
              FREELANCE CONTRACTS
            </span>
          </div>
          <h4 className="text-xl font-extrabold text-slate-950 dark:text-white mb-2">
            Full-Stack Systems Engineer
          </h4>
          <p className="mb-6 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            Delivered end-to-end full-stack web applications, custom UI component libraries, and cloud deployments for multiple client startups.
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              ✅ Built reactive Next.js 16 App Router & React 19 dashboards
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              ✅ Integrated PostgreSQL time-series indexing & Redis caching
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              ✅ Managed Vercel, Render, Netlify deployments & SSL automation
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Next.js 16', 'TypeScript', 'React 19', 'Tailwind CSS', 'Redis', 'Node.js'].map((tag) => (
              <span key={tag} className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Apr 2024 – Oct 2024",
      content: (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs font-mono font-bold text-purple-600">
              CAREER MILESTONE
            </span>
          </div>
          <h4 className="text-xl font-extrabold text-slate-950 dark:text-white mb-2">
            Full Stack Developer Intern
          </h4>
          <p className="mb-4 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            Worked across frontend and backend stacks, contributing to core API features, authentication pipelines, and database query optimization.
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              ✅ Built RESTful services using Django & Flask
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              ✅ Implemented stateless JWT auth & role-based middleware
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              ✅ Optimized relational database schemas in PostgreSQL
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Django', 'Flask', 'JWT Auth', 'PostgreSQL', 'Python'].map((tag) => (
              <span key={tag} className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
