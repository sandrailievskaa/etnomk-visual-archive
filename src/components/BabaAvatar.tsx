type Props = {
  className?: string;
};

/**
 * Illustrated grandmother avatar for the help chat — headscarf with gold
 * trim and small stitch-dot accents, rosy cheeks, warm smile. Mirrors
 * public/baba-avatar.svg; keep the two in sync if this artwork changes.
 */
export function BabaAvatar({ className = "" }: Props) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <path
        d="M50 8 Q14 16 10 62 Q50 46 90 62 Q86 16 50 8 Z"
        fill="var(--color-primary, #7A1E2B)"
        stroke="var(--color-gold, #B8862E)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <circle cx={28} cy={53} r={2} fill="var(--color-gold, #B8862E)" />
      <circle cx={50} cy={45} r={2} fill="var(--color-gold, #B8862E)" />
      <circle cx={72} cy={53} r={2} fill="var(--color-gold, #B8862E)" />
      <circle cx={50} cy={62} r={22} fill="#F0D9B9" />
      <circle cx={37} cy={68} r={6} fill="#E8A0A0" opacity={0.55} />
      <circle cx={63} cy={68} r={6} fill="#E8A0A0" opacity={0.55} />
      <circle cx={41} cy={60} r={2.2} fill="var(--color-ink, #2B1810)" />
      <circle cx={59} cy={60} r={2.2} fill="var(--color-ink, #2B1810)" />
      <path
        d="M40 74 Q50 81 60 74"
        fill="none"
        stroke="var(--color-ink, #2B1810)"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
