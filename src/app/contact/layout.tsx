import { createPageMetadata } from "@/app/page-metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Kubar Labs about lending partnerships, B2B platform integrations, support, or media enquiries.",
  path: "/contact",
  socialTitle: "Contact Kubar Labs",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
