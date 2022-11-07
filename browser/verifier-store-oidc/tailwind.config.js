/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "loading-text": "#828282",
        "loading-bg-light": "#EBEBEB",
      },
    },
  },
  plugins: [],
};
