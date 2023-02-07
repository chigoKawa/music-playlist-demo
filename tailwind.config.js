const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
        blau: "#0033A3",
        blau2: "#003CBE",
        blau3: "#0050D5",
        blau4: "#0065EB",
        gelb: "#FCBB00",
        gelb2: "#FFDA00",
        gelb3: "#FFF575",
        rot: "#EB5A68",
        neuter: "#2A3039",
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [],
  plugins: [
    // require("@tailwindcss/typography"),
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
        ul: { listStyle: "disc", padding: theme("padding.8") },
        ol: { listStyle: "decimal", padding: theme("padding.8") },
      });
    }),
  ],
};
