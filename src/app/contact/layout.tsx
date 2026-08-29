import { createPageMetadata } from "@/app/page-metadata";
import { RouteIntlProvider } from "@/i18n/RouteIntlProvider";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Talk to Kubar Labs about embedded business credit, cross-border trade finance or working with our team.",
  path: "/contact",
  socialTitle: "Contact Kubar Labs",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteIntlProvider namespaces={["nav", "contact"]}>
      {children}
    </RouteIntlProvider>
  );
}
