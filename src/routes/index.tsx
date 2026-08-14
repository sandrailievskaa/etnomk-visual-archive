import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ScanSearch, Database, Layers } from "lucide-react";
import heroImage from "@/assets/hero-embroidery.jpg";
import { RECORDS } from "@/lib/records";
import { RecordCard } from "@/components/RecordCard";
import { MotifDivider } from "@/components/Ornament";

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
  const featured = RECORDS.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImage}
          alt=""
          aria-hidden
          width={1920}
          height={1088}
          className="absolute inset-0 size-full scale-x-[-1] object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/25" />
        <div className="container-etno relative grid gap-16 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
          <div className="stitch-in max-w-xl">
            <p className="label-caps">Digital heritage archive · North Macedonia</p>
            <h1 className="mt-6 font-serif text-[40px] leading-[1.1] font-semibold text-ink lg:text-[48px]">
              Every stitch, catalogued and searchable.
            </h1>
            <p className="mt-6 text-[17px] text-ink-muted">
              EtnoMK documents folk costume, embroidery and woven textiles from across the
              country — and lets researchers find related motifs by image, not by keyword.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/browse"
                className="inline-flex min-h-11 items-center rounded-sm bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary-dark"
              >
                Browse the archive
              </Link>
              <Link
                to="/create"
                className="inline-flex min-h-11 items-center rounded-sm border border-ink/20 px-6 py-3 font-medium text-ink transition-colors duration-150 ease-out hover:border-gold hover:text-primary"
              >
                Contribute a record
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

      <section className="container-etno py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              icon: Database,
              title: "Structured cataloguing",
              body: "Region, category, material and technique recorded against a shared vocabulary, so collections stay comparable across institutions.",
            },
            {
              icon: ScanSearch,
              title: "Search by image",
              body: "DINOv2 embeddings turn each photograph into a vector; pgvector returns the nearest visual matches in the archive.",
            },
            {
              icon: Layers,
              title: "Patch-level motifs",
              body: "Beyond whole-image search, patch embeddings isolate individual rosettes and borders for motif-level study.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <article key={title}>
              <Icon className="size-6 text-gold" />
              <h2 className="mt-6 font-serif text-2xl text-ink">{title}</h2>
              <p className="mt-4 text-[15px] text-ink-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <MotifDivider className="container-etno" />

      <section className="container-etno py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-caps">Recently digitised</p>
            <h2 className="mt-3 font-serif text-[28px] text-ink lg:text-[32px]">
              From the collection
            </h2>
          </div>
          <Link
            to="/browse"
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-primary transition-colors duration-150 ease-out hover:text-primary-dark"
          >
            All records <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {featured.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      </section>
    </>
  );
}

function MosaicImage({
  record,
  className,
}: {
  record: (typeof RECORDS)[number] | undefined;
  className: string;
}) {
  if (!record) return null;
  return (
    <div className={`overflow-hidden border border-border bg-surface shadow-lift ${className}`}>
      <img
        src={record.image}
        alt={record.title}
        loading="lazy"
        className="size-full object-cover"
      />
    </div>
  );
}
