import animated from 'tailwindcss-animated'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgb(20, 50, 90) 0%, rgb(30, 30, 30) 100%)',
      },
    },
  },
  plugins: [
    animated
  ],
}


