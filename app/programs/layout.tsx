import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs — Hack Club",
  description:
    "Explore Hack Club programs — coding projects, events, and opportunities for teen makers.",
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
