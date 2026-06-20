// Non-translatable configuration shared by every locale. Replace the {{...}}
// placeholders before launch (see CLAUDE.md section 10).
export const config = {
  name: ".sudo PORTFOLIOS",
  wordmark: ".sudo",
  whatsapp: "250798972441",
  calUsername: "jokditakeerleek-tag3rd",
  calEvent: "free-consult",
  web3formsKey: "ba4cb007-e897-4f40-8985-ea693531906d",
  email: "hello@sudoportfolios.com",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61590890289411",
    instagram: "https://www.instagram.com/sudoportfolios",
    tiktok: "", // pending — empty hides the icon for now
    linkedin: "", // pending — empty hides the icon for now
  },
};

// Structural, locale-independent data for the work pieces. Copy (title,
// summary, category, details) lives in each locale tree, keyed by slug.
// Real (non-sample) pieces carry a `url` and link out to the live site.
export const workMeta = {
  "james-jok-dut-akuei": {
    cover: "/work/james.png",
    url: "https://jameslord.netlify.app/",
    accent: "#A88BFF",
    isSample: false,
  },
  "bcsar-launch-inauguration": {
    cover: "/work/bcsar.png",
    url: "https://lauch-and-inauguration-of-bcsa.vercel.app/",
    accent: "#F0A35B",
    isSample: false,
  },
};

// Merge a locale's per-slug work copy with the shared structural meta.
export function buildWork(items) {
  return items.map((item) => ({ ...workMeta[item.slug], ...item }));
}
