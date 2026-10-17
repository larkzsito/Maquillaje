import type { Config } from 'tailwindcss'

// Palette and fonts live as CSS variables in src/index.css so SVG and Tailwind share one source.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        ink: 'var(--ink)',
        ink2: 'var(--ink-2)',
        line: 'var(--line)',
        rose: 'var(--rose)',
        'rose-deep': 'var(--rose-deep)',
        paper: 'var(--paper)',
        shade: 'var(--shade)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        lineup: { from: { transform: 'translateY(105%)' }, to: { transform: 'none' } },
        plate: { from: { transform: 'scale(.6)', opacity: '0' }, to: { transform: 'none', opacity: '1' } },
        cue: {
          '0%, 100%': { transform: 'scaleY(.3)', opacity: '.4' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
        },
      },
      animation: {
        lineup: 'lineup 1.1s cubic-bezier(.2,.8,.2,1) both',
        plate: 'plate 1.2s cubic-bezier(.2,.8,.2,1) backwards',
        cue: 'cue 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
