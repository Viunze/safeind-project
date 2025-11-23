// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Pindai semua file .js, .ts, .jsx, .tsx di dalam folder src
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Definisikan warna yang sesuai dengan tema aplikasi
      colors: {
        'primary-neon': '#4a90e2',
        'dark-background': '#1f2937',
        'safe-green': '#34d399',
        'alert-red': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
