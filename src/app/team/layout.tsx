import { createPageMetadata } from "@/app/page-metadata";
import { RouteIntlProvider } from "@/i18n/RouteIntlProvider";

export const metadata = createPageMetadata({
  title: "Team",
  description:
    "Meet the multidisciplinary team building Kubar Labs, NavDhan and Kubar Protocol across credit, trade finance, compliance, applied ML, partnerships and design.",
  path: "/team",
  socialTitle: "Kubar Labs Team",
});

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteIntlProvider namespaces={["nav", "team"]}>
      {children}
    </RouteIntlProvider>
  );
}
