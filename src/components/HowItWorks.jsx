import { motion } from "framer-motion";
import { useContent } from "../i18n/LanguageContext.jsx";
import { fadeRise } from "../lib/motion.js";
import Section from "./ui/Section.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";

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

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.items.map((step) => (
          <motion.li
            key={step.num}
            variants={fadeRise}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <p className="font-mono text-sm text-accent">
              {step.num} <span className="text-text">{step.command}</span>
            </p>
            <h3 className="mt-4 font-heading text-lg font-semibold text-text">
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
