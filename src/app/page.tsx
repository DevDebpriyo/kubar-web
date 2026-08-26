import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { ProblemSplitSection } from "@/components/home/ProblemSplitSection";
import { ProductShowcaseSection } from "@/components/home/ProductShowcaseSection";
import { VisualStorySection } from "@/components/home/VisualStorySection";
import { TwoOutcomesSection } from "@/components/home/TwoOutcomesSection";
import { BuiltBySection } from "@/components/home/BuiltBySection";
import { EcosystemPartners } from "@/components/home/EcosystemPartners";
import { BuiltForTrustSection } from "@/components/home/BuiltForTrustSection";
import { FooterSection } from "@/components/home/FooterSection";
import { RouteIntlProvider } from "@/i18n/RouteIntlProvider";

export default function Home() {
  return (
    <RouteIntlProvider
      namespaces={[
        "nav",
        "hero",
        "cards",
        "marquee",
        "problems",
        "product_showcase",
        "two_outcomes",
        "visual_story",
        "built_by",
        "built_for_trust",
        "footer",
      ]}
    >
      <main className="relative">
        <Navbar />
        <HeroSection />
        <PartnerMarquee />
        <ProblemSplitSection />
        <ProductShowcaseSection />
        <TwoOutcomesSection />
        <VisualStorySection />
        <BuiltBySection />
        <EcosystemPartners />
        <BuiltForTrustSection />
        <FooterSection />
      </main>
    </RouteIntlProvider>
  );
}
