export const SITE_BASE_ID = "appsbFEoTS7vN2zeB";
export const SITE_TABLE_NAME = "Programs";

export const PROJECT_TYPE_OPTIONS = [
  "Electronics",
  "Websites",
  "Software",
  "Gamedev",
  "CAD",
  "Other",
] as const;
export type ProjectType = (typeof PROJECT_TYPE_OPTIONS)[number];
export type ProgramFormat = "In-Person Only" | "Online Only" | "Both";

export interface SiteProgram {
  recordId: string;
  programName: string;
  description: string | null;
  bgType: "color" | "image";
  bgColor: string;
  textColor: string;
  accentColor: string;
  logoUrl: string | null;
  logoSize: number;
  bgImageUrl: string | null;
  // Button
  buttonColor: string;
  buttonTextColor: string;
  buttonBorderRadius: number;
  buttonBorderWidth: number;
  buttonBorderColor: string;
  // Metadata
  slackChannel: string | null;
  projectTypes: ProjectType[];
  format: ProgramFormat | null;
  inPersonStart: string | null; // ISO date YYYY-MM-DD
  inPersonEnd: string | null; // ISO date YYYY-MM-DD
  inPersonLocation: string | null;
  additionalRequirements: string | null;
  pinned: boolean;
}

type RawRecord = {
  id: string;
  fields: {
    Name?: string;
    Description?: string;
    "Card BG Color"?: string;
    "Text Color"?: string;
    "Accent Color"?: string;
    "BG Type"?: string;
    Logo?: { id?: string; url: string; filename: string }[];
    "BG Image"?: { id?: string; url: string; filename: string }[];
    "Logo Size"?: number;
    "Button Color"?: string;
    "Button Text Color"?: string;
    "Button Border Radius"?: number;
    "Button Border Width"?: number;
    "Button Border Color"?: string;
    "Slack Channel"?: string;
    "Project Types"?: { name: string }[] | string[];
    Format?: { name: string } | string;
    "In-Person Start"?: string;
    "In-Person End"?: string;
    "In-Person Location"?: string;
    "Additional Requirements"?: string;
    Pinned?: boolean;
  };
};

export function parseRecord(r: RawRecord): SiteProgram {
  const fields = r.fields;

  const rawTypes = fields["Project Types"] ?? [];
  const projectTypes = (rawTypes as Array<{ name?: string } | string>)
    .map((t) => {
      const name = typeof t === "string" ? t : (t.name ?? "");
      return name === "Game Dev" ? "Gamedev" : name;
    })
    .filter(Boolean) as ProjectType[];

  const rawFormat = fields["Format"];
  const format = rawFormat
    ? typeof rawFormat === "string"
      ? rawFormat
      : ((rawFormat as { name?: string }).name ?? null)
    : null;

  return {
    recordId: r.id,
    programName: fields.Name ?? "",
    description: fields.Description ?? null,
    bgType: (fields["BG Type"] as "color" | "image") ?? "color",
    bgColor: fields["Card BG Color"] ?? "#ffffff",
    textColor: fields["Text Color"] ?? "#17171d",
    accentColor: fields["Accent Color"] ?? "#ec3750",
    logoUrl: fields.Logo?.[0]?.url ?? null,
    logoSize: fields["Logo Size"] ?? 48,
    bgImageUrl: fields["BG Image"]?.[0]?.url ?? null,
    buttonColor: fields["Button Color"] ?? "#ec3750",
    buttonTextColor: fields["Button Text Color"] ?? "#ffffff",
    buttonBorderRadius: fields["Button Border Radius"] ?? 44,
    buttonBorderWidth: fields["Button Border Width"] ?? 0,
    buttonBorderColor: fields["Button Border Color"] ?? "#17171d",
    slackChannel: fields["Slack Channel"] ?? null,
    projectTypes,
    format: format as ProgramFormat | null,
    inPersonStart: fields["In-Person Start"] ?? null,
    inPersonEnd: fields["In-Person End"] ?? null,
    inPersonLocation: fields["In-Person Location"] ?? null,
    additionalRequirements: fields["Additional Requirements"] ?? null,
    pinned: fields["Pinned"] === true,
  };
}

export function siteBaseUrl() {
  return `https://api.airtable.com/v0/${SITE_BASE_ID}/${encodeURIComponent(SITE_TABLE_NAME)}`;
}

export function siteAuthHeaders(key: string) {
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export const SITE_FIELDS = [
  "Name",
  "Description",
  "Card BG Color",
  "Text Color",
  "Accent Color",
  "BG Type",
  "Logo",
  "BG Image",
  "Logo Size",
  "Button Color",
  "Button Text Color",
  "Button Border Radius",
  "Button Border Width",
  "Button Border Color",
  "Slack Channel",
  "Project Types",
  "Format",
  "In-Person Start",
  "In-Person End",
  "In-Person Location",
  "Additional Requirements",
  "Pinned",
];

// Parse a YYYY-MM-DD string as a local calendar date (no timezone shift)
function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Format in-person date range for display
export function formatInPersonDate(
  start: string | null,
  end: string | null,
  location: string | null,
): string | null {
  let datePart = "";
  if (start) {
    const s = parseLocalDate(start);
    const e = end ? parseLocalDate(end) : null;
    if (!e || start === end) {
      datePart = s.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    } else if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
      datePart = `${s.getDate()}–${e.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
    } else {
      datePart = `${s.toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${e.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
    }
  }
  if (location && datePart) return `${datePart}, ${location}`;
  return datePart || location || null;
}
