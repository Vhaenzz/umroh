import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Primary - Calm Dark Teal
        teal: {
          900: "#0E2C2B",
          primary: "#143D3B", // Main brand color
          800: "#143D3B",
          700: "#1D524F",
          600: "#276864",
          100: "#E8F0EF",
          50: "#F2F7F6",
        },
        // Brand Accent - Muted Gold (Strategic use only)
        gold: {
          accent: "#C59B4E", // Accent primary
          hover: "#B3883D",
          light: "#F7F2E7",
          border: "#EADCC2",
        },
        // Brand Neutrals
        warm: {
          bg: "#F8F6F0",       // Off-white background
          surface: "#FFFFFF",  // Pure white card/surface
          muted: "#F3EFE6",    // Secondary background container
          border: "#E8E3DA",   // Subdued border line
          divider: "#E2DDD5",  // Section divider
        },
        slate: {
          dark: "#192227",     // Near-black text (No pure #000)
          body: "#3A4750",     // Standard body paragraph text
          muted: "#59656C",    // Secondary text
          caption: "#7E8B93",  // Metadata & caption text
        },
        // Brand Status Indicators
        status: {
          available: {
            DEFAULT: "#1E7250",
            bg: "#E8F5EE",
            border: "#C2E8D3",
            text: "#15543B",
          },
          warning: {
            DEFAULT: "#B97A1B",
            bg: "#FDF5E6",
            border: "#F7E3BD",
            text: "#8B580F",
          },
          soldout: {
            DEFAULT: "#A43737",
            bg: "#FDF2F2",
            border: "#F7C6C6",
            text: "#7D2828",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        badge: "6px",
        button: "10px",
        card: "18px",
        box: "24px",
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(20, 61, 59, 0.05)",
        elevated: "0 10px 30px -5px rgba(20, 61, 59, 0.12)",
        goldGlow: "0 8px 24px -4px rgba(197, 155, 78, 0.25)",
        insetSoft: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
      },
      lineHeight: {
        tight: "1.15",
        snug: "1.25",
        relaxed: "1.65",
      },
    },
  },
  plugins: [],
};

export default config;
