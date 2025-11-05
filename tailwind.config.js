/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#bcdcff',
          300: '#8ec6ff',
          400: '#58a6ff',
          500: '#2b83ff',
          600: '#1767db',
          700: '#1452b0',
          800: '#164a8b',
          900: '#173f71',
        },
      },
    },
  },
  plugins: [],
};
