import { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { MarkdownPage } from "../../components/MarkdownPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Safeguarding Policy — Hack Club",
  description: "Hack Club's Events Safeguarding Policy for in-person events.",
  canonical: "/safeguarding",
});

export default function SafeguardingPage() {
  const content = fs.readFileSync(path.join(process.cwd(), "content/safeguarding.md"), "utf-8");
  return <MarkdownPage content={content} />;
}
