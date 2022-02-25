const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['"Josefin Sans",sans-serif'],
      },
      lineHeight: {
            'extra-loose': '2.5',
            '12': '3rem',
      },
      colors: {
        custom: {
            DEFAULT: '#10B981',
            light: '#ffd601',
            scroll:'#161616'
        }
    }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  
 
}
