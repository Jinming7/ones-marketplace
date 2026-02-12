import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-gray-300)",
        input: "var(--color-gray-300)",
        ring: "var(--color-brand-primary)",
        background: "var(--color-gray-100)",
        foreground: "var(--color-gray-900)",
        primary: {
          DEFAULT: "var(--color-brand-primary)",
          foreground: "var(--color-white)",
        },
        muted: {
          DEFAULT: "var(--color-white)",
          foreground: "var(--color-gray-600)",
        },
        card: {
          DEFAULT: "var(--color-white)",
          foreground: "var(--color-gray-900)",
        },
        brand: {
          DEFAULT: "var(--color-brand-primary)",
          hover: "var(--color-brand-primary-hover)",
        },
        gray: {
          100: "var(--color-gray-100)",
          300: "var(--color-gray-300)",
          600: "var(--color-gray-600)",
          900: "var(--color-gray-900)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
    },
  },
  plugins: [],
};

export default config;
