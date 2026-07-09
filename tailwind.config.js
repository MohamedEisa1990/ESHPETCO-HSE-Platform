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
        primary: {
          50: '#f0f7ff',
          100: '#e0eff9',
          200: '#bae0f3',
          300: '#7ecef0',
          400: '#005B96',
          500: '#005b96',
          600: '#004578',
          700: '#003d63',
          800: '#003451',
          900: '#002d44',
        },
        secondary: {
          50: '#f8f9fc',
          100: '#f1f2f9',
          500: '#0F172A',
          900: '#0F172A',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#DC2626',
        info: '#3B82F6',
      },
      borderRadius: {
        DEFAULT: '16px',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'industrial': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'SF Pro Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
