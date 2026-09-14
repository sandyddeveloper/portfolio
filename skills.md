# Master Technical Specification & Skills Blueprint: TRIONN Replication

This document defines the complete technical, motion, and architectural skill set required to replicate [TRIONN](https://trionn.com/) with 100% pixel-perfect, animation-matched fidelity.

---

## 1. Core Architecture & Technology Stack

* **Framework:** Next.js (App Router) + React 19 + TypeScript
* **Styling:** Tailwind CSS v4 + Native CSS Custom Properties (`@layer properties`, `@layer theme`)
* **Smooth Scrolling:** `@studio-freight/lenis` or `lenis` v1.x with `data-lenis-prevent="true"` modal trapping
* **Motion & Animation Engine:** GSAP 3.x (`gsap`, `ScrollTrigger`, `CustomEase`, `SplitText`)
* **3D & Canvas Graphics:** WebGL Canvas / Custom SVG math for the 3D rotating symbol & blast particles
* **Audio Layer:** Web Audio API synth / audio cues tied to hover, click, and sound toggle (`#sound-toggle`)

---

## 2. Design System & Design Tokens

### Color Palette

| Token Name | Hex Code / Value | Usage Description |
| :--- | :--- | :--- |
| `--bg-obsidian` | `#040508` | Primary global body background |
| `--bg-hero` | `#0C0C0C` | Hero section canvas background |
| `--bg-surface-dark` | `#111214` / `#131415` | Dark card backgrounds & footer surfaces |
| `--color-cream` | `#E6E4E2` | Light contrast cards, menu panel backgrounds |
| `--color-light-font` | `#D8D8D8` | Primary text, active white/gray copy, borders |
| `--color-dark-font` | `#434343` | Subtitles, secondary text, muted dark text |
| `--color-black` | `#272727` | High-contrast dark typography & badges |
| `--border-dark` | `#2F323B` | Thin 1px grid divider lines & section boxes |
| `--accent-coral` | `#D9432B` / `#FF4B2F` | Form error states, hover micro-highlights |

### Typography & Font Hierarchy

1. **Display & Headings:** `Familjen Grotesk Variable`
   * Weights: 400 (Regular) to 700 (Bold)
   * Tracking: `-0.04em` to `-0.06em`
   * Line heights: `0.85` to `1.0` (tight editorial lockup)
2. **Body & Clean Sans:** `Neue Haas Display` (Roman & Medium)
   * Standard body copy, readable paragraphs, navigation links
3. **Technical Badges & Metrics:** `Martian Mono` (Light)
   * Used for timestamps (`Est. 2012`), counters, uppercase status chips, sub-labels
4. **Editorial Accents:** `PP Editorial New` (Ultralight / Italic)
   * Refined editorial accents and highlighted phrases
5. **Preloader & Number Tumblers:** `Bebas Neue` & `Space Mono`
   * Tabular numerical displays for slot-machine counters

### 12-Column Responsive Grid Architecture
* All containers wrap in `.tr__container` (`max-w-[1920px] mx-auto px-4 md:px-8`).
* Grid: `grid grid-cols-12 gap-x-6`.
* Grid lines feature custom SVG `+` crosshairs (`<svg width="13" height="13"><line .../></svg>`) positioned on intersecting borders.
* Navigation uses `mix-blend-difference` to seamlessly contrast against both dark (#040508) and light (#E6E4E2) sections.

---

## 3. Signature Animation Implementations & Formulae

### A. 10-Belt Shutter Preloader & Mechanical Slot Machine

#### Mechanical Slot Counter Reel Math
```typescript
// 3-reel slot machine counter (000 to 100)
// Reel 1: [0, 1]
// Reel 2: [0, 1, 2, ..., 9, 0]
// Reel 3: [0, 1, 2, ..., 9, 0]
const animateSlotReel = (reelElement: HTMLElement, targetDigit: number, duration: number) => {
  const digitHeight = 16; // 1rem = 16px
  gsap.to(reelElement, {
    y: -(targetDigit * digitHeight),
    duration: duration,
    ease: "power3.inOut"
  });
};
```

#### 10-Belt Shutter Sequence
Ten full-height bars (`.pl-belt`) stacked vertically across 100vh:
```css
.pl-belt {
  background: var(--pl-panel-gray, #c8c8c8);
  flex: 1;
  width: 100%;
  transform: scaleY(1);
  transform-origin: 50% 50%;
  will-change: transform;
}
```
Animation:
1. Reels spin to `100` over `1.8s`.
2. Tagline reveals (`Inspire · Innovate · Impact`) with `opacity: 1`, `translateY: 0`.
3. SVG logo path morphs and corner crosshair pluses (`.pl-flying-plus`) fly to the screen corners (`top: 0, left: 0`, etc.).
4. Belts scale down (`scaleY: 0`) in an outward stagger from center to top/bottom edges (`stagger: { from: "center", amount: 0.4 }`).
5. Hero section un-hides with smooth alpha fade.

---

### B. Dual-Layer Character Roll Interactive Button

The signature Trionn button architecture splits each letter into original and clone characters:
```html
<button class="button_wrapper">
  <span class="word">
    <!-- Original Layer -->
    <span class="text-layer original">
      <span class="char">D</span><span class="char">i</span><span class="char">s</span>...
    </span>
    <!-- Clone Layer -->
    <span class="text-layer clone absolute left-0 top-0 opacity-0 pointer-events-none">
      <span class="char">D</span><span class="char">i</span><span class="char">s</span>...
    </span>
  </span>
  <span class="underline">
    <span class="u-right"></span>
    <span class="u-left"></span>
  </span>
  <span class="arrow-sprite"><svg>...</svg></span>
</button>
```

#### Motion Mechanics
* On hover:
  * `.text-layer.original .char`: Translates `-100%` on Y with staggered delay (`stagger: 0.015s`).
  * `.text-layer.clone .char`: Translates from `100%` to `0%` on Y with matching stagger.
  * `.u-left`: Expands scaleX `0 -> 1` from origin-left.
  * `.arrow-sprite`: Moves `x: 0 -> 4px`, `opacity: 0 -> 1`.

---

### C. Expanding Circular Clip-Path Drawers (Menu & Contact)

Both the desktop mega-menu and contact lead-capture modal open using an expanding geometric clip-path:
```css
/* Closed State */
.drawer-panel {
  clip-path: circle(0% at 95% 5%);
  opacity: 0;
  visibility: hidden;
  transition: clip-path 0.7s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.4s ease;
}

/* Open State */
.drawer-panel.is-open {
  clip-path: circle(150% at 95% 5%);
  opacity: 1;
  visibility: visible;
}
```

---

### D. 3D Perspective Key Facts Cards

The Key Facts section utilizes hardware-accelerated 3D CSS:
```css
.key-card-list {
  perspective: 1400px;
  transform-style: preserve-3d;
}

.key-card {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
}

.key-card:hover {
  transform: translate3d(0, -10px, 40px) rotateX(2deg) rotateY(-2deg);
}
```
* **Card 1 (Awards):** Looping background video with active SVG awards reel (*Awwwards, FWA, CSS Winner, A' Design, GSAP*) and numerical counter `50+`.
* **Card 2 (Projects):** Cream contrast with pulsing geometric circle accent and numerical counter `1.5K+`.
* **Card 3 (Team):** Embedded team member video scrub clip (`rushi.mp4`) and numerical counter `20+`.

---

### E. Web Audio Design System

The site implements subtle sound design toggled via `#sound-toggle`:
* **State Management:** Sound active boolean persisted in state/localStorage.
* **Audio Synthesizer / Cues:**
  * Hover tick: Short high-frequency sine pulse (1200Hz -> 800Hz, 40ms, gain 0.05).
  * Click confirm: Dual-tone chime (440Hz + 880Hz, 80ms, gain 0.08).
  * Menu open: Whoosh sweep filter (200Hz to 2000Hz bandpass).
  * Blast interaction: Low sub-bass impact (60Hz exponential drop).

### F. GSAP Custom Cursor & Magnetic Physics (`quickTo`)

Trionn uses hardware-accelerated mouse tracking without lag or frame drops using `gsap.quickTo`:
```typescript
const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```
* **Magnetic Expansion:** On hovering any element with `data-cursor="true"` or `button`/`a`, the cursor expands to a circular badge and displays contextual labels (`VIEW`, `HOLD`, `EXPLORE`).

---

## 4. Performance & Engineering Best Practices

1. **Pre-composited Layering:** Apply `will-change: transform, opacity` only during active animations and remove on complete to prevent GPU memory bloat.
2. **Lenis Integration:** Prevent scroll hijacking during modal open via `data-lenis-prevent="true"`.
3. **Adaptive Video Streaming:** Serve desktop MP4s (`1080p`) and mobile lightweight versions (`_m.mp4`) conditionally based on viewport width.
4. **Zero Layout Shifts:** Reserve aspect ratios on cards, images, and videos (`aspect-[670/460]`, `aspect-video`).
