# Project Task Checklist & Roadmap: TRIONN 100% Replication

This document tracks all tasks, milestones, and implementation phases required to achieve 100% replication of [TRIONN](https://trionn.com/).

---

## Phase 1: Asset Harvesting & Local Storage
- [x] Scrape production HTML and Next.js JS bundles for all static asset paths.
- [x] Download custom WOFF2 fonts into `public/fonts/`:
  - [x] `FamiljenGroteskVariable_Regular.woff2`
  - [x] `MartianMono_Light.woff2`
  - [x] `NeueHaasDisplay_Roman.woff2`
  - [x] `PPEditorialNew_Ultralight.woff2`
- [x] Download vector graphics & logos into `public/images/`:
  - [x] Main logo (`logo.svg`), favicons (`favicon.svg`, `favicon-32x32.png`, etc.)
  - [x] Award badges (`awwwards.svg`, `thefwa.svg`, `ccda.svg`, `csswinner.svg`, `adesignaward.svg`, `gsap.svg`)
  - [x] Partner marks (`partner1.svg` to `partner5.svg`)
  - [x] Interactive icons (`blast-icon.svg`, crosshairs, arrows)
- [x] Download videos into `public/video/`:
  - [x] `awards-card-video.mp4` & `awards-card-video_m.mp4`
  - [x] `team/rushi.mp4` & `team/rushi_m.mp4`
- [x] Verify all files exist locally with non-zero file sizes.

---

## Phase 2: Documentation & Skills Architecture
- [x] Create [skills.md](file:///c:/Users/SANTHU/OneDrive/Desktop/Projects/portfolio/skills.md) detailing architecture, design system, tokens, and motion math.
- [x] Create [tasks.md](file:///c:/Users/SANTHU/OneDrive/Desktop/Projects/portfolio/tasks.md) for execution tracking.

---

## Phase 3: Project Scaffolding & Initial Setup
- [x] Initialize Next.js project with App Router, TypeScript, and Tailwind CSS.
- [x] Install dependencies:
  - [x] `gsap` & `@types/gsap`
  - [x] `lenis` (Lenis smooth scroll)
  - [x] `lucide-react`
- [x] Configure `@font-face` rules for all 4 downloaded custom fonts in `src/styles/fonts.css`.
- [x] Configure color palette tokens and utilities in Tailwind configuration (`#040508`, `#0C0C0C`, `#D8D8D8`, `#E6E4E2`, `#2F323B`, `#D9432B`).
- [x] Implement global Lenis smooth scroll provider with responsive scroll speed and pause-on-overlay support.
- [x] Implement GSAP custom cursor follower with `gsap.quickTo` magnetic tracking.
- [x] Launch dev server and verify `http://localhost:3000` loads cleanly with status 200.

---

## Phase 4: Preloader & Entry Sequence
- [x] Build 10-Belt Shutter component (`.pl-overlay` with 10 `.pl-belt` bars).
- [x] Build 3-reel mechanical slot machine counter (`000` to `100`).
- [x] Implement flying corner crosshairs (`.pl-flying-plus`) that animate to screen corners.
- [x] Implement tagline reveal (`Inspire · Innovate · Impact`).
- [x] Wire up GSAP master timeline: Counter rolls -> Tagline reveals -> Belts split open (`scaleY: 0`) -> Hero un-hides.

---

## Phase 5: Header Navigation & Menu Drawer
- [x] Build sticky header with `mix-blend-difference` blending mode.
- [x] Build interactive Sound Toggle button (`#sound-toggle`) with animated SVG volume waves.
- [x] Build "Let's Talk" pill button with rolling character hover effect.
- [x] Build Desktop & Mobile Hamburger Menu toggle button.
- [x] Build expanding circular clip-path drawer (`clip-path: circle(0% at 95% 5%)` -> `circle(150%)`).
- [x] Implement menu item hover states with staggered arrow reveals.

---

## Phase 6: Hero Section
- [x] Layout 12-column hero container (`#hero-section`).
- [x] Implement massive split-text headline: *"Designed to mean something."* with 5-word morphing rotation (`something.`, `depth.`, `impact.`, `purpose.`, `intention.`).
- [x] Implement dual-layer rolling character CTA button: *"Discuss Your Project"* & *"Book a 30-minute call"*.
- [x] Build the interactive 3D WebGL/SVG symbol with mouse tilt & inertia.
- [x] Build *"hold to blast — Dare ⚡ to touch the lines"* micro-interaction.
- [x] Add studio established badge (*"Est. 2012 / 14+ years shaping digital direction"*).

---

## Phase 7: Vision Section & Continuous Marquee
- [x] Build section layout with headline: *"Focused vision. Measured execution."*
- [x] Build smooth infinite ticker marquee: `INSPIRE ✦ INNOVATE ✦ IMPACT`.
- [x] Build vertical shutter stripes reveal background with GSAP ScrollTrigger.
- [x] Add bottom grid divider with intersecting `+` crosshair SVG.

---

## Phase 8: Key Facts & Awards Section (3D Cards)
- [x] Set up 3D perspective stage (`perspective: 1400px`, `transform-style: preserve-3d`).
- [x] Card 1: **Featured & Awards**
  - Background looping video (`awards-card-video.mp4`)
  - Platform logos reel (*Awwwards, CCDA, The FWA, CSS Winner, A' Design, GSAP*)
  - Numerical ticker counter (`50+`)
- [x] Card 2: **Projects Completed**
  - Minimalist cream background (`#E6E4E2`)
  - Center circular geometric accent
  - Numerical ticker counter (`1.5K+`)
- [x] Card 3: **Our Team Members**
  - Slate dark background (`#2F3135`)
  - Embedded video loop (`rushi.mp4`)
  - Numerical ticker counter (`20+`)
- [x] Partners Logo strip with thin vertical border dividers (desktop static / mobile marquee).

---

## Phase 9: Interactive Capabilities & Services Section
- [x] Build `trionn-services` with category filter pills (`A.I.`, `Design`, `Development`, `Branding`).
- [x] Dual-column interactive cards layout (`card-L0` to `card-R2`).
- [x] Center sticky looping video (`homepage-services-video.mp4`) with `mix-blend-screen`.

---

## Phase 10: Selected Works Showcase
- [x] Flagship projects loaded with authentic local media: `MyWorker AI`, `Pulse Studio`, `Loftloom`, `DFZ Watch`, `8Octa`, `NovaGlam`, `Reelix`.
- [x] Tag badges, categories, and hover states.

---

## Phase 11: Testimonials & Endorsements
- [x] Authentic client endorsements: Stephen Dash (Credible), Doug Petrie (Fast Resume), Malte Kramer (Luxury Presence), Jean-Baptiste Biolay (Technis), Zoltan Csonka (Ventigence).
- [x] Interactive spotlight with client selector pills.

---

## Phase 12: Site Footer & Contact Drawer
- [x] Authentic `site-footer` layout with bold call to action, business enquiry contacts (`hello@trionn.com`, `+91 98241 82099`), studio address, and copyright.
- [x] Expandable circular clip-path contact drawer with multi-step inquiry form and budget selectors.

---

## Phase 13: Web Audio Design Layer
- [x] Create Web Audio API synthesizer module (`src/lib/audio.ts`).
- [x] Add audio feedback on button hover, menu toggle, blast interaction (`thunder.mp3`), and sound toggle switch.

---

## Phase 14: Final Polish, Responsiveness & QA
- [x] Audit responsive breakpoints (`<640px`, `768px`, `1024px`, `1280px`, `1536px`).
- [x] Ensure custom typography (`Familjen Grotesk`, `Neue Haas Display`, `Martian Mono`, `PP Editorial New`) renders identically.
- [x] Verify production dev server runs with 0 errors and HTTP 200 on all routes and static assets.
