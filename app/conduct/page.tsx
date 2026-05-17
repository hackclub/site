import { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { MarkdownPage } from "../../components/MarkdownPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Code of Conduct — Hack Club",
  description: "Hack Club's Code of Conduct for our community spaces, events, and projects.",
  canonical: "/conduct",
});

export default function ConductPage() {
  const content = fs.readFileSync(path.join(process.cwd(), "content/conduct.md"), "utf-8");
  return <MarkdownPage content={content} />;
}
