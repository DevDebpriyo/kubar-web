import { createPageMetadata } from "@/app/page-metadata";
import { RouteIntlProvider } from "@/i18n/RouteIntlProvider";

export const metadata = createPageMetadata({
  title: "Team",
  description:
    "Meet the people building NavDhan and Kubar Protocol at Kubar Labs.",
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
