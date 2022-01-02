module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit"],
      },
      colors: {
        silver: "#F6FAFF",
        royal: "#006BBB",
        golden: "#FFC872",
        titanium: "#DEE9F7",
        azure: "#30A0E0",
        cadet: "#9B9B9B",
        coral: "#787878",
        iron: "#F9F9F9",
        liture: "#606060",
      },
      width: {
        128: "32rem",
      },
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "900px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1160px",
        // => @media (min-width: 1280px) { ... }
      },
      minHeight: {
        30: "30rem",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
