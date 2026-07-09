/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forza: {
          black: '#050505',
          dark: '#0d0d0d',
          card: '#141414',
          elevated: '#1c1c1c',
          border: '#2a2a2a',
          /* Primary accent — La Forza Instagram red */
          gold: '#dc2626',
          'gold-light': '#f87171',
          'gold-dim': '#991b1b',
          red: '#dc2626',
          'red-light': '#ef4444',
          'red-dim': '#7f1d1d',
          white: '#f5f5f5',
          muted: '#a3a3a3',
          subtle: '#737373',
        },
      },
      fontFamily: {
        display: ['Oswald', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
