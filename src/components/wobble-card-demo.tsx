"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { useTheme } from "@/context/ThemeContext";

export default function WobbleCardDemo() {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName={`col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px] border ${
          theme === 'dark' ? 'bg-purple-950/40 border-purple-900/40' : 'bg-purple-900 border-purple-800'
        }`}
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            High-Throughput Fintech Mutual Fund Routing
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Processing financial mutual fund transactions at DataMoo.ai with sub-30ms execution times and immutable audit logs.
          </p>
        </div>
      </WobbleCard>
      <WobbleCard containerClassName={`col-span-1 min-h-[300px] border ${
        theme === 'dark' ? 'bg-slate-900 border-purple-900/40' : 'bg-slate-950 border-purple-900'
      }`}>
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          PostgreSQL Query Optimization
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Relational data modeling, B-Tree indexing, and zero-contention transaction locking under high concurrency.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName={`col-span-1 lg:col-span-3 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] border ${
        theme === 'dark' ? 'bg-indigo-950/60 border-purple-900/40' : 'bg-indigo-950 border-purple-900'
      }`}>
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            RAG AI Knowledge Retrieval & Vector Embedding
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Engineering context-aware vector retrieval pipelines with Pinecone, FAISS, and LangChain for enterprise applications.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}
