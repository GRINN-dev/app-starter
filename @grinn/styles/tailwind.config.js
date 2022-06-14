const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "../../../apps/dashboard/**/*.tsx",
    "../components/**/*.tsx",
    "../../../apps/public-site/**/*.tsx",
  ],
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        ApfelGrotezk: ["ApfelGrotezk"],
        ApfelGrotezkFett: ["ApfelGrotezk Fett"],
      },
      colors: {
        primary: {
          50: "hsl(225, 84%, 62%)",
          55: "hsl(225, 84%, 70%)",
          60: "hsl(225, 84%, 80%)",
          65: "hsl(225, 84%, 90%)",
          100: "#436be5",
          200: "#3961db",
          300: "#2f57d1",
          400: "#254dc7",
          500: "#1b43bd",
          600: "#1139b3",
          700: "#072fa9",
          800: "#00259f",
          900: "#001b95",
        },
        secondary: {
          50: "#ffbaba",
          100: "#ffb0b0",
          200: "#ffa6a6",
          300: "#f89c9c",
          400: "#ee9292",
          500: "#e48888",
          600: "#da7e7e",
          700: "#d07474",
          800: "#c66a6a",
          900: "#bc6060",
        },
        accent: {
          50: "#9dffff",
          100: "#93ffff",
          200: "#89fffa",
          300: "#7ffff0",
          400: "#75ffe6",
          500: "#6bffdc",
          600: "#61f5d2",
          700: "#57ebc8",
          800: "#4de1be",
          900: "#43d7b4",
        },
        danger: "#de4343",
      },
    },
  },
};
