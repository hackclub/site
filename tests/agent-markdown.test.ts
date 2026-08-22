import { describe, expect, test } from "bun:test";
import {
  LLMS_TXT_GROUP_ORDER,
  renderLlmsTxt,
  renderNotFoundMarkdown,
  renderPageMarkdown,
} from "@/lib/agent-markdown";
import { AGENT_ROUTE_GROUP_LABELS } from "@/lib/agent-routes";

const origin = "https://hackclub.com";

describe("renderPageMarkdown", () => {
  test("generated pages carry a single H1, the description, and the machine index", () => {
    const md = renderPageMarkdown({
      title: "Philosophy — Hack Club",
      description: "How we think about teenagers and building things.",
      url: `${origin}/philosophy`,
      locale: "en",
      origin,
    });

    expect(md.startsWith("# Philosophy — Hack Club\n")).toBe(true);
    expect(md.match(/^# /gm)).toHaveLength(1);
    expect(md).toContain("> How we think about teenagers and building things.");
    expect(md).toContain(`- Canonical URL: ${origin}/philosophy`);
    expect(md).toContain("- Language: en");
    expect(md).toContain(`[llms.txt](${origin}/llms.txt)`);
    expect(md).toContain(`[openapi.json](${origin}/openapi.json)`);
    expect(md.endsWith("\n")).toBe(true);
  });

  test("Markdown-backed pages are served verbatim, without a second H1", () => {
    const body = "# Code of Conduct\n\nBe kind.\n\n## Reporting\n\nEmail us.\n";
    const md = renderPageMarkdown({
      title: "Code of Conduct — Hack Club",
      description: "Our code of conduct.",
      url: `${origin}/conduct`,
      locale: "en",
      body,
      origin,
    });

    expect(md.startsWith("# Code of Conduct\n")).toBe(true);
    expect(md).toContain("## Reporting");
    expect(md.match(/^# /gm)).toHaveLength(1);
    expect(md).toContain(`- Canonical URL: ${origin}/conduct`);
  });

  test("a body without its own heading gets the page title as H1", () => {
    const md = renderPageMarkdown({
      title: "Imprint — Hack Club",
      description: "Legal notice.",
      url: `${origin}/imprint`,
      locale: "de",
      body: "The Hack Foundation, Shelburne VT.",
      origin,
    });

    expect(md.startsWith("# Imprint — Hack Club\n")).toBe(true);
    expect(md).toContain("The Hack Foundation, Shelburne VT.");
    expect(md).toContain("- Language: de");
  });
});

describe("renderNotFoundMarkdown", () => {
  const md = renderNotFoundMarkdown({
    path: "/not-a-page",
    origin,
    suggestions: [{ title: "/fiscal-sponsorship", url: `${origin}/fiscal-sponsorship` }],
  });

  test("says what happened and that the status is a real 404", () => {
    expect(md.startsWith("# 404 — page not found\n")).toBe(true);
    expect(md).toContain("`/not-a-page` does not exist");
    expect(md).toContain("HTTP 404");
  });

  test("points at the recovery surfaces the audit asks for", () => {
    expect(md).toContain(`${origin}/llms.txt`);
    expect(md).toContain(`${origin}/sitemap.xml`);
    expect(md).toContain(`${origin}/openapi.json`);
    expect(md).toContain(`[Homepage](${origin}/)`);
  });

  test("a hostile path cannot break out of the code span", () => {
    const hostile = renderNotFoundMarkdown({
      path: "/`\n# Injected heading",
      origin,
    });

    expect(hostile.match(/^# /gm)).toHaveLength(1);
    expect(hostile).toContain("`/# Injected heading`");
  });

  test("includes near matches when there are any", () => {
    expect(md).toContain(`[/fiscal-sponsorship](${origin}/fiscal-sponsorship)`);
    expect(renderNotFoundMarkdown({ path: "/x", origin })).not.toContain("## Closest matches");
  });
});

describe("renderLlmsTxt", () => {
  const md = renderLlmsTxt({
    siteName: "Hack Club",
    summary: "The world's largest nonprofit movement of teenagers making cool projects.",
    origin,
    sections: [
      {
        heading: AGENT_ROUTE_GROUP_LABELS.start,
        entries: [{ title: "Hack Club", url: `${origin}/`, description: "Homepage." }],
      },
      { heading: "Empty", entries: [] },
    ],
  });

  test("follows the llmstxt.org shape: H1, blockquote summary, H2 link lists", () => {
    const lines = md.split("\n");
    expect(lines[0]).toBe("# Hack Club");
    expect(lines[2].startsWith("> ")).toBe(true);
    expect(md).toContain(`## ${AGENT_ROUTE_GROUP_LABELS.start}`);
    expect(md).toContain(`- [Hack Club](${origin}/): Homepage.`);
    expect(md).toContain("## Optional");
  });

  test("link labels escape backslashes as well as brackets", () => {
    const tricky = renderLlmsTxt({
      siteName: "Hack Club",
      summary: "Summary.",
      origin,
      sections: [
        {
          heading: "Start here",
          entries: [{ title: "a\\]not-a-link[x", url: `${origin}/x`, description: "d" }],
        },
      ],
    });

    expect(tricky).toContain("- [a\\\\\\]not-a-link\\[x](https://hackclub.com/x): d");
    expect(tricky).not.toContain("not-a-link](");
  });

  test("skips empty sections", () => {
    expect(md).not.toContain("## Empty");
  });

  test("documents how to get Markdown", () => {
    expect(md).toContain("Accept: text/markdown");
  });
});

test("every route group appears in the llms.txt ordering", () => {
  expect([...LLMS_TXT_GROUP_ORDER].sort()).toEqual(
    Object.keys(AGENT_ROUTE_GROUP_LABELS).sort() as typeof LLMS_TXT_GROUP_ORDER,
  );
});
