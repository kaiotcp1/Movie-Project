/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#18122B",
        secondary: "#393053",
        terciary: "#443C68",
      },
      boxShadow: {
        '3xl': '0px 0px 11px 2px #000000',
        '4xl': '0px 0px 20px 10px #000000;',
        'inner2': 'inset 0px 0px 10px 2px #000000'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
