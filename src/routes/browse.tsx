import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, RECORDS, REGIONS, localize } from "@/lib/records";
import { categoryLabel, regionLabel } from "@/lib/i18n/vocab";
import { RecordCard, RecordCardSkeleton } from "@/components/RecordCard";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse records — EtnoMK archive" },
      {
        name: "description",
        content:
          "Filter digitised Macedonian folk costumes, carpets and embroidery ornaments by region and category.",
      },
      { property: "og:title", content: "Browse records — EtnoMK archive" },
      {
        property: "og:description",
        content: "Filter digitised Macedonian textiles by region and category.",
      },
    ],
  }),
  component: Browse,
});

function Browse() {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [query, region, category]);

  const regionOptions = useMemo(
    () => REGIONS.map((slug) => ({ value: slug, label: regionLabel(slug, locale) })),
    [locale],
  );
  const categoryOptions = useMemo(
    () => CATEGORIES.map((slug) => ({ value: slug, label: categoryLabel(slug, locale) })),
    [locale],
  );

  const results = useMemo(
    () =>
      RECORDS.filter(
        (record) =>
          (!region || record.region === region) &&
          (!category || record.category === category) &&
          (!query ||
            `${localize(record.title, locale)} ${localize(record.description, locale)} ${record.inventory}`
              .toLowerCase()
              .includes(query.toLowerCase())),
      ),
    [query, region, category, locale],
  );

  const filters = (
    <>
      <Dropdown
        label={t("field.region")}
        allLabel={t("browse.allRegions")}
        value={region}
        onChange={setRegion}
        options={regionOptions}
      />
      <Dropdown
        label={t("field.category")}
        allLabel={t("browse.allCategories")}
        value={category}
        onChange={setCategory}
        options={categoryOptions}
      />
      <button
        type="button"
        onClick={() => {
          setRegion("");
          setCategory("");
          setQuery("");
        }}
        className="inline-flex min-h-11 items-center rounded-sm border border-border px-6 text-[15px] text-ink-muted transition-colors duration-150 ease-out hover:border-gold hover:text-ink"
      >
        {t("browse.reset")}
      </button>
    </>
  );

  return (
    <div className="container-etno py-16 lg:py-24">
      <p className="label-caps">{t("browse.eyebrow")}</p>
      <h1 className="mt-3 font-serif text-[40px] text-ink lg:text-[48px]">{t("browse.title")}</h1>
      <p className="mt-4 max-w-xl text-[17px] text-ink-muted">
        {t("browse.subtitle", { count: RECORDS.length })}
      </p>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("browse.searchPlaceholder")}
            className="min-h-12 w-full rounded-sm border-[1.5px] border-border bg-surface pr-4 pl-11 text-[15px] text-ink placeholder:text-ink-muted focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none"
          />
        </div>
        <div className="hidden items-center gap-4 lg:flex">{filters}</div>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-border px-6 text-[15px] text-ink lg:hidden"
        >
          <SlidersHorizontal className="size-4" /> {t("browse.filters")}
        </button>
      </div>

      <div className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => <RecordCardSkeleton key={index} />)
        ) : results.length ? (
          results.map((record) => <RecordCard key={record.id} record={record} />)
        ) : (
          <div className="col-span-full rounded-lg border border-dashed border-border bg-surface-alt/60 px-6 py-16 text-center">
            <h2 className="font-serif text-2xl text-ink">{t("browse.emptyTitle")}</h2>
            <p className="mt-3 text-[15px] text-ink-muted">{t("browse.emptyBody")}</p>
          </div>
        )}
      </div>

      {/* Mobile bottom sheet */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sheetOpen ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setSheetOpen(false)}
          className={`absolute inset-0 bg-[rgba(43,24,16,0.5)] transition-opacity duration-250 ease-in-out ${
            sheetOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 rounded-t-xl bg-surface p-6 shadow-panel transition-transform duration-250 ease-in-out ${
            sheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="label-caps">{t("browse.filters")}</span>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label={t("browse.closeFilters")}
              className="grid size-11 place-items-center rounded-sm text-ink"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-4">{filters}</div>
        </div>
      </div>
    </div>
  );
}

function Dropdown({
  label,
  allLabel,
  value,
  onChange,
  options,
}: {
  label: string;
  allLabel: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full appearance-none rounded-sm border-[1.5px] border-border bg-surface py-3 pr-11 pl-4 text-[15px] text-ink focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none lg:w-52"
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 8"
        className="pointer-events-none absolute top-1/2 right-4 h-2 w-3 -translate-y-1/2 fill-gold"
      >
        <path d="M0 0h12L6 8z" />
      </svg>
    </div>
  );
}
