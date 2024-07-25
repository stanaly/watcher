/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        enabled: '#610C9F',
        disabled: '#464646',
        penalty: '#E72020',
        pass: '#20ABE7',
        secondary: '#940B92',
        tertiary: '#DA0C81',
      },
    },
  },
  plugins: [],
};
