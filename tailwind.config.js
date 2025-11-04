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
        secundarydark: "#343434",  // preto secundário 
        darkgray: "#1A1A1A",  // cinsa escuro343434
      },
      },
    },
    plugins: [],
  }