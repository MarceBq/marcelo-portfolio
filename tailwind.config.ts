import type { Config } from "tailwindcss";
import { palette } from "./lib/palette";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    // Replaces Tailwind's default colours on purpose: only the palette exists.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: palette.ink,
      night: {
        900: palette.night900,
        800: palette.night800,
        700: palette.night700,
        600: palette.night600,
      },
      dusk: { 500: palette.dusk500, 400: palette.dusk400 },
      haze: palette.haze,
      cream: palette.cream,
      sand: palette.sand,
      mist: palette.mist,
      ash: palette.ash,
      amber: palette.amber,
      peach: palette.peach,
      coral: palette.coral,
      rust: palette.rust,
      teal: palette.teal,
      sky: palette.sky,
      blue: palette.blue,
      moss: palette.moss,
      pine: palette.pine,
    },
    extend: {
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        term: ["var(--font-term)", "monospace"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      spacing: {
        u: "var(--px)",
        u2: "calc(var(--px) * 2)",
        u3: "calc(var(--px) * 3)",
        u4: "calc(var(--px) * 4)",
        u6: "calc(var(--px) * 6)",
        u8: "calc(var(--px) * 8)",
      },
    },
  },
  plugins: [],
};

export default config;
