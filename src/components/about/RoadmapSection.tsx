"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Data ─────────────────────────────────────────────────────── */
const ROADMAP_ITEMS = [
  {
    label: "Market Gap",
    category: "Foundation\nPhase",
    title: "Market Context",
    description:
      "India's MSME credit segment is severely under-penetrated. DSAs were meant to bridge the gap between financial institutions and MSMEs, but their processes remain manual, and local reach limits their impact at scale.",
  },
  {
    label: "NavDhan",
    category: "Building\nPhase",
    title: "NavDhan Launch",
    description:
      "Becoming India's largest Embedded Credit Origination Platform by replacing manual outreach with AI-driven tools, India Stack APIs for frictionless data collection, and API-first LOS integration for consistent, high-volume borrower delivery.",
  },
  {
    label: "Scale Up",
    category: "Growth\nPhase",
    title: "Deeper Partnerships",
    description:
      "Exploring deeper lender partnerships: workflow automation, customised loan offerings based on platform analytics, tailored co-lending products, and two SaaS verticals purpose-built for the credit ecosystem.",
  },
  {
    label: "Kubar Protocol",
    category: "Innovation\nPhase",
    title: "Kubar Protocol",
    description:
      "Pursuing R&D on Kubar Protocol: tokenising trade finance assets like LoCs, eBLs, and SBLs into globally compliant digital assets for efficient cross-border financing, incubated within the GIFT City ecosystem.",
  },
];

const N = ROADMAP_ITEMS.length;

/* ── Helpers ──────────────────────────────────────────────────── */
function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ── Component ────────────────────────────────────────────────── */
export function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── GSAP ScrollTrigger pin ─────────────────────────────────── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        /* Each of the N items gets exactly 400 vh of scroll time */
        end: `+=${N * 400}vh`,
        pin: true,
        /* Direct scrub — progress line tracks scroll 1:1 */
        scrub: true,
        anticipatePin: 1,

        onUpdate(self) {
          const p = self.progress;

          /* ── Progress fill (direct DOM — zero React cost) ─── */
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${p * 100}%`;
          }

          /* ── Active index ─────────────────────────────────── */
          const next = Math.min(N - 1, Math.floor(p * N));

          /* ── Dot styles ───────────────────────────────────── */
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return;
            if (i === next) {
              dot.style.width = "18px";
              dot.style.height = "18px";
              dot.style.background = "#d4920c";
              dot.style.border = "none";
              dot.style.boxShadow =
                "0 0 0 4px rgba(212,146,12,0.18), 0 0 22px rgba(212,146,12,0.55)";
            } else if (i < next) {
              dot.style.width = "10px";
              dot.style.height = "10px";
              dot.style.background = "#138808";
              dot.style.border = "none";
              dot.style.boxShadow = "0 0 10px rgba(19,136,8,0.5)";
            } else {
              dot.style.width = "10px";
              dot.style.height = "10px";
              dot.style.background = "rgba(255,255,255,0.1)";
              dot.style.border = "1px solid rgba(255,255,255,0.22)";
              dot.style.boxShadow = "none";
            }
          });

          /* ── Label styles ─────────────────────────────────── */
          labelRefs.current.forEach((label, i) => {
            if (!label) return;
            if (i === next) {
              label.style.color = "#d4920c";
            } else if (i < next) {
              label.style.color = "rgba(19,136,8,0.85)";
            } else {
              label.style.color = "rgba(255,255,255,0.22)";
            }
          });

          /* ── Pill indicators ──────────────────────────────── */
          pillRefs.current.forEach((pill, i) => {
            if (!pill) return;
            if (i === next) {
              pill.style.width = "1.5rem";
              pill.style.background = "#d4920c";
            } else if (i < next) {
              pill.style.width = "0.4rem";
              pill.style.background = "rgba(19,136,8,0.65)";
            } else {
              pill.style.width = "0.4rem";
              pill.style.background = "rgba(255,255,255,0.15)";
            }
          });

          /* ── Counter text ─────────────────────────────────── */
          if (counterRef.current) {
            counterRef.current.textContent = pad(next + 1);
          }

          /* ── React state (only fires N times total) ───────── */
          if (next !== activeIndexRef.current) {
            activeIndexRef.current = next;
            setActiveIndex(next);
          }
        },
      });

      // Refresh ScrollTrigger to account for any layout shifts from Framer Motion
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 800);

      return () => clearTimeout(timer);
    },
    { scope: sectionRef },
  );

  const item = ROADMAP_ITEMS[activeIndex];

  return (
    /*
     * The section itself is exactly 100 vh tall.
     * GSAP injects a spacer of N × 100 vh for the scroll distance,
     * so the total space consumed in the page = (N+1) × 100 vh.
     */
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0f]"
      style={{ height: "100vh" }}
      aria-label="Roadmap"
    >
      {/* ── Subtle background accents ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.22)] via-transparent to-[rgba(0,0,0,0.12)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.07)] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.07)] to-transparent" />
        {/* Soft ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[rgba(212,146,12,0.03)] rounded-full blur-[80px]" />
      </div>

      {/* ── Inner layout ──────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-16">
        {/* ════════ HEADER ════════════════════════════════════════ */}
        <div className="flex-shrink-0 pt-[68px] sm:pt-[50px] flex flex-col items-center text-center">
          <div className="about-badge inline-flex bg-[rgba(19,136,8,0.07)] border-[rgba(19,136,8,0.28)] text-[rgba(19,136,8,0.9)] mb-3">
            <Compass className="w-3 h-3 mr-1.5" />
            ROADMAP
          </div>
          <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white tracking-tight leading-none">
            Roadmap
          </h2>
          <motion.div
            className="trust-divider"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            aria-hidden="true"
          />
        </div>

        {/* ════════ TIMELINE ══════════════════════════════════════ */}
        <div className="flex-shrink-0 mt-5 sm:mt-8">
          {/* Labels row — hidden on mobile to avoid overflow on narrow screens */}
          <div className="relative h-6 mb-3 hidden sm:block">
            {ROADMAP_ITEMS.map((roadItem, i) => (
              <div
                key={i}
                className="absolute -translate-x-1/2"
                style={{ left: `${(i / N) * 100}%` }}
              >
                <span
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  className="text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 whitespace-nowrap"
                  style={{
                    color: i === 0 ? "#d4920c" : "rgba(255,255,255,0.22)",
                  }}
                >
                  {roadItem.label}
                </span>
              </div>
            ))}
          </div>

          {/* Track */}
          <div className="relative h-[2px] rounded-full bg-[rgba(255,255,255,0.07)]">
            {/* Animated progress fill */}
            <div
              ref={progressFillRef}
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: "0%",
                background:
                  "linear-gradient(to right, #138808 0%, #d4920c 100%)",
                boxShadow: "0 0 8px rgba(212,146,12,0.28)",
                transition: "none",
              }}
            />

            {/* Checkpoint dots */}
            {ROADMAP_ITEMS.map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${(i / N) * 100}%` }}
              >
                <div
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className="rounded-full"
                  style={
                    i === 0
                      ? {
                          width: "18px",
                          height: "18px",
                          background: "#d4920c",
                          boxShadow:
                            "0 0 0 4px rgba(212,146,12,0.18), 0 0 22px rgba(212,146,12,0.55)",
                          transition:
                            "width 0.4s ease, height 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
                        }
                      : {
                          width: "10px",
                          height: "10px",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.22)",
                          transition:
                            "width 0.4s ease, height 0.4s ease, background 0.4s ease, box-shadow 0.4s ease",
                        }
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* ════════ MAIN CONTENT ══════════════════════════════════ */}
        <div className="flex-1 flex items-center min-h-0 mt-3 sm:mt-5 pb-2">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1px_3fr] gap-6 lg:gap-12 items-center">
            {/* ── Left: large watermark category text ─────────── */}
            <div className="hidden lg:flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`cat-${activeIndex}`}
                  initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="font-extrabold leading-[0.85] tracking-tight whitespace-pre-line select-none"
                  style={{
                    fontSize: "clamp(58px, 6vw, 92px)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.08)",
                  }}
                >
                  {item.category}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* ── Vertical divider (desktop) ───────────────────── */}
            <div className="hidden lg:block w-px self-stretch my-6 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.09)] to-transparent" />

            {/* ── Right: info panel ────────────────────────────── */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${activeIndex}`}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -26 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Mobile-only phase label */}
                  <p className="lg:hidden text-[9px] font-bold tracking-[0.18em] uppercase text-[rgba(19,136,8,0.85)]">
                    {item.category.replace("\n", " ")}
                  </p>

                  {/* Counter + title */}
                  <div className="flex items-baseline gap-3 sm:gap-5">
                    <span
                      className="font-black leading-none tabular-nums flex-shrink-0"
                      style={{
                        /* Smaller on mobile so it doesn't push the title off-screen */
                        fontSize: "clamp(38px, 5.5vw, 76px)",
                        color: "rgba(212,146,12,0.17)",
                      }}
                    >
                      {pad(activeIndex + 1)}
                    </span>
                    <h3 className="text-[18px] sm:text-[24px] lg:text-[30px] font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description — limit lines on mobile so it doesn't overflow 100 vh */}
                  <p className="text-[rgba(255,255,255,0.6)] text-[13px] sm:text-[16px] lg:text-[17px] leading-relaxed max-w-[540px] line-clamp-4 sm:line-clamp-none">
                    {item.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ════════ COUNTER FOOTER ════════════════════════════════ */}
        <div className="flex-shrink-0 pb-4 sm:pb-8 flex items-center gap-4">
          {/* "01 of 04" label */}
          <span
            className="text-sm font-medium tracking-wider tabular-nums"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            <span
              ref={counterRef}
              className="font-bold"
              style={{ fontSize: "15px", color: "#d4920c" }}
            >
              01
            </span>{" "}
            of {pad(N)}
          </span>

          {/* Pill progress indicators */}
          <div className="flex items-center gap-[5px] ml-1">
            {ROADMAP_ITEMS.map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  pillRefs.current[i] = el;
                }}
                className="h-[3px] rounded-full"
                style={{
                  width: i === 0 ? "1.5rem" : "0.4rem",
                  background: i === 0 ? "#d4920c" : "rgba(255,255,255,0.15)",
                  transition: "width 0.4s ease, background 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
