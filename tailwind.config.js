/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Aktifkan dark mode berbasis class
  theme: {
    extend: {
      colors: {
        "bps-blue": "#003366",
        "bps-gold": "#FFD700",
        "bps-light-blue": "#E3F2FD",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
