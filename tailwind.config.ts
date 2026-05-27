import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FDFBF7",
        champagne: "#F5E6D3",
        "warm-white": "#FAF9F6",
        gold: {
          light: "#E8D5B7",
          DEFAULT: "#C9A96E",
          dark: "#B08D4F",
        },
        graphite: "#2A2A2A",
        rose: {
          soft: "#F0D5D0",
          champagne: "#E8C4B8",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 20s ease-in-out infinite",
        "float-medium": "float 14s ease-in-out infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "fade-in": "fadeIn 2s ease-out forwards",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "flame": "flame 0.3s ease-in-out infinite alternate",
        "gradient-shift": "gradientShift 15s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-10px) translateX(-5px)" },
          "75%": { transform: "translateY(-25px) translateX(8px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        flame: {
          "0%": { transform: "scaleY(1) scaleX(1) rotate(-2deg)" },
          "100%": { transform: "scaleY(1.15) scaleX(0.9) rotate(2deg)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
