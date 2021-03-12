module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fill: theme => ({
      grayLight: theme('colors.gray.50'),
      grayDark: theme('colors.gray.900'),
    }),
    extend: {
      animation: {
        wave: 'wave 0.5s infinite',
        funBounce: 'funBounce 750ms',
      },
      fill: ['hover'],
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        funBounce: {
          '0%': {
            transform: 'translateY(0%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '25%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '75%': {
            transform: 'translateY(-15%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '100%': {
            transform: 'translateY(0%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
      fill: ['dark']
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
