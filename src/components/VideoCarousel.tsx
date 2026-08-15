import { useEffect, useRef, useState } from "react";
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
const TRANSITION_MS = 1000;
const TOTAL = SLIDES.length;

export function VideoCarousel({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = (index: number) => setActive(((index % TOTAL) + TOTAL) % TOTAL);

  // The <video> for the "next" slide is mounted ahead of time (to preload),
  // but toggling the `autoplay` attribute on an already-mounted element
  // doesn't reliably (re)start playback in most browsers — so switching
  // slides has to imperatively play the new one and pause the old one.
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active]);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % TOTAL), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

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
              style={{ transitionDuration: `${TRANSITION_MS}ms` }}
              className={`absolute inset-0 transition-opacity ease-in-out ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {shouldLoad ? (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="size-full object-cover"
                  poster={slide.poster}
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

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-[rgba(43,24,16,0.55)] to-transparent px-6 py-5">
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
      </div>
    </section>
  );
}
