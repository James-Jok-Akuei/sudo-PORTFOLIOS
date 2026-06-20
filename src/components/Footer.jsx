import { useContent } from "../i18n/LanguageContext.jsx";
import CommandButton from "./ui/CommandButton.jsx";
import SudoLogo from "./ui/SudoLogo.jsx";
import SocialIcon from "./ui/SocialIcon.jsx";

export default function Footer() {
  const { brand, footer, nav } = useContent();
  const socials = Object.entries(brand.socials).filter(([, url]) => url);

  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <SudoLogo size={24} />
            <p className="mt-3 max-w-sm text-sm text-text-muted">
              {brand.tagline}
            </p>
          </div>

          <CommandButton href="#booking">{footer.cta}</CommandButton>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-5">
            {nav.links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-xs text-text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {socials.length > 0 && (
            <ul className="flex flex-wrap items-center gap-3">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${brand.name} on ${name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <SocialIcon name={name} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-8 font-mono text-[11px] text-text-muted">
          {footer.note}
        </p>
        <p className="mt-2 font-mono text-[11px] text-text-muted">
          {footer.credit} · © {brand.name}
        </p>
      </div>
    </footer>
  );
}
