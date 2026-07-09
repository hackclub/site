function x(email: string): boolean {
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return false;

  const at = trimmed.indexOf("@");
  if (at < 1 || at !== trimmed.lastIndexOf("@")) return false;

  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  if (local.length > 64 || domain.length === 0) return false;

  const dot = domain.lastIndexOf(".");
  if (dot < 1 || dot >= domain.length - 1) return false;

  for (let i = 0; i < trimmed.length; i++) {
    const code = trimmed.charCodeAt(i);
    if (code <= 32 || code === 127) return false;
  }

  return true;
}

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && x(value);
}
