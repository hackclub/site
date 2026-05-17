import type { Metadata } from "next";
import FiscalSponsorshipPageClient from "./FiscalSponsorshipPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Fiscal Sponsorship — Hack Club",
  description:
    "Start your nonprofit with HCB: a 501(c)(3) legal entity, bank account, automatic taxes and accounting, and best-in-class software.",
  canonical: "/fiscal-sponsorship",
});

export default function FiscalSponsorshipPage() {
  return <FiscalSponsorshipPageClient />;
}
