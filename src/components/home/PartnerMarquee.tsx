"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";

export function PartnerMarquee() {
  const t = useTranslations("marquee");
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "200px" });
  const itemMap = t.raw("items") as Record<string, string>;

  const items = [
    itemMap.finvision ?? "Winner of FinVision 2026 at NIBM Pune (RBI Think-Tank)",
    itemMap.genesis ?? "Awarded GENESIS grant by GOI",
    itemMap.startup_mahakumbh ?? "Popular Choice Award at Startup Mahakumbh 2025",
    itemMap.perplexity ?? "Perplexity AI Business Fellowship Company",
    itemMap.elevenlabs ?? "ElevenLabs Grants Recipient",
    itemMap.f6s ?? "F6S #6 FinTech",
  ];

  const accentPalette = [
    {
      dot: "rgba(212, 146, 12, 0.72)",
      glow: "rgba(212, 146, 12, 0.45)",
    },
    {
      dot: "rgba(26, 79, 163, 0.72)",
      glow: "rgba(26, 79, 163, 0.45)",
    },
    {
      dot: "rgba(19, 136, 8, 0.72)",
      glow: "rgba(19, 136, 8, 0.45)",
    },
  ] as const;

  const loopedItems = [...items, ...items];

  return (
    <section
      ref={sectionRef}
      aria-label={t("aria_label")}
      className="relative z-10 overflow-hidden border-y border-white/8"
      style={{
        background: "rgba(4, 4, 12, 0.98)",
      }}
    >
      <button
        type="button"
        className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0c0c18]/95 text-white shadow-lg transition-colors hover:border-white/40 hover:bg-[#151526]"
        onClick={() => setIsPaused((paused) => !paused)}
        aria-label={`${isPaused ? "Resume" : "Pause"} ${t("aria_label")}`}
        aria-pressed={isPaused}
      >
        {isPaused ? (
          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
        ) : (
          <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
        )}
      </button>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,146,12,0.45) 28%, rgba(26,79,163,0.4) 52%, rgba(19,136,8,0.45) 74%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-26 bg-gradient-to-r from-[rgba(4,4,12,0.98)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-26 bg-gradient-to-l from-[rgba(4,4,12,0.98)] to-transparent" />

      <div className="overflow-hidden py-4 sm:py-5">
        <div
          className="marquee-track flex w-max items-center gap-8 sm:gap-10"
          style={{
            animationPlayState: isPaused || !isInView ? "paused" : undefined,
          }}
        >
          {loopedItems.map((item, index) => {
            const accent = accentPalette[index % accentPalette.length];

            return (
              <span
                key={`${item}-${index}`}
                className="group inline-flex shrink-0 items-center gap-6 sm:gap-7"
                aria-hidden={index >= items.length}
              >
                <span className="marquee-item-text text-[12px] sm:text-[13px] font-semibold tracking-[0.02em] text-white/80 transition-colors duration-300 group-hover:text-white">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: accent.dot,
                    boxShadow: `0 0 12px ${accent.glow}`,
                  }}
                />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
