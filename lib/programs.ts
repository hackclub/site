export type ProgramStatus = "ongoing" | "ended" | "draft";

export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getProgramStatus(
  program: { startDate: string; endDate: string | null },
  now = new Date(),
): ProgramStatus {
  const started = parseLocalDate(program.startDate) <= now;
  // If no end date, program runs indefinitely (never ends)
  const ended = program.endDate ? parseLocalDate(program.endDate) < now : false;
  return !started ? "draft" : ended ? "ended" : "ongoing";
}
