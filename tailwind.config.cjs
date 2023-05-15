/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      rubrik:["Libre Franklin", "sans-serif"],
      brodtext:["Merriweather", "serif"],
      ingress:["Merriweather", "serif"]
    }
  },
  plugins: [],
}


