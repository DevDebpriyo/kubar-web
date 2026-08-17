import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { LenisProvider } from "@/providers/LenisProvider";
import "./globals.css";

const plusJakartaSans = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "300 800",
  variable: "--font-plus-jakarta",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
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
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("twitter_description"),
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
  const messages = await getMessages();
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
      className={`${plusJakartaSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-hidden bg-[#04040c] text-[#f0f0f0] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>{children}</LenisProvider>
          {agentationToolbar}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
