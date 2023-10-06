import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-button-color': 'var(--primary-button-color)',
        'primary-button-color-dark': 'var(--primary-button-color-dark)',
        'primary-button-color-hover': 'var(--primary-button-color-hover)',
        'primary-button-color-hover-dark':
          'var(--primary-button-color-hover-dark)',
        'secondary-button-color': 'var(--secondary-button-color)',
        'secondary-button-color-dark': 'var(--secondary-button-color-dark)',
        'secondary-button-color-hover': 'var(--secondary-button-color-hover)',
        'secondary-button-color-hover-dark':
          'var(--secondary-button-color-hover-dark)',
        'primary-color': 'var(--primary-color)',
        'primary-color-dark': 'var(--primary-color-dark)',
        'secondary-color': 'var(--secondary-color)',
        'secondary-color-dark': 'var(--secondary-color-dark)',
        'tertiary-color': 'var(--tertiary-color)',
        'tertiary-color-dark': 'var(--tertiary-color-dark)',
        'outlay-color': 'var(--outlay-color)',
        'font-close-button': 'var(--font-close-button)',
        'modal-padding': 'var(--modal-padding)',
      },
    },
  },
  plugins: [],
}
export default config
