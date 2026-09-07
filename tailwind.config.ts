import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#000000",             // True black
        panel: "#111111",          // Very dark gray for cards
        panel2: "#1a1a1a",         // Slightly lighter for hover states
        "border-soft": "#222222",  // Thin, barely visible borders
        border: "#333333",         
        ink: "#ffffff",            // Primary text
        "ink-dim": "#888888",      // Muted text
        muted: "#555555",          // Deeply muted text
        accent: "#f59e0b",         // Amber / Gold!
        accent2: "#ef4444",        // Red
      },
      fontFamily: {
        sans: ["Calibri", "Segoe UI", "Arial", "sans-serif"],
        display: ["Calibri", "Segoe UI", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "920px",
        wide: "1180px"
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#aeb6c0",
            "--tw-prose-headings": "#f2f4f6",
            "--tw-prose-links": "#5fb8b0",
            "--tw-prose-bold": "#dde2e7",
            "--tw-prose-code": "#c8cdd4",
            maxWidth: "78ch"
          }
        }
      })
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
