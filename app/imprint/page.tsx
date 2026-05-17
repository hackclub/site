import { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { MarkdownPage } from "../../components/MarkdownPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Imprint — Hack Club",
  description: "Legal notice and contact details for Hack Club (The Hack Foundation).",
  canonical: "/imprint",
});

export default function ImprintPage() {
  const content = fs.readFileSync(path.join(process.cwd(), "content/imprint.md"), "utf-8");
  return <MarkdownPage content={content} />;
}
