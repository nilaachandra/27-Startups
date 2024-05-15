/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light : {
          bg: "#e6e6e6",
          text: "#333c4d",
          button: "#09a129" //#23ce6b #09a129
        },
        dark : {
          bg: "#1e1e24",
          text: "#e6e6e6",
          button: "#09a129" //#23ce6b
        }
      }
    },
  },
  plugins: [],
}