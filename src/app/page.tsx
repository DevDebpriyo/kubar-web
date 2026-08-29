import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import {
  CompanyThesis,
  NewBharatTagline,
  ProductIntroduction,
} from "@/components/home/ApprovedHomeSections";
import { LegacyStoryRedirect } from "@/components/home/LegacyStoryRedirect";
import { EcosystemPartners } from "@/components/home/EcosystemPartners";
import { BuiltForTrustSection } from "@/components/home/BuiltForTrustSection";
import { ApprovedFooter } from "@/components/layout/ApprovedFooter";
import { RouteIntlProvider } from "@/i18n/RouteIntlProvider";

export default function Home() {
  return (
    <RouteIntlProvider
      namespaces={[
        "nav",
        "hero",
        "cards",
        "marquee",
        "home_current",
        "built_by",
        "built_for_trust",
      ]}
    >
      <main className="relative">
        <LegacyStoryRedirect />
        <Navbar variant="approved" />
        <HeroSection />
        <PartnerMarquee />
        <ProductIntroduction />
        <CompanyThesis />
        <BuiltForTrustSection />
        <NewBharatTagline />
        <EcosystemPartners />
        <ApprovedFooter />
      </main>
    </RouteIntlProvider>
  );
}
