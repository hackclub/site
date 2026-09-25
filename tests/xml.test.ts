import { describe, expect, test } from "bun:test";
import { XML_DECLARATION, xmlEmptyTag, xmlEscape, xmlTag } from "@/lib/xml";

describe("xmlEscape", () => {
  test("escapes the five characters that matter", () => {
    expect(xmlEscape("a & b")).toBe("a &amp; b");
    expect(xmlEscape("<x>")).toBe("&lt;x&gt;");
    expect(xmlEscape('he said "hi"')).toBe("he said &quot;hi&quot;");
    // Numeric, not &apos; — that entity is valid XML but not HTML4, and plenty
    // of readers run descriptions through an HTML parser.
    expect(xmlEscape("it's")).toBe("it&#39;s");
  });

  test("escapes in one pass, so entities are not double-escaped", () => {
    expect(xmlEscape("&amp;")).toBe("&amp;amp;");
  });

  test("drops control characters, which cannot be escaped into validity", () => {
    expect(xmlEscape("a\u0000b\u0008c")).toBe("abc");
    expect(xmlEscape("a\u007Fb")).toBe("ab");
  });

  test("keeps the whitespace XML actually allows", () => {
    expect(xmlEscape("a\t\n\rb")).toBe("a\t\n\rb");
  });

  test("drops a lone surrogate but keeps a real emoji", () => {
    // A lone surrogate has no UTF-8 encoding, so one would make the whole
    // document unparseable.
    expect(xmlEscape("a\uD800b")).toBe("ab");
    expect(xmlEscape("a\uDC00b")).toBe("ab");
    expect(xmlEscape("flag 🚩")).toBe("flag 🚩");
  });

  test("leaves nothing dangerous in the output", () => {
    const hostile = ["]]>", "<script>alert(1)</script>", '" onload="evil()', "& < > \" '"];
    for (const value of hostile) {
      const escaped = xmlEscape(value);
      expect(escaped).not.toContain("<");
      expect(escaped).not.toContain(">");
      expect(escaped.replace(/&(amp|lt|gt|quot|#39);/g, "")).not.toContain("&");
    }
  });
});

describe("xmlTag", () => {
  test("wraps an escaped value", () => {
    expect(xmlTag("title", "a & b")).toBe("<title>a &amp; b</title>");
  });

  test("escapes attribute values too", () => {
    expect(xmlTag("guid", "x", { isPermaLink: "false" })).toBe(
      '<guid isPermaLink="false">x</guid>',
    );
    expect(xmlTag("a", "x", { href: 'a"b' })).toBe('<a href="a&quot;b">x</a>');
  });

  test("builds self-closing elements", () => {
    expect(xmlEmptyTag("atom:link", { rel: "self" })).toBe('<atom:link rel="self" />');
  });
});

test("the declaration says UTF-8", () => {
  expect(XML_DECLARATION).toBe('<?xml version="1.0" encoding="utf-8"?>');
});
