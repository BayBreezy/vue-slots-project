const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        sans: ["Inter var", "Inter", ...fontFamily.sans],
      },
      colors: {
        appGreen: "#377364",
        appBlue: "#375673",
      },
    },
  },
  plugins: [],
};
