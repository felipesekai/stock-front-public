/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./*.html"],
  theme: {
    extend: {

    },
    colors: {
      // bgPrimary: '#ffbd68',
      bgPrimary: '#009933',
      bgSecondary: '#ADD8E6',
      // bgPrimaryLight: 'rgba(255,189,104,0.34)',
      bgPrimaryLight: '#ADD8E6',
      bgColor: '#242424',
      borderColor: '#473925',
      // 'blue': '#1fb6ff',
      // 'purple': '#7e5bef',
      // 'pink': '#ff49db',
      // 'orange': '#ff7849',
      // 'green': '#13ce66',
      // 'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#fff',
    },
  },
  plugins: [],
}
