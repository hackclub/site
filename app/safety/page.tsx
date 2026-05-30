import { Metadata } from "next";
import { SafetyPage } from "../../components/SafetyPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Safety — Hack Club",
  description:
    "Hack Club is committed to participant safety, both online and offline. Read our Code of Conduct and Safeguarding Policy.",
  canonical: "/safety",
});

export default function Page() {
  return <SafetyPage />;
}
