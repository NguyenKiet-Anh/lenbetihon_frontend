/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                cartItem: '0.5fr 2fr 1fr 1fr 1fr 1fr',
            },
            margin: {
                navbarHeight: '80px',
            },
            colors: {
                primary: '#087ea4',
                dark: '#333',
                light: '#555',
            },
            animation: {
                fadeInLeft: 'fadeInLeft 1s ease-out',
                fadeInRight: 'fadeInRight 1s ease-out',
                quickSpin: 'quickSpin .05s linear 1',
            },
            keyframes: {
                fadeInLeft: {
                    '0%': {
                        opacity: '0.5',
                        transform: 'translateX(-100%)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },
                fadeInRight: {
                    '0%': {
                        opacity: '0.5',
                        transform: 'translateX(100%)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },
                fadeOutRight: {
                    '100%': {
                        opacity: '0.5',
                        transform: 'translateX(100%)',
                    },
                    '0%': {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },

                quickSpin: {
                    from: {
                        transform: 'rotate(0deg)',
                    },
                    to: {
                        transform: 'rotate(360deg)',
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
