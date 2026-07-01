import type { Metadata } from "next";
import TeamPageClient, {
  type CommunityPodData,
  type MemberGroup,
  type TeamMember,
} from "./TeamPageClient";
import { buildPageMetadata } from "@/lib/seo";
import teamData from "../../public/team.json";

export const metadata: Metadata = buildPageMetadata({
  title: "Team — Hack Club",
  description:
    "Meet the Hack Club team — the people behind the world's largest nonprofit network of teen coders.",
  canonical: "/team",
});

const members = [...(teamData as TeamMember[])].sort((left, right) =>
  left.name.localeCompare(right.name),
);

const filterMembers = (predicate: (member: TeamMember) => boolean) => members.filter(predicate);

const isSummerIntern = (member: TeamMember) => member.role === "Summer Intern";

const hqGroups: MemberGroup[] = [
  {
    label: "Staff",
    members: filterMembers((member) => member.department === "HQ" && Boolean(member.staff)),
  },
  {
    label: "Gap Years",
    members: filterMembers((member) => member.department === "HQ" && Boolean(member.gapyear)),
  },
  {
    label: "Teen Contributors",
    members: filterMembers(
      (member) =>
        member.department === "HQ" && !member.staff && !member.gapyear && !isSummerIntern(member),
    ),
  },
  {
    label: "Summer Interns",
    members: filterMembers((member) => member.department === "HQ" && isSummerIntern(member)),
  },
];

const hcbGroups: MemberGroup[] = [
  {
    label: "Staff",
    members: filterMembers((member) => member.department === "HCB" && Boolean(member.staff)),
  },
  {
    label: "Contributors",
    members: filterMembers((member) => member.department === "HCB" && !member.staff),
  },
];

const communityPods: CommunityPodData[] = [
  {
    title: "Moderation",
    description: "Keeping spaces safe, welcoming, and healthy as the community grows.",
    tone: "rose",
    members: filterMembers((member) => member.department === "Moderation"),
  },
  {
    title: "Welcomers",
    description: "The first hello for new Hack Clubbers showing up in the Slack.",
    tone: "sun",
    members: filterMembers((member) => member.department === "Welcoming"),
  },
  {
    title: "Virtual Events",
    description: "Running online moments, experiments, and community-wide activities.",
    tone: "sun",
    members: filterMembers((member) => member.department === "Events"),
  },
  {
    title: "Newspaper",
    description: "Publishing stories about the community and showcasing makers.",
    tone: "rose",
    members: filterMembers((member) => member.department === "Newspaper"),
  },
];

export default function TeamPage() {
  return <TeamPageClient hqGroups={hqGroups} hcbGroups={hcbGroups} communityPods={communityPods} />;
}
