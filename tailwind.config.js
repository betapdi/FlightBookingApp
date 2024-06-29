// tailwind.config.js
module.exports = {
    content: [
      "./app/screens/**/*.{js,ts,jsx,tsx}",
      "./app/pages/**/*.{js,ts,jsx,tsx}",
      "./app/components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
      extend: {
        fontFamily: {
            pthin: ["Poppins-Thin", "sans-serif"],
            pextralight: ["Poppins-ExtraLight", "sans-serif"],
            plight: ["Poppins-Light", "sans-serif"],
            pregular: ["Poppins-Regular", "sans-serif"],
            pmedium: ["Poppins-Medium", "sans-serif"],
            psemibold: ["Poppins-SemiBold", "sans-serif"],
            pbold: ["Poppins-Bold", "sans-serif"],
            pextrabold: ["Poppins-ExtraBold", "sans-serif"],
            pblack: ["Poppins-Black", "sans-serif"],
        },
      },
    },
    
  };