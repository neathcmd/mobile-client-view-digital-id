module.exports = {
  darkMode: 'media', // or 'class' if using toggle
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
// theme: {
//   extend: {
//     backgroundImage: {
//       'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
//     }
//   }
// }
