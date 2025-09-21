/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3A86FF',    // Soft Blue
        'secondary': '#06D6A0', // Teal/Green
        'neutral-light': '#F7F9FC',
        'neutral-medium': '#6B7280',
        'neutral-dark': '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
      }
    },
  },
  plugins: [],
}