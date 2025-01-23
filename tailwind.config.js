/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        'custom-size': '320px 310px', // Your custom size
      },
      fontFamily: {
        futurama: ["Futurama"],
        sourceCode: ['"Source Code Pro"', "monospace"],
        inter: ['"Inter"', "sans-serif"]
      },
    },
  },
  plugins: [],
};
