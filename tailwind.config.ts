import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          foreground: "var(--color-white)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        background: "var(--color-bg)",
        foreground: "var(--color-ink)",
        ring: "var(--color-accent)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        premium: "var(--shadow-premium)",
        hover: "var(--shadow-hover)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        prose: "70ch",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
