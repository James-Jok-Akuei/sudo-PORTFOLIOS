import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import en from "./en.js";
import ar from "./ar.js";

const TREES = { en, ar };
const DIRS = { en: "ltr", ar: "rtl" };

const LanguageContext = createContext(null);

function initialLang() {
  if (typeof document !== "undefined" && document.documentElement.lang === "ar") {
    return "ar";
  }
  try {
    return localStorage.getItem("lang") === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = DIRS[lang];
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* ignore storage errors */
    }
  }, [lang]);

  const toggle = useCallback(
    () => setLang((l) => (l === "en" ? "ar" : "en")),
    []
  );

  const value = useMemo(
    () => ({ lang, dir: DIRS[lang], setLang, toggle, content: TREES[lang] }),
    [lang, toggle]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export function useContent() {
  return useContext(LanguageContext).content;
}
