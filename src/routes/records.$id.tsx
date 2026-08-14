import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getRecord } from "@/lib/records";
import { GoldHairline } from "@/components/Ornament";
import { SimilarModal } from "@/components/SimilarModal";
import { useI18n } from "@/lib/i18n/context";
import { useLocalizedRecord } from "@/hooks/use-localized-record";

export const Route = createFileRoute("/records/$id")({
  loader: ({ params }) => {
    const record = getRecord(params.id);
    if (!record) throw notFound();
    return record;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title.en ?? "Record"} — EtnoMK` },
      {
        name: "description",
        content: loaderData?.description.en.slice(0, 155) ?? "Record from the EtnoMK archive.",
      },
      { property: "og:title", content: `${loaderData?.title.en ?? "Record"} — EtnoMK` },
      {
        property: "og:description",
        content: loaderData?.description.en.slice(0, 155) ?? "Record from the EtnoMK archive.",
      },
    ],
  }),
  component: RecordDetails,
});

function RecordDetails() {
  const record = Route.useLoaderData();
  const { t } = useI18n();
  const localized = useLocalizedRecord(record);
  const [open, setOpen] = useState(false);

  const meta = [
    { label: t("field.region"), value: localized.regionLabel },
    { label: t("field.category"), value: localized.categoryLabel },
    { label: t("field.material"), value: localized.materialLabel },
    { label: t("field.technique"), value: localized.techniqueLabel },
    { label: t("field.period"), value: localized.period },
    { label: t("field.inventory"), value: record.inventory },
  ];

  return (
    <div className="container-etno py-16 lg:py-24">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-frame lg:sticky lg:top-32 lg:self-start">
          <img
            src={record.image}
            alt={localized.title}
            width={800}
            height={1000}
            className="aspect-[4/5] w-full rounded-sm object-cover"
          />
        </div>

        <div>
          <p className="label-caps">{localized.categoryLabel}</p>
          <h1 className="mt-3 font-serif text-[40px] leading-tight text-ink lg:text-[48px]">
            {localized.title}
          </h1>

          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="label-caps">{item.label}</dt>
                <dd className="mt-2 font-medium text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>

          <GoldHairline className="my-8" />

          <h2 className="font-serif text-2xl text-ink">{t("field.description")}</h2>
          <p className="mt-4 text-[17px] text-ink-muted">{localized.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-8">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex min-h-11 items-center rounded-sm bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary-dark"
            >
              {t("recordPage.searchSimilar")}
            </button>
            <Link
              to="/browse"
              className="inline-flex min-h-11 items-center gap-2 text-[15px] text-ink-muted transition-colors duration-150 ease-out hover:text-ink"
            >
              <ArrowLeft className="size-4" /> {t("recordPage.backToRecords")}
            </Link>
          </div>
        </div>
      </div>

      <SimilarModal open={open} onClose={() => setOpen(false)} record={record} />
    </div>
  );
}
