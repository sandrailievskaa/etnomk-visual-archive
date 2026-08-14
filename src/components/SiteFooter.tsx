import { Link } from "@tanstack/react-router";
import { MotifDivider } from "./Ornament";
import { useI18n } from "@/lib/i18n/context";

const PARTNERS: { name: string; href?: string; logo: string }[] = [
  {
    name: "THREAD — EU Creative Europe",
    href: "https://thread-crea.org/mk/",
    logo: "https://thread-crea.org/images/thread-logo.png",
  },
  {
    name: "Vezilka — National AI Factory",
    href: "https://vezilka.ai/mk/",
    logo: "https://vezilka.ai/wp-content/uploads/2026/05/vezilka-logo-horizontal-transparent.png",
  },
  {
    // No confirmed URL yet — add href once we have one.
    name: "FINKI",
    logo: "/partner-finki-mark.svg",
  },
];

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="mt-16 bg-surface-alt lg:mt-24">
      <MotifDivider />
      <div className="container-etno py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-serif text-2xl font-semibold text-ink">EtnoMK</p>
            <p className="mt-4 text-[15px] text-ink-muted">{t("footer.description")}</p>
          </div>
          <div>
            <p className="label-caps">{t("footer.archiveHeading")}</p>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <Link to="/browse" className="text-ink-muted hover:text-ink">
                  {t("nav.browse")}
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-ink-muted hover:text-ink">
                  {t("home.ctaContribute")}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-ink-muted hover:text-ink">
                  {t("admin.eyebrow")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="label-caps">{t("footer.researchHeading")}</p>
            <ul className="mt-4 space-y-3 text-[15px] text-ink-muted">
              <li>{t("footer.embeddingsLabel")}</li>
              <li>{t("footer.patchLabel")}</li>
              <li>{t("footer.stackLabel")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="label-caps">{t("footer.supportedBy")}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PARTNERS.map((partner) => {
              const logoImg = (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="h-9 w-auto object-contain"
                />
              );
              const partnerClassName =
                "opacity-70 grayscale transition duration-200 ease-out hover:opacity-100 hover:grayscale-0";
              return partner.href ? (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={partner.name}
                  className={partnerClassName}
                >
                  {logoImg}
                </a>
              ) : (
                <span key={partner.name} aria-label={partner.name} className={partnerClassName}>
                  {logoImg}
                </span>
              );
            })}
          </div>
        </div>

        <p className="mt-12 text-center text-[13px] text-ink-muted">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
