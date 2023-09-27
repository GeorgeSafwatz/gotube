/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-dark": "#061A22",
        "secondary-dark": "#2E86AB",
        "primary-light": "#fffdf5",
        "secondary-light": "#FFD900",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  plugins: [
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    "@tailwindcss/line-clamp",
  ],
};
