import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FBF9F6',
        surface: '#F1EBE3',
        card: '#FFFFFF',
        sage: '#6B8557',
        'sage-deep': '#4F6B3F',
        'sage-tint': '#E7EEDD',
        ink: '#2B2419',
        muted: '#8C8273',
        border: '#E7E0D6',
        danger: '#A04A3C',
      },
      fontFamily: {
        heading: ['"Cal Sans"', 'system-ui', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '11px',
        card: '16px',
        hero: '20px',
      },
      borderWidth: {
        hair: '0.5px',
      },
    },
  },
  plugins: [],
} satisfies Config
