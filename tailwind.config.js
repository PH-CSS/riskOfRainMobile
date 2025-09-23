/** @type {import('tailwindcss').Config} */
module.exports = {content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
      colors: {
        primary01: "#DBB33A",      // amarelo principal
        primary05: "#E9D189",      // amarelo botão selecionado
        primarydark: "#010101",    // preto
        secundarydark: "#1A1A1A",  // preto secundário
      },
      },
    },
    plugins: [],
  }
