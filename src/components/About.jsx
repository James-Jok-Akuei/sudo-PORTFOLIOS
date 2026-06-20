import { motion } from "framer-motion";
import { useContent } from "../i18n/LanguageContext.jsx";
import { fadeRise } from "../lib/motion.js";
import Section from "./ui/Section.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";
import SudoLogo from "./ui/SudoLogo.jsx";

export default function About() {
  const { about } = useContent();
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <motion.div variants={fadeRise}>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {about.title}
            <SudoLogo size={30} />
          </h2>
          <div className="mt-6 space-y-4">
            {about.body.map((para, i) => (
              <p key={i} className="max-w-xl leading-relaxed text-text-muted">
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.dl
          variants={fadeRise}
          className="flex flex-col gap-3 self-start rounded-lg border border-border bg-surface p-6"
        >
          {about.facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <dt className="font-mono text-xs text-accent">{fact.label}</dt>
              <dd className="text-right text-sm text-text">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </Section>
  );
}
