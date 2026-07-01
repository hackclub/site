import type { Metadata } from "next";
import MobilePageClient from "../MobilePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "HCB Mobile is here! — Hack Club",
  description: "Manage your HCB organizations on the go. Issue cards, view transactions, and more!",
  canonical: "/fiscal-sponsorship/mobile",
  image: "https://cdn.hackclub.com/019c76ba-15be-7e16-b6a7-adca9ccae9c0/Ueb-LA.png",
  imageAlt: "HCB Mobile is here!",
});

export default function MobilePage() {
  return <MobilePageClient />;
}
