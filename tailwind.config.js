/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./public/assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        base: "#F3F6F9",
        ink: { DEFAULT: "#0A1322", 2: "#111C2E", 3: "#1B2840" },
        mute: "#5A6577",
        line: "#E1E7EE",
        cyan: { DEFAULT: "#0AA5C2", 50: "#E8F8FB", 100: "#C9EEF5", 300: "#6FD6E8", 400: "#2EC3DD", 600: "#0789A3" },
        artery: { DEFAULT: "#E5484D", soft: "#FDECEC" },
        vein: { DEFAULT: "#3E63DD", soft: "#ECF0FD" },
      },
      maxWidth: { page: "78rem" },
      boxShadow: {
        card: "0 1px 2px rgba(10,19,34,.04), 0 12px 32px -12px rgba(10,19,34,.10)",
        float: "0 2px 6px rgba(10,19,34,.06), 0 30px 60px -20px rgba(10,19,34,.28)",
        ring: "0 0 0 1px rgba(10,165,194,.25), 0 10px 30px -10px rgba(10,165,194,.45)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        scan: { "0%": { transform: "translateY(-120%)" }, "100%": { transform: "translateY(900%)" } },
        flow: { to: { strokeDashoffset: "-64" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".25" } },
        beat: { "0%,100%": { transform: "scale(1)" }, "12%": { transform: "scale(1.12)" }, "24%": { transform: "scale(1)" }, "36%": { transform: "scale(1.07)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        scan: "scan 6s cubic-bezier(.6,0,.4,1) infinite",
        flow: "flow 1.6s linear infinite",
        blink: "blink 1.4s ease-in-out infinite",
        beat: "beat 1.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
