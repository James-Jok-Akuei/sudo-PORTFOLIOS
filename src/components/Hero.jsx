import { useState, useEffect } from "react";
import { useContent } from "../i18n/LanguageContext.jsx";
import { whatsappUrl } from "../lib/links.js";
import CommandButton from "./ui/CommandButton.jsx";

// Types the headline out once on load, then leaves a blinking accent cursor.
// Respects prefers-reduced-motion by showing the full headline immediately.
function useTypewriter(text, speed = 38) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setOut(text);
      setDone(true);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { out, done };
}

export default function Hero() {
  const { brand, hero } = useContent();
  const { out, done } = useTypewriter(hero.headline);

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8"
    >
      {/* Soft accent glow, very restrained. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--color-accent-soft)" }}
      />

      <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-accent">
        {hero.eyebrow}
      </p>

      <h1
        className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-6xl"
        aria-label={hero.headline}
      >
        <span aria-hidden="true">{out}</span>
        <span
          className={`ml-1 inline-block w-[0.6ch] translate-y-[2px] bg-accent ${
            done ? "animate-blink" : ""
          }`}
          style={{ height: "0.9em" }}
          aria-hidden="true"
        />
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
        {hero.subhead}
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <CommandButton href="#booking">{hero.primaryCta}</CommandButton>
        <CommandButton href={whatsappUrl(brand.whatsappMessage)} variant="ghost">
          {hero.secondaryCta}
        </CommandButton>
      </div>

      <p className="mt-6 font-mono text-xs text-text-muted">
        {brand.tagline}
      </p>
    </section>
  );
}
