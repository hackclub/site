import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — Hack Club",
  description:
    "Meet the Hack Club team — the people behind the world's largest nonprofit network of teen coders.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
