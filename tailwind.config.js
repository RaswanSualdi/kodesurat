const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                "up-down": "updown 3s linear",
            },
            keyframes: {
                upDown: {
                    "0%": { transfrom: "translateY(100%)" },
                    "100%": { transfrom: "translateY(0)" },
                },
            },
        },
        colors: {
            ...colors,
            "blue-bird": "#0F97DB",
        },
    },
    plugins: [],
    important: true,
};
