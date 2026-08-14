import { useEffect, useMemo, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { RECORDS, localize, type EtnoRecord } from "@/lib/records";
import { regionLabel } from "@/lib/i18n/vocab";
import { GoldHairline } from "./Ornament";
import { useI18n } from "@/lib/i18n/context";

type Props = {
  open: boolean;
  onClose: () => void;
  record: EtnoRecord;
};

export function SimilarModal({ open, onClose, record }: Props) {
  const { t, locale } = useI18n();
  const [mode, setMode] = useState<"record" | "upload">("record");
  const [regionHint, setRegionHint] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, [open, mode, regionHint]);

  const results = useMemo(() => {
    const pool = RECORDS.filter((item) => item.id !== record.id);
    const scoped = regionHint
      ? [
          ...pool.filter((item) => item.region === record.region),
          ...pool.filter((item) => item.region !== record.region),
        ]
      : pool;
    return scoped.slice(0, 6).map((item, index) => ({
      record: item,
      score: Math.round((94 - index * 6 + (item.category === record.category ? 3 : 0)) * 10) / 10,
    }));
  }, [record, regionHint]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-[rgba(43,24,16,0.5)]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("modal.title")}
        className="stitch-in relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-xl bg-surface shadow-panel sm:rounded-xl"
      >
        <div className="motif-strip" />
        <div className="flex items-start justify-between gap-6 px-6 pt-6 lg:px-8">
          <div>
            <p className="label-caps">{t("modal.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-2xl text-ink">{t("modal.title")}</h2>
            <p className="mt-2 text-[15px] text-ink-muted">{t("modal.subtitle")}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("modal.close")}
            className="grid size-11 shrink-0 place-items-center rounded-sm text-ink-muted transition-colors duration-150 ease-out hover:bg-surface-alt hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6 px-6 py-6 lg:px-8">
          <div className="inline-flex rounded-sm border border-border bg-surface-alt p-1">
            {(["record", "upload"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`min-h-11 rounded-sm px-6 text-[15px] transition-colors duration-150 ease-out ${
                  mode === value
                    ? "bg-primary font-medium text-primary-foreground"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {value === "record" ? t("modal.tabRecord") : t("modal.tabUpload")}
              </button>
            ))}
          </div>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-ink-muted">
            <input
              type="checkbox"
              checked={regionHint}
              onChange={(event) => setRegionHint(event.target.checked)}
              className="size-4 accent-[#7A1E2B]"
            />
            {t("modal.regionHint", { region: regionLabel(record.region, locale) })}
          </label>
        </div>

        <GoldHairline />

        <div className="overflow-y-auto px-6 py-6 lg:px-8">
          {mode === "upload" && (
            <label className="mb-8 flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-surface-alt/60 px-6 py-8 text-center transition-colors duration-150 ease-out hover:border-gold">
              <UploadCloud className="size-6 text-gold" />
              <span className="text-[15px] text-ink">{t("create.uploadPrompt")}</span>
              <span className="text-[13px] text-ink-muted">{t("modal.uploadHelper")}</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          )}

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <div className="skeleton-thread aspect-[4/5] w-full rounded-lg" />
                    <div className="skeleton-thread h-4 w-2/3 rounded-sm" />
                  </div>
                ))
              : results.map(({ record: item, score }) => (
                  <figure key={item.id + score} className="space-y-3">
                    <div className="overflow-hidden rounded-lg border border-border">
                      <img
                        src={item.image}
                        alt={localize(item.title, locale)}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </div>
                    <figcaption className="space-y-2">
                      <p className="line-clamp-1 text-[15px] text-ink">
                        {localize(item.title, locale)}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="h-1 flex-1 overflow-hidden rounded-sm bg-surface-alt">
                          <div className="h-full bg-gold" style={{ width: `${score}%` }} />
                        </div>
                        <span className="text-[13px] text-ink-muted">{score}%</span>
                      </div>
                    </figcaption>
                  </figure>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
