/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["inter", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        sm: "640px", // Small devices (phones, 640px and up)
        md: "768px", // Medium devices (tablets, 768px and up)
        lg: "1024px", // Large devices (desktops, 1024px and up)
        xl: "1280px", // Extra large devices (large desktops, 1280px and up)
      },
      backgroundImage: {
        signIn: "url('./src/assets/1.svg')",
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "100%": "100%",
        16: "4rem",
      },
      colors: {
        backgroundColor: '#F8F6F3', 
      },
    },
  },
  plugins: [],
};
