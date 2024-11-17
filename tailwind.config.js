const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      red: colors.red,
      primary: {
        50: "#E2F8EC",
        100: "#D2F3E1",
        200: "#B1EBCC",
        300: "#91E3B7",
        400: "#70DAA2",
        500: "#50D28D",
        600: "#33C678",
        700: "#28995D",
        800: "#1C6D42",
        900: "#114027",
        950: "#0B2A19",
      },
      light: {
        default: "F6F2EA",
        50: "#FCFBF8",
        100: "#F6F2EA",
        200: "#E5DAC3",
        300: "#D4C19B",
        400: "#C4A974",
        500: "#B3914D",
        600: "#8C713C",
        700: "#64512B",
        800: "#3D311A",
        900: "#161209",
        950: "#020201",
      },
      dark: {
        default: "#2D2513",
        50: "#E2D5B9",
        100: "#DBCDAB",
        200: "#CFBB8E",
        300: "#C3AA72",
        400: "#B79955",
        500: "#A08343",
        600: "#836C37",
        700: "#66542B",
        800: "#4A3D1F",
        900: "#2D2513",
        950: "#19150B",
      },
    },
  },
  plugins: [],
};
