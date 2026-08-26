import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { createPageMetadata } from "@/app/page-metadata";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import { RouteIntlProvider } from "@/i18n/RouteIntlProvider";

export const metadata = createPageMetadata({
  title: "For Platforms — Coming Soon",
  description:
    "Kubar Labs is preparing NavDhan's embedded origination experience for B2B platforms.",
  path: "/for-platforms",
  socialTitle: "NavDhan for B2B Platforms",
  robots: { index: false, follow: true },
});

export default function ForPlatformsComingSoonPage() {
  return (
    <RouteIntlProvider namespaces={["nav", "footer"]}>
      <main className="min-h-screen bg-[#04040c] text-white">
      <Navbar />

      <section className="relative isolate flex min-h-[82vh] items-center overflow-hidden px-6 pb-20 pt-32 sm:px-10 lg:px-12">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4920c]/10 blur-[120px]"
        />
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d4920c]/30 bg-[#d4920c]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e5ad3c]">
            <Clock3 className="h-4 w-4" />
            Coming soon
          </div>

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            NavDhan for B2B platforms
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Embedded business credit, directly inside your platform.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
            We are preparing the platform integration experience. Speak with our
            team now to discuss your workflows, users and launch timeline.
          </p>

          <Link
            href="/contact?intent=platform"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4920c] to-[#f97316] px-7 py-4 font-semibold text-white shadow-[0_12px_32px_rgba(212,146,12,0.24)] transition-transform hover:-translate-y-0.5"
          >
            Talk to partnerships
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <FooterSection />
      </main>
    </RouteIntlProvider>
  );
}
