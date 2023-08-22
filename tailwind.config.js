/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      xxl: '1920px',
    },
    colors: {
      'night': {
        50: '#f6f6f6',
        100: '#e7e7e7',
        200: '#d1d1d1',
        300: '#b0b0b0',
        400: '#888888',
        500: '#6d6d6d',
        600: '#5d5d5d',
        700: '#4f4f4f',
        800: '#454545',
        900: '#3d3d3d',
        950: '#0c0c0c',
      },
      'risdblue': {
        50: '#eef5ff',
        100: '#d8e8ff',
        200: '#bad6ff',
        300: '#8bbeff',
        400: '#5499ff',
        500: '#2d72ff',
        600: '#1b53fa',
        700: '#0f3ae6',
        800: '#1330ba',
        900: '#162e92',
        950: '#121f59',
      },
      'sinopia': {
        50: '#fff6ec',
        100: '#ffebd2',
        200: '#ffd3a4',
        300: '#ffb46b',
        400: '#ff882f',
        500: '#ff6607',
        600: '#f94900',
        700: '#cc3300',
        800: '#a32a09',
        900: '#83250b',
        950: '#470f03',
      },
      'light': '#f6fbfc',
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        serif: ['Space Grotesk', 'serif']
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  variants: {},
  plugins: []
}