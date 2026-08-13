import { Link } from "@tanstack/react-router";
import { MotifDivider } from "./Ornament";

const PARTNERS = [
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
];

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-surface-alt lg:mt-24">
      <MotifDivider />
      <div className="container-etno py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-serif text-2xl font-semibold text-ink">EtnoMK</p>
            <p className="mt-4 text-[15px] text-ink-muted">
              A digital catalogue of Macedonian folk costume, embroidery and woven textiles,
              paired with self-supervised visual search for motif research.
            </p>
          </div>
          <div>
            <p className="label-caps">Archive</p>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <Link to="/browse" className="text-ink-muted hover:text-ink">
                  Browse records
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-ink-muted hover:text-ink">
                  Contribute a record
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-ink-muted hover:text-ink">
                  Administration
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="label-caps">Research</p>
            <ul className="mt-4 space-y-3 text-[15px] text-ink-muted">
              <li>DINOv2 embeddings</li>
              <li>Patch-level similarity</li>
              <li>PostgreSQL + pgvector</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="label-caps">Supported by</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6">
            {PARTNERS.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={partner.name}
                className="opacity-70 grayscale transition duration-200 ease-out hover:opacity-100 hover:grayscale-0"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="h-9 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-12 text-[13px] text-ink-muted">
          © {new Date().getFullYear()} EtnoMK. Research platform for cultural heritage
          digitisation.
        </p>
      </div>
    </footer>
  );
}
