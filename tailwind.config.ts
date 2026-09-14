import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#040508",
        hero: "#0C0C0C",
        "dark-surface": "#111214",
        "surface-2": "#131415",
        cream: "#E6E4E2",
        "cream-line": "#D8D8D8",
        "light-font": "#D8D8D8",
        "dark-font": "#434343",
        "grey-light": "#9C9C9C",
        "grey-line": "#2F323B",
        "accent-coral": "#D9432B",
      },
      fontFamily: {
        display: ["var(--font-familjen)", "sans-serif"],
        sans: ["var(--font-neue-haas)", "sans-serif"],
        mono: ["var(--font-martian-mono)", "monospace"],
        editorial: ["var(--font-editorial)", "serif"],
      },
      maxWidth: {
        "screen-2xl": "1920px",
      },
      zIndex: {
        "99": "99",
        "100": "100",
        "9000": "9000",
        "9100": "9100",
        "9200": "9200",
        "9300": "9300",
        "9400": "9400",
        "9500": "9500",
      },
    },
  },
  plugins: [],
};

export default config;
