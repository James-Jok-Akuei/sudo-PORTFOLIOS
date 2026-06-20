import { motion } from "framer-motion";
import { useContent } from "../i18n/LanguageContext.jsx";
import { fadeRise } from "../lib/motion.js";
import Section from "./ui/Section.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";

// Springy, staggered entrance for each step card.
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowItWorks() {
  const { steps } = useContent();

  return (
    <Section id="how-it-works">
      <motion.div variants={fadeRise}>
        <Eyebrow>{steps.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {steps.heading}
        </h2>
      </motion.div>

      <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connector line that draws across the row on desktop. It sits behind
            the cards and shows through the gaps between them. */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-12 hidden h-px origin-left bg-gradient-to-r from-accent/50 to-border lg:block"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        />

        {steps.items.map((step) => (
          <motion.li
            key={step.num}
            variants={card}
            className="group relative rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-accent-glow"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-ink font-heading text-lg font-bold text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-ink">
              {step.num}
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-accent">
              {step.command}
            </p>
            <h3 className="mt-2 font-heading text-lg font-semibold text-text">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {step.description}
            </p>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
