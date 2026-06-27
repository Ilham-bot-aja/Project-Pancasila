/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        warm: '#FFFBF5',
        purple: {
          50: '#F4EFFC',
          100: '#EDE4FB',
          200: '#D9C8F5',
          400: '#9B7FD8',
          500: '#7C5CBF',
          600: '#6647A8',
          700: '#4F3686',
        },
        sky: {
          400: '#5FB4E0',
          500: '#3F9FCB',
        },
        ink: '#2C2438',
        rose: '#E8849C',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        bubble: '2rem 2rem 2rem 0.5rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.45s ease-out',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
