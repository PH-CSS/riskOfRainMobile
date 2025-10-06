/** @type {import('tailwindcss').Config} */
module.exports = {content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {

      fontFamily: {
        ChakraPetch_light: ['ChakraPetch_300Light'],
        ChakraPetch_medium: ['ChakraPetch_500Medium'],
        MajorMonoDisplay: ['MajorMonoDisplay_400Regular'],
      },
      colors: {
        primary01: "#DBB33A",      // amarelo principal
        primary05: "#E9D189",      // amarelo botão selecionado
        primarydark: "#010101",    // preto
        secundarydark: "#1A1A1A",  // preto secundário 
        darkgray: "#343434",  // cinsa escuro
      },
      },
    },
    plugins: [],
  }
