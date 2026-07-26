import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "420px",
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3840px",
      },
      boxShadow: {
        glass: "0 20px 80px rgba(147, 51, 234, 0.15)",
        "purple-glow": "0 0 25px rgba(147, 51, 234, 0.35)",
      },
      backgroundImage: {
        sparkle: "radial-gradient(circle at top, rgba(147,51,234,0.12), transparent 44%)",
      },
    },
  },
  plugins: [],
};

export default config;
