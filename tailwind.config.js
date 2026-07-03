/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Show Rentals – Dark Luxury palette
        soul: {
          black:    '#0A0A0A',
          dark:     '#111111',
          card:     '#181818',
          border:   '#2A2A2A',
          gold:     '#C9A84C',
          'gold-light': '#E8C96A',
          'gold-dim':   '#8A6E2F',
          cream:    '#F5EDD6',
          muted:    '#8A7A5F',
          smoke:    '#3A3A3A',
        },
        // Normal Rentals – Light Corporate palette
        rental: {
          white:    '#FFFFFF',
          bg:       '#F4F6F9',
          card:     '#FFFFFF',
          navy:     '#1A3A6B',
          blue:     '#2563EB',
          'blue-light': '#EFF6FF',
          text:     '#1C1C2E',
          muted:    '#6B7280',
          border:   '#E5E7EB',
          success:  '#16A34A',
          warn:     '#D97706',
        },
      },
      fontFamily: {
        serif:  ['Playfair Display', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        'hero-overlay':  'linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 55%, rgba(10,10,10,0.3) 100%)',
      },
      boxShadow: {
        'gold':    '0 0 30px rgba(201,168,76,0.2)',
        'gold-sm': '0 0 12px rgba(201,168,76,0.15)',
        'card':    '0 4px 24px rgba(0,0,0,0.4)',
        'card-lg': '0 8px 40px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'slide-left': 'slideLeft 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
