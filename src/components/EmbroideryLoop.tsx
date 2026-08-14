const WIDTH = 800;
const HEIGHT = 160;
const COLUMNS = 7;
const SPACING = WIDTH / COLUMNS;

function diamondPath(cx: number, cy: number, r: number) {
  return `M${cx} ${cy - r} L${cx + r} ${cy} L${cx} ${cy + r} L${cx - r} ${cy} Z`;
}

function starPath(cx: number, cy: number, r: number) {
  const d = r * 0.7;
  return [
    `M${cx - r} ${cy} L${cx + r} ${cy}`,
    `M${cx} ${cy - r} L${cx} ${cy + r}`,
    `M${cx - d} ${cy - d} L${cx + d} ${cy + d}`,
    `M${cx - d} ${cy + d} L${cx + d} ${cy - d}`,
  ].join(" ");
}

/**
 * A generative, lightly-animated embroidery motif — diamonds and stitched
 * stars drawing themselves in and fading, looping like a slow-motion thread
 * pass. Stands in for a literal hero video/loop using only inline SVG + CSS,
 * so it costs no page weight and scales crisply at any size.
 */
export function EmbroideryLoop({ className = "" }: { className?: string }) {
  const diamonds = Array.from({ length: COLUMNS });
  const stars = Array.from({ length: COLUMNS - 1 });

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={`pointer-events-none select-none ${className}`}
    >
      {diamonds.map((_, i) => (
        <path
          key={`d-${i}`}
          pathLength={1}
          d={diamondPath(SPACING * i + SPACING / 2, HEIGHT - 34, 20)}
          fill="none"
          strokeWidth={1.75}
          strokeLinejoin="round"
          stroke={i % 2 === 0 ? "var(--color-primary)" : "var(--color-gold)"}
          className="etno-stitch"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      {stars.map((_, i) => (
        <path
          key={`s-${i}`}
          pathLength={1}
          d={starPath(SPACING * i + SPACING, 56, 13)}
          fill="none"
          strokeWidth={1.5}
          strokeLinecap="round"
          stroke="var(--color-gold)"
          className="etno-stitch"
          style={{ animationDelay: `${0.9 + i * 0.4}s` }}
        />
      ))}
    </svg>
  );
}
