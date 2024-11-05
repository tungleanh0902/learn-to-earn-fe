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
      },
    },
  },
  plugins: [],
}


