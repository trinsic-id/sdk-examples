// tailwind.config.js

const defaultTheme = require("tailwindcss/defaultTheme");

const trinsicPrimary = {
  50: "#E6F1FF",
  100: "#CCE4FF",
  200: "#B3D6FF",
  300: "#80BBFF",
  400: "#3D98FF",
  500: "#006BE5",
  600: "#0053B3",
  700: "#003B80",
  800: "#002F66",
  900: "#00234D",
};

const trinsicSecondary = {
  50: "#FEF6F5",
  100: "#FEE9E7",
  200: "#FCD3CF",
  300: "#FBBDB6",
  400: "#F99A90",
  500: "#F76E5F",
  600: "#DA200B",
  700: "#AA1909",
  800: "#791206",
  900: "#610E05",
};

const trinsicAccent = {
  50: "#FFFBE6",
  100: "#FFF7CC",
  200: "#FFF2B3",
  300: "#FFE770",
  400: "#FFDF3D",
  500: "#FFDF3D",
  600: "#FFD60A",
  700: "#D6B300",
  800: "#A38800",
  900: "#705E00",
};
const trinsicGrey = {
  50: "#F9FAFB",
  100: "#F3F5F7",
  200: "#D2D8DF",
  300: "#B4BECA",
  400: "#97A5B5",
  500: "#5F7186",
  600: "#4A5868",
  700: "#404C59",
  800: "#353F4A",
  900: "#20262D",
};

const trinsicWarning = {
  50: "#FFF5F5",
  100: "#FFE6E6",
  200: "#FFB3B3",
  300: "#FF8080",
  400: "#FF4C4D",
  500: "#FF2424",
  600: "#E60000",
  700: "#B30000",
  800: "#800000",
  900: "#660000",
};

const trinsicblack = "#20262D";

module.exports = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 700ms ease-in-out"
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: trinsicPrimary,
        secondary: trinsicSecondary,
        accent: trinsicAccent,
        danger: defaultTheme.colors.red,
        warning: trinsicWarning,
        positive: defaultTheme.colors.green,
        gray: trinsicGrey,
      },
      fontSize: {
        micro: ["0.625rem", "1.000rem"],
      },
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
      }),
      margin: {
        "1/4": "0.0625rem",
        "1/2": "0.125rem",
        "3/4": "0.1875rem",
        "1-3/4": "0.4375rem",
      },
      padding: {
        "1/4": "0.0625rem",
        "1-1/2": "0.375rem",
        "1-3/4": "0.4375rem",
      },
      minWidth: {
        "4xs": "8rem",
        "3xs": "12rem",
        "2xs": "16rem",
        "xs": "20rem",
        "sm": "24rem",
        "md": "28rem",
        "lg": "32rem",
        "xl": "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem"
      },
      width: {
        28: "7.000rem",
        80: "24rem",
        100: "25rem",
        140: "35rem",
      },
      height: {
        "55vh": "calc(55vh - 170px)",
        28: "7.000rem",
        80: "24rem",
        100: "25rem",
        140: "35rem",
      },
      minHeight: {
        50: "50px",
        "55vh": "calc(55vh - 56px)",
        "70vh": "calc(70vh - 56px)",
      },
      spacing: {
        80: "20rem",
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width'
      }
    },
  },
  variants: {
    backgroundColor: ["hover", "focus", "active", "group-hover"],
    borderWidth: ["responsive", "hover"],
    borderRadius: ["responsive", "focus"],
    fill: ["responsive", "hover", "focus", "group-hover"],
    fontFamily: ["responsive", "hover", "focus"],
    textColor: ["responsive", "hover", "focus", "active", "group-hover"],
    width: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
