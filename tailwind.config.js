/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0fe',
          100: '#d2e3fc',
          500: '#1a73e8',
          600: '#1557b0',
          700: '#134195',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#3c4043',
          900: '#202124',
        },
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      borderRadius: {
        xl: '0.75rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
        'card-hover': '0 2px 6px 2px rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
        modal: '0 8px 10px 1px rgb(60 64 67 / 14%), 0 3px 14px 2px rgb(60 64 67 / 12%)',
      },
    },
  },
  plugins: [],
}

