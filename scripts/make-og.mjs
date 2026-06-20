// Generates the social share image at public/og.png (1200x630 PNG).
// Run with: npm run og
// PNG is required because WhatsApp/Facebook/Twitter don't render SVG previews.
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#12151C"/>
      <stop offset="1" stop-color="#0A0C10"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#1E232D"/>

  <text x="80" y="140" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="6" fill="#078930">PORTFOLIO STUDIO</text>

  <g transform="translate(80,235)">
    <circle cx="16" cy="-16" r="16" fill="#cc2b1d"/>
    <text x="48" y="0" font-family="Helvetica, Arial, sans-serif" font-size="60" font-weight="700" fill="#FFFFFF">sudo</text>
    <text x="240" y="0" font-family="Helvetica, Arial, sans-serif" font-size="60" font-weight="400" letter-spacing="5" fill="#CDD6E0">PORTFOLIOS</text>
  </g>

  <text x="80" y="360" font-family="Helvetica, Arial, sans-serif" font-size="56" font-weight="700" fill="#ECEDEE">Portfolios that get you</text>
  <text x="80" y="430" font-family="Helvetica, Arial, sans-serif" font-size="56" font-weight="700" fill="#ECEDEE">taken seriously.</text>

  <text x="80" y="520" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="#8A929E">Personal. School. Business. Built for everyone.</text>

  <g transform="translate(978,468)">
    <rect width="142" height="71" rx="6" fill="#078930"/>
    <rect width="142" height="22" fill="#0B0B0B"/>
    <rect y="22" width="142" height="2.4" fill="#FFFFFF"/>
    <rect y="24.4" width="142" height="22" fill="#DA121A"/>
    <rect y="46.4" width="142" height="2.4" fill="#FFFFFF"/>
    <polygon points="0,0 0,71 57,35.5" fill="#0F47AF"/>
    <polygon points="19,25 22.4,33 31,33.2 24,38.2 26.5,46.6 19,41.5 11.5,46.6 14,38.2 7,33.2 15.6,33" fill="#FCDD09"/>
  </g>
</svg>`;

mkdirSync("public", { recursive: true });
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: true, defaultFontFamily: "Helvetica" },
});
writeFileSync("public/og.png", resvg.render().asPng());
console.log("wrote public/og.png");
