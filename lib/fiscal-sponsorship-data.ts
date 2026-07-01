export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  backgroundImage: string;
  location: {
    readable: string;
    country?: string;
    continent?: string;
    state?: string;
    city?: string;
    countryCode?: string;
  };
  category?: string;
  tags?: string[];
  transparentFinances?: boolean;
  climate?: boolean;
  hcbProfileUrl?: string;
}

const HCB_API_BASE = "https://hcb.hackclub.com/api/v3";
const FETCH_TIMEOUT = 10000;
let organizationsPromise: Promise<Organization[]> | null = null;

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = FETCH_TIMEOUT,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeOrganization(data: Record<string, unknown>): Organization {
  const loc = (data.location as Record<string, unknown> | null) ?? {};
  const country = loc.country ? String(loc.country) : undefined;
  const continent = loc.continent ? String(loc.continent) : undefined;
  const state = loc.state ? String(loc.state) : undefined;
  const city = loc.city ? String(loc.city) : undefined;
  const readable = [city, state, country].filter(Boolean).join(", ") || continent || "";

  return {
    id: String(data.id ?? ""),
    name: String(data.name ?? ""),
    slug: String(data.slug ?? ""),
    description: String(data.description ?? ""),
    logo: String(data.logo ?? ""),
    backgroundImage: String(data.background_image ?? ""),
    location: {
      readable,
      country,
      continent,
      state,
      city,
      countryCode: loc.country_code ? String(loc.country_code) : undefined,
    },
    category: data.category ? String(data.category) : undefined,
    tags: [],
    transparentFinances: Boolean(data.transparent),
    climate: Boolean(data.climate),
    hcbProfileUrl: `https://hcb.hackclub.com/${String(data.slug ?? "")}`,
  };
}

export async function fetchHCBOrganizations(): Promise<Organization[]> {
  if (!organizationsPromise) {
    organizationsPromise = (async () => {
      try {
        let page = 1;
        let lastLength = 100;
        let total: Organization[] = [];

        while (lastLength >= 100) {
          const response = await fetchWithTimeout(
            `${HCB_API_BASE}/directory/organizations?per_page=100&page=${page}`,
            { headers: { Accept: "application/json" } },
          );

          if (!response.ok) {
            console.warn(`HCB API returned status ${response.status}`);
            break;
          }

          const data = await response.json();
          const orgs: Organization[] = Array.isArray(data)
            ? data.map((d: Record<string, unknown>) => normalizeOrganization(d))
            : [];
          lastLength = orgs.length;
          total = [...total, ...orgs];
          page++;
        }

        return [...total.filter((o) => o.logo), ...total.filter((o) => !o.logo)];
      } catch (error) {
        console.error("Failed to fetch HCB organizations:", error);
        return [];
      }
    })().catch((error) => {
      organizationsPromise = null;
      throw error;
    });
  }

  return organizationsPromise;
}

export async function fetchOrganizationsByCategory(category: string): Promise<Organization[]> {
  try {
    const allOrgs = await fetchHCBOrganizations();
    return allOrgs.filter((org) => org.category?.toLowerCase() === category.toLowerCase());
  } catch (error) {
    console.error(`Failed to fetch organizations for category ${category}:`, error);
    return [];
  }
}

export async function fetchOrganizationsByRegion(region: string): Promise<Organization[]> {
  try {
    const allOrgs = await fetchHCBOrganizations();
    const normalizedRegion = region.toLowerCase();
    return allOrgs.filter(
      (org) =>
        org.location.continent?.toLowerCase() === normalizedRegion ||
        org.location.continent
          ?.toLowerCase()
          .replace(/\s*&\s*/g, " and ")
          .includes(normalizedRegion),
    );
  } catch (error) {
    console.error(`Failed to fetch organizations for region ${region}:`, error);
    return [];
  }
}

export async function fetchOrganizationsByCategoryAndRegion(
  category: string,
  region: string,
): Promise<Organization[]> {
  try {
    const allOrgs = await fetchHCBOrganizations();
    const normalizedRegion = region.toLowerCase();
    return allOrgs.filter((org) => {
      const matchesCategory = org.category?.toLowerCase() === category.toLowerCase();
      const matchesRegion =
        org.location.continent?.toLowerCase() === normalizedRegion ||
        org.location.continent
          ?.toLowerCase()
          .replace(/\s*&\s*/g, " and ")
          .includes(normalizedRegion);
      return matchesCategory && matchesRegion;
    });
  } catch (error) {
    console.error(`Failed to fetch organizations for ${category}/${region}:`, error);
    return [];
  }
}

export async function fetchClimateOrganizations(): Promise<Organization[]> {
  try {
    const allOrgs = await fetchHCBOrganizations();
    return allOrgs.filter((org) => org.climate === true);
  } catch (error) {
    console.error("Failed to fetch climate organizations:", error);
    return [];
  }
}

export async function fetchClimateOrganizationsByRegion(region: string): Promise<Organization[]> {
  try {
    const climateOrgs = await fetchClimateOrganizations();
    const normalizedRegion = region.toLowerCase();
    return climateOrgs.filter(
      (org) =>
        org.location.continent?.toLowerCase() === normalizedRegion ||
        org.location.continent
          ?.toLowerCase()
          .replace(/\s*&\s*/g, " and ")
          .includes(normalizedRegion),
    );
  } catch (error) {
    console.error(`Failed to fetch climate organizations for region ${region}:`, error);
    return [];
  }
}

export async function fetchOrganizationBySlug(slug: string): Promise<Organization | null> {
  try {
    const response = await fetchWithTimeout(`${HCB_API_BASE}/organizations/${slug}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return normalizeOrganization(data as Record<string, unknown>);
  } catch (error) {
    console.error(`Failed to fetch organization ${slug}:`, error);
    return null;
  }
}

export async function getOrganizationCategories(): Promise<string[]> {
  try {
    const allOrgs = await fetchHCBOrganizations();
    const categories = new Set<string>();
    allOrgs.forEach((org) => {
      if (org.category) categories.add(org.category);
    });
    return Array.from(categories).sort();
  } catch (error) {
    console.error("Failed to get organization categories:", error);
    return [];
  }
}

export async function getOrganizationRegions(): Promise<string[]> {
  return ["North America", "South America", "Africa", "Europe", "Asia & Oceania"];
}

export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: "org_reboot",
    name: "Reboot",
    slug: "reboot",
    description: "Publishing techno-optimism, through newsletters, magazines, and events.",
    logo: "/fiscal-sponsorship/reboot.webp",
    backgroundImage: "/fiscal-sponsorship/reboot-bg.webp",
    location: { readable: "Bay Area, CA, USA", country: "USA", state: "CA", city: "Bay Area" },
    category: "organizations",
    tags: ["publishing", "media"],
    transparentFinances: true,
    hcbProfileUrl: "https://hcb.hackclub.com/reboot",
  },
  {
    id: "org_apocalypse",
    name: "Apocalypse",
    slug: "apocalypse",
    description: "Canada's largest in-person high school hackathon.",
    logo: "/fiscal-sponsorship/apocalypse.webp",
    backgroundImage: "/fiscal-sponsorship/apocalypse-bg.webp",
    location: { readable: "Toronto, Canada", country: "Canada", city: "Toronto" },
    category: "hackathon",
    tags: ["hackathon"],
    transparentFinances: true,
    hcbProfileUrl: "https://hcb.hackclub.com/apocalypse",
  },
  {
    id: "org_campfire",
    name: "Campfire",
    slug: "campfire",
    description:
      "Hack Club's largest satellite game jam hackathon running in 200+ cities in February 2026",
    logo: "/fiscal-sponsorship/campfire.webp",
    backgroundImage: "/fiscal-sponsorship/campfire-bg.webp",
    location: { readable: "Worldwide", country: "USA", city: "VT" },
    category: "hackathon",
    tags: ["hackathon"],
    transparentFinances: true,
    hcbProfileUrl: "https://hcb.hackclub.com/campfire",
  },
  {
    id: "org_green_mountain_robotics",
    name: "Green Mountain Robotics",
    slug: "green-mountain-robotics",
    description: "Spreading STEM interest, one robot at a time.",
    logo: "/fiscal-sponsorship/green-mountain-robotics.webp",
    backgroundImage: "/fiscal-sponsorship/green-mountain-robotics-bg.webp",
    location: { readable: "Chittenden County, VT, USA", country: "USA", state: "VT" },
    category: "organizations",
    tags: ["robotics", "STEM"],
    transparentFinances: false,
    hcbProfileUrl: "https://hcb.hackclub.com/green-mountain-robotics",
  },
  {
    id: "org_logan-square-mutual-aid",
    name: "Logan Square Mutual Aid",
    slug: "logan-square-mutual-aid",
    description: "A community-driven initiative to support local residents.",
    logo: "/fiscal-sponsorship/logan-square-mutual-aid.webp",
    backgroundImage: "/fiscal-sponsorship/logan-square-mutual-aid-bg.webp",
    location: { readable: "Chicago, IL, USA", country: "USA", state: "IL", city: "Chicago" },
    category: "organizations",
    tags: ["publishing", "media"],
    transparentFinances: true,
    hcbProfileUrl: "https://hcb.hackclub.com/logan-square-mutual-aid",
  },
  {
    id: "org_hq",
    name: "Hack Club HQ",
    slug: "hq",
    description: "This is us! We run our operations on HCB.",
    logo: "https://assets.hackclub.com/icon-rounded.png",
    backgroundImage: "/fiscal-sponsorship/hq-bg.jpg",
    location: { readable: "Vermont, USA", country: "USA", state: "VT" },
    category: "organizations",
    tags: ["hackclub"],
    transparentFinances: true,
    hcbProfileUrl: "https://hcb.hackclub.com/hq",
  },
];
