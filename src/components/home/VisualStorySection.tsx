"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  Box,
  BadgeIndianRupee,
  Radar,
  FileClock,
  BrainCircuit,
  BadgeCheck,
  Wallet,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Landmark,
  FileText,
  Hourglass,
  XOctagon,
  Ban,
  ArrowDown,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import "./VisualStorySection.css";

const timelineIcons = [
  Box,
  BadgeIndianRupee,
  Radar,
  FileClock,
  BrainCircuit,
  BadgeCheck,
  Wallet,
  TrendingUp,
] as const;

type AccentTone = "orange" | "blue" | "green";

type TimelineItem = {
  id: number;
  icon: (typeof timelineIcons)[number];
  title: string;
  description: string;
  visualAlt: string;
  accent: AccentTone;
};

const accentUi: Record<AccentTone, {
  outline: string;
  mutedBg: string;
  text: string;
  progress: string;
}> = {
  orange: {
    outline: "border-amber-300/40",
    mutedBg: "bg-amber-400/10",
    text: "text-amber-200",
    progress: "from-amber-300 to-amber-500",
  },
  blue: {
    outline: "border-blue-300/40",
    mutedBg: "bg-blue-400/10",
    text: "text-blue-200",
    progress: "from-blue-300 to-blue-500",
  },
  green: {
    outline: "border-emerald-300/40",
    mutedBg: "bg-emerald-400/10",
    text: "text-emerald-200",
    progress: "from-emerald-300 to-emerald-500",
  },
};

type VisualTone = (typeof accentUi)[AccentTone];

function TimelineVisualShell({
  item,
  tone,
  children,
  footer,
}: {
  item: TimelineItem;
  tone: VisualTone;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={item.visualAlt}
      className="relative z-2 flex h-full flex-col gap-3 p-4 pb-14 md:p-5 md:pb-14"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge
          variant="outline"
          className={cn(
            "h-6 rounded-md border-white/20 bg-black/35 px-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em]",
            tone.outline,
            tone.text
          )}
        >
          STEP {String(item.id).padStart(2, "0")}
        </Badge>
        <Badge
          variant="secondary"
          className="h-5 bg-white/8 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/80"
        >
          Illustrative
        </Badge>
      </div>

      <Separator className="bg-white/12" />

      <div className="flex-1">{children}</div>

      <div>{footer}</div>
    </div>
  );
}

function TimelineStepVisual({ item }: { item: TimelineItem }) {
  const tone = accentUi[item.accent];

  if (item.id === 1) {
    return (
      <TimelineVisualShell
        item={item}
        tone={tone}
        footer={
          <p className="text-[0.7rem] text-white/70">Illustrative order signal captured from a B2B platform.</p>
        }
      >
        <div className="space-y-2">
          <div className="rounded-lg border border-white/14 bg-black/30 p-2">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-[0.62rem] uppercase tracking-[0.12em] text-white/55">Order Window</p>
              <span className={cn("text-[0.65rem] font-semibold", tone.text)}>₹10L</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className={cn("rounded px-2 py-1 text-[0.63rem] font-medium text-white/85", tone.mutedBg)}>
                Textile
              </div>
              <div className="rounded bg-white/10 px-2 py-1 text-[0.63rem] font-medium text-white/80">B2B Platform</div>
              <div className="rounded bg-white/10 px-2 py-1 text-[0.63rem] font-medium text-white/80">B2B</div>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/3 p-2 text-[0.68rem] text-white/70">
            Purchase order linked to the business profile with consent.
          </div>
        </div>
      </TimelineVisualShell>
    );
  }

  if (item.id === 2) {
    return (
      <TimelineVisualShell
        item={item}
        tone={tone}
        footer={
          <p className="text-[0.7rem] text-white/70">Illustrative working-capital gap calculated from order value and available liquidity.</p>
        }
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/12 bg-black/30 p-2">
              <p className="text-[0.6rem] uppercase tracking-[0.12em] text-white/55">Required</p>
              <p className="text-sm font-semibold text-white">₹10L</p>
            </div>
            <div className="rounded-lg border border-white/12 bg-black/30 p-2">
              <p className="text-[0.6rem] uppercase tracking-[0.12em] text-white/55">Available</p>
              <p className="text-sm font-semibold text-white">₹6L</p>
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-[0.64rem] uppercase tracking-[0.12em] text-white/60">
              <span>Capital Gap</span>
              <span className={tone.text}>₹4L</span>
            </div>
            <div className="h-2 rounded-full bg-white/12">
              <div className={cn("h-full w-2/5 rounded-full bg-linear-to-r", tone.progress)} />
            </div>
          </div>
        </div>
      </TimelineVisualShell>
    );
  }

  if (item.id === 3) {
    return (
      <TimelineVisualShell
        item={item}
        tone={tone}
        footer={
          <p className="text-[0.7rem] text-white/70">Embedded widget flags intent with confidence markers.</p>
        }
      >
        <div className="space-y-2">
          {[
            ["Order Size Spike", "Available"],
            ["Inventory Cycle", "Available"],
            ["Cashflow Stress", "Available"],
          ].map(([label, status]) => (
            <div key={label} className="flex items-center justify-between rounded-md border border-white/12 bg-black/25 px-2.5 py-1.5">
              <span className="text-[0.7rem] text-white/80">{label}</span>
              <span className={cn("text-[0.65rem] font-semibold", tone.text)}>{status}</span>
            </div>
          ))}
        </div>
      </TimelineVisualShell>
    );
  }

  if (item.id === 4) {
    return (
      <TimelineVisualShell
        item={item}
        tone={tone}
        footer={
          <p className="text-[0.7rem] text-white/70">Permissioned data is retrieved and structured for the lender application.</p>
        }
      >
        <div className="space-y-2">
          {[
            ["Bank Statements", "Retrieved"],
            ["GST Data", "Retrieved"],
            ["Order History", "Retrieved"],
          ].map(([source, status]) => (
            <div key={source} className="flex items-center justify-between rounded-md border border-white/12 bg-black/25 px-2.5 py-1.5">
              <span className="text-[0.7rem] text-white/80">{source}</span>
              <span className={cn("inline-flex items-center gap-1 text-[0.65rem] font-semibold", tone.text)}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                {status}
              </span>
            </div>
          ))}
        </div>
      </TimelineVisualShell>
    );
  }

  if (item.id === 5) {
    return (
      <TimelineVisualShell
        item={item}
        tone={tone}
        footer={
          <p className="text-[0.7rem] text-white/70">Sector-specific signals support lender-configured pre-qualification.</p>
        }
      >
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <div className={cn("rounded-lg border px-3 py-2", tone.outline, tone.mutedBg)}>
            <p className="text-[0.62rem] uppercase tracking-[0.12em] text-white/55">Status</p>
            <p className={cn("text-xl font-bold", tone.text)}>Eligible</p>
          </div>
          <div className="space-y-2">
            {[
              ["Cash-Flow Pattern", "Available"],
              ["Order History", "Available"],
              ["Sector Signals", "Available"],
            ].map(([factor, value], idx) => (
              <div key={factor}>
                <div className="mb-1 flex items-center justify-between text-[0.64rem] text-white/70">
                  <span>{factor}</span>
                  <span>{value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/12">
                  <div
                    className={cn("h-full rounded-full bg-linear-to-r", tone.progress)}
                    style={{ width: idx === 0 ? "82%" : idx === 1 ? "76%" : "68%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </TimelineVisualShell>
    );
  }

  if (item.id === 6) {
    return (
      <TimelineVisualShell
        item={item}
        tone={tone}
        footer={
          <p className="text-[0.7rem] text-white/70">Lender-ready application routed to eligible lenders.</p>
        }
      >
        <div className="rounded-lg border border-white/12 bg-black/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[0.62rem] uppercase tracking-[0.12em] text-white/55">Illustrative Lender Offer</p>
            <Badge variant="outline" className={cn("h-5 rounded-md text-[0.58rem]", tone.outline, tone.text)}>
              Subject to Lender Approval
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded bg-white/8 px-1.5 py-1.5">
              <p className="text-[0.58rem] text-white/55">Amount</p>
              <p className="text-[0.73rem] font-semibold text-white">₹4L</p>
            </div>
            <div className="rounded bg-white/8 px-1.5 py-1.5">
              <p className="text-[0.58rem] text-white/55">Rate</p>
              <p className="text-[0.73rem] font-semibold text-white">Lender-set</p>
            </div>
            <div className="rounded bg-white/8 px-1.5 py-1.5">
              <p className="text-[0.58rem] text-white/55">Tenure</p>
              <p className="text-[0.73rem] font-semibold text-white">Lender-set</p>
            </div>
          </div>
        </div>
      </TimelineVisualShell>
    );
  }

  if (item.id === 7) {
    return (
      <TimelineVisualShell
        item={item}
        tone={tone}
        footer={
          <p className="text-[0.7rem] text-white/70">The regulated lender completes underwriting, documentation and disbursal.</p>
        }
      >
        <div className="space-y-3">
          <div className="grid grid-cols-3 items-center gap-2 text-center">
            <div className="rounded-md border border-white/12 bg-black/25 px-2 py-2 text-[0.68rem] text-white/80">Regulated Lender</div>
            <ArrowRight className={cn("mx-auto h-4 w-4", tone.text)} />
            <div className="rounded-md border border-white/12 bg-black/25 px-2 py-2 text-[0.68rem] text-white/80">Business Account</div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-[0.64rem] uppercase tracking-[0.12em] text-white/60">
              <span>Lender Process</span>
              <span className={tone.text}>Illustrative</span>
            </div>
            <div className="h-2 rounded-full bg-white/12">
              <div className={cn("h-full w-full rounded-full bg-linear-to-r", tone.progress)} />
            </div>
          </div>
        </div>
      </TimelineVisualShell>
    );
  }

  return (
    <TimelineVisualShell
      item={item}
      tone={tone}
      footer={
        <p className="text-[0.7rem] text-white/70">The business fulfils the order after lender-approved disbursal.</p>
      }
    >
      <div className="space-y-2">
        <div className="grid grid-cols-4 items-end gap-1.5">
          {[38, 52, 68, 86].map((h, idx) => (
            <div key={h} className="space-y-1">
              <div className="h-14 rounded-sm bg-white/6" style={{ position: "relative" }}>
                <div
                  className={cn("absolute bottom-0 left-0 right-0 rounded-sm bg-linear-to-t", tone.progress)}
                  style={{ height: `${h}%` }}
                />
              </div>
              <p className="text-center text-[0.55rem] text-white/45">Q{idx + 1}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-[0.66rem]">
          <div className="rounded-md border border-white/10 bg-black/25 px-2 py-1.5 text-white/75">Order: Fulfilled</div>
          <div className="rounded-md border border-white/10 bg-black/25 px-2 py-1.5 text-white/75">Outcome: Illustrative</div>
        </div>
      </div>
    </TimelineVisualShell>
  );
}

export function VisualStorySection() {
  const t = useTranslations("visual_story");
  const timelineTrackRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineTrackRef,
    offset: ["start 0.75", "end 0.25"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.25,
  });
  const timelineProgress = prefersReducedMotion ? scrollYProgress : smoothProgress;
  const progressDotTop = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  const timelineItems: TimelineItem[] = timelineIcons.map((icon, index) => {
    const step = index + 1;
    const accents: AccentTone[] = [
      "orange",
      "blue",
      "green",
      "orange",
      "blue",
      "green",
      "orange",
      "blue",
    ];

    return {
      id: step,
      icon,
      title: t(`timeline_titles.${step}`),
      description: t(`steps.${step}`),
      visualAlt: t(`visual_alts.${step}`),
      accent: accents[index] ?? "orange",
    };
  });

  const oldWaySteps = [
    t("old_way_steps.1"),
    t("old_way_steps.2"),
    t("old_way_steps.3"),
    t("old_way_steps.4"),
  ];

  return (
    <section
      id="story"
      aria-label={t("aria_label")}
      className="story-section -mb-20"
    >
      <div className="story-gradient-bg" aria-hidden="true" />

      <div className="story-container">

        {/* Old Way Flow */}
        <div className="old-way-container">
          <h3 className="old-way-title">
            <Ban className="h-4 w-4" /> {t("old_way_label")}
          </h3>
          <div className="old-way-timeline">
            {[
              { icon: Landmark, text: oldWaySteps[0] },
              { icon: FileText, text: oldWaySteps[1] },
              { icon: Hourglass, text: oldWaySteps[2] },
              { icon: XOctagon, text: oldWaySteps[3], failure: true },
            ].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <motion.div
                  className={`old-way-step ${step.failure ? "failure" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                >
                  <div className="old-way-icon">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <p className="old-way-text">{step.text}</p>
                </motion.div>

                {idx < arr.length - 1 && (
                  <motion.div
                    className="old-way-connector"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.1, duration: 0.3 }}
                  >
                    <ArrowDown className="h-5 w-5" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Our Implementation Card */}
        <div className="impl-container">
          <div className="solution-header">
            <motion.div
              className="story-impl-badge flex items-center gap-1.5 sm:gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/nd_logo.png"
                alt="NavDhan"
                width={120}
                height={36}
                className="h-14 sm:h-14 w-auto object-contain drop-shadow-sm"
              />
              <span className="mt-[1px]">IMPLEMENTATION</span>
            </motion.div>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-track" ref={timelineTrackRef}>
              <div className="timeline-center-line" aria-hidden="true">
                <motion.div
                  className="timeline-progress-line"
                  style={{ scaleY: timelineProgress }}
                />
                <motion.div
                  className="timeline-progress-dot"
                  style={{ top: progressDotTop }}
                />
              </div>

              {timelineItems.map((item, index) => {
                const isTextLeft = index % 2 === 0;
                const ItemIcon = item.icon;

                return (
                  <motion.article
                    key={item.id}
                    className={`timeline-item ${isTextLeft ? "timeline-item--text-left" : "timeline-item--text-right"
                      } timeline-item--accent-${item.accent}`}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="timeline-content-side timeline-content-side--text">
                      <div className="timeline-text-content">
                        <p className="timeline-step-eyebrow">
                          STEP {String(item.id).padStart(2, "0")}
                        </p>
                        <h3 className="timeline-step-title">{item.title}</h3>
                        <p className="timeline-step-desc">{item.description}</p>
                      </div>
                    </div>

                    <div className="timeline-number-box" aria-hidden="true">
                      {String(item.id).padStart(2, "0")}
                    </div>

                    <div className="timeline-content-side timeline-content-side--visual">
                      <motion.figure
                        className="timeline-visual-card"
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { y: -8, scale: 1.015 }
                        }
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="timeline-visual-glow" aria-hidden="true" />
                        <TimelineStepVisual item={item} />
                        <figcaption className="timeline-visual-caption">
                          <ItemIcon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </figcaption>
                      </motion.figure>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <motion.div
              className="all-in-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="all-in-title">{t("cta.title")}</h3>
              <p className="all-in-subtitle">{t("cta.subtitle")}</p>
              <a href="/contact" className="all-in-button">
                {t("cta.button")}
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
