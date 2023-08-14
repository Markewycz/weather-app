const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./dist/**/*.{html,js}', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'custom-1': '#D32F2F', // Dark Red
        'custom-2': '#E64A19', // Dark Orange
        'custom-3': '#F57C00', // Orange
        'custom-4': '#FFA000', // Amber
        'custom-5': '#FFC107', // Yellow
        'custom-6': '#8BC34A', // Light Green
        'custom-7': '#4CAF50', // Green
        'custom-8': '#009688', // Teal
        'custom-9': '#00BCD4', // Cyan
        'custom-10': '#03A9F4', // Light Blue
        'custom-11': '#1976D2', // Dark Blue
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};
