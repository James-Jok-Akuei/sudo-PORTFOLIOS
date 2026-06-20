import { useEffect } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useContent } from "../i18n/LanguageContext.jsx";
import { calUrl, isPlaceholder } from "../lib/links.js";
import { fadeRise } from "../lib/motion.js";
import Section from "./ui/Section.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";
import CommandButton from "./ui/CommandButton.jsx";

export default function Booking() {
  const { brand, booking } = useContent();
  const ready = !isPlaceholder(brand.calUsername);

  useEffect(() => {
    if (!ready) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#078930" },
        },
      });
    })();
  }, [ready]);

  return (
    <Section id="booking">
      <motion.div variants={fadeRise}>
        <Eyebrow>{booking.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {booking.heading}
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">{booking.subhead}</p>
      </motion.div>

      <motion.div
        variants={fadeRise}
        className="mt-10 overflow-hidden rounded-lg border border-border bg-surface"
      >
        {ready ? (
          <Cal
            namespace={brand.calEvent}
            calLink={`${brand.calUsername}/${brand.calEvent}`}
            style={{ width: "100%", height: "100%", minHeight: "640px" }}
            config={{ theme: "dark", layout: "month_view" }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 px-6 py-20 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
              {/* Placeholder until brand.calUsername is configured. */}
              {booking.comingSoon}
            </p>
            <p className="max-w-md text-text-muted">{booking.comingSoonBody}</p>
            <CommandButton href={calUrl()}>{booking.cta}</CommandButton>
          </div>
        )}
      </motion.div>
    </Section>
  );
}
