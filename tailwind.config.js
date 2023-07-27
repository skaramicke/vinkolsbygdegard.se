/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.ts", "./public/index.html"],
  theme: {
    colors: {
      light: {
        text: "#150f0a",
        background: "#f5efea",
        primary: "#79bc76",
        secondary: "#c8d7e4",
        accent: "#944a96",
      },
      dark: {
        text: "#fafafa",
        background: "#050505",
        primary: "#79bc76",
        secondary: "#111a22",
        accent: "#cb99cc",
      },
    },
    extend: {},
  },
  plugins: [],
};
