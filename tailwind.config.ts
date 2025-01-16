/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        custom: "0px 16px 40px 0px #00000080",
      },
      fontFamily: {
        sans: ["Monument Grotesk", "sans-serif"],
      },
      fontSize: {
        body: [
          "1.5rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.03rem",
            fontWeight: "400",
          },
        ],
        h1: [
          "4rem",
          {
            lineHeight: "4.5rem",
            letterSpacing: "-0.04rem",
            fontWeight: "400",
          },
        ],
        h2: [
          "3rem",
          {
            lineHeight: "3.5rem",
            letterSpacing: "-0.03rem",
            fontWeight: "400",
          },
        ],
        h3: [
          "2rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "-0.03rem",
            fontWeight: "400",
          },
        ],
        "legal-link": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
          },
        ],
        menu: [
          "13px",
          {
            lineHeight: "10px",
            fontWeight: "400",
          },
        ],
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        bounceIn: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { transform: "translateY(15%)", opacity: "0.8" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-scale": {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        grid: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        translateUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        "shiny-text": {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shiny-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shiny-width)) 0",
          },
        },
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "fade-scale": "fade-scale 1.3s ease-in-out infinite",
        translateUp: "translateUp 1s ease-out forwards",
        bounceIn: "bounceIn 0.8s ease-out",
        fadeInDown: "fadeInDown 1s ease-out forwards",
        grid: "grid 15s linear infinite",
        "shimmer-slide":
          "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "shiny-text": "shiny-text 8s infinite",
        gradient: "gradient 8s linear infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwindcss-animate")],
} satisfies Config;
