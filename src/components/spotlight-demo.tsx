"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

export default function SpotlightPreview() {
  return (
    <div className="relative flex h-[40rem] w-full overflow-hidden rounded-3xl bg-black/[0.96] antialiased md:items-center md:justify-center border border-purple-900/40 shadow-2xl">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none opacity-40",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#a855f7"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-white to-purple-300 bg-clip-text text-center text-4xl font-extrabold text-transparent md:text-7xl tracking-tight">
          Spotlight <br /> Architecture.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm md:text-base font-medium text-slate-300">
          Highlighting high-performance microservices, Python Django REST APIs, and scalable full-stack engineering.
        </p>
      </div>
    </div>
  );
}
