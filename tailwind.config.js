/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#BD00FF',
        'brand-orange': '#FF8A00',
        'brand-dark': '#0A0015',
        purple: {
          600: '#BD00FF',
        },
        orange: {
          400: '#FF8A00',
          500: '#FF8A00',
          600: '#FF8A00',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Oswald', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Oswald', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        oswald: ['Oswald', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        'standard': '1068px',
        'breakout': '1348px',
        '1068': '1068px',
        '1348': '1348px',
      },
      spacing: {
        'section-sm': '3rem',    // 48px
        'section-md': '4rem',    // 64px
        'section-lg': '5rem',    // 80px
        'section-xl': '6rem',    // 96px
      },
      fontSize: {
        '9': '9px',
        '10': '10px',
        '11': '11px',
        '13': '13px',
      },
      letterSpacing: {
        '0.1em': '0.1em',
        '0.25em': '0.25em',
        '0.3em': '0.3em',
        '0.35em': '0.35em',
        '0.4em': '0.4em',
        '0.5em': '0.5em',
      },
      borderRadius: {
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      borderWidth: {
        '1.5': '1.5px',
        '3': '3px',
      },
      blur: {
        '180': '180px',
        '200': '200px',
      },
      aspectRatio: {
        '4/5': '4 / 5',
      },
      backgroundColor: {
        '#E9F3F8': '#E9F3F8',
      },
    },
  },
  plugins: [],
}
