/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      //Dark colors
      DARK_PRIMARY_COLOR: 'rgba(159, 232, 112, 1)',
      DARK_SECONDARY_COLOR: 'rgba(22, 51, 0, 1)',
      DARK_BACKGROUND_COLOR_MAIN: 'rgba(32, 32, 32, 1)',
      DARK_BACKGROUND_COLOR_SECONDARY: 'rgba(43, 43, 43, 1)',
      DARK_TEXT_COLOR_MAIN: 'rgba(213, 217, 213, 1)',
      DARK_TEXT_COLOR_SECONDARY: 'rgba(250, 250, 250, 1)',
      DARK_TEXT_COLOR_LABELS: 'rgba(170, 178, 170, 1)',
      // Light colors
      PRIMARY_COLOR: 'rgba(159, 232, 112, 1)',
      SECONDARY_COLOR: 'rgba(22, 51, 0, 1)',
      BACKGROUND_COLOR_MAIN: 'rgba(255, 255, 255, 1)',
      BACKGROUND_COLOR_SECONDARY: 'rgba(250, 250, 250, 255)',
      TEXT_COLOR_MAIN: 'rgba(86, 86, 86, 1)',
      TEXT_COLOR_SECONDARY: 'rgba(32, 32, 32, 1)',
      TEXT_COLOR_LABELS: 'rgba(170, 178, 170, 1)',
      // Info colors
      ERROR_COLOR: 'rgba(197, 0, 0, 1)',
      SUCCESS_COLOR: 'rgba(0, 102, 0, 1)',
      WARNING_COLOR: 'rgba(209, 209, 1, 1)',
      INFO_COLOR: 'rgba(0, 0, 221, 1)',
      // Hovers
      HOVER_GREYISH: 'rgba(240, 243, 246, 1)',
    },
    fontFamily: {
      PRIMARY: ['Montserrat', 'sans-serif'],
      SECONDARY: ['Racama', 'serif'],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
