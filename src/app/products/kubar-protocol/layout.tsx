import { createPageMetadata } from "@/app/page-metadata";
import { RouteIntlProvider } from "@/i18n/RouteIntlProvider";

export const metadata = createPageMetadata({
  title: "Kubar Protocol — Cross-Border Trade Finance",
  description:
    "Trade-finance infrastructure in development, connecting trade evidence and financing context from order to settlement.",
  path: "/products/kubar-protocol",
});

export default function KubarProtocolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteIntlProvider namespaces={["nav", "protocol"]}>
      {children}
    </RouteIntlProvider>
  );
}
