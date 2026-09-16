/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#030712',
          card: '#070b14',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        emerald: {
          accent: '#10b981',
          glow: 'rgba(16, 185, 129, 0.25)',
        }
      },
    },
  },
  plugins: [],
}