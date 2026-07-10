/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf3f1',
          100: '#fbe8e4',
          200: '#f6cfc7',
          300: '#eea99c',
          400: '#e37a66',
          500: '#d83924',
          600: '#c42f1c',
          700: '#a42518',
          800: '#882119',
          900: '#70201a',
          950: '#3d0c09',
        },
        gray: {
          50: '#f9fafb',
          100: '#f2f4f7',
          200: '#e4e7ec',
          300: '#d0d5dd',
          400: '#98a2b3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1d2939',
          900: '#101828',
          950: '#0c111d',
        },
        success: {
          50: '#ecfdf3',
          400: '#32d583',
          500: '#12b76a',
          600: '#039855',
          700: '#027a48',
        },
        error: {
          50: '#fef3f2',
          400: '#f97066',
          500: '#f04438',
          600: '#d92d20',
          700: '#b42318',
        },
        amber: {
          50: '#fffaeb',
          100: '#fef0c7',
          200: '#fedf89',
          500: '#f79009',
          600: '#dc6803',
          700: '#b54708',
          800: '#93370d',
          900: '#7a2e0e',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 24, 40, 0.08), 0 1px 2px rgba(16, 24, 40, 0.04)',
        'card-hover': '0 4px 12px rgba(16, 24, 40, 0.1)',
      },
    },
  },
  plugins: [],
};
