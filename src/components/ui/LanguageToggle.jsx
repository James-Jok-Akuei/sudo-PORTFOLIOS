import { useLang } from "../../i18n/LanguageContext.jsx";

// Switches between English and Arabic. Shows the language you can switch TO.
export default function LanguageToggle({ className = "" }) {
  const { lang, toggle } = useLang();
  const toArabic = lang === "en";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={toArabic ? "التبديل إلى العربية" : "Switch to English"}
      title={toArabic ? "العربية" : "English"}
      className={`flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-2 text-text-muted transition-colors hover:border-accent/40 hover:text-text ${className}`}
    >
      <span className={toArabic ? "text-base leading-none" : "font-mono text-xs"}>
        {toArabic ? "ع" : "EN"}
      </span>
    </button>
  );
}
