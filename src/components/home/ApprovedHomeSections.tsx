"use client";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import "./ApprovedHomeSections.css";
import "./BuiltBySection.css";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function ProductIntroduction() {
  const t = useTranslations("home_current.products");

  return (
    <section id="built-by" className="approved-home-section approved-products">
      <m.div className="approved-home-container" {...reveal}>
        <p className="approved-eyebrow">{t("eyebrow")}</p>
        <h2>{t("title")}</h2>
        <p className="approved-section-intro">{t("description")}</p>

        <div className="approved-product-grid">
          <Link className="approved-product-card" href="/products/navdhan">
            <p className="approved-product-card__eyebrow">
              {t("navdhan.eyebrow")}
            </p>
            <Image
              className="approved-product-card__mark"
              src="/nd_logo.png"
              alt="NavDhan"
              width={148}
              height={66}
            />
            <p className="approved-product-card__description">
              {t("navdhan.description")}
            </p>
            <span className="approved-product-card__status">
              {t("navdhan.status")}
            </span>
            <span className="approved-product-card__link">
              {t("navdhan.link")} <ArrowRight aria-hidden="true" />
            </span>
          </Link>

          <Link
            className="approved-product-card approved-product-card--protocol"
            href="/products/kubar-protocol"
          >
            <p className="approved-product-card__eyebrow">
              {t("protocol.eyebrow")}
            </p>
            <h3>Kubar Protocol</h3>
            <p className="approved-product-card__description">
              {t("protocol.description")}
            </p>
            <span className="approved-product-card__status">
              {t("protocol.status")}
            </span>
            <span className="approved-product-card__link">
              {t("protocol.link")} <ArrowRight aria-hidden="true" />
            </span>
          </Link>
        </div>
      </m.div>
    </section>
  );
}

export function CompanyThesis() {
  const t = useTranslations("home_current.thesis");

  return (
    <section className="approved-home-section approved-thesis">
      <m.div className="approved-home-container approved-thesis__grid" {...reveal}>
        <div className="approved-thesis__copy">
          <p className="approved-eyebrow">{t("eyebrow")}</p>
          <h2>{t("title")}</h2>
          <p className="approved-section-intro">{t("description")}</p>
          <Link className="approved-text-link" href="/about">
            {t("link")} <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="approved-architecture" aria-label={t("architecture_aria")}>
          <div className="approved-architecture__parent">
            <span>{t("parent_label")}</span>
            <Image src="/logo.png" alt="Kubar Labs" width={144} height={42} />
          </div>
          <div className="approved-architecture__branches" aria-hidden="true" />
          <div className="approved-architecture__children">
            <div>
              <span>{t("navdhan_label")}</span>
              <strong>NavDhan</strong>
              <p>{t("navdhan_description")}</p>
            </div>
            <div>
              <span>{t("protocol_label")}</span>
              <strong>Kubar Protocol</strong>
              <p>{t("protocol_description")}</p>
            </div>
          </div>
          <p className="approved-architecture__note">{t("note")}</p>
        </div>
      </m.div>
    </section>
  );
}

export function NewBharatTagline() {
  const t = useTranslations("built_by");

  return (
    <section className="approved-tagline-wrap" aria-label="New Bharat tagline">
      <m.div
        className="built-tagline-section"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <h2 className="built-tagline">
          {t.rich("tagline", {
            bharat: (chunks) => <span style={{ color: "#FF9933" }}>{chunks}</span>,
            methods: (chunks) => <span style={{ color: "#1A4FA3" }}>{chunks}</span>,
            money: (chunks) => <span style={{ color: "#138808" }}>{chunks}</span>,
          })}
        </h2>
      </m.div>
    </section>
  );
}
