module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        wave: 'wave 1s infinite'
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover']
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
