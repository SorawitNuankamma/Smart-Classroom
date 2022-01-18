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
        skyblue: "#2F7CF6",
        azure: "#30A0E0",
        cadet: "#9B9B9B",
        coral: "#787878",
        iron: "#F9F9F9",
        liture: "#606060",
        line: "#06C755",
        darkcloud: "#5B5B5B",
        literature: "#272727",
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
      keyframes: {
        landing: {
          "0%": { opacity: "0%", transform: "translateX(-30px)" },
          "100%": { opacity: "100%", transform: "translateX(0px)" },
        },
      },
      animation: {
        landing: "2s ease-in-out landing",
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        classroomApp: "300px 1fr",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
