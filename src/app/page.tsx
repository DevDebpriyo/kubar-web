import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSplitSection } from "@/components/home/ProblemSplitSection";
import { ProductShowcaseSection } from "@/components/home/ProductShowcaseSection";
import { VisualStorySection } from "@/components/home/VisualStorySection";
import { TwoOutcomesSection } from "@/components/home/TwoOutcomesSection";
import { BuiltBySection } from "@/components/home/BuiltBySection";
import { EcosystemPartners } from "@/components/home/EcosystemPartners";
import { BuiltForTrustSection } from "@/components/home/BuiltForTrustSection";
import { FooterSection } from "@/components/home/FooterSection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <ProblemSplitSection />
      <ProductShowcaseSection />
      <TwoOutcomesSection />
      <VisualStorySection />
      <BuiltBySection />
      <EcosystemPartners />
      <BuiltForTrustSection />
      <FooterSection />
    </main>
  );
}
