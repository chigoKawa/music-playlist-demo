const colors = require("tailwindcss/colors");
module.exports = {
    mode: "jit",
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
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
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};