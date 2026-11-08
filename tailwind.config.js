/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./public/assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ["Geist", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#F7F6F2",
        stone: "#EEECE6",
        ink: "#131416",
        mute: "#62666D",
        line: "#E2DFD8",
        artery: "#B3261E",
        vein: "#1F4E8C",
      },
      maxWidth: { page: "76rem" },
      letterSpacing: { display: "-0.025em" },
    },
  },
  plugins: [],
};
