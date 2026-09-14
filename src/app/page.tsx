"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/preloader/Preloader";
import Header from "@/components/common/Header";
import MenuDrawer from "@/components/common/MenuDrawer";
import ContactDrawer from "@/components/sections/ContactDrawer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Vision from "@/components/sections/Vision";
import KeyFacts from "@/components/sections/KeyFacts";
import WorkAndServices from "@/components/sections/WorkAndServices";
import DesignInMotion from "@/components/sections/DesignInMotion";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/common/Footer";
import CustomCursor from "@/components/common/CustomCursor";
import { soundManager } from "@/lib/audio";

const Hero3DCanvas = dynamic(() => import("@/components/hero/Hero3DCanvas"), {
  ssr: false,
});

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);

  const handleToggleSound = () => {
    const active = soundManager.toggle();
    setIsSoundActive(active);
  };

  const handlePlaySound = (type: string) => {
    if (type === "blast") {
      soundManager.playBlast();
    } else {
      soundManager.playBeep(600, 0.05);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#040508] text-[#D8D8D8]">
      {/* GSAP Custom Cursor */}
      <CustomCursor />

      {/* 10-Belt Shutter Preloader with Slot Machine Reel */}
      <Preloader />

      {/* Persistent Navigation Header with mix-blend-difference */}
      <Header
        onOpenContact={() => setIsContactOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        isSoundEnabled={isSoundActive}
        onToggleSound={handleToggleSound}
      />

      {/* Circular Clip-Path Hamburger Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Circular Clip-Path Contact & Lead Drawer */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Persistent 3D Three.js Emblem Canvas: Travels across Hero, About, and Vision */}
      <Hero3DCanvas soundEnabled={isSoundActive} />

      {/* 0. Hero Banner */}
      <Hero
        onDiscussClick={() => setIsContactOpen(true)}
        playSound={handlePlaySound}
      />

      {/* 1. About Agency Section */}
      <About />

      {/* 2. Vision & Continuous Marquee */}
      <Vision />

      {/* 3. 3D Key Facts & Awards Section */}
      <KeyFacts />

      {/* 4. Selected Works & Interactive Services Showcase (Pinned Reveal & 3D Stone Scrub) */}
      <WorkAndServices />

      {/* 5. Design In Motion (Dribbble Showcase 3D Carousel) */}
      <DesignInMotion />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Authentic TRIONN Site Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />
    </main>
  );
}
