/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                fill: {
                    "0%": { width: "0%" },
                    "100%": { width: "100%" },
                },
            },
            animation: {
                fill: "fill 2s ease-in-out infinite", // 自定义动画，时长为 2 秒
            },
        },
    },
    plugins: [],
};
