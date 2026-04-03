"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Fingerprint,
  Landmark,
  Scale,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import "./BuiltForTrustSection.css";

type TrustCardId = "1" | "2" | "3" | "4" | "5";
type TrustTone = "amber" | "sky" | "emerald";

type TrustCard = {
  id: TrustCardId;
  title: string;
  tagline: string;
  context: string;
};

type TrustCardStyle = {
  tone: TrustTone;
  highlights: [string, string];
  assurance: string;
};

const trustCardIcons: Record<TrustCardId, LucideIcon> = {
  "1": Landmark,
  "2": Fingerprint,
  "3": Scale,
  "4": Building2,
  "5": Trophy,
};

const trustCardStyles: Record<TrustCardId, TrustCardStyle> = {
  "1": {
    tone: "amber",
    highlights: ["RBI 2022", "Fund Flow Controls"],
    assurance: "Regulatory readiness layer",
  },
  "2": {
    tone: "sky",
    highlights: ["DPDP 2023", "Consent-Driven Data"],
    assurance: "Privacy-first architecture",
  },
  "3": {
    tone: "emerald",
    highlights: ["FACE SRO", "Fair Lending Norms"],
    assurance: "Industry governance alignment",
  },
  "4": {
    tone: "sky",
    highlights: ["STPI FinGlobe", "MeitY Backed"],
    assurance: "Government-incubated credibility",
  },
  "5": {
    tone: "amber",
    highlights: ["FinVision 2026", "NIBM Pune"],
    assurance: "Recognized innovation signal",
  },
};

function FlippingTrustCard({
  card,
  index,
}: {
  card: TrustCard;
  index: number;
}) {
  const Icon = trustCardIcons[card.id];
  const style = trustCardStyles[card.id];
  const delay = index * 0.08;

  return (
    <motion.article
      className="trust-flip-card"
      data-tone={style.tone}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -6 }}
      tabIndex={0}
      aria-label={`${card.title}. ${card.tagline}`}
    >
      <div className="trust-flip-card-inner">
        <div className="trust-flip-face trust-flip-front">
          <div className="trust-face-grid" aria-hidden="true" />

          <div className="trust-front-meta">
            <Badge variant="outline" className="trust-layer-badge">
              Trust Layer {card.id}
            </Badge>
            <div className="trust-front-icon-shell">
              <Icon className="trust-front-icon" aria-hidden="true" />
            </div>
          </div>

          <h3 className="trust-front-title">{card.title}</h3>
          <p className="trust-front-tagline">{card.tagline}</p>

          <Separator className="trust-front-separator" />

          <div className="trust-front-tags" aria-label="Trust signals">
            {style.highlights.map((item) => (
              <Badge key={item} variant="secondary" className="trust-tag-badge">
                {item}
              </Badge>
            ))}
          </div>

          <div className="trust-front-meter" aria-hidden="true">
            <span className="trust-meter-segment" />
            <span className="trust-meter-segment" />
            <span className="trust-meter-segment" />
          </div>
        </div>

        <div className="trust-flip-face trust-flip-back">
          <div className="trust-face-grid" aria-hidden="true" />
          <div className="trust-back-meta">
            <Badge variant="outline" className="trust-back-badge">
              Description
            </Badge>
            <span className="trust-back-layer">Layer {card.id}</span>
        </div>
          <h3 className="trust-back-title">{card.title}</h3>
          <Separator className="trust-back-separator" />
          <p className="trust-back-context">{card.context}</p>

          <div className="trust-back-footer">
            <Badge variant="secondary" className="trust-back-assurance">
              {style.assurance}
            </Badge>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function BuiltForTrustSection() {
  const t = useTranslations("built_for_trust");

  const cards: TrustCard[] = [
    {
      id: "1",
      title: t("cards.1.title"),
      tagline: t("cards.1.tagline"),
      context: t("cards.1.context"),
    },
    {
      id: "2",
      title: t("cards.2.title"),
      tagline: t("cards.2.tagline"),
      context: t("cards.2.context"),
    },
    {
      id: "3",
      title: t("cards.3.title"),
      tagline: t("cards.3.tagline"),
      context: t("cards.3.context"),
    },
    {
      id: "4",
      title: t("cards.4.title"),
      tagline: t("cards.4.tagline"),
      context: t("cards.4.context"),
    },
    {
      id: "5",
      title: t("cards.5.title"),
      tagline: t("cards.5.tagline"),
      context: t("cards.5.context"),
    },
  ];

  return (
    <section
      id="built-for-trust"
      aria-label={t("aria_label")}
      className="trust-section"
    >
      <div className="trust-bg-gradient" aria-hidden="true" />
      <div className="trust-bg-accent" aria-hidden="true" />

      <div className="trust-container">
        <motion.div
          className="trust-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <h2 className="trust-title">{t("title")}</h2>
          <p className="trust-subtitle">{t("subtitle")}</p>
        </motion.div>

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

        <div className="trust-cards-grid">
          {cards.map((card, index) => (
            <FlippingTrustCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
