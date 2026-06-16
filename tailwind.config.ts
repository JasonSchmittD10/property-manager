import type { Config } from 'tailwindcss'

// Design tokens from the Figma "BASHFORD · DESIGN TOKENS · Color palette"
// frame (2:308) and the live Figma variables (sage-green/* and warm-gray/*).
// Two tonal ramps: sage-green (primary accent, anchor 500) and warm-gray
// (neutral surfaces, hairlines, text). Semantic aliases below the ramps
// map the most common roles onto specific shades.

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ----- Sage green ramp (Figma sage-green/0..900) -----
        // Anchor 500 = #688557 (live Figma variable).
        sage: {
          DEFAULT: '#688557',
          0: '#F6F8F3',
          50: '#EDF1E8',   // Tint surface
          100: '#DDE6D3',  // Tint border
          200: '#C4D3B4',
          300: '#A6BC90',
          400: '#87A271',
          500: '#688557',  // Accent (anchor)
          600: '#566E45',  // Accent pressed
          700: '#455838',
          800: '#36452D',
          900: '#283322',
        },

        // ----- Warm gray ramp (Figma warm-gray/0..900) -----
        warm: {
          0: '#FBFAF6',   // Surface
          50: '#F7F4EF',  // Background
          100: '#EFEBE2', // Divider
          200: '#E7E2D8', // Border
          300: '#DCD6CA', // Border strong
          400: '#BFB8A9',
          500: '#A39D90', // Text tertiary
          600: '#8A8475',
          700: '#726C60', // Text secondary
          800: '#4D483F',
          900: '#2B2823', // Text primary
        },

        // ----- Semantic aliases -----
        canvas: '#FBFAF6',     // = warm-0
        surface: '#F1EBE3',    // login bg — slightly warmer than warm-100
        card: '#FFFFFF',
        ink: '#2B2823',        // = warm-900
        muted: '#8E8270',      // nav text default (Figma design context)
        border: '#E7E2D8',     // = warm-200
        danger: '#A04A3C',
        'sage-deep': '#566E45',// = sage-600 (Accent pressed)
        'sage-tint': '#EDF1E8',// = sage-50  (Tint surface)
        'warm-card': '#FBFAF7',// Quick info inset (near warm-0)
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
      dropShadow: {
        // Figma "BIG shadow" — 5 stacked drops. Used by the floating
        // pill nav and the circular Emergency button.
        big: [
          '0px 8px 9px rgba(0,0,0,0.05)',
          '0px 33px 16.5px rgba(0,0,0,0.05)',
          '0px 75px 22.5px rgba(0,0,0,0.03)',
          '0px 133px 26.5px rgba(0,0,0,0.01)',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config
