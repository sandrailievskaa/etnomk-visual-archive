import { LOCALE_NAMES, LOCALES } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/context";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className={`inline-flex rounded-sm border border-border bg-surface-alt p-1 ${className}`}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          aria-label={LOCALE_NAMES[code]}
          className={`min-h-11 min-w-12 rounded-sm px-3 text-[13px] font-semibold tracking-[0.05em] uppercase transition-colors duration-150 ease-out ${
            locale === code ? "bg-primary text-primary-foreground" : "text-ink-muted hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
