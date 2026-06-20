import { useState, useEffect, useCallback } from "react";

// Reads the current theme from the <html> class (set before paint in
// index.html). The class is the single source of truth; this hook mirrors it
// into React state and broadcasts changes so every toggle instance stays in
// sync.
function current() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState(current);

  useEffect(() => {
    const onChange = () => setTheme(current());
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = current() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.classList.toggle("light", next === "light");
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* ignore storage errors */
    }
    window.dispatchEvent(new Event("themechange"));
  }, []);

  return { theme, toggle };
}
