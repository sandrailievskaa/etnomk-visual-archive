import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./locale";
import { DICTIONARIES, type TranslationKey } from "./dictionary";

const STORAGE_KEY = "etnomk-locale";

function detectBrowserLocale(): Locale {
  const lang = window.navigator.language.slice(0, 2).toLowerCase();
  if (lang === "mk" || lang === "en" || lang === "sq") return lang;
  return DEFAULT_LOCALE;
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Locale preference is client-only (no cookie/URL scheme), so the initial
  // server-rendered pass always uses DEFAULT_LOCALE and reconciles here to
  // avoid a hydration mismatch.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial =
      stored && LOCALES.includes(stored as Locale) ? (stored as Locale) : detectBrowserLocale();
    setLocaleState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const t = useMemo(() => {
    const dict = DICTIONARIES[locale];
    return (key: TranslationKey, vars?: Record<string, string | number>) => {
      const template = dict[key];
      if (!vars) return template;
      return Object.entries(vars).reduce(
        (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
        template,
      );
    };
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
