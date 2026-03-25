"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Linkedin, ArrowRight } from "lucide-react";
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
  linkedin: string;
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
  description: "Past achievements",
  achievements: [
    "Worked in DeFi security with MIT Labs and IBM Quantum",
    "Recipient of Perplexity AI Fellowship and NVIDIA Inception Accelerator",
    "Youngest-ever Polkadot Blockchain Academy Graduate, Hong Kong",
    "Previously worked with leading DeFi ventures like VaultCraft",
    "Contributed extensively to leading Open-Source projects like Fedora OS",
    "ML Researcher for the Director of National Chemical Laboratory and FRS Dr. Sourav Pal Delivered 5+ Blockchain MVPs for enterprise clients",
    "Won multiple hackathons including Google ATLAS",
  ],
  image: "/team/vaibhav.jpg",
  linkedin: "https://www.linkedin.com/in/fenestbuc/",
  accentColor: "orange",
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    name: "Agniva Ray",
    role: "Co-Founder & COO",
    description: "People and Internal Systems | 7 YOE | Ex- Govt. Of Goa",
    image: "/team/agniva.png",
    linkedin: "https://www.linkedin.com/in/agnivaray/",
    accentColor: "orange",
  },
  {
    id: "member-2",
    name: "Ayan Gangopadhyay",
    role: "Data Science Lead",
    description: "NLP & Deep Learning Expert | 6 YOE | CUDA and Triton",
    image: "/team/ayan.png",
    linkedin: "https://www.linkedin.com/in/ayan-gangopadhyay-426012157/",
    accentColor: "green",
  },
  {
    id: "member-3",
    name: "Rayansh Srivastava",
    role: "Founding Engineer",
    description: "Multi-Agent AI Systems Builder | LLMs, GANs & MLOps",
    image: "/team/rayansh.png",
    linkedin: "https://www.linkedin.com/in/rayansh-srivastava-419951219/",
    accentColor: "blue",
  },
  {
    id: "member-4",
    name: "Manchit Sanan",
    role: "Product & Program Lead",
    description: "API & Automation Expert | 13 YOE | US Healthcare → Fintech",
    image: "/team/manchit.png",
    linkedin: "https://www.linkedin.com/in/manchit-sanan-6b9705158/",
    accentColor: "purple",
  },
  {
    id: "member-5",
    name: "Sreyan M Chowdhury",
    role: "Growth & Revenue Lead",
    description: "GTM & RevOps Operator | 7+ YOE | B2B Distribution",
    image: "/team/sreyan.png",
    linkedin: "https://www.linkedin.com/in/sreyanmchowdhury/",
    accentColor: "pink",
  },
  {
    id: "member-6",
    name: "Debjit Ghosh",
    role: "Founding Engineer",
    description: "Full-Stack .NET Developer | 6 YOE | Enterprise Systems → Data Science",
    image: "/team/debjit.png",
    linkedin: "https://www.linkedin.com/in/debjit-ghosh-914776170/",
    accentColor: "cyan",
  },
  {
    id: "member-7",
    name: "Divyesh Reddy",
    role: "Marketplace Onboarding",
    description: "Buyer-Risk Intelligence | MSME Credit Analytics",
    image: "/team/divyesh.png",
    linkedin: "https://www.linkedin.com/in/divyesh-reddy/?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    accentColor: "amber",
  },
  {
    id: "member-8",
    name: "Debpriyo Ghosal",
    role: "Engineer/Developer",
    description: "Full-Stack & AI Developer | Open-Source Contributor",
    image: "/team/debpriyo.png",
    linkedin: "https://www.linkedin.com/in/debpriyo-ghosal-0759a92a6/",
    accentColor: "green",
  },
  {
    id: "member-9",
    name: "Mridul Malani",
    role: "Fundraising Lead",
    description: "MS at HEC Paris | CUDA and Triton | Ex- RIL, CWC, Earlyseed",
    image: "/team/mridul.png",
    linkedin: "https://www.linkedin.com/in/mridulmalani/",
    accentColor: "pink",
  },
  {
    id: "member-10",
    name: "Parth Ahuja",
    role: "Junior Engineer/Developer",
    description: "Ashoka University CS | Full-Stack & Systems Dev",
    image: "/team/parth.png",
    linkedin: "https://linkedin.com",
    accentColor: "cyan",
  },
  {
    id: "member-11",
    name: "Adhithya Sriram",
    role: "Product Research Intern",
    description: "IIM-Bangalore BBA-DBE | 0→1 Product Builder",
    image: "/team/adhithya.png",
    linkedin: "https://www.linkedin.com/in/thisisadhithyasriram/",
    accentColor: "purple",
  },
];

const ADVISORS: TeamMember[] = [
  {
    id: "advisor-1",
    name: "Debayan Gupta",
    description: "Professor, CS - MIT, Ashoka University",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "orange",
  },
  {
    id: "advisor-2",
    name: "Sandeep Juneja",
    description: "Director, Centre for Data - Ashoka University | Expert in AI & financial mathematics",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "green",
  },
  {
    id: "advisor-3",
    name: "Amit Sagar",
    description: "Lead System Architect at Bank of England | BOE CBDC Architecture Contributor",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "blue",
  },
  {
    id: "advisor-4",
    name: "Shridhar Sethuram",
    description: "Seasoned finance veteran, 25+ years in Private Equity",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "purple",
  },
  {
    id: "advisor-5",
    name: "Tushar Jaruhar",
    description: "Ex-Pricing Actuary at Zurich Insurance Co.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
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
}: {
  member: TeamMember;
  delay: number;
  featured?: boolean;
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

  return (
    <motion.a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className={`team-member-card ${featured ? "team-member-card-featured" : ""}`}
      style={
        {
          "--accent-color": accentMap[member.accentColor],
        } as React.CSSProperties
      }
    >
      {/* Image Container */}
      <div className="team-member-image-wrapper">
        <Image
          src={member.image}
          alt={member.name}
          width={300}
          height={300}
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

        {/* LinkedIn Link */}
        <div className="team-member-link">
          <Linkedin className="h-4 w-4" />
          <span>View Profile</span>
        </div>
      </div>
    </motion.a>
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="team-hero-content"
          >
            <motion.h1 variants={fadeInUp} className="team-hero-title">
              {t("hero_section.title")}
            </motion.h1>

            <motion.p variants={fadeInUp} className="team-hero-description">
              {t("hero_section.description")}
            </motion.p>
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="team-section-header"
          >
            <span className="team-eyebrow">{t("team_section.subtitle")}</span>
            <h2 className="team-section-title">{t("team_section.title")}</h2>
          </motion.div>

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
          <motion.div
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
          </motion.div>

          <div className="team-advisors-grid">
            {ADVISORS.map((advisor, idx) => (
              <TeamMemberCard
                key={advisor.id}
                member={advisor}
                delay={0.1 + idx * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="team-cta-section">
        <div className="team-container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="team-cta-content"
          >
            <h2 className="team-cta-title">
              Interested in joining our mission?
            </h2>
            <p className="team-cta-description">
              We&apos;re always looking for talented builders who want to
              reshape MSME credit.
            </p>

            <motion.a
              href="mailto:careers@kubar.tech"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="team-cta-button"
            >
              Check Open Positions
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
