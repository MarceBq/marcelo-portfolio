import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          deep: "#03020a",
          void: "#05040f",
          glass: "rgba(15, 15, 30, 0.6)",
          border: "rgba(148, 163, 184, 0.12)",
        },
        stellar: {
          cyan: "#38bdf8",
          light: "#7dd3fc",
          text: "#f1f5f9",
          muted: "#94a3b8",
        },
        nebula: {
          purple: "#a78bfa",
          indigo: "#818cf8",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(56, 189, 248, 0.25)",
        "glow-purple": "0 0 30px rgba(167, 139, 250, 0.2)",
        stellar: "0 0 60px rgba(56, 189, 248, 0.15)",
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "marquee-reverse": "marquee-reverse 50s linear infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        scan: "scan 2.5s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(56,189,248,0.3)" },
          "50%": { opacity: "0.85", boxShadow: "0 0 40px rgba(56,189,248,0.5)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)" },
        },
      },
      backgroundImage: {
        "nebula-tl":
          "radial-gradient(ellipse 80% 60% at 0% 0%, rgba(56,189,248,0.08), transparent 50%)",
        "nebula-br":
          "radial-gradient(ellipse 70% 50% at 100% 100%, rgba(167,139,250,0.07), transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
