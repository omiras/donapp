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
          secondary: "#E6F4EB",
          accent: "#A9DABA",
          "base-100": "#F8FCF9",
        },
      },
    ],
  },
};
