"use client";

import { m } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { VisualStorySection } from "@/components/home/VisualStorySection";
import { ApprovedFooter } from "@/components/layout/ApprovedFooter";
import { Navbar } from "@/components/layout/Navbar";
import "./navdhan.css";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

function IntegrationSchematic() {
  const t = useTranslations("navdhan_current.integration");
  const platformLines = t("platform_lines").split("|");
  const lenderLines = t("lender_lines").split("|");

  return (
    <m.div className="navdhan-integration" {...reveal}>
      <p className="navdhan-kicker">{t("eyebrow")}</p>
      <div className="navdhan-integration__node">
        <h2>{t("platform_title")}</h2>
        {platformLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="navdhan-integration__bridge" aria-hidden="true">
        <Image src="/nd_logo.png" alt="" width={132} height={58} />
        <span>{t("infrastructure")}</span>
      </div>
      <div className="navdhan-integration__node">
        <h2>{t("lender_title")}</h2>
        {lenderLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="navdhan-integration__note">{t("note")}</p>
    </m.div>
  );
}

function AudiencePanel() {
  const t = useTranslations("navdhan_current.roles");
  const [audience, setAudience] = useState<"platform" | "lender">("platform");
  const isPlatform = audience === "platform";

  return (
    <m.div className="navdhan-audience" {...reveal}>
      <div className="navdhan-audience__tabs" role="tablist" aria-label="NavDhan audiences">
        <button
          id="navdhan-platform-tab"
          type="button"
          role="tab"
          aria-selected={isPlatform}
          aria-controls="navdhan-audience-panel"
          className={isPlatform ? "is-active" : ""}
          onClick={() => setAudience("platform")}
        >
          {t("platform_tab")}
        </button>
        <button
          id="navdhan-lender-tab"
          type="button"
          role="tab"
          aria-selected={!isPlatform}
          aria-controls="navdhan-audience-panel"
          className={!isPlatform ? "is-active" : ""}
          onClick={() => setAudience("lender")}
        >
          {t("lender_tab")}
        </button>
      </div>
      <div
        id="navdhan-audience-panel"
        role="tabpanel"
        aria-labelledby={isPlatform ? "navdhan-platform-tab" : "navdhan-lender-tab"}
      >
        <h3>{t(isPlatform ? "platform_title" : "lender_title")}</h3>
        <p>{t(isPlatform ? "platform_description" : "lender_description")}</p>
        <small>{t(isPlatform ? "platform_note" : "lender_note")}</small>
      </div>
    </m.div>
  );
}

function ResponsibilityCard() {
  const t = useTranslations("navdhan_current.responsibility");
  const [expanded, setExpanded] = useState(false);

  return (
    <m.article className="navdhan-responsibility-card" {...reveal}>
      <p className="navdhan-kicker">{t("eyebrow")}</p>
      <h2>{t("title")}</h2>
      <p>{t("summary")}</p>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="navdhan-responsibility-detail"
        onClick={() => setExpanded((value) => !value)}
      >
        {t("toggle")}
        <ChevronDown className={expanded ? "is-open" : ""} aria-hidden="true" />
      </button>
      {expanded && <p id="navdhan-responsibility-detail">{t("detail")}</p>}
    </m.article>
  );
}

export default function NavDhanPage() {
  const t = useTranslations("navdhan_current");

  return (
    <main className="navdhan-main">
      <Navbar variant="approved" />

      <section className="navdhan-hero">
        <div className="navdhan-shell navdhan-hero__grid">
          <m.div
            className="navdhan-hero__copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              className="navdhan-hero__logo"
              src="/nd_logo.png"
              alt="NavDhan"
              width={148}
              height={66}
              priority
            />
            <p className="navdhan-kicker">{t("hero.eyebrow")}</p>
            <h1>{t("hero.title")}</h1>
            <p className="navdhan-hero__description">{t("hero.description")}</p>
            <div className="navdhan-hero__actions">
              <Link className="navdhan-action navdhan-action--primary" href="/contact">
                {t("hero.primary")} <ArrowRight aria-hidden="true" />
              </Link>
              <a
                className="navdhan-action navdhan-action--secondary"
                href="https://navdhan.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("hero.secondary")} <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <p className="navdhan-hero__notice">{t("hero.notice")}</p>
          </m.div>

          <IntegrationSchematic />
        </div>
      </section>

      <section className="navdhan-roles">
        <div className="navdhan-shell navdhan-roles__grid">
          <m.div className="navdhan-roles__copy" {...reveal}>
            <p className="navdhan-kicker">{t("roles.eyebrow")}</p>
            <h2>{t("roles.title")}</h2>
            <p>{t("roles.description")}</p>
          </m.div>
          <AudiencePanel />
        </div>
      </section>

      <VisualStorySection />

      <section className="navdhan-access">
        <div className="navdhan-shell navdhan-access__grid">
          <ResponsibilityCard />
          <m.article className="navdhan-direct-card" {...reveal}>
            <p className="navdhan-kicker">{t("direct.eyebrow")}</p>
            <p>{t("direct.description")}</p>
            <a href="https://navdhan.app/" target="_blank" rel="noopener noreferrer">
              {t("direct.link")}
            </a>
          </m.article>
        </div>
      </section>

      <ApprovedFooter
        title="Build credit into your platform."
        description="Talk to us about NavDhan integration and lender coverage."
      />
    </main>
  );
}
