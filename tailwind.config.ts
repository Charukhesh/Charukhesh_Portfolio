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
        bg: "#0a0c0f",
        panel: "#12151a",
        panel2: "#0f1216",
        border: "#242a32",
        "border-soft": "#1a1f26",
        ink: "#dde2e7",
        "ink-dim": "#aeb6c0",
        muted: "#767f8b",
        accent: "#d7a24a",
        "accent-soft": "#d7a24a1a",
        accent2: "#5fb8b0",
        "accent2-soft": "#5fb8b01a",
        limit: "#c17b6f"
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
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
