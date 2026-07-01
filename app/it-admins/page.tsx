import { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { MarkdownPage } from "../../components/MarkdownPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Hack Club for IT Administrators — Hack Club",
  description: "Guide for IT Administrators to provide the required tools needed for Hack Clubs",
  canonical: "/it-admins",
});

export default function ConductPage() {
  const content = fs.readFileSync(path.join(process.cwd(), "content/it-admins.md"), "utf-8");
  return <MarkdownPage content={content} />;
}
