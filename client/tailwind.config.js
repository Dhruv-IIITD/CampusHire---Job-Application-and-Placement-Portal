/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      colors: {
        brand: {
          50: "#f1fcfa",
          100: "#d2f7ef",
          200: "#a7eedf",
          300: "#71e0cb",
          400: "#36c8ae",
          500: "#1eab92",
          600: "#168774",
          700: "#156c5f",
          800: "#15574d",
          900: "#154940",
        },
        ink: {
          50: "#f5f8fb",
          100: "#e9eef5",
          200: "#ced9e6",
          300: "#a6b8cd",
          400: "#748ba8",
          500: "#526b88",
          600: "#3f5671",
          700: "#31445b",
          800: "#243245",
          900: "#162131",
          950: "#0b1220",
        },
        sand: {
          50: "#fffdf8",
          100: "#faf6ec",
          200: "#f1e8d4",
          300: "#e7d9b8",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
        card: "0 10px 30px rgba(15, 23, 42, 0.10)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(30,171,146,0.20), transparent 38%), radial-gradient(circle at bottom right, rgba(255,255,255,0.65), transparent 28%)",
      },
    },
  },
  plugins: [],
}
