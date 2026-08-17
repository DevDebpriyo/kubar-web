import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NavDhan Embedded Origination Infrastructure",
  description:
    "NavDhan embeds lender-neutral business-credit origination inside B2B platforms and routes lender-ready applications into existing lender systems.",
  alternates: { canonical: "/products/navdhan" },
  openGraph: {
    title: "NavDhan Embedded Origination Infrastructure",
    description:
      "NavDhan embeds lender-neutral business-credit origination inside B2B platforms and routes lender-ready applications into existing lender systems.",
    url: "/products/navdhan",
  },
};

export default function NavDhanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
