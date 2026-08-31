import { XML_DECLARATION, xmlEmptyTag, xmlTag } from "@/lib/xml";
import type { Event } from "@/lib/events";

export type RssItem = {
  title: string;
  link: string;
  description: string;
  guid: string;
  /** RFC 822. `null` omits the element rather than emitting an empty one. */
  pubDate: string | null;
  categories: string[];
};

export type RssChannel = {
  title: string;
  link: string;
  description: string;
  feedUrl: string;
  language: string;
  lastBuildDate: string | null;
  ttlMinutes: number;
};

export function toRfc822(iso: string): string | null {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date.toUTCString();
}

function renderItem(item: RssItem): string {
  const lines = [
    xmlTag("title", item.title),
    xmlTag("link", item.link),
    xmlTag("description", item.description),
    xmlTag("guid", item.guid, { isPermaLink: "false" }),
    ...(item.pubDate ? [xmlTag("pubDate", item.pubDate)] : []),
    ...item.categories.map((category) => xmlTag("category", category)),
  ];
  return ["  <item>", ...lines.map((line) => `    ${line}`), "  </item>"].join("\n");
}

export function renderRssFeed(channel: RssChannel, items: RssItem[]): string {
  const head = [
    xmlTag("title", channel.title),
    xmlTag("link", channel.link),
    xmlTag("description", channel.description),
    xmlTag("language", channel.language),
    xmlEmptyTag("atom:link", {
      href: channel.feedUrl,
      rel: "self",
      type: "application/rss+xml",
    }),
    ...(channel.lastBuildDate ? [xmlTag("lastBuildDate", channel.lastBuildDate)] : []),
    `<ttl>${channel.ttlMinutes}</ttl>`,
    xmlTag("docs", "https://www.rssboard.org/rss-specification"),
  ];

  return [
    XML_DECLARATION,
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    ...head.map((line) => `    ${line}`),
    ...items.map(renderItem),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export const EVENTS_FEED_DEFAULT_LIMIT = 20;

export function eventGuid(id: string): string {
  return `tag:hackclub.com,2026:event/${id}`;
}

function descriptionFor(event: Event): string {
  if (event.description) return event.description;
  const range = event.endDate
    ? `Runs ${event.startDate} to ${event.endDate}.`
    : `Starts ${event.startDate}.`;
  return `${event.name} — a Hack Club event. ${range}`;
}

function itemFor(event: Event, origin: string): RssItem {
  return {
    title: event.name,
    link: event.url ?? `${origin}/programs`,
    description: descriptionFor(event),
    guid: eventGuid(event.id),
    pubDate: toRfc822(event.announcedAt),
    categories: [...event.projectTypes, event.status],
  };
}

export function buildEventsFeed(
  events: Event[],
  origin: string,
  limit = EVENTS_FEED_DEFAULT_LIMIT,
): string {
  const newestFirst = [...events]
    .sort((a, b) =>
      a.announcedAt === b.announcedAt
        ? a.id.localeCompare(b.id)
        : b.announcedAt.localeCompare(a.announcedAt),
    )
    .slice(0, limit);

  return renderRssFeed(
    {
      title: "Hack Club events",
      link: `${origin}/programs`,
      description: "The official feed for newly announced Hack Club events",
      feedUrl: `${origin}/api/v1/events/rss`,
      language: "en",
      lastBuildDate: newestFirst.length > 0 ? toRfc822(newestFirst[0].announcedAt) : null,
      ttlMinutes: 60,
    },
    newestFirst.map((event) => itemFor(event, origin)),
  );
}

export const EVENTS_FEED_PATH = "/api/v1/events/rss";
export const EVENTS_FEED_CONTENT_TYPE = "application/rss+xml; charset=utf-8";
