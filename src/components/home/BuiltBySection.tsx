"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import "./BuiltBySection.css";

function ProductCard({
  name,
  description,
  status,
  statusType,
  index,
}: {
  name: string;
  description: string;
  status: string;
  statusType: "live" | "upcoming";
  index: number;
}) {
  const Icon = statusType === "live" ? Zap : Lock;
  const isLive = statusType === "live";
  const showNavdhanLogo = name === "NavDhan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -8 }}
      className="built-product-card"
    >
      {/* Background glow */}
      <div
        className={`built-card-glow ${isLive ? "live" : "upcoming"}`}
        aria-hidden="true"
      />

      {/* Card content */}
      <div className="built-card-container">
        {/* Left content area */}
        <div className="built-card-content">
          {/* Product name */}
          <div className="flex items-start gap-4">
            {showNavdhanLogo && (
              <Image
                src="/nd_logo.png"
                alt="NavDhan"
                width={120}
                height={36}
                className="h-10 sm:h-14 w-auto object-contain drop-shadow-sm -translate-y-2 sm:-translate-y-3"
              />
            )}
            <motion.h3
              className="built-product-name"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.15 }}
            >
              {name}
            </motion.h3>
          </div>

          {/* Product description */}
          <motion.p
            className="built-product-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + index * 0.15 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Status badge */}
        <motion.div
          className={`built-status-badge ${statusType}`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={isLive ? { boxShadow: ["0 0 12px rgba(74, 132, 255, 0.3)", "0 0 24px rgba(74, 132, 255, 0.6)", "0 0 12px rgba(74, 132, 255, 0.3)"] } : {}}
          transition={isLive ? { delay: 0.2 + index * 0.15, boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } } : { delay: 0.2 + index * 0.15 }}
        >
          <div className="built-status-icon">
            <Icon className="h-3.5 w-3.5" />
          </div>
          <span className="built-status-text">{status}</span>
        </motion.div>
      </div>

      {/* Hover border accent */}
      <div className="built-card-border" aria-hidden="true" />
    </motion.div>
  );
}

export function BuiltBySection() {
  const t = useTranslations("built_by");

  const products = [
    {
      name: t("products.navdhan.name"),
      description: t("products.navdhan.description"),
      status: t("products.navdhan.status"),
      statusType: "live" as const,
    },
    {
      name: t("products.protocol.name"),
      description: t("products.protocol.description"),
      status: t("products.protocol.status"),
      statusType: "upcoming" as const,
    },
  ];

  return (
    <section
      id="built-by"
      aria-label={t("aria_label")}
      className="built-section"
    >
      {/* Animated gradient background */}
      <div className="built-bg-gradient" aria-hidden="true" />
      <div className="built-container">
        {/* Header section */}
        <motion.div
          className="built-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="built-header-with-logo">
            <h2 className="built-title-container">
              <Image
                src="/logo.png"
                alt="Kubar Logo"
                width={84}
                height={84}
                className="built-header-logo"
              />
              <span className="built-title-text">{t("title_prefix")}</span>
              <span className="built-title-text">{t("title_suffix")}</span>
            </h2>
          </div>
          <p className="built-description">{t("description")}</p>
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="built-divider"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          aria-hidden="true"
        />

        {/* Products grid */}
        <div className="built-products-grid">
          {products.map((product, index) => (
            <ProductCard key={product.name} {...product} index={index} />
          ))}
        </div>

        {/* Hiring CTA section */}
        <motion.div
          className="built-hiring-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <a href={`mailto:${t("hiring_email")}`} className="built-hiring-link">
            <span className="built-hiring-text">{t("hiring_cta")}</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="built-hiring-arrow"
            >
              {t("hiring_link")}
            </motion.span>
          </a>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="built-separator"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          aria-hidden="true"
        />

        {/* Tagline section */}
        <motion.div
          className="built-tagline-section"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <h3 className="built-tagline">{t.rich("tagline", { bharat: (chunks) => <span style={{ color: "#FF9933" }}>{chunks}</span>, methods: (chunks) => <span style={{ color: "#1A4FA3" }}>{chunks}</span>, money: (chunks) => <span style={{ color: "#138808" }}>{chunks}</span> })}</h3>
        </motion.div>
      </div>
    </section>
  );
}
