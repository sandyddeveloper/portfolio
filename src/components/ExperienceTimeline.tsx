'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Sparkles,
  Zap,
  Code2,
  Layers,
  SquareTerminal,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  status: string;
  statusColor: string;
  description: string;
  achievements: string[];
  techTags: string[];
  icon: React.ReactNode;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'datamoo',
    role: 'Software Developer',
    company: 'DataMoo.ai',
    period: 'Dec 2025 – Present',
    status: 'ACTIVE ROLE • PRESENT',
    statusColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    description:
      'Building fast, scalable, and accessible applications with a strong focus on performance, clean architecture, and long-term maintainability.',
    achievements: [
      'Optimized rendering and reduced page load time for production applications',
      'Designed reusable UI systems and clean component design tokens',
      'Collaborated seamlessly with designers and backend engineering teams'
    ],
    techTags: ['Python', 'Django', 'Scalable APIs', 'Fintech', 'UI Systems', 'Performance'],
    icon: <Building2 className="h-4 w-4 text-cyan-400" />
  },
  {
    id: 'freelancing',
    role: 'Full Stack Developer',
    company: 'Freelancing',
    period: 'Nov 2024 – Oct 2025',
    status: 'CLIENT DELIVERIES',
    statusColor: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    description:
      'Delivered end-to-end solutions for multiple clients, focusing on scalability, security, and clean user experiences.',
    achievements: [
      'Built full-stack web applications tailored to client business needs',
      'Integrated secure REST APIs, JWT authentication, and database schemas',
      'Handled cloud deployment, domain setup, SSL, and ongoing production support'
    ],
    techTags: ['Full-Stack', 'React', 'Next.js', 'REST APIs', 'Auth', 'Cloud Deployment'],
    icon: <Briefcase className="h-4 w-4 text-blue-400" />
  },
  {
    id: 'internship',
    role: 'Full Stack Developer Intern',
    company: 'Internship',
    period: 'Apr 2024 – Oct 2024',
    status: 'CAREER MILESTONE',
    statusColor: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    description:
      'Worked across frontend and backend, contributing to production features and API development.',
    achievements: [
      'Developed scalable REST APIs using Django & Flask frameworks',
      'Implemented stateless JWT authentication for secure endpoints',
      'Worked with relational databases (PostgreSQL & SQL) for structured data storage'
    ],
    techTags: ['Django', 'Flask', 'JWT Auth', 'PostgreSQL', 'Python', 'APIs'],
    icon: <Code2 className="h-4 w-4 text-purple-400" />
  }
];

export function ExperienceTimeline() {
  const { theme } = useTheme();

  return (
    <section id="experience" className="space-y-12 scroll-mt-24">
      {/* Section Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider">
            ALTERNATING TIMELINE • CAREER PATH
          </span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Engineering Track Record
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Chronological progression across backend microservices, full-stack systems, and client solutions.
        </p>
      </div>

      {/* ALTERNATING ZIGZAG TIMELINE CONTAINER */}
      <div className="relative space-y-6 md:space-y-8 before:absolute before:left-4 md:before:left-1/2 md:before:-translate-x-1/2 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 via-blue-500 before:to-purple-500">
        {TIMELINE_DATA.map((item, idx) => {
          const isLeft = idx % 2 === 0; // 1: Left, 2: Right, 3: Left, 4: Right

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative flex flex-col md:flex-row items-center ${
                isLeft ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Card Container (Occupies half width on md+ screens) */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                isLeft ? 'md:pr-8' : 'md:pl-8'
              }`}>
                <div
                  className={`group relative rounded-3xl border p-5 sm:p-6 transition-all duration-300 backdrop-blur-xl ${
                    theme === 'dark'
                      ? 'border-slate-800/90 bg-slate-950/85 text-slate-100 hover:border-cyan-500/50 hover:bg-slate-950 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]'
                      : 'border-slate-200 bg-white text-slate-900 hover:border-cyan-500/50 hover:shadow-xl'
                  }`}
                >
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.role}
                          </h3>
                        </div>
                        <span className="text-xs font-mono font-semibold text-cyan-400 block mt-0.5">
                          {item.company}
                        </span>
                      </div>
                    </div>

                    {/* Status & Period Badge */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
                      <span className={`rounded-md border px-2 py-0.5 text-[9px] font-mono font-bold ${item.statusColor}`}>
                        {item.status}
                      </span>
                      <div className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] font-mono text-slate-300">
                        <Calendar className="h-3 w-3 text-cyan-400" />
                        <span>{item.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role Summary */}
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {item.description}
                  </p>

                  {/* Key Bullet Achievements */}
                  <div className="mt-4 space-y-2">
                    {item.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                          {ach}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags Row */}
                  <div className="mt-5 pt-3.5 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5">
                    {item.techTags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-lg border px-2.5 py-1 text-[10px] font-mono font-medium ${
                          theme === 'dark'
                            ? 'border-slate-800 bg-slate-900/80 text-slate-300'
                            : 'border-slate-200 bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Timeline Node Marker (Positioned on the central axis) */}
              <div className="absolute left-1.5 md:left-1/2 md:-translate-x-1/2 top-6 flex h-7 w-7 items-center justify-center rounded-full border-2 border-cyan-400 bg-slate-950 shadow-lg shadow-cyan-500/30 z-10 group-hover:scale-125 transition-transform">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
