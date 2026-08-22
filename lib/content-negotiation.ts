export type MediaRange = {
  type: string;
  subtype: string;
  quality: number;
  specificity: number;
  parameters: Record<string, string>;
};

function parseQuality(raw: string | undefined): number {
  if (raw === undefined) return 1;
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return 1;
  return Math.min(1, Math.max(0, value));
}

function splitList(header: string): string[] {
  const parts: string[] = [];
  let current = "";
  let quoted = false;

  for (let i = 0; i < header.length; i++) {
    const char = header[i];
    if (quoted) {
      current += char;
      if (char === "\\" && i + 1 < header.length) {
        current += header[++i];
      } else if (char === '"') {
        quoted = false;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
      current += char;
      continue;
    }
    if (char === ",") {
      parts.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  parts.push(current);

  return parts.map((part) => part.trim()).filter(Boolean);
}

function unquote(value: string): string {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/\\(.)/g, "$1");
  }
  return value;
}

export function parseAccept(header: string | null | undefined): MediaRange[] {
  if (!header) return [];

  const ranges: MediaRange[] = [];

  for (const entry of splitList(header)) {
    const [rawRange, ...rawParams] = entry.split(";").map((part) => part.trim());
    const slash = rawRange.indexOf("/");
    if (slash <= 0) continue;

    const type = rawRange.slice(0, slash).toLowerCase();
    const subtype = rawRange.slice(slash + 1).toLowerCase();
    if (!type || !subtype) continue;
    if (type === "*" && subtype !== "*") continue;

    const parameters: Record<string, string> = {};
    let quality = 1;
    let seenQ = false;

    for (const param of rawParams) {
      const eq = param.indexOf("=");
      const name = (eq === -1 ? param : param.slice(0, eq)).trim().toLowerCase();
      const value = eq === -1 ? "" : unquote(param.slice(eq + 1).trim());

      if (!seenQ && name === "q") {
        quality = parseQuality(value);
        seenQ = true;
        continue;
      }
      if (!seenQ) parameters[name] = value;
    }

    ranges.push({
      type,
      subtype,
      quality,
      specificity: type === "*" ? 0 : subtype === "*" ? 1 : 2,
      parameters,
    });
  }

  return ranges;
}

export function qualityOf(ranges: MediaRange[], mediaType: string): number {
  if (ranges.length === 0) return 1;

  const slash = mediaType.indexOf("/");
  const type = mediaType.slice(0, slash).toLowerCase();
  const subtype = mediaType.slice(slash + 1).toLowerCase();

  let best: MediaRange | null = null;
  for (const range of ranges) {
    const matches =
      (range.type === "*" && range.subtype === "*") ||
      (range.type === type && range.subtype === "*") ||
      (range.type === type && range.subtype === subtype);
    if (!matches) continue;
    if (
      !best ||
      range.specificity > best.specificity ||
      (range.specificity === best.specificity && range.quality > best.quality)
    ) {
      best = range;
    }
  }

  return best ? best.quality : 0;
}

export function selectRepresentation(
  header: string | null | undefined,
  offers: readonly string[] = ["text/html", "text/markdown"],
): string | null {
  const ranges = parseAccept(header);

  let chosen: string | null = null;
  let chosenQuality = 0;

  for (const offer of offers) {
    const quality = qualityOf(ranges, offer);
    if (quality > chosenQuality) {
      chosen = offer;
      chosenQuality = quality;
    }
  }

  return chosenQuality > 0 ? chosen : null;
}

export function prefersMarkdown(header: string | null | undefined): boolean {
  return selectRepresentation(header) === "text/markdown";
}

export function acceptsNothingWeServe(header: string | null | undefined): boolean {
  return selectRepresentation(header) === null;
}

export function mergeVary(existing: string | null | undefined, ...values: string[]): string {
  const seen = new Map<string, string>();

  for (const value of [...(existing ?? "").split(","), ...values]) {
    const trimmed = value.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (key === "*") return "*";
    if (!seen.has(key)) seen.set(key, trimmed);
  }

  return Array.from(seen.values()).join(", ");
}

export function markdownAlternateLink(url: string): string {
  return `<${url}>; rel="alternate"; type="text/markdown"`;
}

export function agentDiscoveryLinks(origin: string): string[] {
  return [
    `<${origin}/llms.txt>; rel="index"; type="text/plain"`,
    `<${origin}/openapi.json>; rel="service-desc"; type="application/json"`,
    `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
  ];
}
