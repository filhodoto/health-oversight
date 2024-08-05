import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  // Enable dark mode using the 'class' strategy
  darkMode: ['class'],
  // Specify the paths to all of the template files in your project
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    // Configure the container to be centered and have padding
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // Extend the default color palette with custom colors
      colors: {
        green: {
          500: '#24AE7C',
          600: '#0D2A1F',
        },
        blue: {
          500: '#79B5EC',
          600: '#152432',
        },
        red: {
          500: '#F37877',
          600: '#3E1716',
          700: '#F24E43',
        },
        light: {
          200: '#E8E9E9',
        },
        dark: {
          200: '#0D0F10',
          300: '#131619',
          400: '#1A1D21',
          500: '#363A3D',
          600: '#76828D',
          700: '#ABB8C4',
        },
        primary: {
          default: '#24AE7C',
          dark: '#0D2A1F',
        },
      },
      // Extend the default font family with custom fonts
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      // Add custom background images
      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')",
      },
      // Define custom keyframes for animations
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      // Define custom animations
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  // Include Tailwind CSS animate plugin
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
