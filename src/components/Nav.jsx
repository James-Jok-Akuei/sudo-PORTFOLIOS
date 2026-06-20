import { useState, useEffect } from "react";
import { useContent } from "../i18n/LanguageContext.jsx";
import { useActiveHash } from "../lib/useActiveHash.js";
import { useMediaQuery } from "../lib/useMediaQuery.js";
import SudoLogo from "./ui/SudoLogo.jsx";
import ThemeToggle from "./ui/ThemeToggle.jsx";
import LanguageToggle from "./ui/LanguageToggle.jsx";

export default function Nav() {
  const { nav, hero } = useContent();
  const active = useActiveHash();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-ink/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a href="#top" aria-label="Sudo Portfolios — home">
          <SudoLogo size={20} />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {nav.links.map((item) => {
            const current = isDesktop && item.href === `#${active}`;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`font-mono text-sm transition-colors ${
                    current ? "text-accent" : "text-text-muted hover:text-text"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="#booking"
            className="group inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-sm text-text transition-all hover:border-accent hover:text-accent hover:bg-accent-soft"
          >
            {nav.cta}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-text"
          >
            <span className="font-mono text-base">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-ink/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {nav.links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 font-mono text-sm text-text-muted hover:bg-surface hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-md bg-accent px-2 py-3 text-center font-mono text-sm font-medium text-accent-ink"
              >
                {hero.primaryCta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
