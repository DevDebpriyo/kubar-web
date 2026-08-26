"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Linkedin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import "./team.css";

/* ─── Team & Advisor Data Structure ──────────────────── */

interface TeamMember {
  id: string;
  name: string;
  role?: string;
  description: string;
  achievements?: string[];
  image: string;
  linkedin?: string;
  accentColor:
    | "orange"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "cyan"
    | "amber";
}

const FOUNDER: TeamMember = {
  id: "founder-1",
  name: "Vaibhav Sharma",
  role: "Founder",
  description: "Founder and CEO",
  achievements: [
    "Grew up around an MSME family business and saw working-capital constraints first-hand",
    "Built and led NavDhan's origination and lender-routing infrastructure",
    "Secured design relationships across B2B platforms and lenders",
    "Prior work across digital assets, institutional tokenisation and financial infrastructure",
    "Led Kubar Labs to receive a FinVision 2026 award at NIBM, Pune",
  ],
  image: "/team/vaibhav.jpg",
  linkedin: "https://www.linkedin.com/in/fenestbuc/",
  accentColor: "orange",
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-3",
    name: "Rayansh Srivastava",
    role: "Founding Engineer",
    description: "Multi-Agent AI Systems | LLMs, GANs & MLOps",
    image: "/team/rayansh.png",
    linkedin: "https://www.linkedin.com/in/rayansh-srivastava-419951219/",
    accentColor: "blue",
  },
  {
    id: "member-4",
    name: "Manchit Sanan",
    role: "Founding Engineer",
    description: "API & Compliance | 13 YOE | US Healthcare → FinTech",
    image: "/team/manchit.png",
    linkedin: "https://www.linkedin.com/in/manchit-sanan-6b9705158/",
    accentColor: "purple",
  },
  {
    id: "member-5",
    name: "Sreyan M Chowdhury",
    role: "GTM Strategy",
    description: "GTM & RevOps | 7+ YOE | B2B Distribution",
    image: "/team/sreyan.png",
    linkedin: "https://www.linkedin.com/in/sreyanmchowdhury/",
    accentColor: "pink",
  },

  {
    id: "member-7",
    name: "Divyesh Reddy",
    role: "Marketplace Onboarding",
    description: "Buyer-Risk Intelligence | Business Credit Analytics",
    image: "/team/divyesh.png",
    linkedin: "https://www.linkedin.com/in/divyesh-reddy/?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    accentColor: "amber",
  },
  {
    id: "member-8",
    name: "Debpriyo Ghosal",
    role: "Founding Engineer",
    description: "Full-Stack & AI Development | Open-Source Contributor",
    image: "/team/debpriyo.png",
    linkedin: "https://www.linkedin.com/in/debpriyo-ghosal-0759a92a6/",
    accentColor: "green",
  },
  {
    id: "member-9",
    name: "Mridul Malani",
    role: "Deal Coverage & Resource Development",
    description: "Partnerships, deal coverage and resource development",
    image: "/team/mridul.png",
    linkedin: "https://www.linkedin.com/in/mridulmalani/",
    accentColor: "pink",
  },
];

const ADVISORS: TeamMember[] = [
  {
    id: "advisor-1",
    name: "Debayan Gupta",
    description: "Professor of Computer Science, Ashoka University",
    image:
      "/advisors/debayan.png",
    accentColor: "orange",
  },
  {
    id: "advisor-3",
    name: "Amit Sagar",
    description: "Lead System Architect, Bank of England | Contributor to BoE CBDC architecture",
    image:
      "/advisors/amit.png",
    accentColor: "blue",
  },
  {
    id: "advisor-4",
    name: "Shridhar Sethuram",
    description: "Finance professional with 25+ years of private-equity experience",
    image:
      "/advisors/shridhar.png",
    accentColor: "purple",
  },
  {
    id: "advisor-5",
    name: "Tushar Jaruhar",
    description: "Former Pricing Actuary, Zurich Insurance",
    image:
      "/advisors/tushar.png",
    accentColor: "pink",
  },
];

/* ─── Animation Variants ─────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

/* ─── Team Member Card Component ─────────────────────– */

function TeamMemberCard({
  member,
  delay,
  featured = false,
  advisor = false,
}: {
  member: TeamMember;
  delay: number;
  featured?: boolean;
  advisor?: boolean;
}) {
  const accentMap = {
    orange: "#fb923c",
    green: "#22c55e",
    blue: "#3b82f6",
    purple: "#a855f7",
    pink: "#ec4899",
    cyan: "#06b6d4",
    amber: "#f59e0b",
  };

  const cardClassName = `team-member-card ${featured ? "team-member-card-featured" : ""} ${advisor ? "team-member-card-advisor" : ""} ${member.linkedin ? "" : "team-member-card-static"}`;
  const cardStyle = {
    "--accent-color": accentMap[member.accentColor],
  } as React.CSSProperties;
  const cardContent = (
    <>
      {/* Image Container */}
      <div className="team-member-image-wrapper">
        <Image
          src={member.image}
          alt={member.name}
          width={300}
          height={300}
          sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 40px), 300px"
          priority={featured}
          className="team-member-image"
          quality={95}
        />
        <div className="team-member-image-border" />
      </div>

      {/* Content */}
      <div className="team-member-content">
        {featured && <span className="team-founder-badge">Founder</span>}
        <h3 className="team-member-name">{member.name}</h3>
        {member.role && <p className="team-member-role">{member.role}</p>}
        {featured && member.achievements?.length ? (
          <ul className="team-member-achievements">
            {member.achievements.map((achievement) => (
              <li key={achievement} className="team-member-achievement-item">
                {achievement}
              </li>
            ))}
          </ul>
        ) : (
          <p className="team-member-description">{member.description}</p>
        )}

        {member.linkedin && (
          <div className="team-member-link">
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            <span>View Profile</span>
          </div>
        )}
      </div>
    </>
  );

  const motionProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
    whileHover: member.linkedin ? { y: -8 } : undefined,
  };

  if (!member.linkedin) {
    return (
      <m.article
        {...motionProps}
        className={cardClassName}
        style={cardStyle}
      >
        {cardContent}
      </m.article>
    );
  }

  return (
    <m.a
      {...motionProps}
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClassName}
      style={cardStyle}
    >
      {cardContent}
    </m.a>
  );
}

/* ─── Main Page ──────────────────────────────────────– */

export default function TeamPage() {
  const t = useTranslations("team");

  return (
    <main className="team-main">
      <Navbar />

      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-container">
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="team-hero-content"
          >
            <m.h1 variants={fadeInUp} className="team-hero-title">
              {t("hero_section.title")}
            </m.h1>

            <m.p variants={fadeInUp} className="team-hero-description">
              {t("hero_section.description")}
            </m.p>
          </m.div>
        </div>

        {/* Background elements */}
        <div className="team-hero-bg" aria-hidden="true">
          <div className="team-orb-1" />
          <div className="team-orb-2" />
        </div>
      </section>

      {/* Team Members Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="sr-only">{t("team_section.title")}</h2>
          <div className="team-grid">
            <TeamMemberCard member={FOUNDER} delay={0.08} featured />
            {TEAM_MEMBERS.map((member, idx) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={0.1 + idx * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="team-advisors-section">
        <div className="team-container">
          <m.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="team-section-header"
          >
            <span className="team-eyebrow">
              {t("advisors_section.subtitle")}
            </span>
            <h2 className="team-section-title">
              {t("advisors_section.title")}
            </h2>
          </m.div>

          <div className="team-advisors-grid">
            {ADVISORS.map((advisor, idx) => (
              <TeamMemberCard
                key={advisor.id}
                member={advisor}
                delay={0.1 + idx * 0.08}
                advisor
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
