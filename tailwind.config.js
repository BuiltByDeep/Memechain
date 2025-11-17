/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E6007A',
        secondary: '#552BBF',
        dark: '#1A1A1A',
        surface: '#2D2D2D',
      },
    },
  },
  plugins: [],
}
