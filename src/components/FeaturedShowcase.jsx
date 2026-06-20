import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeRise } from "../lib/motion.js";

const INTERVAL = 4000;

// A browser-frame mockup that gently cross-fades through the sample portfolios
// so visitors immediately see what we build. Auto-advances, pauses on hover,
// and holds still under prefers-reduced-motion.
export default function FeaturedShowcase({ work }) {
  const items = work.items;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || items.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce, paused, items.length]);

  const current = items[index];
  const previewUrl = current.url
    ? current.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `sudoportfolios.com/work/${current.slug}`;

  return (
    <motion.div
      variants={fadeRise}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="ml-2 min-w-0 flex-1">
            <span
              dir="ltr"
              className="inline-flex max-w-full items-center truncate rounded-md bg-ink px-3 py-1 font-mono text-[11px] text-text-muted"
            >
              {previewUrl}
            </span>
          </div>
        </div>

        {/* Cross-fading preview. Real pieces open the live site. */}
        {(() => {
          const previewInner = (
            <>
              <AnimatePresence initial={false}>
                <motion.img
                  key={current.slug}
                  src={current.cover}
                  alt={current.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <span
                className={`absolute left-3 top-3 rounded border bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide backdrop-blur ${
                  current.isSample
                    ? "border-border text-text-muted"
                    : "border-accent/40 text-accent"
                }`}
              >
                {current.isSample ? work.sampleBadge : work.liveBadge}
              </span>
            </>
          );
          const cls = "relative block aspect-[16/10] overflow-hidden";
          return current.url ? (
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={current.title}
              className={cls}
            >
              {previewInner}
            </a>
          ) : (
            <Link to={`/work/${current.slug}`} aria-label={current.title} className={cls}>
              {previewInner}
            </Link>
          );
        })()}
      </div>

      {/* Caption + progress dots */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            {current.category}
          </p>
          <p className="truncate font-heading text-sm font-semibold text-text">
            {current.title}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.slug}
              type="button"
              aria-label={`Show ${it.title}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-accent"
                  : "w-2 bg-border hover:bg-text-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
