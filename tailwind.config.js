import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#22577A",
          secondary: "#57CC99",
          "base-100": "#C7F9CC",
        },
      },
      "black",
      "lofi",
    ],
  },
};
