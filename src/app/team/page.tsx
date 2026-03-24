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
  role: string;
  description: string;
  image: string;
  linkedin: string;
  accentColor: "orange" | "green" | "blue" | "purple" | "pink" | "cyan" | "amber";
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    name: "Rahul Sharma",
    role: "Co-Founder & CEO",
    description: "Former fintech lead at HDFC, 8 years credit tech",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "orange",
  },
  {
    id: "member-2",
    name: "Priya Desai",
    role: "Co-Founder & CTO",
    description: "Ex-Stripe engineer, built fintech infrastructure",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "green",
  },
  {
    id: "member-3",
    name: "Vikram Patel",
    role: "Head of Product",
    description: "Product at Razorpay, MSMEs = passion project",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "blue",
  },
  {
    id: "member-4",
    name: "Ananya Singh",
    role: "Lead, Risk & Compliance",
    description: "RBI regulation expert, 12 years banking sector",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "purple",
  },
  {
    id: "member-5",
    name: "Arjun Kumar",
    role: "Engineering Lead",
    description: "Built payment systems at PhonePe, scale expert",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "pink",
  },
  {
    id: "member-6",
    name: "Neha Verma",
    role: "Operations & Partnerships",
    description: "ONDC ecosystem builder, partnerships 5+ years",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "cyan",
  },
  {
    id: "member-7",
    name: "Rohan Chopra",
    role: "Research Lead",
    description: "MSME credit research, IIM-A economics focus",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "amber",
  },
];

const ADVISORS: TeamMember[] = [
  {
    id: "advisor-1",
    name: "Deepak Sharma",
    role: "Banking Strategy Advisor",
    description: "Former NBFC CEO, credit market veteran",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "orange",
  },
  {
    id: "advisor-2",
    name: "Meera Iyer",
    role: "Fintech Strategy Advisor",
    description: "Founded 2 fintech startups, exits to tier-1",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "green",
  },
  {
    id: "advisor-3",
    name: "Karthik Reddy",
    role: "Technology Infrastructure Advisor",
    description: "Built infrastructure at Amazon India scale",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "blue",
  },
  {
    id: "advisor-4",
    name: "Simran Kapoor",
    role: "Regulatory & Compliance Advisor",
    description: "RBI & SEBI regulation counsel, 15+ years",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    accentColor: "purple",
  },
  {
    id: "advisor-5",
    name: "Suresh Menon",
    role: "MSME Ecosystem Advisor",
    description: "Worked with 100+ SMEs, market insights",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
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

function TeamMemberCard({ member, delay }: { member: TeamMember; delay: number }) {
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
      className="team-member-card"
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
        <h3 className="team-member-name">{member.name}</h3>
        <p className="team-member-role">{member.role}</p>
        <p className="team-member-description">{member.description}</p>

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
            {TEAM_MEMBERS.map((member, idx) => (
              <TeamMemberCard key={member.id} member={member} delay={0.1 + idx * 0.05} />
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
            <span className="team-eyebrow">{t("advisors_section.subtitle")}</span>
            <h2 className="team-section-title">{t("advisors_section.title")}</h2>
          </motion.div>

          <div className="team-advisors-grid">
            {ADVISORS.map((advisor, idx) => (
              <TeamMemberCard key={advisor.id} member={advisor} delay={0.1 + idx * 0.08} />
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
            <h2 className="team-cta-title">Interested in joining our mission?</h2>
            <p className="team-cta-description">
              We&apos;re always looking for talented builders who want to reshape MSME credit.
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
