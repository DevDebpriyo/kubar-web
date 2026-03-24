"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type ProblemCardProps = {
  title: string;
  subtitle: string;
  bullets: string[];
  accent: "gold" | "blue";
  index: number;
};

function ProblemCard({ title, subtitle, bullets, accent, index }: ProblemCardProps) {
  const accentClass =
    accent === "gold"
      ? "from-[#f5bc35]/35 via-[#d4920c]/12 to-transparent"
      : "from-[#4a84ff]/28 via-[#4a84ff]/10 to-transparent";

  const bulletDotClass = accent === "gold" ? "bg-[#d4920c]/80" : "bg-[#4a84ff]/75";

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(10,10,22,0.88)] px-6 py-7 sm:px-8 sm:py-8 lg:px-9 lg:py-9 backdrop-blur-xl"
      style={{
        boxShadow:
          "0 10px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.05) inset",
      }}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-22 bg-linear-to-b ${accentClass}`}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <h3 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-white leading-[1.08]">
          {title}
        </h3>

        <p className="mt-4 text-[17px] leading-[1.65] text-white/66 max-w-[60ch] text-pretty">
          {subtitle}
        </p>

        <ul className="mt-6 space-y-3.5">
          {bullets.map((bullet, bulletIndex) => (
            <motion.li
              key={bullet}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                duration: 0.45,
                delay: 0.2 + bulletIndex * 0.08 + index * 0.1,
                ease: "easeOut",
              }}
              className="flex items-start gap-3.5"
            >
              <span
                className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${bulletDotClass}`}
                aria-hidden="true"
              />
              <span className="text-[15px] sm:text-[16px] leading-[1.58] text-white/58">
                {bullet}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function ProblemSplitSection() {
  const t = useTranslations("problems");

  return (
    <section
      id="problems"
      aria-label={t("aria_label")}
      className="relative overflow-hidden px-5 py-18 sm:px-8 sm:py-22 lg:px-10 lg:py-26"
    >
      <div
        className="pointer-events-none absolute left-[15%] top-[28%] h-54 w-54 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,146,12,0.13) 0%, transparent 72%)",
          filter: "blur(36px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[8%] bottom-[16%] h-60 w-60 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(74,132,255,0.11) 0%, transparent 72%)",
          filter: "blur(44px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
        <ProblemCard
          title={t("marketplace.title")}
          subtitle={t("marketplace.subtitle")}
          bullets={[
            t("marketplace.bullets.1"),
            t("marketplace.bullets.2"),
            t("marketplace.bullets.3"),
          ]}
          accent="gold"
          index={0}
        />

        <ProblemCard
          title={t("lender.title")}
          subtitle={t("lender.subtitle")}
          bullets={[t("lender.bullets.1"), t("lender.bullets.2"), t("lender.bullets.3")]}
          accent="blue"
          index={1}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto mt-12 w-full max-w-4xl sm:mt-14"
      >
        <div className="relative mb-6 h-4 sm:mb-7">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-white/24 to-transparent" />
          <motion.span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4920c]/80"
            animate={{ scale: [1, 1.14, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 14px rgba(212,146,12,0.55)" }}
          />
        </div>

        <h4 className="text-center text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[42px]">
          {t("conclusion")}
        </h4>
      </motion.div>
    </section>
  );
}
