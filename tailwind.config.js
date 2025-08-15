/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Dostosuj do struktury projektu
    './index.html',
  ],
  theme: {
    extend: {
      borderWidth: {
        'border': '2px', // Definiuje 'border' jako 2px, co może być podstawą dla 'border-border'
      },
    },
  },
  plugins: [],
}