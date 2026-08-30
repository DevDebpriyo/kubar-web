import { createPageMetadata } from "@/app/page-metadata";
import { RouteIntlProvider } from "@/i18n/RouteIntlProvider";

export const metadata = createPageMetadata({
  title: "NavDhan | Unified Credit Infrastructure",
  description:
    "Unified credit infrastructure for commerce-tech and B2B platforms, designed for the breadth of business credit needs.",
  path: "/products/navdhan",
});

export default function NavDhanLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteIntlProvider
      namespaces={["nav", "navdhan_current", "visual_story"]}
    >
      {children}
    </RouteIntlProvider>
  );
}
