/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'clamp-small': 'clamp(0.75rem, 0.58rem + 0.73vw, 1.125rem)',
        'clamp-medium': 'clamp(1.25rem, 1.136rem + 0.48vw, 1.5rem)',
        'clamp-large': 'clamp(1.5rem, 1.159rem + 1.45vw, 2.25rem)',
      },
    },
  },
  plugins: [],
}