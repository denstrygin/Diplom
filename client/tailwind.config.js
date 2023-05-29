/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'book': "url('https://phonoteka.org/uploads/posts/2021-04/1618987219_18-phonoteka_org-p-knizhnii-temnii-fon-19.jpg')",
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          dark: '#656565',
          light: '#F6F6F6',
        },
        ice: '#FCFCFC',
        red: '#FF0000',
      },
    },
  },
  plugins: [],
}
