/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forza: {
          black: '#050505',
          dark: '#0d0d0d',
          card: 'rgba(20, 20, 20, 0.82)',
          elevated: 'rgba(28, 28, 28, 0.88)',
          border: '#2a2a2a',
          /* La Forza logo red — #ED1C24 */
          red: '#ED1C24',
          'red-light': '#FF3B42',
          'red-dim': '#B8151C',
          gold: '#ED1C24',
          'gold-light': '#FF3B42',
          'gold-dim': '#B8151C',
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
