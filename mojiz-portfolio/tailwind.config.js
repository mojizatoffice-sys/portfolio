/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: "#E50914",
          "red-hover": "#F6121D",
          "red-deep": "#B20710",
          black: "#141414",
          "black-soft": "#0B0B0B",
          card: "#1A0A0B",
          gray: "#2F2F2F",
        },
      },
    },
  },
  plugins: [],
};
