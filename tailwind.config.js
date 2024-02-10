/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Extra small screen / phone
      'xs': '320px',
      // Small screen / phone
      'sm': '576px',
      // Medium screen / tablet
      'md': '768px',
      // Large screen / desktop
      'lg': '992px',
      // Extra large screen / wide desktop
      'xl': '1200px'
    },
    extend: {},
  },
  plugins: [],
};