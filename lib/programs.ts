import type { SiteProgram } from "./site-programs";

export interface AirtableProgram {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  websiteUrl: string | null;
  site: SiteProgram | null;
}

export type ProgramStatus = "ongoing" | "ended" | "draft";

export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getProgramStatus(
  program: Pick<AirtableProgram, "startDate" | "endDate">,
  now = new Date(),
): ProgramStatus {
  const started = parseLocalDate(program.startDate) <= now;
  const ended = parseLocalDate(program.endDate) < now;
  return !started ? "draft" : ended ? "ended" : "ongoing";
}

export function selectFeaturedPrograms(
  programs: AirtableProgram[],
  limit = 4,
  now = new Date(),
): AirtableProgram[] {
  const pinned = programs.find((p) => p.site?.pinned);
  const ongoing = programs.filter((program) => getProgramStatus(program, now) === "ongoing");

  for (let i = ongoing.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ongoing[i], ongoing[j]] = [ongoing[j], ongoing[i]];
  }

  ongoing.sort((a, b) => {
    const aPinned = Number(Boolean(a.site?.pinned));
    const bPinned = Number(Boolean(b.site?.pinned));
    if (aPinned !== bPinned) return bPinned - aPinned;

    const aHasImage = Number(Boolean(a.site?.bgImageUrl));
    const bHasImage = Number(Boolean(b.site?.bgImageUrl));
    if (aHasImage !== bHasImage) return bHasImage - aHasImage;

    const aHasLogo = Number(Boolean(a.site?.logoUrl));
    const bHasLogo = Number(Boolean(b.site?.logoUrl));
    if (aHasLogo !== bHasLogo) return bHasLogo - aHasLogo;

    return 0;
  });

  ongoing.splice(limit);

  if (pinned && !ongoing.some((p) => p.site?.pinned)) {
    if (ongoing.length >= limit) ongoing.pop();
    ongoing.unshift(pinned);
  }

  return ongoing;
}
