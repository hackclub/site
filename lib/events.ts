import { getProgramStatus } from "@/lib/programs";
import type { ProjectType, SiteProgram } from "@/lib/site-programs";

export type EventStatus = "upcoming" | "ongoing" | "ended";
export type EventFormat = "in-person" | "online" | "both";

export interface EventInPerson {
  start: string | null;
  end: string | null;
  location: string | null;
}

export interface EventBackground {
  /** Which of `color` / `imageUrl` the card actually uses. */
  type: "color" | "image";
  color: string;
  imageUrl: string | null;
}

export interface EventTheme {
  text: string;
  accent: string;
  logoSize: number;
  button: {
    color: string;
    textColor: string;
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
  };
}

export interface Event {
  /** Airtable record id. The stable identifier — prefer this over `slug`. */
  id: string;
  /** Derived from the name. Convenient, but it moves if the event is renamed. */
  slug: string;
  name: string;
  description: string | null;
  /** The event's own website. */
  url: string | null;
  status: EventStatus;
  startDate: string;
  /** `null` means the event runs indefinitely. */
  endDate: string | null;
  /** When the event was added, ISO 8601. */
  announcedAt: string;
  format: EventFormat | null;
  inPerson: EventInPerson | null;
  projectTypes: ProjectType[];
  /** Channel name without the leading `#`. */
  slackChannel: string | null;
  slackUrl: string | null;
  requirements: string | null;
  pinned: boolean;
  logoUrl: string | null;
  /** `null` when the event has no card customisation yet. */
  background: EventBackground | null;
  /** `null` when the event has no card customisation yet. */
  theme: EventTheme | null;
}

/** A record as it comes back from the YSWS Programs table. */
export type RawEventRecord = {
  id: string;
  createdTime?: string;
  fields: {
    Name?: string;
    "Start Date"?: string;
    "End Date"?: string;
    "Website URL"?: string;
  };
};

const FORMAT_MAP: Record<string, EventFormat> = {
  "In-Person Only": "in-person",
  "Online Only": "online",
  Both: "both",
};

const RESERVED_SLUGS = new Set(["rss"]);

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeSlackChannel(channel: string | null): string | null {
  const trimmed = channel?.trim().replace(/^#/, "");
  return trimmed ? trimmed : null;
}

export function slackUrlFor(channel: string | null): string | null {
  const name = normalizeSlackChannel(channel);
  return name ? `https://hackclub.slack.com/channels/${encodeURIComponent(name)}` : null;
}

function normalizeWebsiteUrl(raw: string | undefined): string | null {
  const url = raw?.trim();
  if (!url) return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function announcedAtFor(record: RawEventRecord): string {
  if (record.createdTime) return record.createdTime;
  const start = record.fields["Start Date"];
  return start ? `${start}T00:00:00.000Z` : new Date(0).toISOString();
}

function publicStatus(startDate: string, endDate: string | null, now: Date): EventStatus {
  const status = getProgramStatus({ startDate, endDate }, now);
  return status === "draft" ? "upcoming" : status;
}

function backgroundFor(site: SiteProgram): EventBackground {
  return { type: site.bgType, color: site.bgColor, imageUrl: site.bgImageUrl };
}

function themeFor(site: SiteProgram): EventTheme {
  return {
    text: site.textColor,
    accent: site.accentColor,
    logoSize: site.logoSize,
    button: {
      color: site.buttonColor,
      textColor: site.buttonTextColor,
      borderRadius: site.buttonBorderRadius,
      borderWidth: site.buttonBorderWidth,
      borderColor: site.buttonBorderColor,
    },
  };
}

function toEvent(record: RawEventRecord, site: SiteProgram | null, now: Date): Omit<Event, "slug"> {
  const startDate = record.fields["Start Date"] ?? "";
  const endDate = record.fields["End Date"] || null;
  const slackChannel = normalizeSlackChannel(site?.slackChannel ?? null);
  const hasInPerson = Boolean(site?.inPersonStart || site?.inPersonEnd || site?.inPersonLocation);

  return {
    id: record.id,
    name: record.fields.Name ?? "Unnamed",
    description: site?.description ?? null,
    url: normalizeWebsiteUrl(record.fields["Website URL"]),
    status: publicStatus(startDate, endDate, now),
    startDate,
    endDate,
    announcedAt: announcedAtFor(record),
    format: site?.format ? (FORMAT_MAP[site.format] ?? null) : null,
    inPerson: hasInPerson
      ? {
          start: site?.inPersonStart ?? null,
          end: site?.inPersonEnd ?? null,
          location: site?.inPersonLocation ?? null,
        }
      : null,
    projectTypes: site?.projectTypes ?? [],
    slackChannel,
    slackUrl: slackUrlFor(slackChannel),
    requirements: site?.additionalRequirements ?? null,
    pinned: site?.pinned === true,
    logoUrl: site?.logoUrl ?? null,
    background: site ? backgroundFor(site) : null,
    theme: site ? themeFor(site) : null,
  };
}

export function buildEvents(
  records: RawEventRecord[],
  siteByName: Map<string, SiteProgram>,
  now = new Date(),
): Event[] {
  const partial = records.map((record) =>
    toEvent(record, siteByName.get(record.fields.Name ?? "") ?? null, now),
  );

  const order = [...partial].sort((a, b) =>
    a.announcedAt === b.announcedAt
      ? a.id.localeCompare(b.id)
      : a.announcedAt.localeCompare(b.announcedAt),
  );

  const taken = new Set<string>();
  const slugById = new Map<string, string>();

  for (const event of order) {
    const base = slugify(event.name) || slugify(event.id) || "event";
    let slug = base;
    let n = 1;
    while (taken.has(slug) || RESERVED_SLUGS.has(slug)) {
      n += 1;
      slug = `${base}-${n}`;
    }
    taken.add(slug);
    slugById.set(event.id, slug);
  }

  return partial.map(({ id, ...rest }) => ({ id, slug: slugById.get(id) as string, ...rest }));
}

export function findEvent(events: Event[], idOrSlug: string): Event | null {
  const needle = idOrSlug.toLowerCase();
  return (
    events.find((event) => event.id === idOrSlug) ??
    events.find((event) => event.slug === needle) ??
    null
  );
}

export function hasEventArtwork(event: Event): boolean {
  const background = event.background;
  if (!background) return false;
  const hasBackground =
    background.type === "image" ? Boolean(background.imageUrl) : Boolean(background.color);
  return hasBackground && Boolean(event.logoUrl);
}

export function selectFeaturedEvents(events: Event[], limit = 4, now = new Date()): Event[] {
  const pinned = events.find((event) => event.pinned);
  const ongoing = events.filter(
    (event) => publicStatus(event.startDate, event.endDate, now) === "ongoing",
  );

  for (let i = ongoing.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ongoing[i], ongoing[j]] = [ongoing[j], ongoing[i]];
  }

  ongoing.sort((a, b) => {
    const byPinned = Number(b.pinned) - Number(a.pinned);
    if (byPinned !== 0) return byPinned;

    const byImage =
      Number(Boolean(b.background?.imageUrl)) - Number(Boolean(a.background?.imageUrl));
    if (byImage !== 0) return byImage;

    return Number(Boolean(b.logoUrl)) - Number(Boolean(a.logoUrl));
  });

  ongoing.splice(limit);

  if (pinned && !ongoing.some((event) => event.pinned)) {
    if (ongoing.length >= limit) ongoing.pop();
    ongoing.unshift(pinned);
  }

  return ongoing;
}

export const EVENT_STATUSES = ["upcoming", "ongoing", "ended"] as const;
export const EVENT_SORT_FIELDS = ["startDate", "announcedAt", "name"] as const;
export const EVENT_ORDERS = ["asc", "desc"] as const;
export const EVENT_LIMIT_MAX = 100;

export type EventSortField = (typeof EVENT_SORT_FIELDS)[number];
export type EventOrder = (typeof EVENT_ORDERS)[number];

export type EventQuery = {
  status: EventStatus[] | null;
  sort: EventSortField;
  order: EventOrder;
  limit: number | null;
};

export type EventQueryResult =
  | { ok: true; query: EventQuery }
  | { ok: false; message: string; hint: string };

const DEFAULT_QUERY: EventQuery = {
  status: null,
  sort: "startDate",
  order: "desc",
  limit: null,
};

export type EventLimitResult =
  | { ok: true; limit: number | null }
  | { ok: false; message: string; hint: string };

export function parseEventLimit(raw: string | null): EventLimitResult {
  const value = raw?.trim();
  if (!value) return { ok: true, limit: null };

  const bad = {
    ok: false as const,
    message: `Invalid limit: ${value}`,
    hint: `limit must be a whole number between 1 and ${EVENT_LIMIT_MAX}.`,
  };

  if (!/^[0-9]+$/.test(value)) return bad;
  const parsed = Number(value);
  if (parsed < 1 || parsed > EVENT_LIMIT_MAX) return bad;
  return { ok: true, limit: parsed };
}

function invalid(param: string, value: string, allowed: readonly string[]): EventQueryResult {
  return {
    ok: false,
    message: `Invalid ${param}: ${value}`,
    hint: `${param} must be one of: ${allowed.join(", ")}.`,
  };
}

export function parseEventQuery(params: URLSearchParams): EventQueryResult {
  const query: EventQuery = { ...DEFAULT_QUERY };

  const rawStatuses = params
    .getAll("status")
    .flatMap((value) => value.split(","))
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (rawStatuses.length > 0) {
    for (const status of rawStatuses) {
      if (!(EVENT_STATUSES as readonly string[]).includes(status)) {
        return invalid("status", status, EVENT_STATUSES);
      }
    }
    query.status = [...new Set(rawStatuses as EventStatus[])];
  }

  const sort = params.get("sort")?.trim();
  if (sort) {
    if (!(EVENT_SORT_FIELDS as readonly string[]).includes(sort)) {
      return invalid("sort", sort, EVENT_SORT_FIELDS);
    }
    query.sort = sort as EventSortField;
  }

  const order = params.get("order")?.trim().toLowerCase();
  if (order) {
    if (!(EVENT_ORDERS as readonly string[]).includes(order)) {
      return invalid("order", order, EVENT_ORDERS);
    }
    query.order = order as EventOrder;
  }

  const limit = parseEventLimit(params.get("limit"));
  if (!limit.ok) return limit;
  query.limit = limit.limit;

  return { ok: true, query };
}

function compare(a: Event, b: Event, sort: EventSortField): number {
  switch (sort) {
    case "name":
      return a.name.localeCompare(b.name);
    case "announcedAt":
      return a.announcedAt.localeCompare(b.announcedAt);
    case "startDate":
      return a.startDate.localeCompare(b.startDate);
  }
}

export function applyEventQuery(events: Event[], query: EventQuery): Event[] {
  const statuses = query.status;
  const filtered = statuses ? events.filter((event) => statuses.includes(event.status)) : events;

  const direction = query.order === "asc" ? 1 : -1;
  const sorted = [...filtered].sort((a, b) => {
    const result = compare(a, b, query.sort);
    // Fall back to the id so equal keys never reorder between requests.
    return (result === 0 ? a.id.localeCompare(b.id) : result) * direction;
  });

  return query.limit === null ? sorted : sorted.slice(0, query.limit);
}
