export function MotifStrip({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`motif-strip w-full ${className}`} />;
}

export function MotifDivider({ className = "" }: { className?: string }) {
  return <div aria-hidden role="separator" className={`motif-divider w-full ${className}`} />;
}

export function GoldHairline({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`h-px w-full bg-gold/40 ${className}`} />;
}
