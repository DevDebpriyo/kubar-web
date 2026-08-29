"use client";

import { m } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ApprovedFooter } from "@/components/layout/ApprovedFooter";
import { Navbar } from "@/components/layout/Navbar";
import { ProtocolJourney } from "@/components/protocol/ProtocolJourney";
import "./protocol.css";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

function HeroEvidenceDiagram() {
  const t = useTranslations("protocol.hero");

  return (
    <m.div className="protocol-hero-diagram" {...reveal}>
      <p className="protocol-kicker">{t("diagram_eyebrow")}</p>
      <div className="protocol-context-record">
        <span>{t("context_label")}</span>
        <strong>{t("context_value")}</strong>
        <div>
          <small>{t("context_owner")}</small>
          <small>{t("context_state")}</small>
        </div>
      </div>
      <div className="protocol-acceptance">
        <span>{t("acceptance")}</span>
      </div>
      <span className="protocol-illustrative-label">Illustrative</span>
      <div className="protocol-receivable-transition">
        <div>
          <span>{t("claim_label")}</span>
          <strong>{t("claim_value")}</strong>
        </div>
        <ArrowRight aria-hidden="true" />
        <div>
          <span>{t("receivable_label")}</span>
          <strong>{t("receivable_value")}</strong>
        </div>
      </div>
      <p className="protocol-transition-note">{t("transition_note")}</p>
      <p className="protocol-hero-diagram__qualification">{t("qualification")}</p>
    </m.div>
  );
}

function AuthorityCard({
  title,
  summary,
  detail,
}: {
  title: string;
  summary: string;
  detail: string;
}) {
  const t = useTranslations("protocol.authority");
  const [expanded, setExpanded] = useState(false);
  const detailId = `protocol-authority-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;

  return (
    <m.article className="protocol-authority-card" {...reveal}>
      <p className="protocol-kicker">{t("eyebrow")}</p>
      <h2>{title}</h2>
      <p>{summary}</p>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={detailId}
        onClick={() => setExpanded((value) => !value)}
      >
        {t("toggle")}
        <ChevronDown className={expanded ? "is-open" : ""} aria-hidden="true" />
      </button>
      {expanded && <p id={detailId}>{detail}</p>}
    </m.article>
  );
}

export default function KubarProtocolPage() {
  const t = useTranslations("protocol");

  return (
    <main className="protocol-main">
      <Navbar variant="approved" />

      <section className="protocol-hero">
        <div className="protocol-shell protocol-hero__grid">
          <m.div
            className="protocol-hero__copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="protocol-kicker">{t("hero.eyebrow")}</p>
            <h1>{t("hero.title")}</h1>
            <p className="protocol-hero__description">{t("hero.description")}</p>
            <span className="protocol-maturity">{t("hero.status")}</span>
            <div className="protocol-hero__actions">
              <Link className="protocol-action protocol-action--primary" href="/contact">
                {t("hero.primary")} <ArrowRight aria-hidden="true" />
              </Link>
              <a className="protocol-action protocol-action--secondary" href="#workflow">
                {t("hero.secondary")} <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </m.div>
          <HeroEvidenceDiagram />
        </div>
      </section>

      <section className="protocol-progress">
        <div className="protocol-shell protocol-progress__grid">
          <m.div className="protocol-progress__intro" {...reveal}>
            <p className="protocol-kicker">{t("progress.eyebrow")}</p>
            <h2>{t("progress.title")}</h2>
            <p>{t("progress.description")}</p>
            <small>{t("progress.note")}</small>
          </m.div>
          <div className="protocol-milestones">
            <m.article {...reveal}>
              <span aria-hidden="true">01</span>
              <p className="protocol-kicker">{t("progress.demonstrated_label")}</p>
              <h3>{t("progress.demonstrated_title")}</h3>
              <p>{t("progress.demonstrated_description")}</p>
            </m.article>
            <m.article {...reveal}>
              <span aria-hidden="true">02</span>
              <p className="protocol-kicker">{t("progress.development_label")}</p>
              <h3>{t("progress.development_title")}</h3>
              <p>{t("progress.development_description")}</p>
            </m.article>
          </div>
        </div>
      </section>

      <ProtocolJourney />

      <section className="protocol-authority">
        <div className="protocol-shell">
          <div className="protocol-authority__grid">
            <AuthorityCard
              title={t("authority.bank_title")}
              summary={t("authority.bank_summary")}
              detail={t("authority.bank_detail")}
            />
            <AuthorityCard
              title={t("authority.evidence_title")}
              summary={t("authority.evidence_summary")}
              detail={t("authority.evidence_detail")}
            />
          </div>
          <p className="protocol-authority__boundary">{t("authority.role_boundary")}</p>
        </div>
      </section>

      <ApprovedFooter
        title={"Build the next\ntrade-finance workflow."}
        description="Talk to us about institution-facing integrations and controlled pilot development."
      />
    </main>
  );
}
