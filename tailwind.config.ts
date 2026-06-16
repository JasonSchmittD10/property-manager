import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // All swatches match Figma design tokens exactly.
        canvas: '#faf9f6',
        surface: '#F1EBE3',
        card: '#FFFFFF',
        sage: '#688557', // sage-green/500
        'sage-deep': '#4F6B3F',
        'sage-tint': '#edf1e8', // sage-green/50
        ink: '#2b2823', // warm-gray/900
        muted: '#8E8270',
        border: '#E7E0D6',
        danger: '#A04A3C',
        // Warm-gray scale from Figma (used in the redesigned Property page).
        'warm-50': '#f7f4ef',
        'warm-100': '#efebe2',
        'warm-200': '#f1ece4', // card border
        'warm-400': '#736c5f', // body M / address copy
        'warm-500': '#a39d90', // eyebrow secondary
        'warm-card': '#fbfaf7', // inner inset card on Quick info
      },
      fontFamily: {
        heading: ['"Cal Sans"', 'system-ui', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '11px',
        card: '16px',
        cardLg: '18px',
        cardInner: '12px',
        hero: '20px',
      },
      borderWidth: {
        hair: '0.5px',
      },
      letterSpacing: {
        eyebrow: '0.09em', // 1.08px on 12px text
      },
    },
  },
  plugins: [],
} satisfies Config
