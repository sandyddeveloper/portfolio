'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowUpRight, X, Clock, Tag, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
  keyTakeaways: string[];
  codeSnippet?: string;
}

const ARTICLES: Article[] = [
  {
    id: 'lcp-optimization',
    title: 'Reducing Next.js App Router LCP from 2.4s to 0.4s',
    category: 'Performance',
    readTime: '4 min read',
    date: 'July 2026',
    excerpt: 'A deep dive into server component streaming, font pre-loading, and image optimization strategies.',
    content: `When building high-traffic web platforms, Web Vitals performance is paramount. In this case study, I audited our Next.js App Router rendering pipeline to eliminate main-thread blocking operations.

### Key Bottlenecks Identified
1. Uncached database queries blocking initial SSR payload delivery.
2. Synchronous client-side JavaScript bundle hydration.
3. Unoptimized font loading causing Cumulative Layout Shifts (CLS).

### Refactoring Solutions
By migrating server component queries to Next.js \`unstable_cache\` wrappers with automated Redis revalidation, TTFB dropped from 650ms to 18ms. Additionally, replacing client-side font imports with Next.js local font optimization reduced Largest Contentful Paint (LCP) from 2.4s to 400ms.`,
    keyTakeaways: [
      'Leveraged Next.js unstable_cache with tag invalidation',
      'Reduced initial hydration JS payload size by 45%',
      'Achieved 100/100 Lighthouse Performance score'
    ],
    codeSnippet: `// Server Action Cache Wrapper
export const getCachedUserData = unstable_cache(
  async (userId: string) => {
    return await db.user.findUnique({ where: { id: userId } });
  },
  ['user-profile-key'],
  { revalidate: 3600, tags: ['user-data'] }
);`
  },
  {
    id: 'zero-downtime-db',
    title: 'Building Zero-Downtime Migration Pipelines with PostgreSQL',
    category: 'Backend & Data',
    readTime: '6 min read',
    date: 'June 2026',
    excerpt: 'Architecting dual-write patterns and blue-green database deployment pipelines for 24/7 availability.',
    content: `Altering PostgreSQL table schemas in production without table locks requires careful execution. In this architectural post, I break down the 4-phase migration pattern for high-throughput enterprise applications.

### The 4-Phase Migration Strategy
1. **Expand**: Add new nullable columns or tables without altering existing constraints.
2. **Dual-Write**: Update application server code to write to both old and new schemas simultaneously.
3. **Backfill**: Asynchronously populate historic data using background worker queues.
4. **Contract**: Remove legacy columns once 100% of read traffic consumes the new schema.`,
    keyTakeaways: [
      'Prevented table locks on 50M+ row production tables',
      'Zero downtime experienced across all microservice deployments',
      'Automated schema verification hooks inside CI/CD pipeline'
    ],
    codeSnippet: `// Dual-Write Server Middleware
async function writeUserRecord(payload: UserPayload) {
  // 1. Write to Primary Table
  const primary = await db.users.create({ data: payload });
  // 2. Async Write to New Schema
  await redisQueue.push('SCHEMA_SYNC', { id: primary.id, ...payload });
  return primary;
}`
  },
  {
    id: 'websocket-scaling',
    title: 'Scaling WebSockets for 100k Concurrent Real-Time Users',
    category: 'Architecture',
    readTime: '5 min read',
    date: 'May 2026',
    excerpt: 'How we used Redis Pub/Sub and Node.js cluster gateways to stream live telemetry feeds reliably.',
    content: `Maintaining persistent WebSocket connections across multiple server instances requires a centralized message broker. Here is how we scaled our telemetry engine to handle 100,000 active concurrent WebSocket subscribers with sub-50ms latency.`,
    keyTakeaways: [
      'Implemented Redis Pub/Sub adapter for horizontal socket node scaling',
      'Configured heartbeat ping/pong handlers to cull dead TCP connections',
      'Sub-50ms event delivery across global edge subscribers'
    ]
  }
];

export function BlogSection() {
  const { theme } = useTheme();
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <section id="blog" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
              Technical Articles & Case Studies
            </span>
            <span className="rounded-md bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[10px] font-bold text-purple-400 font-mono">
              ENGINEERING WRITING
            </span>
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            System Architecture Case Studies
          </h2>
        </div>
        <p className={`max-w-md text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          In-depth technical posts detailing performance optimization, database migrations, and full-stack system design.
        </p>
      </div>

      {/* Article Grid */}
      <div className="grid gap-5 md:grid-cols-3">
        {ARTICLES.map((art) => (
          <article
            key={art.id}
            className={`group flex flex-col justify-between rounded-2xl border p-6 transition-all ${
              theme === 'dark'
                ? 'border-slate-800/80 bg-slate-950/60 hover:border-cyan-500/40 text-slate-100'
                : 'border-slate-200 bg-white hover:border-cyan-500/40 text-slate-900'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
                <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 font-bold text-cyan-400">
                  {art.category}
                </span>
                <span>{art.readTime}</span>
              </div>

              <h3 className="text-base font-bold group-hover:text-cyan-400 transition-colors leading-snug">
                {art.title}
              </h3>
              <p className={`mt-2 text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {art.excerpt}
              </p>
            </div>

            <button
              onClick={() => setActiveArticle(art)}
              className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline cursor-pointer border-t border-slate-800/60 pt-3"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Read Full Case Study</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative z-10 w-full max-w-2xl rounded-2xl border shadow-xl overflow-hidden backdrop-blur-2xl transition-all max-h-[85vh] flex flex-col ${
                theme === 'dark' ? 'border-slate-800 bg-slate-950/95 text-slate-100' : 'border-slate-200 bg-white/95 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{activeArticle.category} • {activeArticle.readTime}</span>
                  <h3 className="text-lg font-bold mt-1">{activeArticle.title}</h3>
                </div>
                <button onClick={() => setActiveArticle(null)} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 text-xs leading-relaxed text-slate-300">
                <div className="whitespace-pre-line font-sans text-sm text-slate-300">
                  {activeArticle.content}
                </div>

                {activeArticle.keyTakeaways && (
                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    <h4 className="font-bold text-cyan-400 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" /> Key Technical Takeaways
                    </h4>
                    {activeArticle.keyTakeaways.map((take, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{take}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeArticle.codeSnippet && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-cyan-300">
                    <pre>{activeArticle.codeSnippet}</pre>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
