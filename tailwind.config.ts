import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        darkBg: '#1A1A12',
        umber: {
          DEFAULT: '#362312',
          hover: '#3B270C',
        },
        mocha: '#3B270C',
        silver: '#E0DDDD',
        divider: '#334155',
        cedar: '#4B3A26',
      },
      boxShadow: {
        glass: "0 20px 80px rgba(26, 26, 18, 0.6)",
      },
      backgroundImage: {
        sparkle: "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 44%)",
      },
    },
  },
  plugins: [],
};

export default config;
