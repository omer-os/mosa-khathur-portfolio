/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./public/assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', "Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        ink: { DEFAULT: "#0A1020", 900: "#0A1020", 800: "#111a2e", 700: "#1c2740", 600: "#2b3754" },
        paper: "#F5F7FB",
        pulse: { DEFAULT: "#0891B2", 50: "#ecfeff", 100: "#cffafe", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490" },
        heart: { DEFAULT: "#E11D48", 400: "#fb7185", 500: "#f43f5e" },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,16,32,.04), 0 8px 24px -8px rgba(10,16,32,.08)",
        lift: "0 2px 4px rgba(10,16,32,.04), 0 24px 48px -16px rgba(10,16,32,.18)",
        glow: "0 0 0 1px rgba(8,145,178,.15), 0 12px 40px -10px rgba(8,145,178,.45)",
      },
      keyframes: {
        ecg: { "0%": { strokeDashoffset: "1400" }, "100%": { strokeDashoffset: "0" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        ping2: { "0%": { transform: "scale(1)", opacity: ".7" }, "80%,100%": { transform: "scale(2.4)", opacity: "0" } },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(500%)" } },
        beat: { "0%,100%": { transform: "scale(1)" }, "15%": { transform: "scale(1.18)" }, "30%": { transform: "scale(1)" }, "45%": { transform: "scale(1.1)" } },
      },
      animation: {
        ecg: "ecg 3.2s linear infinite",
        marquee: "marquee 40s linear infinite",
        ping2: "ping2 1.6s cubic-bezier(0,0,.2,1) infinite",
        scan: "scan 5s ease-in-out infinite",
        beat: "beat 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
