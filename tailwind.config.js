/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.ts", "./public/index.html"],
  theme: {
    colors: {
      light: {
        text: "#150f0a",
        background: "#f5efea",
        textOnPrimary: "#f5efea",
        primary: "#801818",
        textOnSecondary: "#f5efea",
        secondary: "#091733",
        textOnAccent: "#f5efea",
        accent: "#587818",
      },
      dark: {
        text: "#150f0a",
        background: "#f5efea",
        textOnPrimary: "#f5efea",
        primary: "#801818",
        textOnSecondary: "#f5efea",
        secondary: "#091733",
        textOnAccent: "#f5efea",
        accent: "#587818",
      },
    },
    extend: {},
  },
  plugins: [],
};
