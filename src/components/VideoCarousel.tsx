import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/dictionary";

type Slide = {
  id: string;
  video: string;
  poster: string;
  labelKey: TranslationKey;
};

const SLIDES: Slide[] = [
  {
    id: "window",
    video: "/videos/embroidery-by-window.mp4",
    poster: "/videos/embroidery-by-window-poster.jpg",
    labelKey: "home.videoLabelWindow",
  },
  {
    id: "generations",
    video: "/videos/three-generations.mp4",
    poster: "/videos/three-generations-poster.jpg",
    labelKey: "home.videoLabelGenerations",
  },
  {
    id: "museum",
    video: "/videos/museum-glow.mp4",
    poster: "/videos/museum-glow-poster.jpg",
    labelKey: "home.videoLabelMuseum",
  },
];

const AUTO_ADVANCE_MS = 7000;
const TOTAL = SLIDES.length;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function VideoCarousel({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reducedMotion);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const activeVideoRef = useRef<HTMLVideoElement>(null);

  const goTo = (index: number) => setActive(((index % TOTAL) + TOTAL) % TOTAL);

  // Reduced-motion visitors get a poster + manual play button, never autoplay.
  useEffect(() => {
    setPlaying(!reducedMotion);
  }, [active, reducedMotion]);

  // Auto-advance is off for reduced-motion users and fully pausable otherwise.
  useEffect(() => {
    if (reducedMotion || !autoAdvance) return;
    const timer = setInterval(() => setActive((a) => (a + 1) % TOTAL), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, autoAdvance]);

  return (
    <section
      aria-label={t("home.videoTitle")}
      className={`overflow-hidden rounded-xl border border-border bg-surface shadow-frame ${className}`}
    >
      <div className="relative aspect-video w-full bg-ink">
        {SLIDES.map((slide, index) => {
          const isActive = index === active;
          // Only the active slide and the one it might advance to are ever
          // given a real <video> — everything else stays a static poster
          // until it's within reach, so we never load/play all three at once.
          const shouldLoad = index === active || index === (active + 1) % TOTAL;

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-250 ease-in-out ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {shouldLoad ? (
                <video
                  ref={isActive ? activeVideoRef : null}
                  className="size-full object-cover"
                  poster={slide.poster}
                  muted
                  loop
                  playsInline
                  preload={isActive ? "auto" : "metadata"}
                  autoPlay={isActive && playing}
                  aria-label={t(slide.labelKey)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slide.poster}
                  alt={t(slide.labelKey)}
                  loading="lazy"
                  className="size-full object-cover"
                />
              )}

              {isActive && reducedMotion && !playing && (
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(true);
                    activeVideoRef.current?.play();
                  }}
                  aria-label={t("home.videoPlay")}
                  className="absolute inset-0 grid place-items-center bg-[rgba(43,24,16,0.35)] transition-colors duration-150 ease-out hover:bg-[rgba(43,24,16,0.45)]"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-surface/90 text-primary shadow-panel">
                    <Play className="size-6 translate-x-0.5" fill="currentColor" />
                  </span>
                </button>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label={t("home.videoPrev")}
          className="absolute top-1/2 left-4 grid size-11 -translate-y-1/2 place-items-center rounded-sm border border-border bg-surface/90 text-ink shadow-card backdrop-blur-sm transition-colors duration-150 ease-out hover:bg-surface-alt"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label={t("home.videoNext")}
          className="absolute top-1/2 right-4 grid size-11 -translate-y-1/2 place-items-center rounded-sm border border-border bg-surface/90 text-ink shadow-card backdrop-blur-sm transition-colors duration-150 ease-out hover:bg-surface-alt"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-6 border-t border-border bg-surface-alt px-6 py-4">
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={t("home.videoGoToSlide", { index: index + 1 })}
              aria-current={index === active}
              className="grid size-11 place-items-center"
            >
              <span
                className={`block rounded-full transition-all duration-200 ease-out ${
                  index === active ? "size-2.5 bg-gold" : "size-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            </button>
          ))}
        </div>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setAutoAdvance((value) => !value)}
            aria-label={t(autoAdvance ? "home.videoPause" : "home.videoPlay")}
            className="grid size-11 place-items-center rounded-sm text-ink-muted transition-colors duration-150 ease-out hover:bg-surface hover:text-ink"
          >
            {autoAdvance ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        )}
      </div>
    </section>
  );
}
