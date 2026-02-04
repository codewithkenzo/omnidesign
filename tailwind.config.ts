import type { Config } from 'tailwindcss';

export default {
  content: [
    './examples/**/*.{html,tsx,ts}',
    './src/**/*.css',
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        wave: 'wave 1.2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
} satisfies Config;
