/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        padding: '1rem'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}
