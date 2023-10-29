/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-desktop': "url('/images/bg-main-desktop.png')",
        'main=mobile': "url('/images/bg-main-mobile.png')",
      },
      colors: {
        'focus':'#600594',
        'error':'#FF5252',
        'light-gray-violet':'#DEDDDF',
        'dark-gray-violet':'#8E8593',
        'dark-violet': '#21092F',
      }
    },
  },
  plugins: [],
}

