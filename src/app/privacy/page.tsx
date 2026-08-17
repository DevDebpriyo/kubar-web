import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/home/FooterSection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Kubar Labs collects, uses, and protects personal information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Information we collect",
    content:
      "We collect the information you provide through our contact forms, including your name, business email address, phone number, company name, and organisation category. We may also collect limited technical information required to operate and secure this website.",
  },
  {
    title: "How we use information",
    content:
      "We use submitted information to respond to enquiries, evaluate partnership opportunities, provide requested information, maintain website security, and improve our services. We do not sell personal information.",
  },
  {
    title: "Sharing and service providers",
    content:
      "We share information only with authorised personnel and service providers that help us operate the website, communications, and business services, or where required by law. Those providers may process information only for the services they provide to us.",
  },
  {
    title: "Retention and security",
    content:
      "We retain personal information only for as long as needed for the purposes described in this policy, legal obligations, or legitimate business records. We use reasonable technical and organisational measures to protect information, but no internet transmission or storage system is completely secure.",
  },
  {
    title: "Your choices",
    content:
      "You may ask us to access, correct, delete, or stop using your personal information, subject to applicable law. You can also opt out of non-essential communications at any time.",
  },
  {
    title: "Updates to this policy",
    content:
      "We may update this policy when our practices or legal requirements change. The latest version will always be available on this page.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-[#04040c] text-[#f0f0f0]">
      <Navbar />
      <section className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f0b429]">
          Legal
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-base leading-7 text-white/65 sm:text-lg">
          This policy explains how Kubar Labs handles personal information collected through kubar.tech.
        </p>
        <p className="mt-4 text-sm text-white/45">Last updated: August 4, 2026</p>

        <div className="mt-14 space-y-10">
          {sections.map((section) => (
            <article key={section.title} className="border-t border-white/10 pt-8">
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-base leading-7 text-white/65">{section.content}</p>
            </article>
          ))}
          <article className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold text-white">Contact us</h2>
            <p className="mt-3 text-base leading-7 text-white/65">
              For privacy questions or requests, email{" "}
              <a className="text-[#f0b429] underline underline-offset-4" href="mailto:support@kubar.tech">
                support@kubar.tech
              </a>.
            </p>
          </article>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
