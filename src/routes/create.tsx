import { createFileRoute } from "@tanstack/react-router";
import { useState, type DragEvent } from "react";
import { UploadCloud } from "lucide-react";
import { CATEGORIES, MATERIALS, REGIONS, TECHNIQUES } from "@/lib/records";
import { GoldHairline } from "@/components/Ornament";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create record — EtnoMK archive" },
      {
        name: "description",
        content:
          "Add a digitised folk costume, carpet or embroidery ornament to the EtnoMK catalogue.",
      },
      { property: "og:title", content: "Create record — EtnoMK archive" },
      {
        property: "og:description",
        content: "Catalogue a new textile object with region, material and technique metadata.",
      },
    ],
  }),
  component: CreateRecord,
});

function CreateRecord() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="container-etno py-16 lg:py-24">
      <div className="max-w-3xl">
        <p className="label-caps">Contribute</p>
        <h1 className="mt-3 font-serif text-[40px] text-ink lg:text-[48px]">Create record</h1>
        <p className="mt-4 text-[17px] text-ink-muted">
          Metadata is stored alongside the image; embeddings are extracted automatically once the
          record is saved.
        </p>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mt-8 space-y-8 rounded-xl border border-border bg-surface p-6 shadow-card lg:p-8"
        >
          <fieldset className="space-y-6">
            <legend className="label-caps">Object</legend>
            <Field
              label="Title"
              helper="A short descriptive name, e.g. “Women's chemise with shoulder embroidery”."
            >
              <input className={inputClass} placeholder="Title of the object" />
            </Field>
            <Field label="Description" helper="Construction, condition, provenance and use.">
              <textarea rows={5} className={`${inputClass} resize-y`} />
            </Field>
          </fieldset>

          <GoldHairline />

          <fieldset className="space-y-6">
            <legend className="label-caps">Classification</legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Region" helper="Regional tradition the object belongs to.">
                <Select options={REGIONS} />
              </Field>
              <Field label="Category" helper="Object type in the shared vocabulary.">
                <Select options={CATEGORIES} />
              </Field>
              <Field label="Material" helper="Primary fibre or thread.">
                <Select options={MATERIALS} />
              </Field>
              <Field label="Technique" helper="Dominant embroidery or weaving technique.">
                <Select options={TECHNIQUES} />
              </Field>
            </div>
          </fieldset>

          <GoldHairline />

          <fieldset className="space-y-6">
            <legend className="label-caps">Image</legend>
            <label
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors duration-150 ease-out ${
                dragging ? "border-gold bg-gold-light/40" : "border-border bg-surface-alt/60"
              }`}
            >
              <UploadCloud className="size-6 text-gold" />
              <span className="text-[15px] text-ink">
                {fileName ?? "Drag an image here or click to upload"}
              </span>
              <span className="text-[13px] text-ink-muted">
                JPG or PNG, minimum 1200px on the long edge
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
              />
            </label>
          </fieldset>

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center rounded-sm bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors duration-150 ease-out hover:bg-primary-dark"
            >
              Save record
            </button>
            <button
              type="reset"
              className="inline-flex min-h-11 items-center rounded-sm border border-border px-6 py-3 text-ink-muted transition-colors duration-150 ease-out hover:border-gold hover:text-ink"
            >
              Clear form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "min-h-12 w-full rounded-sm border-[1.5px] border-border bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none";

function Field({
  label,
  helper,
  children,
}: {
  label: string;
  helper: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-caps">{label}</span>
      <span className="mt-2 block">{children}</span>
      <span className="mt-2 block text-[13px] text-ink-muted">{helper}</span>
    </label>
  );
}

function Select({ options }: { options: string[] }) {
  return (
    <span className="relative block">
      <select className={`${inputClass} appearance-none pr-11`} defaultValue="">
        <option value="" disabled>
          Select…
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
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
    </span>
  );
}
