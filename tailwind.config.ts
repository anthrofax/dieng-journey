import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    flowbite.content(),
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "rgb(37 99 235)",
        secondary: "#a4cafe",
      },
      gridRowEnd: {
        "span-1": "span 1",
        "span-2": "span 2",
        "span-3": "span 3",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), flowbite.plugin()],
} satisfies Config;

export default config;
