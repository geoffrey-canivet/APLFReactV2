/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        gris: {
          DEFAULT: "#3182ce",
        },
        secondary: {
          light: "#f6ad55",
          DEFAULT: "#ed8936",
          dark: "#c05621",
        },
        customGreen: "#32a852",
      },
    },
  },
  plugins: ['flowbite/plugin'],
}