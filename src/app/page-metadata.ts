import type { Metadata } from "next";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}`;
  socialTitle?: string;
  robots?: Metadata["robots"];
};

export const socialImage = {
  url: "/media/kubar-labs-og-b2add55b.png",
  width: 1200,
  height: 630,
  alt: "Kubar Labs — Embedded Origination Infrastructure",
};

export function createPageMetadata({
  title,
  description,
  path,
  socialTitle = title,
  robots,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      locale: "en_US",
      url: path,
      siteName: "Kubar Labs",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
    robots,
  };
}
