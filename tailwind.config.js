/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-desktop': "url('./images/bg-main-desktop.png')",
        'main=mobile': "url('./images/bg-main-mobile.png')",
      }
    },
  },
  plugins: [],
}

