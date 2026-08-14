import { useI18n } from "@/lib/i18n/context";

const PETAL_COUNT = 8;
const CENTER = 100;
const INNER_R = 24;
const OUTER_R = 78;
const SIDE_R = 48;
const SIDE_SPREAD = 0.17;

function point(radius: number, angle: number) {
  return `${(CENTER + Math.cos(angle) * radius).toFixed(1)} ${(CENTER + Math.sin(angle) * radius).toFixed(1)}`;
}

function petalPath(angle: number) {
  return [
    `M${point(INNER_R, angle)}`,
    `L${point(SIDE_R, angle - SIDE_SPREAD)}`,
    `L${point(OUTER_R, angle)}`,
    `L${point(SIDE_R, angle + SIDE_SPREAD)}`,
    "Z",
  ].join(" ");
}

type Props = {
  /** Overrides the translated default — kept as a prop so callers can swap it. */
  caption?: string;
  className?: string;
};

/**
 * Homepage motion showcase. No embroidery footage exists yet, so a single
 * rosette medallion "stitches" itself in on a loop instead — same
 * stroke-dashoffset technique as the hero motif, sized up and slowed to
 * ~4s. Once real video exists, swap the <svg> below for a <video> element;
 * the section shell and caption prop stay the same.
 */
export function EmbroideryShowcase({ caption, className = "" }: Props) {
  const { t } = useI18n();
  const resolvedCaption = caption ?? t("home.showcaseCaption");
  const petals = Array.from({ length: PETAL_COUNT });

  return (
    <section className={`border-y border-border bg-surface-alt ${className}`}>
      <div className="container-etno flex flex-col items-center gap-8 py-16 text-center lg:py-24">
        <svg aria-hidden viewBox="0 0 200 200" className="size-40 lg:size-52">
          <circle
            cx={CENTER}
            cy={CENTER}
            r={86}
            pathLength={1}
            fill="none"
            strokeWidth={1.25}
            stroke="var(--color-gold)"
            className="rosette-stitch"
          />
          {petals.map((_, i) => {
            const angle = (i / PETAL_COUNT) * Math.PI * 2 - Math.PI / 2;
            return (
              <path
                key={i}
                pathLength={1}
                d={petalPath(angle)}
                fill="none"
                strokeWidth={1.5}
                strokeLinejoin="round"
                stroke={i % 2 === 0 ? "var(--color-primary)" : "var(--color-gold)"}
                className="rosette-stitch"
                style={{ animationDelay: `${0.25 + i * 0.12}s` }}
              />
            );
          })}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={14}
            pathLength={1}
            fill="none"
            strokeWidth={1.5}
            stroke="var(--color-primary)"
            className="rosette-stitch"
            style={{ animationDelay: "1.4s" }}
          />
        </svg>
        <p className="max-w-xl font-serif text-xl text-ink italic lg:text-2xl">{resolvedCaption}</p>
      </div>
    </section>
  );
}
