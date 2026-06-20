import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "../i18n/LanguageContext.jsx";
import { fadeRise } from "../lib/motion.js";

// Horizontal, swipeable rail of work cards with prev/next arrows. Scales to any
// number of pieces without an endless vertical scroll. Each card is fully
// clickable and opens that piece's page. RTL-aware: arrows and scroll flip.
export default function WorkCarousel({ work }) {
  const { dir } = useLang();
  const rtl = dir === "rtl";
  const items = work.items;
  const rail = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    // abs() handles the negative scrollLeft browsers use in RTL.
    const pos = Math.abs(el.scrollLeft);
    setAtStart(pos <= 2);
    setAtEnd(pos + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, items.length]);

  // logical: -1 = previous (earlier items), +1 = next (later items).
  const move = (logical) => {
    const el = rail.current;
    if (!el) return;
    const sign = rtl ? -1 : 1;
    el.scrollBy({ left: logical * sign * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-md border border-border text-text transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text";

  return (
    <motion.div variants={fadeRise}>
      {/* Rail controls. Glyphs point the reading direction. */}
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={atStart}
          aria-label="Previous works"
          className={arrow}
        >
          <span aria-hidden="true">{rtl ? "→" : "←"}</span>
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={atEnd}
          aria-label="Next works"
          className={arrow}
        >
          <span aria-hidden="true">{rtl ? "←" : "→"}</span>
        </button>
      </div>

      <ul
        ref={rail}
        aria-label={work.heading}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {items.map((w) => {
          const cardClass =
            "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-accent-glow";
          const inner = (
            <>
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={w.cover}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  className={`absolute left-3 top-3 rounded border bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide backdrop-blur ${
                    w.isSample
                      ? "border-border text-text-muted"
                      : "border-accent/40 text-accent"
                  }`}
                >
                  {w.isSample ? work.sampleBadge : work.liveBadge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                  {w.category}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold text-text">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-3">
                  {w.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors group-hover:text-accent">
                  {w.url ? work.visitLabel : work.viewLabel}{" "}
                  <span aria-hidden="true">{rtl ? "←" : "→"}</span>
                </span>
              </div>
            </>
          );

          return (
            <li
              key={w.slug}
              className="w-[85%] shrink-0 snap-start sm:w-[47%] lg:w-[31.5%]"
            >
              {w.url ? (
                <a
                  href={w.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {inner}
                </a>
              ) : (
                <Link to={`/work/${w.slug}`} className={cardClass}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
