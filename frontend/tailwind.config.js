/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Inclut les fichiers dans src
    "./src/pages/**/*.{js,jsx,ts,tsx}", // Inclut tous les fichiers dans le dossier pages
  ],

  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées
        gris: {
          /*          light: "#63b3ed", // Version claire*/
          DEFAULT: "#3182ce", // Couleur par défaut
          /*          dark: "#2c5282", // Version foncée*/
        },
        secondary: {
          light: "#f6ad55",
          DEFAULT: "#ed8936",
          dark: "#c05621",
        },
        customGreen: "#32a852", // Couleur unique sans déclinaisons
      },
    },
  },
  plugins: ['flowbite/plugin'],
}