import { config, buildWork } from "./config.js";

// English content (default locale).
const en = {
  brand: {
    ...config,
    tagline: "Permission to present yourself at the highest level.",
    whatsappMessage: "Hi .sudo, I'd like a portfolio.",
  },

  nav: {
    links: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "How it works", href: "#how-it-works" },
      { label: "About", href: "#about" },
    ],
    cta: "Book a call",
  },

  hero: {
    eyebrow: "Portfolios, done right",
    headline: "Portfolios that get you taken seriously.",
    subhead:
      "I build clean, fast, personal portfolios for students, professionals, schools, and businesses. Built for South Sudanese at home and in the diaspora, and for anyone, anywhere, who wants to present themselves at the highest level.",
    primaryCta: "Book a free consult",
    secondaryCta: "Message on WhatsApp",
  },

  services: {
    eyebrow: "Services",
    heading: "What I build",
    subhead: "Pick the closest fit. We sharpen the details on the call.",
    items: [
      {
        id: "personal",
        label: "personal",
        title: "Personal portfolios",
        description:
          "A sharp one-page site that shows who you are, what you have done, and how to reach you. Built for job seekers, freelancers, and creatives.",
      },
      {
        id: "website",
        label: "website",
        title: "Website portfolios",
        description:
          "A multi-page custom site when you need room for projects, case studies, a blog, or a shop. Yours to grow into.",
      },
      {
        id: "school",
        label: "school",
        title: "School portfolios",
        description:
          "A credible web presence for a secondary school or program. Show your story, your results, and how families can enroll.",
      },
      {
        id: "more",
        label: "and more",
        title: "And more",
        description:
          "Business sites, application portfolios, redesigns. If you need to present yourself well online, bring it to the call.",
      },
    ],
  },

  steps: {
    eyebrow: "How it works",
    heading: "Four steps, no surprises",
    items: [
      {
        num: "01",
        command: "book",
        title: "Book a free call",
        description:
          "Pick a time that works. No cost, no pressure. We just talk about what you need.",
      },
      {
        num: "02",
        command: "discuss",
        title: "Discuss what you need",
        description:
          "I learn your goal, your audience, and the story you want to tell. You bring whatever you have.",
      },
      {
        num: "03",
        command: "agree",
        title: "Agree on scope and price",
        description:
          "Clear scope, clear timeline, clear price. No surprises. You decide before any work starts.",
      },
      {
        num: "04",
        command: "build",
        title: "Build and deliver",
        description:
          "I build it, you review it, we refine it, and it goes live. You leave with something you are proud to share.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "The story behind",
    body: [
      "sudo is the command that runs with elevated privileges. That is the idea behind this work. A good portfolio gives you permission to be seen at the level you actually operate at.",
      "I am a builder focused on the South Sudanese community at home and across the diaspora, though I work with anyone. I have watched talented people get passed over because nothing online backed them up. This fixes that.",
      "You get direct, honest work. We talk like people, we agree on a plan, and I build you something fast, clean, and yours.",
    ],
    facts: [
      { label: "serving", value: "South Sudanese at home, the diaspora, everyone" },
      { label: "focus", value: "Portfolios, done right" },
      { label: "first-call", value: "Always free" },
    ],
  },

  work: {
    eyebrow: "Work",
    heading: "Selected work",
    subhead:
      "Sample pieces built to show the range. Each one is a real, shareable page. Your project is built from scratch for you.",
    sampleBadge: "sample",
    liveBadge: "live",
    viewLabel: "View sample",
    visitLabel: "Visit site",
    items: buildWork([
      {
        slug: "bcsar-launch-inauguration",
        category: "Business",
        title: "BCSAR — Launch & Inauguration",
        summary:
          "An event site for the launch and inauguration of BCSAR. Tells the story of the occasion and gives everyone one place to follow it.",
        client: "BCSAR",
      },
      {
        slug: "james-jok-dut-akuei",
        category: "Personal",
        title: "James Jok Dut Akuei — Personal Portfolio",
        summary:
          "A personal portfolio that presents James, his work, and how to reach him. Clean, fast, and built to share in a single link.",
        client: "James Jok Dut Akuei",
      },
    ]),
  },

  booking: {
    eyebrow: "Book",
    heading: "Book your free consultation",
    subhead:
      "Pick a time. We talk through what you need. No cost, no commitment.",
    comingSoon: "Booking calendar coming soon",
    comingSoonBody:
      "The live booking calendar is being connected. In the meantime, start your free consultation here.",
    cta: "Book a free consult",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's get you online.",
    body: "WhatsApp is the fastest way to reach me. Prefer a form? Use the one below and I will get back to you.",
    whatsappLabel: "WhatsApp",
    whatsappHint: "Fastest reply. Tap to open a chat with your details prefilled.",
    whatsappCta: "Open WhatsApp chat",
    formTitle: "Send a message",
    selectPlaceholder: "Select one",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "contact", label: "Email or WhatsApp", type: "text", required: true },
      {
        name: "need",
        label: "What you need",
        type: "select",
        required: true,
        options: [
          "Personal portfolio",
          "Website portfolio",
          "School portfolio",
          "Business / other",
        ],
      },
      { name: "message", label: "Message", type: "textarea", required: false },
    ],
    submit: "Send message",
    sending: "Sending...",
    pending: "Form pending setup. Use WhatsApp for now.",
    success: "Sent. I will get back to you soon.",
    error: "Something went wrong. Please try WhatsApp.",
  },

  footer: {
    credit: "built with .sudo",
    cta: "Book a free consult",
    note: "Sample work shown is for demonstration. Your project is built from scratch.",
  },

  workSample: {
    back: "Back to home",
    comingSoon: "Full case page coming in the next build step.",
    notFoundTitle: "404 — sample not found",
    notFoundBody: "That sample does not exist. Head back home.",
  },
};

export default en;
