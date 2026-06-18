/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#18181B",
          light: "#3F3F46",
          muted: "#71717A",
          subtle: "#A1A1AA",
        },
        rose: {
          50:  "#FFF1F4",
          100: "#FFE4EA",
          200: "#FFBFCC",
          300: "#FF8FA8",
          400: "#F96080",
          500: "#D4637A",
          600: "#B84B62",
          700: "#96354C",
          800: "#7A2239",
          900: "#5E1229",
        },
        wine: {
          DEFAULT: "#6B2737",
          light:   "#824050",
          dark:    "#4F1A28",
          deep:    "#33101A",
        },
        gold: {
          50:  "#FFFBF0",
          100: "#FFF3D0",
          200: "#FFE099",
          300: "#F5C842",
          400: "#E8AB1A",
          500: "#C9963A",
          600: "#A87A28",
          700: "#875E18",
          800: "#65430E",
          900: "#432C06",
        },
        blush: {
          DEFAULT: "#FDF0F3",
          mid:     "#F9DADE",
          dark:    "#F0C0C8",
        },
        cream: {
          DEFAULT: "#FAFAF8",
          warm:    "#FAF7F4",
          deep:    "#F5F0EA",
        },
        peach:  "#FAECD8",
        maroon: { DEFAULT: "#8B1A3A", light: "#A8324E" },
        "warm-text": { DEFAULT: "#3D2B1F", light: "#6B5A4E" },
      },
      fontFamily: {
        serif:   ["Cormorant Garamond", "Georgia", "serif"],
        sans:    ["DM Sans", "Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        accent:  ["Cormorant Garamond", "Georgia", "serif"],
        body:    ["Lato", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:        "0 1px 3px rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.07)",
        "card-hover":"0 8px 24px rgba(0,0,0,0.10), 0 24px 64px rgba(0,0,0,0.12)",
        rose:        "0 4px 20px rgba(212,99,122,0.30)",
        gold:        "0 4px 20px rgba(201,150,58,0.28)",
        glow:        "0 0 40px rgba(212,99,122,0.15)",
      },
      animation: {
        float:      "float 8s ease-in-out infinite",
        "spin-slow":"spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};
