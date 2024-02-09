import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        gray: {
          800: "#161b22",
        },
        black: "#090c10",
      },
    },
  },
  plugins: [
    flowbite({
      charts: true,
    }),
  ],
};
