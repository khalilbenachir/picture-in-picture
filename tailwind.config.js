/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        videoInline: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        videoFloating: {
          from: {
            transform: "translateX(-50px)",
            opacity: 0,
          },
          to: {
            transform: "translateX(0px)",
            opacity: 1,
          },
        },
      },
      animation: {
        videoInline: "videoInline 300ms ease-in-out forwards",
        videoFloating: "videoFloating 300ms ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
