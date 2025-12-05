/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                crema: '#f2f0e9',
                madera: '#2a2522',
                terracota: '#c16e4d',
                olive: '#4a4a38',
                charcoal: '#1a1a1a',
            },
        },
    },
    plugins: [],
};
