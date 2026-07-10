/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forza: {
          red: '#D4100B',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['Oswald', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 12px 40px rgba(212, 16, 11, 0.18), 0 2px 8px rgba(212, 16, 11, 0.08)',
        'premium-sm': '0 4px 16px rgba(212, 16, 11, 0.1), 0 1px 3px rgba(212, 16, 11, 0.06)',
        'premium-lg': '0 20px 50px rgba(212, 16, 11, 0.22), 0 4px 12px rgba(212, 16, 11, 0.1)',
        cta: '0 10px 28px rgba(212, 16, 11, 0.38)',
      },
      letterSpacing: {
        brand: '0.22em',
      },
    },
  },
  plugins: [],
};
