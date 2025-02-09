import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // ✅ Fix: properly placed darkMode
  theme: {
    extend: {
      colors: {
        darkBackground: "#1a1a1a",
        lightBackground: "#ffc107",
        darkText: "#ffffff",
        lightText: "#000000",
        accentYellow: "#ffd700",
      },
      fontFamily: {
        sans: ["GT Walsheim Pro", "sans-serif"], // Default fallback
      },
      backgroundImage: {
        yellowGradient: "linear-gradient(-45deg,#FF9D00, #ffd700)", // Adjusted angle (135°)
        darkGradient: "linear-gradient(-45deg, #1a1a1a, #333333)", // Adjusted angle (135°)
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255, 223, 0, 0.6)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 223, 0, 1)" },
        },
        darkPulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 0, 0, 1)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        darkPulseGlow: "darkPulseGlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
