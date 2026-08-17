import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kubar Labs about lending partnerships, B2B platform integrations, support, or media enquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Kubar Labs",
    description:
      "Contact Kubar Labs about lending partnerships, B2B platform integrations, support, or media enquiries.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
