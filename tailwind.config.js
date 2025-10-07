/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        accent: 'var(--accent)',
        'accent-pink': 'var(--accent-pink)',
        'accent-blue': 'var(--accent-blue)',
        grid: 'var(--grid)',
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'monospace'],
        'pixel-alt': ['VT323', 'monospace'],
      },
      animation: {
        'pixel-bounce': 'pixel-bounce 2s ease-in-out infinite',
        'pixel-walk': 'pixel-walk 3s linear infinite',
        'pixel-float': 'pixel-float 4s ease-in-out infinite',
        'pixel-glitch': 'pixel-glitch 0.3s ease-in-out infinite',
        'pixel-flicker': 'pixel-flicker 2s ease-in-out infinite alternate',
        'neon-glow': 'neon-glow 2s ease-in-out infinite alternate',
        'neon-pulse': 'neon-pulse 1.5s ease-in-out infinite',
        'smol-raid': 'smol-raid 2s ease-in-out infinite',
      },
      keyframes: {
        'pixel-bounce': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pixel-walk': {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        'pixel-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        'pixel-glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'pixel-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'neon-glow': {
          '0%, 100%': { 
            textShadow: '0 0 5px var(--primary), 0 0 10px var(--primary), 0 0 15px var(--primary), 0 0 20px var(--primary)',
          },
          '50%': { 
            textShadow: '0 0 2px var(--primary), 0 0 5px var(--primary), 0 0 8px var(--primary), 0 0 12px var(--primary)',
          },
        },
        'neon-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px var(--primary), 0 0 10px var(--primary), 0 0 15px var(--primary)',
          },
          '50%': { 
            boxShadow: '0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 30px var(--primary)',
          },
        },
        'smol-raid': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.1) rotate(2deg)' },
          '50%': { transform: 'scale(1.05) rotate(-1deg)' },
          '75%': { transform: 'scale(1.1) rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}
