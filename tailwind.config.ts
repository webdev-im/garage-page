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
    },
  },
  plugins: [],
} satisfies Config;
