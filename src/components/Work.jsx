import { motion } from "framer-motion";
import { useContent } from "../i18n/LanguageContext.jsx";
import { fadeRise } from "../lib/motion.js";
import Section from "./ui/Section.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";
import FeaturedShowcase from "./FeaturedShowcase.jsx";
import WorkCarousel from "./WorkCarousel.jsx";

export default function Work() {
  const { work } = useContent();

  return (
    <Section id="work">
      <motion.div variants={fadeRise}>
        <Eyebrow>{work.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {work.heading}
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">{work.subhead}</p>
      </motion.div>

      {/* Auto-rotating preview of the samples. */}
      <div className="mt-10">
        <FeaturedShowcase work={work} />
      </div>

      {/* Swipeable rail of all work, with arrows. Scales past a long list. */}
      <div className="mt-12">
        <WorkCarousel work={work} />
      </div>
    </Section>
  );
}
