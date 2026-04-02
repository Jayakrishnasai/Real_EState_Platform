/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          900: '#111111', // Very dark gray, almost black
          800: '#1a1a1a', 
          700: '#2a2a2a',
        },
        gold: {
          500: '#d4af37', // Classic metallic gold
          400: '#e6c86a',
          600: '#aa8c2c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
