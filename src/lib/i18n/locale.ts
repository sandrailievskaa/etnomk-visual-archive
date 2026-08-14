export type Locale = "mk" | "en" | "sq";

export const LOCALES: Locale[] = ["mk", "en", "sq"];

export const DEFAULT_LOCALE: Locale = "mk";

export const LOCALE_NAMES: Record<Locale, string> = {
  mk: "Македонски",
  en: "English",
  sq: "Shqip",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  mk: "🇲🇰",
  en: "🇬🇧",
  sq: "🇦🇱",
};
