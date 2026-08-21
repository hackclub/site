import type { AgentRouteGroup } from "@/lib/agent-routes";

export type MarkdownPageInput = {
  title: string;
  description: string;
  url: string;
  locale: string;
  body?: string;
  origin: string;
};

export type LlmsTxtSection = {
  heading: string;
  entries: { title: string; url: string; description: string }[];
};

const AGENT_FOOTER_NOTE =
  "Every page on this site is available as Markdown: send `Accept: text/markdown`.";

function trimTrailingNewlines(value: string): string {
  return value.replace(/\s+$/, "");
}

function hasTopLevelHeading(markdown: string): boolean {
  return /^#\s+\S/m.test(markdown.split("\n").slice(0, 5).join("\n"));
}

function escapeLinkText(value: string): string {
  return value.replace(/([\\[\]])/g, "\\$1");
}

function escapeCodeSpan(value: string): string {
  return value.replace(/[`\r\n]/g, "");
}

function machineReadableList(origin: string): string {
  return [
    `- [llms.txt](${origin}/llms.txt) — index of every page on this site`,
    `- [sitemap.xml](${origin}/sitemap.xml) — every canonical URL`,
    `- [openapi.json](${origin}/openapi.json) — the public JSON API`,
  ].join("\n");
}

export function renderPageMarkdown({
  title,
  description,
  url,
  locale,
  body,
  origin,
}: MarkdownPageInput): string {
  const parts: string[] = [];

  if (body && hasTopLevelHeading(body)) {
    parts.push(trimTrailingNewlines(body));
  } else {
    parts.push(`# ${title}`);
    parts.push(`> ${description}`);
    if (body) parts.push(trimTrailingNewlines(body));
  }

  if (!body) {
    parts.push(
      `This is the Markdown representation of ${url}. The page itself is an interactive HTML page; this document carries its title, description, and the links an agent needs to keep going.`,
    );
  }

  parts.push(
    [
      "## Page metadata",
      "",
      `- Canonical URL: ${url}`,
      `- Language: ${locale}`,
      `- Media type: text/markdown (negotiated from the same URL via \`Accept\`)`,
    ].join("\n"),
  );

  parts.push(["## Machine-readable index", "", machineReadableList(origin)].join("\n"));

  parts.push(AGENT_FOOTER_NOTE);

  return `${parts.join("\n\n")}\n`;
}

export function renderNotFoundMarkdown({
  path,
  origin,
  suggestions = [],
}: {
  path: string;
  origin: string;
  suggestions?: { title: string; url: string }[];
}): string {
  const parts = [
    "# 404 — page not found",
    `\`${escapeCodeSpan(path)}\` does not exist on ${origin}. This response really is HTTP 404; no page was served in its place.`,
  ];

  if (suggestions.length > 0) {
    parts.push(
      [
        "## Closest matches",
        "",
        ...suggestions.map((s) => `- [${escapeLinkText(s.title)}](${s.url})`),
      ].join("\n"),
    );
  }

  parts.push(
    [
      "## Where to look next",
      "",
      machineReadableList(origin),
      `- [Homepage](${origin}/) — what Hack Club is`,
      `- [Programs](${origin}/programs) — things to join or ship right now`,
    ].join("\n"),
  );

  parts.push(AGENT_FOOTER_NOTE);

  return `${parts.join("\n\n")}\n`;
}

export function renderLlmsTxt({
  siteName,
  summary,
  origin,
  sections,
}: {
  siteName: string;
  summary: string;
  origin: string;
  sections: LlmsTxtSection[];
}): string {
  const parts = [
    `# ${siteName}`,
    `> ${summary}`,
    [
      `Every page listed below is also available as Markdown from the same URL — send \`Accept: text/markdown\`. Responses carry \`Vary: Accept\`, and paths that do not exist answer with a real HTTP 404 and a Markdown body explaining where to go instead.`,
    ].join("\n"),
  ];

  for (const section of sections) {
    if (section.entries.length === 0) continue;
    parts.push(
      [
        `## ${section.heading}`,
        "",
        ...section.entries.map(
          (entry) => `- [${escapeLinkText(entry.title)}](${entry.url}): ${entry.description}`,
        ),
      ].join("\n"),
    );
  }

  parts.push(
    [
      "## Optional",
      "",
      `- [OpenAPI specification](${origin}/openapi.json): the public read-only JSON endpoints, their responses, and the shared error shape`,
      `- [OpenAPI specification (YAML)](${origin}/api/openapi.yaml): the same document as YAML`,
      `- [sitemap.xml](${origin}/sitemap.xml): canonical URLs for every locale`,
      `- [Source code](https://github.com/hackclub/site): this website, on GitHub`,
    ].join("\n"),
  );

  return `${parts.join("\n\n")}\n`;
}

export const LLMS_TXT_GROUP_ORDER: AgentRouteGroup[] = [
  "start",
  "about",
  "community",
  "hcb",
  "policies",
];
