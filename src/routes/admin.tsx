import { createFileRoute, Link } from "@tanstack/react-router";
import { RECORDS, type EtnoRecord } from "@/lib/records";
import { GoldHairline } from "@/components/Ornament";
import { useI18n } from "@/lib/i18n/context";
import { useLocalizedRecord } from "@/hooks/use-localized-record";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration — EtnoMK archive" },
      {
        name: "description",
        content:
          "Review catalogued records, embedding coverage and pending contributions in the EtnoMK archive.",
      },
      { property: "og:title", content: "Administration — EtnoMK archive" },
      {
        property: "og:description",
        content: "Manage records and monitor embedding coverage across the collection.",
      },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { t } = useI18n();
  const stats = [
    { label: t("admin.statRecords"), value: RECORDS.length },
    { label: t("admin.statRegions"), value: new Set(RECORDS.map((r) => r.region)).size },
    { label: t("admin.statEmbedded"), value: `${RECORDS.length - 1}/${RECORDS.length}` },
    { label: t("admin.statPending"), value: 2 },
  ];

  return (
    <div className="container-etno py-16 lg:py-24">
      <p className="label-caps">{t("admin.eyebrow")}</p>
      <h1 className="mt-3 font-serif text-[40px] text-ink lg:text-[48px]">{t("admin.title")}</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-surface p-6">
            <p className="label-caps">{stat.label}</p>
            <p className="mt-3 font-serif text-[32px] leading-none text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <GoldHairline className="my-16" />

      <h2 className="font-serif text-[28px] text-ink">{t("admin.recordsHeading")}</h2>
      <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full min-w-[720px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-border">
              {[
                t("admin.tableInventory"),
                t("field.title"),
                t("field.region"),
                t("field.category"),
                "",
              ].map((head) => (
                <th key={head} className="label-caps px-6 py-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECORDS.map((record) => (
              <AdminRow key={record.id} record={record} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminRow({ record }: { record: EtnoRecord }) {
  const { t } = useI18n();
  const localized = useLocalizedRecord(record);
  return (
    <tr className="border-b border-border/60 last:border-0">
      <td className="px-6 py-4 text-ink-muted">{record.inventory}</td>
      <td className="px-6 py-4 text-ink">{localized.title}</td>
      <td className="px-6 py-4">
        <span className="rounded-sm bg-gold-light px-2 py-1 text-[13px] text-ink">
          {localized.regionLabel}
        </span>
      </td>
      <td className="px-6 py-4 text-ink-muted">{localized.categoryLabel}</td>
      <td className="px-6 py-4 text-right">
        <Link
          to="/records/$id"
          params={{ id: record.id }}
          className="font-medium text-primary hover:text-primary-dark"
        >
          {t("admin.view")}
        </Link>
      </td>
    </tr>
  );
}
