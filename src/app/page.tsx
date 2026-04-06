import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { ProblemSplitSection } from "@/components/home/ProblemSplitSection";
import { ProductShowcaseSection } from "@/components/home/ProductShowcaseSection";
import { VisualStorySection } from "@/components/home/VisualStorySection";
import { TwoOutcomesSection } from "@/components/home/TwoOutcomesSection";
import { BuiltBySection } from "@/components/home/BuiltBySection";
import { BuiltForTrustSection } from "@/components/home/BuiltForTrustSection";
import { FooterSection } from "@/components/home/FooterSection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <PartnerMarquee />
      <ProblemSplitSection />
      <ProductShowcaseSection />
      <TwoOutcomesSection />
      <VisualStorySection />
      <BuiltBySection />
      <BuiltForTrustSection />
      <FooterSection />
    </main>
  );
}
