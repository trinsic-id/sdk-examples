/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"ProximaNova"'],
      serif: ['"ProximaNova"'],
    },
    extend: {
      colors: {
        "loading-text": "#828282",
        "loading-bg-light": "#EBEBEB",
        "text-inactive": "#978D8D",
        "text-active": "#111010",
        "light-bg": "#F3F3F3",
        "catalog-bg": "#e8e8e8",
      },
      backgroundImage: {
        "home-bg": "url('./img/background.png')",
      },
    },
  },
  plugins: [],
};
