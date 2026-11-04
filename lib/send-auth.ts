export function getAuthUrl(email?: string) {
  const url = new URL("https://slack.hackclub.com/slides/0");
  const t = email?.trim();
  if (t) url.searchParams.set("email", t);
  return url.toString();
}

export function sendToAuth(email?: string) {
  if (typeof window === "undefined" || !email?.trim()) return;
  window.location.assign(getAuthUrl(email));
}
