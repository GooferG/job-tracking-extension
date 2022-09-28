// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx,html,css,scss}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,tsx,jsx}",
    "./src/components/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.65rem",
      },
      colors: {
        primary: "#4E54C8",
        "primary-hover": "#4e54c8e0",
        "font-primary": "#727272",
        "font-secondary": "#2F2828",
        "border-primary": "#D9D9D9",
      },
    },
  },
  plugins: [require("daisyui")],
};
