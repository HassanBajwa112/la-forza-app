/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forza: {
          /* La Forza social / logo palette */
          red: '#E01E1E',
          'red-deep': '#A81212',
          ink: '#0A0A0A',
          surface: '#131313',
          elevated: '#1A1A1A',
          border: '#2A2A2A',
          white: '#FFFFFF',
          muted: '#A3A3A3',
        },
      },
      fontFamily: {
        display: ['Oswald', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 12px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(224, 30, 30, 0.12)',
        'premium-sm': '0 4px 16px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        'premium-lg': '0 20px 50px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(224, 30, 30, 0.15)',
        cta: '0 8px 24px rgba(224, 30, 30, 0.45)',
        glow: '0 0 24px rgba(224, 30, 30, 0.25)',
      },
      letterSpacing: {
        brand: '0.2em',
      },
    },
  },
  plugins: [],
};
