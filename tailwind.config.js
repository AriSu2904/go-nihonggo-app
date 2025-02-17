/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: {
          regular: ["Poppins-Regular"],
          medium: ["Poppins-Medium"],
          semibold: ["Poppins-SemiBold"],
        },
      },
      colors: {
        background: "#252c4a",
      },
    },
  },
  plugins: [],
};
