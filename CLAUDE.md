# .sudo PORTFOLIOS — Project Brief

This file is the single source of truth for the build. Read it before generating or editing any file. Keep every page inside the design system and decisions below.

## 1. What we are building

A marketing and booking site for `.sudo PORTFOLIOS`, a freelance service that builds portfolios for students, professionals, schools, and businesses (focus on South Sudanese clients and the wider diaspora, open to everyone).

Traffic arrives from social media. The site's only job is to turn a curious visitor into a booked free consultation. Every section must push toward one action: book the free consult. Anything that does not serve that is cut.

Brand idea: `sudo` is the command that runs with elevated privileges. The brand promise is "permission to present yourself at the highest level." Lean into a refined developer-terminal identity, but premium, never a cheap hacker theme.

## 2. Tech stack

- Vite + React (JavaScript, not TypeScript, unless I say otherwise later)
- Tailwind CSS for styling
- Framer Motion for animation
- React Router for page routes
- Deploy target: Vercel
- The app is bilingual: English (default) and Arabic, with a header toggle. All editable copy lives in per-locale trees `src/i18n/en.js` and `src/i18n/ar.js` (same shape). Non-translatable config (WhatsApp number, Cal handle, keys, socials, work cover/accent meta) lives in `src/i18n/config.js`. Components read copy via the `useContent()` hook and never hardcode marketing copy. When adding or changing copy, update BOTH locale trees. Arabic renders right-to-left (`dir="rtl"`) with the IBM Plex Sans Arabic webfont; the Latin wordmark stays LTR.

## 3. Design system

Premium, dark-first, near-monochrome, with one restrained accent. Restraint and whitespace are what make it read as expensive. Do not scatter the accent color everywhere.

### Color tokens (define in Tailwind config and CSS variables)
- `ink` background: `#0A0C10`
- `surface` (cards, raised areas): `#12151C`
- `border` hairlines: `#1E232D`
- `text` primary (off-white): `#ECEDEE`
- `text-muted`: `#8A929E`
- `accent` (the terminal signal, use sparingly) is theme-aware, both from the South Sudan flag: dark mode = green `#078930`, light mode = red `#DA121A`.
- `accent-soft` for subtle glows/hover: green `rgba(7, 137, 48, 0.16)` in dark, red `rgba(218, 18, 26, 0.10)` in light.
- `accent-deep` for hover/pressed on accent fills: green `#056325` in dark, red `#A60E14` in light.
- `accent-ink` text color on top of accent fills (buttons): `#FFFFFF`.
- The accent glow shadow (`shadow-accent-glow`) is driven by the `--shadow-accent-glow` CSS variable so it matches the active accent.
- `gold` reserved for the flag star highlight only: `#E8B339`.

Light mode is implemented alongside dark. Dark is the default (dark-first brand). All color tokens are CSS variables: dark values live under the `.dark` class, light values are the `:root` base. A header toggle (`ThemeToggle.jsx`, `useTheme.js`) swaps the `.dark` class on `<html>` and persists the choice to `localStorage`; an inline script in `index.html` applies the saved theme before paint to avoid a flash. Light tokens: ink (page) `#F3F5F8` soft gray, surface (cards/boxes) `#FFFFFF` so they read as raised, border `#E2E6EC`, text `#16202E`, text-muted `#5B6B78`; the accent is flag red in light, flag green in dark.

### Flag identity (corner badge)
The audience is worldwide, but the work is inspired by and built mostly for South Sudanese clients back home and across the diaspora. That identity is carried by a small South Sudan flag badge fixed in the bottom-right corner of the viewport via `CornerFlag.jsx` (`position: fixed`, `pointer-events: none`, `z-index: 40`, crisp not blurred). It is decorative (`aria-hidden`) and keeps the flag's 2:1 aspect ratio; the `width` prop controls its size (default `72px`). It is a corner accent, not a full-page background.

### Typography
- Headings: **Space Grotesk** (Google Fonts)
- Body: **Inter** (Google Fonts)
- Monospace accent (labels, nav, prompts, command motifs): **JetBrains Mono** (Google Fonts)

The monospace is a refined accent typeface, used sparingly for: nav links, section eyebrow labels, and small tags. It is a typeface choice only.

### No terminal/command syntax (updated direction)
The original developer-terminal motif has been removed at the client's request. Do NOT use command-line syntax anywhere in visible copy: no `$` prefixes, no `~/… $` prompts, no `--flags`, no `fn()` call styling, no `whoami`. Keep wording plain and human.
- Section eyebrow labels: small, uppercase, wide letter-spacing, accent color, in JetBrains Mono. Plain words only (e.g. `SERVICES`, `WORK`).
- Buttons: plain action text (e.g. `Book a free consult`, `Open WhatsApp chat`). Soft accent glow on hover stays.
- Hero headline types itself out once on load (a clean text reveal, no blinking terminal cursor).
- Do not flood the page with the accent. Most of the page is ink + off-white. Accent appears only on eyebrow labels, primary CTAs, and key hovers. Gold is reserved for the flag star.

### Motion
- Subtle and intentional. Fade-and-rise on scroll for sections (Framer Motion `whileInView`, small offsets, ~0.4s).
- One hero typewriter effect on load. No looping animations that distract.
- Respect `prefers-reduced-motion`.

## 4. Pages and sections

Single-page scroll for the core landing on mobile and tablet, with separate routes for individual portfolio samples so each can be shared with its own link.

Desktop (lg, min-width 1024px) uses a nav-driven **paged** layout instead: the page does not scroll as a whole. The nav bar switches between full-viewport pages (Hero, Services, Work, How it works, About, and a Booking page that also holds Contact + Footer), driven by the URL hash via `useActiveHash`. Only the active page scrolls internally, and only when its content is taller than the viewport. The active nav link is highlighted in the accent color. See `pages/Landing.jsx`.

### Landing (`/`)
1. **Nav** — the `.sudo PORTFOLIOS` wordmark, links to Work, Services, How it works, About, and a small "Book a call" CTA.
2. **Hero** — big headline that types out (clean reveal, no terminal cursor), one-line subhead, primary CTA "Book a free consult", secondary WhatsApp button.
3. **Services** — the ranges offered (Personal portfolios, Website portfolios, School portfolios, plus "and more"). Render as cards with small uppercase mono labels.
4. **Work / Showcase** — the most important section. A categorized gallery of portfolio samples (Personal, School, Business). At launch these are strong demo pieces marked clearly as samples. Each card links to its own route `/work/:slug`. Crisp hover states.
5. **How it works** — 4 steps: `01 book` a free call, `02 discuss` what you need, `03 agree` on scope and price, `04 build` and deliver.
6. **About** — the `.sudo` story and who is behind it. Builds trust for a personal-brand service.
7. **Booking** — Cal.com inline embed (see integrations).
8. **Contact** — WhatsApp click-to-chat as the primary path, plus a short no-backend form as backup.
9. **Footer** — socials, a subtle "built with .sudo" credit line, repeat "Book a free consult" CTA.

### Portfolio sample route (`/work/:slug`)
- Renders a single sample full-page with its own SEO and Open Graph tags so the link preview looks good when pasted into WhatsApp or Facebook.
- Data comes from the locale trees via `useContent()`.

## 5. Content model (`src/i18n/en.js` and `src/i18n/ar.js`)

Each locale exports one structured tree (identical shape) so copy is editable per language in one place. Shared non-translatable config is in `src/i18n/config.js`. The Work section renders as a featured auto-rotating preview plus a horizontal, swipeable card rail with prev/next arrows (scales past a long list; whole card is clickable). Shape, at minimum:

```js
export const brand = {
  name: ".sudo PORTFOLIOS",
  tagline: "Permission to present yourself at the highest level.",
  whatsapp: "{{WHATSAPP_NUMBER}}", // e.g. 250xxxxxxxxx, no + sign
  calUsername: "{{CAL_USERNAME}}", // cal.com handle
  socials: { instagram: "", facebook: "", x: "", linkedin: "" },
};

export const services = [ /* { id, label, title, description } */ ];

export const steps = [ /* { num, command, title, description } */ ];

export const work = [
  // { slug, category: "Personal|School|Business", title, summary,
  //   client, isSample: true, cover, gallery: [], details }
];
```

Use realistic placeholder samples for now (a student applying to university, a secondary school, a photographer). Mark them `isSample: true`.

## 6. Integrations

- **Booking — Cal.com**: inline embed using the official React embed (`@calcom/embed-react`) pointed at `brand.calUsername`. Free consultation event type. If the embed handle is not set yet, render a clean placeholder block with a "Book a free consult" button linking to the Cal.com page.
- **WhatsApp**: click-to-chat link `https://wa.me/{{WHATSAPP_NUMBER}}?text=Hi%20.sudo%2C%20I%27d%20like%20a%20portfolio.` Primary contact method, prominent.
- **Contact form**: use Web3Forms (no backend, free) with a placeholder access key `{{WEB3FORMS_KEY}}`. Fields: name, contact (email or WhatsApp), what they need, message. This is backup to WhatsApp.
- **Payment**: NONE in the MVP. Pricing is agreed on the consult call, then a Flutterwave payment link is sent over WhatsApp. Do not build checkout. Do not add a pricing/checkout page.

## 7. SEO and shareability

- Per-route title, description, and Open Graph image (`og:image`, `og:title`, `og:description`, `twitter:card`). Use `react-helmet-async`.
- Each `/work/:slug` gets its own OG tags so individual samples preview well when shared.
- Add a tasteful default OG image for the homepage.

## 8. Build order

1. Scaffold Vite + React + Tailwind + Framer Motion + React Router. Wire fonts and color tokens. Confirm dark theme renders.
2. Build `content.js` with placeholder data.
3. Build the landing page top to bottom (nav, hero with typewriter, services, work grid, how it works, about, booking placeholder, contact, footer).
4. Add the `/work/:slug` sample route.
5. Wire Cal.com embed, WhatsApp link, Web3Forms.
6. Add SEO/OG per route.
7. Polish motion, responsiveness, accessibility, reduced-motion. Lighthouse pass.

Build in that order. After step 3, pause so I can review the landing visually before you go further.

## 9. Conventions

- Voice in all site copy: direct, confident, first person, no performative filler, no AI-sounding superlatives. No em-dashes in copy; use periods or commas.
- Mobile-first and fully responsive. The audience is heavily mobile.
- Accessible: semantic HTML, focus states, color contrast on the off-white text, `aria` where needed.
- Keep components small and named clearly. One section per component file.
- Do not invent client logos or fake testimonials. Use clearly marked sample work only.

## 10. Placeholders to fill in

Before going live, replace: `{{WHATSAPP_NUMBER}}`, `{{CAL_USERNAME}}`, `{{WEB3FORMS_KEY}}`, social URLs, and swap sample work for real pieces as they come in.
