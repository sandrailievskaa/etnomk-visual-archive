import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
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

export function VideoCarousel({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const goTo = (index: number) => setActive(((index % TOTAL) + TOTAL) % TOTAL);

  // Self-rotating; always pausable via the control at the bottom.
  useEffect(() => {
    if (!autoAdvance) return;
    const timer = setInterval(() => setActive((a) => (a + 1) % TOTAL), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [autoAdvance]);

  return (
    <section aria-label={t("home.videoTitle")} className={`bg-ink ${className}`}>
      <div className="relative aspect-video w-full">
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
                  className="size-full object-cover"
                  poster={slide.poster}
                  autoPlay={isActive}
                  muted
                  loop
                  playsInline
                  preload={isActive ? "auto" : "metadata"}
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
            </div>
          );
        })}

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-6 bg-gradient-to-t from-[rgba(43,24,16,0.55)] to-transparent px-6 py-5">
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={t("home.videoGoToSlide", { index: index + 1 })}
                aria-current={index === active}
                className="grid size-8 place-items-center"
              >
                <span
                  className={`block rounded-full transition-all duration-200 ease-out ${
                    index === active ? "size-2.5 bg-gold" : "size-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setAutoAdvance((value) => !value)}
            aria-label={t(autoAdvance ? "home.videoPause" : "home.videoPlay")}
            className="grid size-8 place-items-center rounded-full text-white/80 transition-colors duration-150 ease-out hover:text-white"
          >
            {autoAdvance ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
