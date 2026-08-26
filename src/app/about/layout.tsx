import { createPageMetadata } from "@/app/page-metadata";
import localFont from "next/font/local";
import { RouteIntlProvider } from "@/i18n/RouteIntlProvider";

const geistMono = localFont({
  src: "../fonts/geist-mono-latin.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn how Kubar Labs is building lender-neutral infrastructure for embedded business-credit origination in India.",
  path: "/about",
  socialTitle: "About Kubar Labs",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteIntlProvider namespaces={["nav", "about", "footer"]}>
      <div className={geistMono.variable}>{children}</div>
    </RouteIntlProvider>
  );
}
