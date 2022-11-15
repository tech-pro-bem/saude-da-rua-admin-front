/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#FBFBFB',
        /* cores primárias */
        'primary-black': '#202020',
        'primary-blue': '#0095F6',
        'light-blue': '#B2DFFC',
        'dark-blue': '#00479A',
        /* cores secundárias */
        'ultra-light-grey': '#F7F7F7',
        'light-grey': '#E9E9E9',
        'medium-grey': '#747476',
        'dark-grey': '#545454',
        /* alertas do sistema */
        success: '#5ABF87', // sucesso
        warning: '#FFB240', // aviso
        error: '#FF4848', // falha
      },
      fontFamily: {
        // eslint-disable-next-line quote-props
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
};
