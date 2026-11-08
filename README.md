# Mosa Albayati — Portfolio

Personal site for **Mosa Albayati**, clinical perfusion trainee (M.Sc. Cardiovascular Perfusion, Ankara University).

Live: https://mosa-khathur-portfolio.vercel.app

## Stack
Plain **HTML + Tailwind CSS + jQuery**. No framework, no build step at deploy time.

```
public/            ← the website (deployed as-is)
  index.html          → /
  experience.html     → /experience
  certificates.html   → /certificates
  404.html
  assets/css/styles.css   ← compiled Tailwind (committed)
  assets/js/main.js       ← jQuery interactions
  assets/img, assets/certificates, assets/cv
  robots.txt, sitemap.xml, og-image.jpg, favicon.svg, site.webmanifest
src/input.css      ← Tailwind source
tailwind.config.js
vercel.json        ← static deploy config (serves /public)
```

## Editing
1. Edit the page in `public/` (header and footer are repeated in each page — keep them in sync).
2. If you used new Tailwind classes, rebuild the CSS:
   ```bash
   npm install && npm run build:css
   ```
3. Preview locally: `npx serve public`
4. Commit and push — Vercel deploys automatically.
