"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import "./ProtocolJourney.css";

const accents = ["gold", "blue", "green", "gold", "blue", "green"] as const;

function DiagramBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="protocol-diagram__box">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StageDiagram({ stage }: { stage: number }) {
  return (
    <div className="protocol-diagram" aria-label={`Illustrative diagram for stage ${stage}`}>
      <div className="protocol-diagram__header">
        <span>STAGE {String(stage).padStart(2, "0")}</span>
        <span>Illustrative</span>
      </div>

      {stage === 1 && (
        <div className="protocol-diagram__row">
          <DiagramBox label="PURCHASE ORDER" value={"Buyer · exporter\nGoods · terms"} />
          <ArrowRight aria-hidden="true" />
          <DiagramBox label="LETTER OF CREDIT" value={"Issuing bank\nDocumentary terms"} />
        </div>
      )}
      {stage === 1 && <p>Order and LC evidence remain distinct documents.</p>}

      {stage === 2 && (
        <div className="protocol-diagram__row">
          <DiagramBox label="BANK" value="PCFC" />
          <ArrowRight aria-hidden="true" />
          <DiagramBox label="EXPORTER" value={"Prepare · pack\nShip"} />
        </div>
      )}
      {stage === 2 && <p>The bank controls the pre-shipment credit decision.</p>}

      {stage === 3 && (
        <div className="protocol-diagram__stack">
          <span className="protocol-diagram__scene-title">Shipment and external evidence</span>
          <DiagramBox
            label="EXTERNAL DOCUMENT PROVIDER"
            value="Electronic bill of lading reference"
          />
          <small>Document control remains with its authoritative provider.</small>
        </div>
      )}
      {stage === 3 && <p>The external document provider retains authority.</p>}

      {stage === 4 && (
        <div className="protocol-diagram__row">
          <DiagramBox label="DOCUMENTARY CLAIM" value="Not yet an accepted receivable" />
          <ArrowRight aria-hidden="true" />
          <DiagramBox
            label="ACCEPTED LC RECEIVABLE"
            value="After authoritative issuing-bank acceptance"
          />
        </div>
      )}
      {stage === 4 && <p>Issuing-bank acceptance is the decisive transition.</p>}

      {stage === 5 && (
        <div className="protocol-diagram__row">
          <DiagramBox label="ACCEPTED RECEIVABLE" value={"Verified trade\ncontext"} />
          <ArrowRight aria-hidden="true" />
          <DiagramBox label="ELIGIBLE WORKFLOW" value={"Regulated venue\nEligible financiers"} />
        </div>
      )}
      {stage === 5 && <p>Eligibility, approvals and venue rules still apply.</p>}

      {stage === 6 && (
        <div className="protocol-diagram__stack">
          <DiagramBox
            label="BANK-EXECUTED SETTLEMENT"
            value="Financing proceeds → PCFC repayment → Exporter balance"
          />
          <DiagramBox
            label="LATER FINANCIER MATURITY"
            value="Separate payment under the financing terms"
          />
        </div>
      )}
      {stage === 6 && <p>Bank-controlled money movement; separate maturity.</p>}
    </div>
  );
}

export function ProtocolJourney() {
  const t = useTranslations("protocol.workflow");
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
  const stages = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    title: t(`stages.${index + 1}.title`),
    description: t(`stages.${index + 1}.description`),
    accent: accents[index],
  }));

  return (
    <section id="workflow" className="protocol-journey">
      <div className="protocol-journey__shell">
        <div className="protocol-journey__context">
          <h2>{t("title")}</h2>
          <span>{t("description")}</span>
        </div>

        <div className="protocol-journey__implementation">
          <div className="protocol-journey__badge">{t("badge")}</div>
          <div className="protocol-journey__track" ref={timelineTrackRef}>
            <div className="protocol-journey__rail" aria-hidden="true">
              <m.div style={{ scaleY: timelineProgress }} />
              <m.span style={{ top: progressDotTop }} />
            </div>

            {stages.map((stage, index) => {
              const textFirst = index % 2 === 0;
              return (
                <m.article
                  key={stage.id}
                  className={`protocol-stage protocol-stage--${stage.accent} ${
                    textFirst ? "protocol-stage--text-first" : "protocol-stage--diagram-first"
                  }`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="protocol-stage__copy">
                    <p>STAGE {String(stage.id).padStart(2, "0")}</p>
                    <h3>{stage.title}</h3>
                    <span>{stage.description}</span>
                  </div>

                  <div className="protocol-stage__number" aria-hidden="true">
                    {String(stage.id).padStart(2, "0")}
                  </div>

                  <m.div
                    className="protocol-stage__diagram"
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -8, scale: 1.015 }
                    }
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <StageDiagram stage={stage.id} />
                  </m.div>
                </m.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
