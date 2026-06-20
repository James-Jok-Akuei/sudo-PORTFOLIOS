import { motion } from "framer-motion";
import { useContent } from "../i18n/LanguageContext.jsx";
import { fadeRise } from "../lib/motion.js";
import Section from "./ui/Section.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";

export default function Services() {
  const { services } = useContent();

  return (
    <Section id="services">
      <motion.div variants={fadeRise}>
        <Eyebrow>{services.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {services.heading}
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">{services.subhead}</p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {services.items.map((s) => (
          <motion.article
            key={s.id}
            variants={fadeRise}
            className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/40"
          >
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              {s.label}
            </p>
            <h3 className="mt-4 font-heading text-xl font-semibold text-text">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {s.description}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
