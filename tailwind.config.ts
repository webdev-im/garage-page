import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // ✅ Properly set dark mode
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
        sans: ["GT Walsheim Pro", "sans-serif"],
      },
      backgroundImage: {
        yellowGradient: "linear-gradient(-45deg, #FF9D00, #ffd700)",
        darkGradient: "linear-gradient(-45deg, #1a1a1a, #333333)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255, 223, 0, 0.6)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 223, 0, 1)" },
        },
        darkPulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(133, 83, 0, 0.1)" },
          "50%": { boxShadow: "0 0 20px rgb(154, 113, 0)" },
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
