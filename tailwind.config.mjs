/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e6ddd0",
          300: "#d4c5ae",
          400: "#bfa789",
          500: "#a98d6b",
          600: "#9a7b5a",
          700: "#80654b",
          800: "#695341",
          900: "#574537",
          950: "#2e231c",
        },
        accent: {
          50: "#f0f7f4",
          100: "#dbede3",
          200: "#b9dbc9",
          300: "#8cc2a7",
          400: "#5ea583",
          500: "#3d8968",
          600: "#2d6e53",
          700: "#255844",
          800: "#204737",
          900: "#1b3b2e",
          950: "#0e211a",
        },
        warm: {
          50: "#fdf8f0",
          100: "#f9eddb",
          200: "#f2d8b6",
          300: "#e9bd87",
          400: "#e09d57",
          500: "#d98536",
          600: "#ca6f2c",
          700: "#a85626",
          800: "#874625",
          900: "#6e3b22",
          950: "#3b1d10",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
