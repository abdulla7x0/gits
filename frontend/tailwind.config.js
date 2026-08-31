/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#070A0F",
        surface: {
          50: "#1E293B",
          100: "#161F30",
          200: "#111827",
          300: "#0D131F",
          400: "#090E17",
        },
        border: {
          subtle: "#1F293D",
          DEFAULT: "#2A364F",
          strong: "#3B4A6B",
        },
        bullish: {
          DEFAULT: "#10B981",
          glow: "rgba(16, 185, 129, 0.15)",
          text: "#34D399",
          dark: "#065F46",
        },
        bearish: {
          DEFAULT: "#EF4444",
          glow: "rgba(239, 68, 68, 0.15)",
          text: "#F87171",
          dark: "#7F1D1D",
        },
        neutral: {
          DEFAULT: "#F59E0B",
          glow: "rgba(245, 158, 11, 0.15)",
          text: "#FBBF24",
          dark: "#78350F",
        },
        info: {
          DEFAULT: "#3B82F6",
          glow: "rgba(59, 130, 246, 0.15)",
          text: "#60A5FA",
          dark: "#1E3A8A",
        },
        trump: {
          DEFAULT: "#EC4899",
          purple: "#A855F7",
          glow: "rgba(236, 72, 153, 0.15)",
          dark: "#831843",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        bullishGlow: "0 0 25px -5px rgba(16, 185, 129, 0.3)",
        bearishGlow: "0 0 25px -5px rgba(239, 68, 68, 0.3)",
        trumpGlow: "0 0 25px -5px rgba(236, 72, 153, 0.3)",
      }
    },
  },
  plugins: [],
};
