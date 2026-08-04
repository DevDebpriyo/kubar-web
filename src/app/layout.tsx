import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { LenisProvider } from "@/providers/LenisProvider";
import { AgentationToolbar } from "@/components/agentation/AgentationToolbar";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("site");

  return {
    title: t("title"),
    description: t("description"),
    authors: [{ name: t("author") }],
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      type: "website",
      locale: t("locale"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("twitter_description"),
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-hidden bg-[#04040c] text-[#f0f0f0] antialiased">
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>{children}</LenisProvider>
          <AgentationToolbar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
