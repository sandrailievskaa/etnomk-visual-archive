export type Locale = "mk" | "en" | "sq";

export const LOCALES: Locale[] = ["mk", "en", "sq"];

export const DEFAULT_LOCALE: Locale = "mk";

export const LOCALE_NAMES: Record<Locale, string> = {
  mk: "Македонски",
  en: "English",
  sq: "Shqip",
};

/**
 * Emoji flags are unreliable across platforms (Windows in particular often
 * falls back to plain "MK"/"GB"/"AL" text instead of rendering a flag glyph),
 * so the switcher uses real flag images from flagcdn.com instead — same
 * external-image pattern already used for the footer partner logos.
 */
export const LOCALE_FLAG_URLS: Record<Locale, string> = {
  mk: "https://flagcdn.com/mk.svg",
  en: "https://flagcdn.com/gb.svg",
  sq: "https://flagcdn.com/al.svg",
};
