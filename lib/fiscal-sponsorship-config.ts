import type { Organization } from "./fiscal-sponsorship-data";

export type FiscalDirectoryCategory = {
  label: string;
  id: string;
  miniLabel?: string;
  description: string | null;
  icon: string;
  color: string;
  index?: boolean;
};

export type FiscalRegion = {
  label: string;
  slug: string;
  color: string;
  iconColor: string;
  icon: string;
  image: string;
  ogImage: string;
  continents?: string[];
  miniLabel?: string;
};

export const DIRECTORY_CATEGORIES: FiscalDirectoryCategory[] = [
  {
    label: "Nonprofits",
    miniLabel: "All",
    id: "organizations",
    color: "purple",
    description: null,
    icon: "list",
    index: true,
  },
  {
    label: "FIRST Teams",
    id: "first",
    color: "blue",
    description: "Everywhere from San Jose to Boston to New York, HCB powers teams of all sizes.",
    icon: "sam",
  },
  {
    label: "Hackathons",
    id: "hackathons",
    color: "purple",
    description: "Hackers are using HCB to run hackathons that'll blow your mind away.",
    icon: "event-code",
  },
];

export const FISCAL_REGIONS: FiscalRegion[] = [
  {
    label: "North America",
    slug: "north-america",
    color: "secondary",
    iconColor: "red",
    icon: "photo",
    image: "https://cloud-cberabu5z-hack-club-bot.vercel.app/3north_america.png",
    ogImage: "/fiscal-sponsorship/climate/NorthAmerica.png",
  },
  {
    label: "South America",
    slug: "south-america",
    color: "secondary",
    iconColor: "orange",
    icon: "photo",
    image: "https://cloud-cberabu5z-hack-club-bot.vercel.app/4south_america.png",
    ogImage: "/fiscal-sponsorship/climate/SouthAmerica.png",
  },
  {
    label: "Africa",
    slug: "africa",
    color: "secondary",
    iconColor: "purple",
    icon: "explore",
    image: "https://cloud-cberabu5z-hack-club-bot.vercel.app/0africa.png",
    ogImage: "/fiscal-sponsorship/climate/Africa.png",
  },
  {
    label: "Europe",
    slug: "europe",
    color: "secondary",
    iconColor: "blue",
    icon: "explore",
    image: "https://cloud-oax3m4v0t-hack-club-bot.vercel.app/1europe.png",
    ogImage: "/fiscal-sponsorship/climate/Europe.png",
  },
  {
    label: "Asia & Oceania",
    slug: "asia-oceania",
    continents: ["Asia", "Oceania", "Australia"],
    color: "secondary",
    iconColor: "green",
    icon: "explore",
    image: "https://cloud-oax3m4v0t-hack-club-bot.vercel.app/0asia___oceania.png",
    ogImage: "/fiscal-sponsorship/climate/Asia+Oceania.png",
  },
];

export function getDirectoryCategoryById(id: string) {
  return DIRECTORY_CATEGORIES.find((category) => category.id === id);
}

export function getRegionBySlug(slug: string) {
  const normalizedSlug = slug.replace(/^organizations-in-/, "");
  return FISCAL_REGIONS.find((region) => region.slug === normalizedSlug);
}

export function getClimateRegionParam(region: FiscalRegion) {
  return `organizations-in-${region.slug}`;
}

export function organizationMatchesCategory(
  organization: Pick<Organization, "category">,
  categoryId: string,
) {
  if (categoryId === "organizations") {
    return true;
  }

  if (categoryId === "first") {
    return organization.category === "robotics_team";
  }

  if (categoryId === "hackathons") {
    return organization.category === "hackathon";
  }

  return false;
}

export function organizationMatchesRegion(
  organization: Pick<Organization, "location">,
  region: FiscalRegion,
) {
  const continent = organization.location.continent?.toLowerCase();
  if (!continent) return false;

  if (region.continents) {
    return region.continents.some((entry) => entry.toLowerCase() === continent);
  }

  return continent === region.label.toLowerCase();
}

export function filterOrganizationsByCategory(organizations: Organization[], categoryId: string) {
  return organizations.filter((organization) =>
    organizationMatchesCategory(organization, categoryId),
  );
}

export function filterOrganizationsByRegion(organizations: Organization[], regionSlug: string) {
  const region = getRegionBySlug(regionSlug);
  if (!region) return [];

  return organizations.filter((organization) => organizationMatchesRegion(organization, region));
}

export function filterOrganizationsByCategoryAndRegion(
  organizations: Organization[],
  categoryId: string,
  regionSlug: string,
) {
  const region = getRegionBySlug(regionSlug);
  if (!region) return [];

  return organizations.filter((organization) => {
    return (
      organizationMatchesCategory(organization, categoryId) &&
      organizationMatchesRegion(organization, region)
    );
  });
}
