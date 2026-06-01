export function x(email?: string) {
  const url = new URL("https://slack.hackclub.com/slides/1");

  const x = email?.trim();
  if (x) {
    url.searchParams.set("email", x);
  }

  return url.toString();
}

export function sendToAuth(email?: string) {
  if (typeof window === "undefined") return;

  if (!email?.trim()) return;

  window.location.assign(x(email));
}
