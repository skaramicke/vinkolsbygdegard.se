/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.ts", "./public/index.html"],
  theme: {
    fontFamily: {
      display: ['"Fraunces"', "Georgia", "serif"],
      serif: ['"Source Serif 4"', '"Source Serif Pro"', "Georgia", "serif"],
      hand: ['"Caveat"', '"Bradley Hand"', "cursive"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      light: {
        text: "#1a1208",
        muted: "#5a4a3a",
        background: "#f5efea",
        paper: "#f0e8e0",
        textOnPrimary: "#f5efea",
        primary: "#7d1818",
        primaryDark: "#5a1010",
        textOnSecondary: "#f5efea",
        secondary: "#091733",
        secondaryLight: "#1a2a52",
        textOnAccent: "#f5efea",
        accent: "#587818",
        gold: "#a07a30",
        goldLight: "#c9a866",
        stone: "#bdb0a0",
      },
    },
    extend: {
      boxShadow: {
        paper:
          "0 1px 0 rgba(26,18,8,0.04), 0 8px 28px -16px rgba(26,18,8,0.18)",
        cardLift:
          "0 2px 0 rgba(125,24,24,0.04), 0 18px 36px -24px rgba(26,18,8,0.28)",
        ornament: "0 1px 0 rgba(160,122,48,0.6)",
      },
      letterSpacing: {
        masthead: "0.18em",
        smallcap: "0.14em",
      },
    },
  },
  plugins: [],
};
