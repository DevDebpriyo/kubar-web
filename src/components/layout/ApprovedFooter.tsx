"use client";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "./ApprovedFooter.css";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "NavDhan", href: "/products/navdhan" },
  { label: "Kubar Protocol", href: "/products/kubar-protocol" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Substack", href: "https://kubarlabs.substack.com/" },
] as const;

export function ApprovedFooter({
  title = "Let’s connect commerce to capital.",
  description =
    "Talk to us about embedded business credit or cross-border trade finance.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <footer className="approved-footer">
      <m.div
        className="approved-footer__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>{title}</h2>
        <p className="approved-footer__description">{description}</p>

        <div className="approved-footer__actions">
          <a
            className="approved-action approved-action--primary"
            href="https://calendly.com/vaibhav-kubar/partnerships-kubar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule a conversation
            <ArrowRight aria-hidden="true" />
          </a>
          <a
            className="approved-action approved-action--secondary"
            href="mailto:partnerships@kubar.tech"
          >
            partnerships@kubar.tech
          </a>
        </div>

        <div className="approved-footer__divider" aria-hidden="true" />

        <div className="approved-footer__navigation">
          <Link className="approved-footer__brand" href="/" aria-label="Kubar Labs home">
            <Image src="/logo.png" alt="Kubar Labs" width={144} height={42} />
          </Link>
          <nav aria-label="Footer navigation">
            <ul>
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("http") ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="approved-footer__copyright">
          © 2026 Kubar Labs. Parent company of NavDhan and Kubar Protocol.
        </p>
      </m.div>
    </footer>
  );
}
