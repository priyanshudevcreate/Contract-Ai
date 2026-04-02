/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'heading': ['Outfit', 'sans-serif'],
        'body': ['Outfit', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
