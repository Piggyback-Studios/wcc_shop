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
      // TODO: fix these and gat all buttons and image borders in line with these new values
      background: {
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
      foreground: {
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
    },
  },
  plugins: [],
};
