import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ArcadePageClient, { type ArcadeCarouselItem, type ArcadePrize } from "./ArcadePageClient";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

type PrizeDef = {
  key: string;
  hours: number;
  imageURL: string;
  limited?: boolean;
  hasSmallName?: boolean;
  hasDescription?: boolean;
};

const prizeDefs: PrizeDef[] = [
  {
    key: "yubikey",
    hours: 12,
    imageURL:
      "https://cloud-elfpck7gj-hack-club-bot.vercel.app/0screenshot_2024-06-14_at_07.42.35.png",
    limited: true,
    hasDescription: true,
  },
  {
    key: "bambuLab",
    hours: 135,
    imageURL: "https://cloud-n8ijhwk64-hack-club-bot.vercel.app/0a1_mini.png",
    hasSmallName: true,
  },
  {
    key: "solderingIron",
    hours: 8,
    imageURL: "https://cloud-amz50nt0a-hack-club-bot.vercel.app/0soldering_iron.png",
    hasSmallName: true,
  },
  {
    key: "framework",
    hours: 400,
    imageURL: "https://cloud-cqnd9gu78-hack-club-bot.vercel.app/0framework.png",
    limited: true,
    hasSmallName: true,
  },
  {
    key: "flipper",
    hours: 70,
    imageURL: "https://cloud-p2gdpsmd3-hack-club-bot.vercel.app/0top.png",
    hasSmallName: true,
  },
  {
    key: "macbook",
    hours: 400,
    imageURL:
      "https://cloud-9zwbzfbtw-hack-club-bot.vercel.app/00image_from_ios-removebg-preview.png",
    limited: true,
    hasSmallName: true,
  },
  {
    key: "wacom",
    hours: 25,
    imageURL: "https://cloud-bi9lc9poq-hack-club-bot.vercel.app/0intuos.png",
    hasSmallName: true,
  },
  {
    key: "logitech",
    hours: 75,
    imageURL:
      "https://cloud-gt96uxjmh-hack-club-bot.vercel.app/061__ok6aqtl._ac_uf894_1000_ql80_.png",
    limited: true,
    hasSmallName: true,
  },
  {
    key: "quest3",
    hours: 200,
    imageURL:
      "https://cloud-7x2qyu0b9-hack-club-bot.vercel.app/0screenshot_2024-06-14_at_08.46.20.png",
  },
];

const liveCarousel: ArcadeCarouselItem[] = [
  {
    hours: 6,
    imageURL: "https://cloud-lit9nkas9-hack-club-bot.vercel.app/051t9lfjeuml._ac_sl1500_.png",
  },
  {
    hours: 12,
    imageURL:
      "https://cloud-elfpck7gj-hack-club-bot.vercel.app/0screenshot_2024-06-14_at_07.42.35.png",
  },
  {
    hours: 18,
    imageURL: "https://cloud-8ikvjz9g0-hack-club-bot.vercel.app/0image.png",
  },
  {
    hours: 168,
    imageURL:
      "https://cloud-bscuvqen5-hack-club-bot.vercel.app/045ee3bbe-1519-481a-908e-781f1323a72e-4_f7e8a61e-ae12-4b8d-9c20-68c38709be13.png",
  },
  {
    hours: 6,
    imageURL: "https://cloud-ogt9k4r4u-hack-club-bot.vercel.app/0breadboard.png",
  },
  {
    hours: 135,
    imageURL: "https://cloud-n8ijhwk64-hack-club-bot.vercel.app/0a1_mini.png",
  },
  {
    hours: 20,
    imageURL: "https://cloud-4qxzmw5wz-hack-club-bot.vercel.app/1pinetime.png",
  },
  {
    hours: 85,
    imageURL: "https://cloud-2wpezbt6a-hack-club-bot.vercel.app/1miir.png",
  },
  {
    hours: 8,
    imageURL: "https://cloud-amz50nt0a-hack-club-bot.vercel.app/0soldering_iron.png",
  },
  {
    hours: 8,
    imageURL: "https://cloud-4qxzmw5wz-hack-club-bot.vercel.app/0glue.png",
  },
  {
    hours: 1,
    imageURL: "https://cloud-c1gqq7ttf-hack-club-bot.vercel.app/0sticker_pile_2.png",
  },
  {
    hours: 400,
    imageURL: "https://cloud-cqnd9gu78-hack-club-bot.vercel.app/0framework.png",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Arcade" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/arcade",
    locale,
  });
}

export default async function ArcadePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Arcade" });

  const livePrizes: ArcadePrize[] = prizeDefs.map((def) => {
    const base = `prizeItems.${def.key}` as const;
    return {
      name: t(`${base}.name`),
      smallName: def.hasSmallName ? t(`${base}.smallName`) : undefined,
      description: def.hasDescription ? t(`${base}.description`) : undefined,
      hours: def.hours,
      imageURL: def.imageURL,
      limited: def.limited,
    };
  });

  return <ArcadePageClient prizes={livePrizes} carouselItems={liveCarousel} />;
}
