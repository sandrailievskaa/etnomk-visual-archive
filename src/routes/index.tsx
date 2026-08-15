import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ScanSearch, Database, Layers } from "lucide-react";
import heroImage from "@/assets/hero-embroidery.jpg";
import { RECORDS, localize, type EtnoRecord } from "@/lib/records";
import { RecordCard } from "@/components/RecordCard";
import { MotifDivider } from "@/components/Ornament";
import { EmbroideryLoop } from "@/components/EmbroideryLoop";
import { EmbroideryShowcase } from "@/components/EmbroideryShowcase";
import { VideoCarousel } from "@/components/VideoCarousel";
import { InstitutionsMap } from "@/components/InstitutionsMap";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/dictionary";

const AGGREGATOR_KEYS: TranslationKey[] = [
  "home.aggregatorEuropeana",
  "home.aggregatorWikimedia",
  "home.aggregatorGoogleArts",
  "home.aggregatorWorldcat",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EtnoMK — Digital archive of Macedonian embroidery" },
      {
        name: "description",
        content:
          "A catalogue of Macedonian folk costume, embroidery and woven textiles with visual similarity search powered by self-supervised image embeddings.",
      },
      { property: "og:title", content: "EtnoMK — Digital archive of Macedonian embroidery" },
      {
        property: "og:description",
        content:
          "Browse, catalogue and visually search digitised Macedonian folk costumes, carpets and ornaments.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const featured = RECORDS.slice(0, 4);

  const features = [
    { icon: Database, title: t("home.feature1Title"), body: t("home.feature1Body") },
    { icon: ScanSearch, title: t("home.feature2Title"), body: t("home.feature2Body") },
    { icon: Layers, title: t("home.feature3Title"), body: t("home.feature3Body") },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-28 opacity-60 [mask-image:linear-gradient(to_top,black,transparent)] lg:h-36"
        >
          <EmbroideryLoop className="size-full" />
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <img
            src={heroImage}
            alt=""
            aria-hidden
            width={1920}
            height={1088}
            className="size-full scale-x-[-1] object-cover object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
        </div>
        <div className="container-etno relative grid gap-16 pt-8 pb-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-12 lg:pb-24">
          <div className="stitch-in max-w-xl">
            <p className="label-caps">{t("home.eyebrow")}</p>
            <h1 className="mt-6 font-serif text-[40px] leading-[1.1] font-semibold text-ink lg:text-[48px]">
              {t("home.title")}
            </h1>
            <p className="mt-6 text-[17px] text-ink-muted">{t("home.description")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/browse"
                className="inline-flex min-h-11 items-center rounded-sm bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary-dark"
              >
                {t("home.ctaBrowse")}
              </Link>
              <Link
                to="/create"
                className="inline-flex min-h-11 items-center rounded-sm border border-ink/20 px-6 py-3 font-medium text-ink transition-colors duration-150 ease-out hover:border-gold hover:text-primary"
              >
                {t("home.ctaContribute")}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-4 lg:space-y-6">
              <MosaicImage record={featured[0]} className="aspect-[4/5] rounded-lg" />
              <MosaicImage record={featured[2]} className="aspect-square rounded-sm" />
            </div>
            <div className="space-y-4 pt-8 lg:space-y-6 lg:pt-16">
              <MosaicImage record={featured[1]} className="aspect-[3/4] rounded-sm" />
              <MosaicImage record={featured[3]} className="aspect-[4/5] rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      <EmbroideryShowcase />

      <section className="container-etno py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <article key={title}>
              <Icon className="size-6 text-gold" />
              <h2 className="mt-6 font-serif text-2xl text-ink">{title}</h2>
              <p className="mt-4 text-[15px] text-ink-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <MotifDivider className="container-etno" />

      <VideoCarousel />

      <section className="container-etno py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-caps">{t("home.recentEyebrow")}</p>
            <h2 className="mt-3 font-serif text-[28px] text-ink lg:text-[32px]">
              {t("home.recentTitle")}
            </h2>
          </div>
          <Link
            to="/browse"
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-primary transition-colors duration-150 ease-out hover:text-primary-dark"
          >
            {t("home.allRecords")} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {featured.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      </section>

      <MotifDivider className="container-etno" />

      <section className="container-etno py-16 lg:py-24">
        <p className="label-caps">{t("home.mapEyebrow")}</p>
        <h2 className="mt-3 max-w-2xl font-serif text-[28px] text-ink lg:text-[32px]">
          {t("home.mapTitle")}
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] text-ink-muted">{t("home.mapIntro")}</p>

        <InstitutionsMap className="mt-8" />

        <div className="mt-12 border-t border-border pt-8">
          <p className="label-caps">{t("home.mapAggregatorsTitle")}</p>
          <p className="mt-3 max-w-2xl text-[15px] text-ink-muted">
            {t("home.mapAggregatorsIntro")}
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {AGGREGATOR_KEYS.map((key) => (
              <li
                key={key}
                className="rounded-lg border border-border bg-surface p-4 text-[14px] text-ink-muted shadow-card"
              >
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function MosaicImage({ record, className }: { record: EtnoRecord | undefined; className: string }) {
  const { locale } = useI18n();
  if (!record) return null;
  return (
    <div className={`overflow-hidden border border-border bg-surface shadow-lift ${className}`}>
      <img
        src={record.image}
        alt={localize(record.title, locale)}
        loading="lazy"
        className="size-full object-cover"
      />
    </div>
  );
}
