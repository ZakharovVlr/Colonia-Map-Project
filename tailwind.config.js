/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                noto: ['Noto Serif', 'serif'],
                bitcount: ['Bitcount Single', 'sans-serif'],
            },
            screens: {
                'mobile': { 'max': '767px' },   // Все экраны меньше 768px — мобилки
                'desktop': '1728px',         // Наш размер MacBook Pro 16"
            },
        },
    },
    plugins: [],
}
