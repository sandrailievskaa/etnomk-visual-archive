const PETAL_COUNT = 8;
const CENTER = 50;
const INNER_R = 9;
const OUTER_R = 46;
const SIDE_R = 27;
const SIDE_SPREAD = 0.26;

function point(radius: number, angle: number) {
  return `${(CENTER + Math.cos(angle) * radius).toFixed(2)} ${(CENTER + Math.sin(angle) * radius).toFixed(2)}`;
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
  className?: string;
};

/**
 * EtnoMK mark — an 8-petal rosette, the same silhouette family as the
 * homepage showcase motif, filled solid so it reads clearly at navbar/
 * favicon sizes. Mirrors public/etnomk-mark.svg (the static favicon file);
 * keep the two in sync if this geometry changes.
 */
export function Logo({ className = "" }: Props) {
  const petals = Array.from({ length: PETAL_COUNT });
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      {petals.map((_, i) => {
        const angle = (i / PETAL_COUNT) * Math.PI * 2 - Math.PI / 2;
        return <path key={i} d={petalPath(angle)} fill="var(--color-primary, #7A1E2B)" />;
      })}
      <circle cx={CENTER} cy={CENTER} r={9} fill="var(--color-gold, #B8862E)" />
    </svg>
  );
}
