/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "*.{html,js}",
        "./src/**/*.{css,scss}",
        "*.{css,scss}",
    ],
    theme: {
        extend: {
            transitionDuration: {
                2000: "2000ms",
            },
            transitionProperty: {
                width: "width",
            },
            fontFamily: {
                julius: "Julius Sans One",
                noto: "Noto Sans Display",
            },
            fontSize: {
                sm: ["14px", "20px"],
                base: ["16px", "24px"],
                lg: ["20px", "28px"],
                xl: ["24px", "32px"],
                "2xl": ["28px", "36px"],
                "3xl": ["32px", "1.2rem"],
            },
        },
        backdropFilter: {
            blur: "blur(20px)",
        },
    },
    plugins: [require("tailwindcss-filters")],
};
