import { createPageMetadata } from "@/app/page-metadata";

export const metadata = createPageMetadata({
  title: "Team and Advisors",
  description:
    "Meet the Kubar Labs team and advisors building embedded business-credit infrastructure for India.",
  path: "/team",
  socialTitle: "Kubar Labs Team and Advisors",
});

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
