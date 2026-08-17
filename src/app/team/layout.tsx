import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team and Advisors",
  description:
    "Meet the Kubar Labs team and advisors building embedded business-credit infrastructure for India.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Kubar Labs Team and Advisors",
    description:
      "Meet the Kubar Labs team and advisors building embedded business-credit infrastructure for India.",
    url: "/team",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
