import type { ReactNode } from "react";

/**
 * Root layout must exist so global `not-found` / error boundaries work.
 * The real `<html>` / `<body>` shell lives in `app/[locale]/layout.tsx`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
