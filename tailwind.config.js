/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#10b981",
      },
      borderRadius: {
        "4xl": "50px",
      },
    },
  },
  plugins: [],
};
