// Values sourced from knowledge-store/tokens.md — do not add one-off colors,
// sizes or durations here without a matching entry in that file first.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // tokens.md §3.1 — trilingual stack (D18). Unexercised by the English
        // demo copy, load-bearing the day Sinhala/Tamil copy arrives.
        sans: [
          '"Noto Sans Sinhala"',
          '"Noto Sans Tamil"',
          '"Noto Sans"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        // tokens.md §3.2
        caption: ['0.875rem', { lineHeight: '1.6' }],
        body: ['1.125rem', { lineHeight: '1.6' }],
        emphasis: ['1.25rem', { lineHeight: '1.3' }],
        'outdoor-body': ['1.25rem', { lineHeight: '1.6' }],
        'outdoor-status': ['2.5rem', { lineHeight: '1.3' }],
      },
      lineHeight: {
        // tokens.md §3.3
        tight: '1.3',
        normal: '1.6',
        relaxed: '1.75',
      },
      colors: {
        // tokens.md §2.1, §2.2, §5 — semantic aliases onto Tailwind's own palette.
        // Unnamed ramp steps (hover/active) use Tailwind's native blue/green/red
        // shades directly, per component-spec.md §0.1's state-variation rule.
        'text-primary': '#0F172A',
        'text-primary-outdoor': '#000000',
        'text-secondary': '#334155',
        'text-disabled': '#64748B',
        success: '#166534',
        error: '#991B1B',
        primary: '#1D4ED8',
        'primary-outdoor': '#1E40AF',
        'surface-inverse': '#1E293B',
        'surface-muted': '#F8FAFC',
        'border-strong': '#64748B',
        'border-outdoor': '#0F172A',
      },
      spacing: {
        // tokens.md §4
        'touch-min': '3rem',
        'touch-min-outdoor': '4rem',
        'touch-gap': '0.5rem',
        'touch-gap-outdoor': '0.75rem',
      },
      borderRadius: {
        // tokens.md §5
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
      },
      transitionDuration: {
        // tokens.md §7.1
        instant: '100ms',
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideIn: { from: { opacity: '0', transform: 'translateY(-0.5rem)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        // Durations match transitionDuration.instant / .slow above exactly.
        fadeIn: 'fadeIn 100ms ease-out',
        slideIn: 'slideIn 400ms ease-out',
      },
    },
  },
  plugins: [],
}
