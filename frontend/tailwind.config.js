/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'kfc-red': '#E4002B',
                'kfc-black': '#202124',
                'kfc-white': '#FFFFFF',
                'kfc-cream': '#F8F7F5',
            },
        },
    },
    plugins: [],
}
