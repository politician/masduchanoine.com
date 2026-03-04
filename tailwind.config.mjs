/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf9f7',
        olive: '#5c6b3e',
        'olive-dark': '#4a5532',
        terracotta: '#c4753b',
        'terracotta-dark': '#a8612d',
        charcoal: '#2c2c2c',
        'charcoal-light': '#4a4a4a',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        lato: ['Lato', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
};
