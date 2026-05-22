const BASE_ID = "appsbFEoTS7vN2zeB";
const TABLE = "Projects";
const FIELDS = [
  "Project Name",
  "Person",
  "Age",
  "Country",
  "Playable URL",
  "Code URL",
  "Image",
  "Program Name",
];

export interface AirtableProject {
  id: string;
  projectName: string;
  person: string;
  age: string | null;
  country: string | null;
  playableUrl: string | null;
  codeUrl: string | null;
  imageUrl: string | null;
  programName: string | null;
}

export async function getProjects(): Promise<AirtableProject[]> {
  const key = process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
  if (!key) throw new Error("HACK_CLUB_SITE_AIRTABLE_KEY not set");

  const out: AirtableProject[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    FIELDS.forEach((f) => params.append("fields[]", f));
    if (offset) params.set("offset", offset);

    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}?${params}`,
      {
        headers: { Authorization: `Bearer ${key}` },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error("Airtable fetch failed");

    const data = await res.json();
    offset = data.offset;

    for (const r of data.records ?? []) {
      const f = r.fields;
      if (!f["Project Name"]) continue;
      const img = Array.isArray(f["Image"]) ? f["Image"][0] : null;
      out.push({
        id: r.id,
        projectName: f["Project Name"],
        person: f["Person"] ?? "Unknown",
        age: f["Age"] ?? null,
        country: f["Country"] ?? null,
        playableUrl: f["Playable URL"] ?? null,
        codeUrl: f["Code URL"] ?? null,
        imageUrl: img?.thumbnails?.large?.url ?? img?.url ?? null,
        programName: f["Program Name"] ?? null,
      });
    }
  } while (offset);

  return out;
}

function distributeProjects(projects: AirtableProject[]): AirtableProject[] {
  const buckets = new Map<string, AirtableProject[]>();
  for (const p of projects) {
    const k = p.programName ?? `__solo_${p.id}`;
    (buckets.get(k) ?? buckets.set(k, []).get(k)!).push(p);
  }
  for (const a of buckets.values())
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

  const out: AirtableProject[] = [];
  let lastK: string | null = null,
    lastP: string | null = null;
  while (out.length < projects.length) {
    const c = [...buckets.entries()]
      .filter(([, a]) => a.length)
      .sort((a, b) => b[1].length - a[1].length);
    if (!c.length) break;
    const [k, a] =
      c.find(([k, a]) => k !== lastK && a[0].person !== lastP) ??
      c.find(([k]) => k !== lastK) ??
      c[0];
    out.push(a.shift()!);
    lastK = k;
    lastP = out[out.length - 1].person;
  }
  return out;
}

export async function pull(minCards: number): Promise<AirtableProject[]> {
  const projects = await getProjects();
  if (!projects.length) return [];
  const distributedProjects = distributeProjects(projects);
  const out: AirtableProject[] = [];
  while (out.length < minCards) out.push(...distributedProjects);
  return out;
}
