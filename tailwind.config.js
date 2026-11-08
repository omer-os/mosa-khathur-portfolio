/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./public/assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
        display: ['"Big Shoulders Display"', "Impact", "sans-serif"],
      },
      colors: {
        base: "#F5F7FC",
        ink: { DEFAULT: "#0B1533", 2: "#121E42", 3: "#1B2A57" },
        mute: "#5B6478",
        line: "#E4E8F1",
        brand: { DEFAULT: "#1F45E0", 50: "#EEF2FE", 100: "#DCE4FD", 200: "#B9C8FB", 300: "#8FA6F7", 600: "#1A3BC4", 700: "#1631A3", 800: "#132A86" },
        artery: "#E5484D",
      },
      maxWidth: { page: "80rem" },
      boxShadow: {
        card: "0 1px 2px rgba(11,21,51,.04), 0 10px 30px -12px rgba(11,21,51,.10)",
        lift: "0 2px 6px rgba(11,21,51,.06), 0 30px 60px -24px rgba(11,21,51,.30)",
        brand: "0 12px 30px -10px rgba(31,69,224,.55)",
      },
      keyframes: {
        flow: { to: { strokeDashoffset: "-64" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".25" } },
        beat: { "0%,100%": { transform: "scale(1)" }, "12%": { transform: "scale(1.12)" }, "24%": { transform: "scale(1)" }, "36%": { transform: "scale(1.07)" } },
        rise: { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "none" } },
        "rise-img": { from: { opacity: "0", transform: "translate(-50%, 40px) scale(.98)" }, to: { opacity: "1", transform: "translate(-50%, 0) scale(1)" } },
        stream: { to: { backgroundPosition: "0 200px" } },
      },
      animation: {
        flow: "flow 1.6s linear infinite",
        blink: "blink 1.4s ease-in-out infinite",
        beat: "beat 1.1s ease-in-out infinite",
        stream: "stream 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};
