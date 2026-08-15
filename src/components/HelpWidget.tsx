import { useEffect, useRef, useState, type ComponentType } from "react";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { CHAT_TOPICS, CHAT_TOPIC_ORDER, type ChatTopicId } from "@/lib/chat-topics";
import { BabaAvatar } from "./BabaAvatar";

type Props = {
  /** Swappable avatar — pass a different component to change the persona
   * (e.g. an illustrated character) without touching any chat logic. */
  avatarSrc?: ComponentType<{ className?: string }>;
};

export function HelpWidget({ avatarSrc: Avatar = BabaAvatar }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [transcript, setTranscript] = useState<ChatTopicId[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lastTopic = transcript[transcript.length - 1];
  const options = lastTopic ? CHAT_TOPICS[lastTopic].followUps : CHAT_TOPIC_ORDER;

  const ask = (id: ChatTopicId) => setTranscript((prev) => [...prev, id]);
  const restart = () => setTranscript([]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [open, transcript]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col items-end gap-4">
      {open && (
        <div
          role="dialog"
          aria-label={t("chat.title")}
          className="stitch-in flex max-h-[70vh] w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-panel"
        >
          <div className="flex items-center gap-3 border-b border-border bg-surface-alt px-4 py-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary p-1">
              <Avatar className="size-7" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-serif text-base font-semibold text-ink">
                {t("chat.title")}
              </p>
              <p className="truncate text-[12px] text-ink-muted">{t("chat.subtitle")}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("chat.closeLabel")}
              className="ml-auto grid size-9 shrink-0 place-items-center rounded-sm text-ink-muted transition-colors duration-150 ease-out hover:bg-surface hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </div>

          <div ref={scrollRef} className="chat-pattern-bg flex-1 overflow-y-auto px-4 py-4">
            <div className="relative z-10 space-y-4">
              {transcript.length === 0 && (
                <p className="text-[13px] text-ink-muted">{t("chat.startPrompt")}</p>
              )}
              {transcript.map((topicId, index) => {
                const topic = CHAT_TOPICS[topicId];
                return (
                  <div key={`${topicId}-${index}`} className="space-y-2">
                    <p className="ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-primary px-3.5 py-2 text-[13px] text-primary-foreground">
                      {t(topic.questionKey)}
                    </p>
                    <p className="max-w-[90%] rounded-lg rounded-bl-sm border border-border bg-surface px-3.5 py-2 text-[13px] text-ink shadow-card">
                      {t(topic.answerKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {options.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => ask(id)}
                className="rounded-full border border-border bg-surface px-3.5 py-2 text-[12.5px] text-ink transition-colors duration-150 ease-out hover:border-gold hover:bg-surface-alt"
              >
                {t(CHAT_TOPICS[id].questionKey)}
              </button>
            ))}
            {transcript.length > 0 && (
              <button
                type="button"
                onClick={restart}
                className="rounded-full px-3.5 py-2 text-[12.5px] text-primary underline-offset-2 transition-colors duration-150 ease-out hover:text-primary-dark hover:underline"
              >
                {t("chat.restart")}
              </button>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t(open ? "chat.closeLabel" : "chat.openLabel")}
        aria-expanded={open}
        className="grid size-14 place-items-center rounded-full bg-primary p-2 shadow-panel transition-transform duration-150 ease-out hover:scale-105"
      >
        {open ? <X className="size-6 text-primary-foreground" /> : <Avatar className="size-9" />}
      </button>
    </div>
  );
}
