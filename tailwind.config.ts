import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FDFBF7",
        champagne: "#F5E6D3",
        gold: {
          DEFAULT: "#C9A96E",
        },
        graphite: "#2A2A2A",
        rose: {
          soft: "#F0D5D0",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
