import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useContent } from "../i18n/LanguageContext.jsx";
import { useTheme } from "../lib/useTheme.js";
import { calUrl, isPlaceholder } from "../lib/links.js";
import { fadeRise } from "../lib/motion.js";
import Section from "./ui/Section.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";
import CommandButton from "./ui/CommandButton.jsx";

export default function Booking() {
  const { brand, booking } = useContent();
  const { theme } = useTheme();
  const ready = !isPlaceholder(brand.calUsername);
  // Bumping this key remounts the embed back to the fresh calendar, so a
  // visitor who lands on Cal's confirmation/cancel screen can start over.
  const [embedKey, setEmbedKey] = useState(0);

  useEffect(() => {
    if (!ready) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme, // follows the site's light/dark theme
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#DA121A" }, // flag red in light mode
          dark: { "cal-brand": "#078930" }, // flag green in dark mode
        },
      });
    })();
  }, [ready, theme]);

  return (
    <Section id="booking">
      <motion.div variants={fadeRise}>
        <Eyebrow>{booking.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {booking.heading}
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">{booking.subhead}</p>
      </motion.div>

      {ready ? (
        // Standalone: the Cal.com embed renders on its own, no card around it.
        <motion.div variants={fadeRise} className="mt-8">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => setEmbedKey((k) => k + 1)}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs text-text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <span aria-hidden="true">↻</span> {booking.reset}
            </button>
          </div>
          <Cal
            key={`${embedKey}-${theme}`}
            namespace={brand.calEvent}
            calLink={`${brand.calUsername}/${brand.calEvent}`}
            style={{ width: "100%", height: "100%", minHeight: "640px" }}
            config={{ theme, layout: "month_view" }}
          />
        </motion.div>
      ) : (
        <motion.div
          variants={fadeRise}
          className="mt-10 overflow-hidden rounded-lg border border-border bg-surface"
        >
          <div className="flex flex-col items-center justify-center gap-6 px-6 py-20 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
              {/* Placeholder until brand.calUsername is configured. */}
              {booking.comingSoon}
            </p>
            <p className="max-w-md text-text-muted">{booking.comingSoonBody}</p>
            <CommandButton href={calUrl()}>{booking.cta}</CommandButton>
          </div>
        </motion.div>
      )}
    </Section>
  );
}
