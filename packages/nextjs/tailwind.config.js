/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    borderRadius: {
      md: "10px",
      DEFAULT: "20px",
      large: "20px,",
    },
    colors: {
      ...colors,

      primary: {
        100: "#FBF5FF",
        300: "#EFD5FF",
        500: "#CA73FF",
        700: "#9E00FF",
        900: "#5C0094",
      },
    },
  },
  extend: {},
  plugins: [],
};
