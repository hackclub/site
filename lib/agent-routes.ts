import {
  DIRECTORY_CATEGORIES,
  FISCAL_REGIONS,
  getClimateRegionParam,
} from "@/lib/fiscal-sponsorship-config";

export type AgentRouteGroup = "start" | "about" | "community" | "hcb" | "policies";

export type AgentRoute = {
  path: string;
  namespace: string;
  titleKey: string;
  descriptionKey: string;
  group: AgentRouteGroup;
  contentSlug?: string;
};

export const AGENT_ROUTE_GROUP_LABELS: Record<AgentRouteGroup, string> = {
  start: "Start here",
  about: "About Hack Club",
  community: "Programs and community",
  hcb: "HCB (fiscal sponsorship)",
  policies: "Policies and legal",
};

export const AGENT_ROUTES: AgentRoute[] = [
  {
    path: "/",
    namespace: "Meta",
    titleKey: "title",
    descriptionKey: "description",
    group: "start",
  },
  {
    path: "/programs",
    namespace: "Programs",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "start",
  },
  {
    path: "/clubs",
    namespace: "Clubs",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "start",
  },
  {
    path: "/map",
    namespace: "Map",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "community",
  },
  {
    path: "/arcade",
    namespace: "Arcade",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "community",
  },
  {
    path: "/alumni",
    namespace: "Alums",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "community",
  },
  {
    path: "/philosophy",
    namespace: "Philosophy",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "about",
  },
  {
    path: "/team",
    namespace: "Team",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "about",
  },
  {
    path: "/jobs",
    namespace: "Jobs",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "about",
  },
  {
    path: "/philanthropy",
    namespace: "Philanthropy",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "about",
  },
  {
    path: "/press",
    namespace: "Press",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "about",
  },
  {
    path: "/brand",
    namespace: "Brand",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "about",
  },
  {
    path: "/parents",
    namespace: "Parents",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "about",
  },
  {
    path: "/opensource",
    namespace: "OpenSource",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "about",
  },
  {
    path: "/fiscal-sponsorship",
    namespace: "Hcb",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "hcb",
  },
  {
    path: "/fiscal-sponsorship/directory",
    namespace: "HcbDirectory",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "hcb",
  },
  {
    path: "/fiscal-sponsorship/climate",
    namespace: "HcbDirectory",
    titleKey: "climateMetaTitle",
    descriptionKey: "climateMetaDescription",
    group: "hcb",
  },
  {
    path: "/fiscal-sponsorship/first",
    namespace: "HcbFirst",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "hcb",
  },
  {
    path: "/fiscal-sponsorship/mobile",
    namespace: "HcbMobile",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "hcb",
  },
  {
    path: "/fiscal-sponsorship/open-source",
    namespace: "HcbOpenSource",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "hcb",
  },
  {
    path: "/conduct",
    namespace: "Pages",
    titleKey: "conductTitle",
    descriptionKey: "conductDescription",
    group: "policies",
    contentSlug: "conduct",
  },
  {
    path: "/safeguarding",
    namespace: "Pages",
    titleKey: "safeguardingTitle",
    descriptionKey: "safeguardingDescription",
    group: "policies",
    contentSlug: "safeguarding",
  },
  {
    path: "/safety",
    namespace: "Safety",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    group: "policies",
  },
  {
    path: "/privacy-and-terms",
    namespace: "Pages",
    titleKey: "privacyTitle",
    descriptionKey: "privacyDescription",
    group: "policies",
    contentSlug: "privacy-and-terms",
  },
  {
    path: "/it-admins",
    namespace: "Pages",
    titleKey: "itAdminsTitle",
    descriptionKey: "itAdminsDescription",
    group: "policies",
    contentSlug: "it-admins",
  },
  {
    path: "/imprint",
    namespace: "Pages",
    titleKey: "imprintTitle",
    descriptionKey: "imprintDescription",
    group: "policies",
    contentSlug: "imprint",
  },
];

const ROUTES_BY_PATH = new Map(AGENT_ROUTES.map((route) => [route.path, route]));

const PASSTHROUGH_PREFIXES = ["/api", "/_next", "/_vercel", "/monitoring"];

export function normalizeRoutePath(pathname: string): string {
  if (!pathname) return "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const trimmed = withLeadingSlash.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function isKnownDynamicPath(path: string): boolean {
  const climate = path.match(/^\/fiscal-sponsorship\/climate\/([^/]+)$/);
  if (climate) {
    return FISCAL_REGIONS.some(
      (region) => getClimateRegionParam(region) === decodeURIComponent(climate[1]),
    );
  }

  const directory = path.match(/^\/fiscal-sponsorship\/directory\/([^/]+)(?:\/([^/]+))?$/);
  if (directory) {
    const category = decodeURIComponent(directory[1]);
    if (!DIRECTORY_CATEGORIES.some((entry) => entry.id === category)) return false;
    if (!directory[2]) return true;
    const region = decodeURIComponent(directory[2]);
    return FISCAL_REGIONS.some((entry) => entry.slug === region);
  }

  return false;
}

export function findAgentRoute(pathname: string): AgentRoute | null {
  const path = normalizeRoutePath(pathname);

  const exact = ROUTES_BY_PATH.get(path);
  if (exact) return exact;

  if (!isKnownDynamicPath(path)) return null;

  if (path.startsWith("/fiscal-sponsorship/climate")) {
    return ROUTES_BY_PATH.get("/fiscal-sponsorship/climate") ?? null;
  }
  return ROUTES_BY_PATH.get("/fiscal-sponsorship/directory") ?? null;
}

export function isMarkdownEligiblePath(pathname: string): boolean {
  const path = normalizeRoutePath(pathname);
  if (ROUTES_BY_PATH.has(path)) return true;
  if (isKnownDynamicPath(path)) return true;
  return !PASSTHROUGH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix.endsWith("/") ? prefix : `${prefix}/`),
  );
}

export const RECOVERY_LINKS = [
  { path: "/llms.txt", label: "llms.txt — index of every page, for agents" },
  { path: "/sitemap.xml", label: "sitemap.xml — every canonical URL" },
  { path: "/openapi.json", label: "openapi.json — the public JSON API" },
  { path: "/", label: "Homepage" },
  { path: "/programs", label: "Programs — things you can join or ship right now" },
] as const;
