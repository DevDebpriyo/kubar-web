import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Kubar Labs is building lender-neutral infrastructure for embedded business-credit origination in India.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Kubar Labs",
    description:
      "Learn how Kubar Labs is building lender-neutral infrastructure for embedded business-credit origination in India.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
