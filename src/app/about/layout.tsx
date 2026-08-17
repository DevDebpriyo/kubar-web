import { createPageMetadata } from "@/app/page-metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn how Kubar Labs is building lender-neutral infrastructure for embedded business-credit origination in India.",
  path: "/about",
  socialTitle: "About Kubar Labs",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
