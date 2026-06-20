import { useTheme } from "../../lib/useTheme.js";

// Small icon button that swaps between dark and light themes.
export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:border-accent/40 hover:text-text ${className}`}
    >
      <span aria-hidden="true" className="font-mono text-sm leading-none">
        {isDark ? "☀" : "☾"}
      </span>
    </button>
  );
}
