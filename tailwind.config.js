/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#0f172a',
                'bg-secondary': '#1e1b4b',
                'accent-main': '#6366f1',
                'accent-alt': '#f43f5e',
                'glass-bg': 'rgba(255, 255, 255, 0.03)',
                'glass-border': 'rgba(255, 255, 255, 0.1)',
                'text-primary': '#f8fafc',
                'text-secondary': '#94a3b8',
            },
            fontFamily: {
                main: ['Inter', 'sans-serif'],
                accent: ['Outfit', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
