/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F15412",
        },
        secondary: {
          DEFAULT: "#000000",
        },
      },
      fontFamily: {
        primary: ["Comfortaa", "sans-serif"],
      }
    },
  },
  plugins: [],
};
