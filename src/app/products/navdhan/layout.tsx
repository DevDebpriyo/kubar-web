import { createPageMetadata } from "@/app/page-metadata";

export const metadata = createPageMetadata({
  title: "NavDhan Embedded Origination Infrastructure",
  description:
    "NavDhan embeds lender-neutral business-credit origination inside B2B platforms and routes lender-ready applications into existing lender systems.",
  path: "/products/navdhan",
});

export default function NavDhanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
