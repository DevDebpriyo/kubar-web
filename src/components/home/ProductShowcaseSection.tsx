"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

type MetricCardProps = {
  value: string;
  label: string;
  index: number;
};

function MetricCard({ value, label, index }: MetricCardProps) {
  const accents = [
    {
      solid: "#d4920c",
      glow: "rgba(212,146,12,0.5)",
      topSoft: "rgba(212,146,12,0.2)",
      topFaint: "rgba(212,146,12,0.08)",
    },
    {
      solid: "#1a4fa3",
      glow: "rgba(26,79,163,0.45)",
      topSoft: "rgba(26,79,163,0.2)",
      topFaint: "rgba(26,79,163,0.08)",
    },
    {
      solid: "#138808",
      glow: "rgba(19,136,8,0.45)",
      topSoft: "rgba(19,136,8,0.2)",
      topFaint: "rgba(19,136,8,0.08)",
    },
  ] as const;

  const accent = accents[index % accents.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay: 0.12 + index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(10,10,22,0.86)] px-6 py-7 sm:px-8 sm:py-8"
      style={{
        boxShadow:
          "0 10px 36px rgba(0,0,0,0.42), 0 1px 0 rgba(255,255,255,0.06) inset",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to bottom, ${accent.topSoft} 0%, ${accent.topFaint} 60%, transparent 100%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-14 w-14 rounded-bl-2xl border-b border-l border-white/10 opacity-65"
        aria-hidden="true"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 h-2 w-2 rounded-full"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.18, 1] }}
        transition={{ duration: 2.4, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: accent.solid, boxShadow: `0 0 12px ${accent.glow}` }}
      />
      <div className="relative z-10">
        <p className="text-[42px] sm:text-[48px] leading-none font-black tracking-[-0.035em] text-white stat-value">
          {value}
        </p>
        <p className="mt-3.5 text-[14px] sm:text-[15px] leading-[1.55] text-white/58">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function ProductShowcaseSection() {
  const t = useTranslations("product_showcase");

  const metrics = [
    { value: t("metrics.approval_time.value"), label: t("metrics.approval_time.label") },
    { value: t("metrics.cash_time.value"), label: t("metrics.cash_time.label") },
    { value: t("metrics.approval_rate.value"), label: t("metrics.approval_rate.label") },
  ];

  return (
    <section
      id="product"
      aria-label={t("aria_label")}
      className="relative overflow-hidden px-5 pb-18 pt-8 sm:px-8 sm:pb-22 sm:pt-10 lg:px-10 lg:pb-26"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 92%)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -left-20 top-18 h-72 w-72 rounded-full"
        animate={{ x: [0, 16, 0], y: [0, -18, 0], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(212,146,12,0.2) 0%, transparent 70%)",
          filter: "blur(44px)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full"
        animate={{ x: [0, -20, 0], y: [0, 14, 0], opacity: [0.14, 0.24, 0.14] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(74,132,255,0.18) 0%, transparent 72%)",
          filter: "blur(52px)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute h-64 w-64 rounded-full"
        animate={{ x: [0, 14, 0], y: [0, -12, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{
          right: "24%",
          top: "24%",
          background: "radial-gradient(circle, rgba(19,136,8,0.16) 0%, transparent 72%)",
          filter: "blur(48px)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(11,11,24,0.92)_0%,rgba(8,8,18,0.88)_100%)] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-11">
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,146,12,0.55) 28%, rgba(26,79,163,0.45) 54%, rgba(19,136,8,0.52) 76%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/2 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#d4920c]/85" />
            <p className="text-[10.5px] font-semibold tracking-[0.24em] text-white/44 uppercase">
              {t("eyebrow")}
            </p>
          </div>

          <div className="mt-0 flex justify-center">
            <Image
              src="/nd_logo.png"
              alt="NavDhan"
              width={800}
              height={260}
              className="h-[120px] sm:h-[180px] md:h-[220px] w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <p className="mx-auto mt-2 max-w-3xl text-[18px] leading-[1.65] text-white/64 text-pretty">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="pointer-events-none relative mx-auto mt-8 hidden h-10 max-w-5xl items-center sm:flex">
          <div className="h-px w-full bg-linear-to-r from-transparent via-white/16 to-transparent" />
          <div
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,146,12,0.95) 0%, rgba(26,79,163,0.95) 50%, rgba(19,136,8,0.95) 100%)",
              boxShadow: "0 0 14px rgba(19,136,8,0.48)",
            }}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-3 sm:gap-5">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              value={metric.value}
              label={metric.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
