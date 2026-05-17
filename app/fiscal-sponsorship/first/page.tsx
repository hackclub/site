import type { Metadata } from "next";
import { FirstPageClient } from "./FirstPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Financial Toolkit for FIRST Teams | HCB",
  description:
    "HCB is the ultimate booster club for FRC, FTC, and FLL teams to receive grants, fundraise, make purchases, and much more.",
  canonical: "/fiscal-sponsorship/first",
  image: "/fiscal-sponsorship/first/og-image.png",
});

export default function Page() {
  return <FirstPageClient />;
}
