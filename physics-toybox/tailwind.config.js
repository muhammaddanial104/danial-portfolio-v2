/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#08070D',
          darker: '#040307',
          surface: '#0E0B18',
          card: '#130E22',
          border: 'rgba(139, 92, 246, 0.15)',
        },
        brand: {
          violet: '#6D28D9',
          purple: '#8B5CF6',
          lavender: '#A78BFA',
          lilac: '#E9D5FF',
          darkViolet: '#4C1D95',
        },
      },
      fontFamily: {
        editorial: ['Syne', 'Space Grotesk', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px -3px rgba(139, 92, 246, 0.25)',
        'glow-lg': '0 0 50px -5px rgba(139, 92, 246, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'radial-gradient-purple': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        'purple-glow-mesh': 'radial-gradient(at 80% 20%, rgba(109, 40, 217, 0.18) 0px, transparent 50%), radial-gradient(at 20% 80%, rgba(139, 92, 246, 0.15) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}
