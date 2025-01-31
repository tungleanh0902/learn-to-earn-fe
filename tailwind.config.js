import animated from 'tailwindcss-animated'
import preline from 'preline/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'baloo':['Baloo'],
        'nunito-bold':['Nunito-Bold'],
        'adlam-display':['Adlam'],
        'lato-regular':['Lato-Regular'],
        'abeezee':['ABeeZee-Regular'],
        'afacad-variable':['Afacad-Variable'],
        'afacad-italic':['Afacad-Italic'],
        'auvicwant':['Auvicwant'],
        'nats':['NATS']
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgb(20, 50, 90) 0%, rgb(30, 30, 30) 100%)',
        'beach': "url('../src/assets/game-bg.png')",
      },
    },
  },
  plugins: [
    animated,
    preline
  ],
}


