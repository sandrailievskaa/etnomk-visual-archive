import { Link } from "@tanstack/react-router";
import type { EtnoRecord } from "@/lib/records";
import { useLocalizedRecord } from "@/hooks/use-localized-record";

export function RecordCard({ record }: { record: EtnoRecord }) {
  const localized = useLocalizedRecord(record);

  return (
    <Link
      to="/records/$id"
      params={{ id: record.id }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="aspect-[4/5] overflow-hidden bg-surface-alt">
        <img
          src={record.image}
          alt={localized.title}
          loading="lazy"
          width={800}
          height={1000}
          className="size-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-sm bg-gold-light px-2 py-1 text-[13px] leading-none text-ink">
            {localized.regionLabel}
          </span>
          <span className="rounded-sm border border-border px-2 py-1 text-[13px] leading-none text-ink-muted">
            {localized.categoryLabel}
          </span>
        </div>
        <h3 className="font-serif text-lg text-ink">{localized.title}</h3>
        <p className="mt-auto text-[13px] tracking-[0.05em] text-ink-muted uppercase">
          {record.inventory}
        </p>
      </div>
    </Link>
  );
}

export function RecordCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="skeleton-thread aspect-[4/5] w-full" />
      <div className="space-y-3 p-6">
        <div className="skeleton-thread h-5 w-24 rounded-sm" />
        <div className="skeleton-thread h-5 w-full rounded-sm" />
        <div className="skeleton-thread h-4 w-2/3 rounded-sm" />
      </div>
    </div>
  );
}
