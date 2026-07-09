/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forza: {
          black: '#0a0a0a',
          dark: '#121212',
          card: '#1a1a1a',
          elevated: '#222222',
          border: '#2e2e2e',
          gold: '#d4af37',
          'gold-light': '#f0d060',
          'gold-dim': '#a68b2a',
          red: '#e63946',
          muted: '#9ca3af',
          subtle: '#6b7280',
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
