import { LOCALE_FLAG_URLS, LOCALE_NAMES, LOCALES } from "@/lib/i18n/locale";
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
          title={LOCALE_NAMES[code]}
          className={`grid min-h-11 min-w-11 place-items-center rounded-sm transition-colors duration-150 ease-out ${
            locale === code ? "bg-primary" : "hover:bg-surface"
          }`}
        >
          <img
            src={LOCALE_FLAG_URLS[code]}
            alt=""
            aria-hidden
            className="h-4 w-6 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(43,24,16,0.15)]"
          />
        </button>
      ))}
    </div>
  );
}
