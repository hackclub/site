import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TeamPageClient, {
  type CommunityPodData,
  type MemberGroup,
  type TeamMember,
} from "./TeamPageClient";
import { buildPageMetadata } from "@/lib/seo";
import teamData from "@/public/team.json";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Team" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/team",
    locale,
  });
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Team");

  const members = [...(teamData as TeamMember[])].sort((left, right) =>
    left.name.localeCompare(right.name),
  );

  const filterMembers = (predicate: (member: TeamMember) => boolean) =>
    members.filter(predicate);

  const hqGroups: MemberGroup[] = [
    {
      label: t("groupStaff"),
      members: filterMembers((member) => member.department === "HQ" && Boolean(member.staff)),
    },
    {
      label: t("groupGapYears"),
      members: filterMembers((member) => member.department === "HQ" && Boolean(member.gapyear)),
    },
    {
      label: t("groupTeenContributors"),
      members: filterMembers(
        (member) => member.department === "HQ" && !member.staff && !member.gapyear,
      ),
    },
  ];

  const hcbGroups: MemberGroup[] = [
    {
      label: t("groupStaff"),
      members: filterMembers((member) => member.department === "HCB" && Boolean(member.staff)),
    },
    {
      label: t("groupContributors"),
      members: filterMembers((member) => member.department === "HCB" && !member.staff),
    },
  ];

  const communityPods: CommunityPodData[] = [
    {
      title: t("podModerationTitle"),
      description: t("podModerationDescription"),
      tone: "rose",
      members: filterMembers((member) => member.department === "Moderation"),
    },
    {
      title: t("podWelcomersTitle"),
      description: t("podWelcomersDescription"),
      tone: "sun",
      members: filterMembers((member) => member.department === "Welcoming"),
    },
    {
      title: t("podVirtualEventsTitle"),
      description: t("podVirtualEventsDescription"),
      tone: "sun",
      members: filterMembers((member) => member.department === "Events"),
    },
    {
      title: t("podNewspaperTitle"),
      description: t("podNewspaperDescription"),
      tone: "rose",
      members: filterMembers((member) => member.department === "Newspaper"),
    },
  ];

  return <TeamPageClient hqGroups={hqGroups} hcbGroups={hcbGroups} communityPods={communityPods} />;
}
