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
        glass: "0 20px 80px rgba(15, 23, 42, 0.35)",
      },
      backgroundImage: {
        sparkle: "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 44%)",
      },
    },
  },
  plugins: [],
};

export default config;
