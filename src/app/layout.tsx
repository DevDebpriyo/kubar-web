import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { getTranslations } from "next-intl/server";
import { LenisProvider } from "@/providers/LenisProvider";
import { socialImage } from "@/app/page-metadata";
import "./globals.css";

const plusJakartaSans = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "300 800",
  variable: "--font-plus-jakarta",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("site");

  return {
    metadataBase: new URL("https://kubar.tech"),
    title: {
      default: t("title"),
      template: "%s | Kubar Labs",
    },
    description: t("description"),
    authors: [{ name: t("author") }],
    creator: "Kubar Labs",
    publisher: "Kubar Labs",
    alternates: { canonical: "/" },
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      type: "website",
      locale: t("locale"),
      url: "/",
      siteName: "Kubar Labs",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("twitter_description"),
      images: [socialImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kubar Labs",
    url: "https://kubar.tech",
    logo: "https://kubar.tech/logo.png",
    email: "partnerships@kubar.tech",
    sameAs: [
      "https://www.linkedin.com/company/kubarlabs/",
      "https://kubarlabs.substack.com/",
    ],
  };
  let agentationToolbar: React.ReactNode = null;

  if (process.env.NODE_ENV === "development") {
    const { AgentationToolbar } = await import(
      "@/components/agentation/AgentationToolbar"
    );
    agentationToolbar = <AgentationToolbar />;
  }

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-hidden bg-[#04040c] text-[#f0f0f0] antialiased">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LenisProvider>
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
        </LenisProvider>
        {agentationToolbar}
      </body>
    </html>
  );
}
