// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-primary': '#0D0D0D', // Hitam Pekat
        'neon-blue': '#4F46E5', // Biru Neon
        'neon-purple': '#A855F7', // Ungu Neon
        'safe-red': '#EF4444',
        'safe-yellow': '#F59E0B',
        'safe-green': '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'sans-serif'], // Font modern
      },
      boxShadow: {
        'neon-sm': '0 1px 2px 0 rgba(79, 70, 229, 0.4)',
        'neon-lg': '0 10px 15px -3px rgba(79, 70, 229, 0.5), 0 4px 6px -2px rgba(79, 70, 229, 0.05)',
      }
    },
  },
  plugins: [],
}
