"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

export type TeamMember = {
  name: string;
  department: string;
  role: string;
  bio?: string;
  email?: string;
  website?: string;
  avatar?: string;
  staff?: boolean;
  gapyear?: boolean;
};

export type MemberGroup = {
  label: string;
  members: TeamMember[];
};

type TeamLaneProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone: "ember" | "ink";
  groups: MemberGroup[];
};

type CommunityPodProps = {
  title: string;
  description: string;
  tone: "sun" | "rose" | "ink";
  members: TeamMember[];
};

export type CommunityPodData = CommunityPodProps;

type TeamPageClientProps = {
  hqGroups: MemberGroup[];
  hcbGroups: MemberGroup[];
  communityPods: CommunityPodData[];
};

function normalizeWebsite(website?: string) {
  if (!website) {
    return null;
  }

  const trimmed = website.trim();
  if (!trimmed || !trimmed.includes(".")) {
    return null;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function websiteLabel(website: string) {
  return website.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function emailHref(email?: string) {
  if (!email) {
    return null;
  }

  return email.includes("@") ? `mailto:${email}` : `mailto:${email}@hackclub.com`;
}

function BoardCard({
  img,
  name,
  boardRole,
  subrole,
  bio,
  email,
  href,
}: {
  img: string;
  name: string;
  boardRole: string;
  subrole?: string;
  bio?: string;
  email?: string;
  href?: string;
}) {
  const mailHref = email
    ? email.includes("@")
      ? `mailto:${email}`
      : `mailto:${email}@hackclub.com`
    : null;
  const card = (
    <article className={`board-card${href ? " board-card--linked" : ""}`}>
      <Image
        src={img}
        alt={name}
        width={96}
        height={96}
        sizes="96px"
        className="board-card__avatar"
      />
      <p className="board-card__name">{name}</p>
      <p className="board-card__role">{boardRole}</p>
      {subrole && <p className="board-card__subrole">{subrole}</p>}
      {bio && <p className="board-card__bio">{bio}</p>}
      {mailHref && (
        <a href={mailHref} className="board-card__pill" onClick={(e) => e.stopPropagation()}>
          {email!.includes("@") ? email : `${email}@hackclub.com`}
        </a>
      )}
    </article>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="board-card-anchor">
      {card}
    </a>
  ) : (
    card
  );
}

function PersonCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
  return (
    <button
      type="button"
      className="person-card"
      onClick={onClick}
      aria-label={`View ${member.name}`}
    >
      <span className="person-card__top">
        <span className="person-card__avatar-wrap">
          {member.avatar ? (
            <Image
              src={member.avatar}
              alt={member.name}
              width={68}
              height={68}
              className="person-card__avatar"
            />
          ) : (
            <span className="person-card__avatar person-card__avatar--fallback">
              {member.name.charAt(0)}
            </span>
          )}
        </span>
        <span className="person-card__identity">
          <span className="person-card__name">{member.name}</span>
          <span className="person-card__role">{member.role}</span>
        </span>
      </span>
    </button>
  );
}

function TeamLane({
  eyebrow,
  title,
  description,
  tone,
  groups,
  onMemberClick,
}: TeamLaneProps & { onMemberClick: (member: TeamMember) => void }) {
  return (
    <section className={`lane lane--${tone}`}>
      <div className="lane__header">
        <p className="lane__eyebrow">{eyebrow}</p>
        <h2 className="lane__title">{title}</h2>
        <p className="lane__description">{description}</p>
      </div>

      <div className="lane__groups">
        {groups
          .filter((group) => group.members.length > 0)
          .map((group) => (
            <div key={group.label} className="lane__group">
              <div className="lane__group-head">
                <h3>{group.label}</h3>
              </div>
              <div className="person-grid">
                {group.members.map((member) => (
                  <PersonCard
                    key={`${group.label}-${member.name}`}
                    member={member}
                    onClick={() => onMemberClick(member)}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function CommunityPod({
  title,
  description,
  tone,
  members,
  onMemberClick,
}: CommunityPodProps & { onMemberClick: (member: TeamMember) => void }) {
  return (
    <section className={`pod pod--${tone}`}>
      <div className="pod__header">
        <div>
          <p className="pod__label"></p>
          <h3 className="pod__title">{title}</h3>
        </div>
      </div>
      <p className="pod__description">{description}</p>
      <div className="person-grid person-grid--compact">
        {members.map((member) => (
          <PersonCard
            key={`${title}-${member.name}`}
            member={member}
            onClick={() => onMemberClick(member)}
          />
        ))}
      </div>
    </section>
  );
}

export default function TeamPageClient({
  hqGroups,
  hcbGroups,
  communityPods,
}: TeamPageClientProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!selectedMember) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMember]);

  return (
    <main id="main" tabIndex={-1} className="team-page">
      <section className="team-hero">
        <Navbar invertColors />

        <div className="team-shell team-hero__inner">
          <div className="team-hero__copy">
            <h1 className="team-hero__title">
              By teenagers,
              <br />
              for teenagers.
            </h1>
            <p className="team-hero__lede">
              Hack Club runs on a mix of staff, gap years, and teen contributors building programs,
              infrastructure, community rituals, and helping with the day-to-day magic behind the
              scenes.
            </p>
          </div>
        </div>

        <Image
          src="/assets/projectsBg.svg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="team-hero__texture"
        />
      </section>

      <section className="team-shell board-section">
        <div className="board-section__inner">
          <h2 className="board-section__title">Board &amp; Advisors</h2>
          <div className="board-grid board-grid--leaders">
            <BoardCard
              img="https://cdn.hackclub.com/019d8d79-96e5-7902-9e5b-1de299c1bdff/2026_04_14_0pu_Kleki%20(2).png"
              name="Zach Latta"
              boardRole="Founder"
              bio="Zach founded Hack Club after dropping out of high school to build software used by millions. He's been awarded the Thiel Fellowship and Forbes 30 Under 30."
              email="zach"
            />
            <BoardCard
              img="https://cdn.hackclub.com/019d8d79-0da7-7b99-a8fe-ee6412aca976/2026_04_14_0pu_Kleki%20(1).png"
              name="Christina Asquith"
              boardRole="Co-Founder"
              bio="Christina cofounded Hack Club after 20 years as a journalist/war correspondent, reporting from Iraq, Afghanistan and Africa, and founding The Fuller Project, an investigative journalism nonprofit focused on women. She holds an MA in philosophy from London School of Economics and has published 2 nonfiction books."
              email="christina"
            />
          </div>
          <div className="board-grid board-grid--advisors">
            <BoardCard
              img="https://cdn.hackclub.com/019da8a0-de67-721b-911c-5a4cf1a2ad4a/p.webp"
              name="Tom Preston-Werner"
              boardRole="Board Member"
              subrole="Co-Founder, GitHub"
              href="https://github.com/mojombo"
            />
            <BoardCard
              img="https://cdn.hackclub.com/019da8a1-7997-71bd-a69c-84970e8a238d/sqs.webp"
              name="Quinn Slack"
              boardRole="Board Member"
              subrole="Co-Founder and CEO, AMP"
              href="https://github.com/sqs"
            />
            <BoardCard
              img="https://cdn.hackclub.com/019da8a1-fcce-73eb-9e9e-e7f4ae1d2677/john.webp"
              name="John Abele"
              boardRole="Board Advisor"
              subrole="Founder, Boston Scientific"
              href="https://en.wikipedia.org/wiki/John_Abele"
            />
          </div>
        </div>
      </section>

      <section className="team-shell team-section">
        <div className="team-section__header">
          <h2 className="team-section__title">Core teams</h2>
          <p className="team-section__copy">
            HQ helps run the main Hack Club experience, while HCB keeps thousands of fiscally
            sponsored non-profits running. Both are made up of staff, gap years, and teen
            contributors.
          </p>
        </div>

        <div className="lane-grid">
          <TeamLane
            eyebrow=""
            title="Hack Club HQ"
            description="The generalist operating team behind the main Hack Club experience."
            tone="ember"
            groups={hqGroups}
            onMemberClick={setSelectedMember}
          />
          <TeamLane
            eyebrow=""
            title="HCB"
            description="The team keeping nonprofits, reimbursements, and back-office operations moving."
            tone="ink"
            groups={hcbGroups}
            onMemberClick={setSelectedMember}
          />
        </div>
      </section>

      <section className="team-shell team-section team-section--community">
        <div className="team-section__header">
          <p className="team-kicker team-kicker--dark">Community Teams</p>
          <h2 className="team-section__title">The teen-facing crews shaping daily culture.</h2>
          <p className="team-section__copy">
            These teams are the visible edge of Hack Club: welcoming people in, moderating the
            space, hosting events, and telling the story of what everyone is making together.
          </p>
        </div>

        <div className="pod-grid">
          {communityPods.map((pod) => (
            <CommunityPod key={pod.title} {...pod} onMemberClick={setSelectedMember} />
          ))}
        </div>
      </section>

      <Footer />

      {selectedMember && (
        <dialog
          open
          className="modal-overlay"
          aria-labelledby="team-member-modal-title"
          aria-modal="true"
        >
          <button
            type="button"
            className="modal-backdrop"
            aria-label="Close dialog"
            onClick={() => setSelectedMember(null)}
          />
          <div className="modal-content">
            <button className="modal-close" type="button" onClick={() => setSelectedMember(null)}>
              ×
            </button>
            {selectedMember.avatar && (
              <Image
                src={selectedMember.avatar}
                alt={selectedMember.name}
                width={100}
                height={100}
                className="modal-avatar"
              />
            )}
            <h3 id="team-member-modal-title" className="modal-name">
              {selectedMember.name}
            </h3>
            <p className="modal-role">{selectedMember.role}</p>
            {selectedMember.bio && <p className="modal-bio">{selectedMember.bio}</p>}
            <div className="modal-links">
              {emailHref(selectedMember.email) && (
                <a href={emailHref(selectedMember.email)!} className="modal-link">
                  Email
                </a>
              )}
              {normalizeWebsite(selectedMember.website) && (
                <a
                  href={normalizeWebsite(selectedMember.website)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  {websiteLabel(normalizeWebsite(selectedMember.website)!)}
                </a>
              )}
            </div>
          </div>
        </dialog>
      )}

      <style>{`
        .team-page {
          background:
            radial-gradient(circle at top left, rgba(255, 140, 55, 0.24), transparent 34%),
            radial-gradient(circle at top right, rgba(236, 55, 80, 0.18), transparent 28%),
            var(--background);
          color: var(--foreground);
        }

        .team-shell {
          width: min(1280px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .team-kicker {
          margin: 0 0 18px;
          font-family: var(--font-phantom);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.74);
        }

        .team-kicker--dark {
          color: var(--muted);
        }

        .team-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 10%, rgba(255, 255, 255, 0.22), transparent 28%),
            linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 44%, var(--red) 100%);
          padding: 120px 0 88px;
        }

        .team-hero__inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          gap: 40px;
          align-items: center;
        }

        .team-hero__copy {
          width: min(66vw, 880px);
          max-width: 880px;
        }

        .team-hero__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(2.9rem, 5.2vw, 4.8rem);
          line-height: 0.86;
          color: var(--cream);
          font-weight: 400;
        }

        .team-hero__lede {
          margin: 28px 0 0;
          max-width: 620px;
          font-family: var(--font-phantom);
          font-size: clamp(1.05rem, 1.6vw, 1.35rem);
          line-height: 1.42;
          color: rgba(255, 246, 235, 0.82);
        }

        .team-hero__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.12;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .team-intro {
          margin-top: -34px;
          position: relative;
          z-index: 3;
        }

        .team-intro__card {
          border-radius: 32px;
          padding: 28px clamp(24px, 4vw, 40px);
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.12);
        }

        .team-section {
          padding: 72px 0 0;
        }

        .team-section--community {
          padding-bottom: 80px;
        }

        .team-section__header {
          max-width: 860px;
          margin-bottom: 28px;
        }

        .team-section__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(2.25rem, 4vw, 3.5rem);
          line-height: 0.96;
          font-weight: 400;
        }

        .team-section__copy {
          margin: 18px 0 0;
          font-family: var(--font-phantom);
          font-size: 1.08rem;
          line-height: 1.55;
          color: var(--muted);
        }

        .lane-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .lane {
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          padding: 28px;
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.08);
        }

        .lane--ember {
          background:
            radial-gradient(circle at top right, rgba(59, 130, 246, 0.2), transparent 26%),
            linear-gradient(180deg, rgba(200, 230, 255, 0.98), rgba(180, 220, 255, 0.96));
          color: #17171d;
        }

        html.dark .lane--ember {
          background:
            radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 28%),
            linear-gradient(180deg, rgba(30, 45, 70, 0.85), rgba(22, 32, 52, 0.9));
          color: var(--paper);
        }

        .lane--ink {
          background:
            radial-gradient(circle at top right, rgba(236, 55, 80, 0.3), transparent 30%),
            radial-gradient(circle at bottom left, rgba(255, 140, 55, 0.24), transparent 38%),
            var(--surface);
          color: var(--foreground);
        }

        .lane__eyebrow {
          margin: 0 0 12px;
          font-family: var(--font-phantom);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
        }

        html.dark .lane--ember .lane__eyebrow,
        html.dark .lane--ember .lane__description,
        html.dark .lane--ember .lane__group-head h3 {
          color: rgba(255, 246, 235, 0.7);
        }

        .lane__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(2rem, 3vw, 2.7rem);
          line-height: 0.96;
          font-weight: 400;
        }

        .lane__description {
          margin: 16px 0 0;
          font-family: var(--font-phantom);
          font-size: 1rem;
          line-height: 1.5;
          color: var(--muted);
        }

        .lane__groups {
          display: grid;
          gap: 22px;
          margin-top: 26px;
        }

        .lane__group-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .lane__group-head h3 {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .lane__group-head span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 42px;
          height: 42px;
          padding: 0 10px;
          border-radius: 999px;
          font-family: var(--font-phantom);
          font-size: 0.96rem;
          font-weight: 700;
          background: var(--border);
        }

        .lane--ink .lane__group-head span {
          background: var(--border);
        }

        .pod-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .pod {
          border-radius: 30px;
          padding: 24px;
          border: 1px solid var(--border);
          box-shadow: 0 22px 48px rgba(91, 52, 18, 0.08);
        }

        .pod--sun {
          background:
            radial-gradient(circle at top right, rgba(255, 140, 55, 0.22), transparent 24%),
            var(--surface);
        }

        .pod--rose {
          background:
            radial-gradient(circle at top right, rgba(236, 55, 80, 0.18), transparent 24%),
            var(--surface);
        }

        .pod--ink {
          background:
            radial-gradient(circle at top right, rgba(255, 140, 55, 0.14), transparent 22%),
            linear-gradient(180deg, rgba(53, 50, 51, 0.98), rgba(43, 39, 45, 0.98));
          color: var(--paper);
        }

        .pod__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .pod__label {
          margin: 0 0 8px;
          font-family: var(--font-phantom);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .pod--ink .pod__label {
          color: rgba(255, 255, 255, 0.7);
        }

        .pod__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          line-height: 0.96;
          font-weight: 400;
        }

        .pod__description {
          margin: 16px 0 18px;
          font-family: var(--font-phantom);
          font-size: 0.98rem;
          line-height: 1.5;
          color: var(--muted);
        }

        .pod--ink .pod__description {
          color: rgba(255, 255, 255, 0.85);
        }

        .person-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .person-grid--compact {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .person-card {
          appearance: none;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 100%;
          border-radius: 22px;
          padding: 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: inherit;
          font: inherit;
          text-align: left;
          box-shadow: 0 12px 24px rgba(91, 52, 18, 0.06);
          transition:
            transform 0.22s ease-out,
            box-shadow 0.22s ease-out,
            border-color 0.22s ease-out;
          cursor: pointer;
        }

        .person-card:hover {
          transform: scale(1.05);
          box-shadow: 0 18px 30px rgba(91, 52, 18, 0.1);
          border-color: rgba(236, 55, 80, 0.18);
        }

        .pod--ink .person-card {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: none;
        }

        .lane--ink .person-card {
          background: var(--surface);
          border-color: rgba(236, 55, 80, 0.2);
          box-shadow: 0 14px 28px rgba(91, 52, 18, 0.09);
        }

        .person-card__top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .person-card__avatar-wrap {
          flex-shrink: 0;
        }

        .person-card__avatar {
          width: 68px;
          height: 68px;
          border-radius: 20px;
          object-fit: cover;
          display: block;
          background: var(--surface-hover);
        }

        .person-card__avatar--fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-zarathustra);
          font-size: 2rem;
          color: var(--red);
        }

        .person-card__identity {
          min-width: 0;
        }

        .person-card__name {
          display: block;
          margin: 0 0 4px;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.15;
        }

        .person-card__role {
          display: block;
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          line-height: 1.3;
          color: var(--red);
        }

        .pod--ink .person-card__role {
          color: #ffb37b;
        }

        .lane--ink .person-card__role {
          color: var(--red);
        }

        .person-card__bio {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 0.96rem;
          line-height: 1.48;
          color: var(--muted);
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .pod--ink .person-card__bio {
          color: rgba(255, 255, 255, 0.7);
        }

        .lane--ink .person-card__bio {
          color: var(--muted);
        }

        .person-card__links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        .person-card__link {
          display: inline-flex;
          align-items: center;
          max-width: 100%;
          border-radius: 999px;
          padding: 7px 11px;
          font-family: var(--font-phantom);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--foreground);
          text-decoration: none;
          background: var(--border);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pod--ink .person-card__link,
        .lane--ink .person-card__link {
          color: var(--paper);
          background: rgba(255, 255, 255, 0.12);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          max-width: none;
          height: 100vh;
          max-height: none;
          margin: 0;
          padding: 0;
          border: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          color: inherit;
        }

        .modal-backdrop {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .modal-content {
          background: var(--background);
          color: var(--foreground);
          border-radius: 24px;
          padding: 24px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .modal-close {
          position: absolute;
          top: 12px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--foreground);
        }

        .modal-avatar {
          display: block;
          width: 100px;
          aspect-ratio: 1 / 1;
          height: auto;
          object-fit: cover;
          border-radius: 50%;
          margin: 0 auto 16px;
        }

        .modal-name {
          margin: 0 0 8px;
          font-family: var(--font-phantom);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .modal-role {
          margin: 0 0 16px;
          font-family: var(--font-phantom);
          font-size: 1rem;
          color: var(--red);
        }

        .modal-bio {
          margin: 0 0 16px;
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--muted);
        }

        .modal-links {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .modal-link {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 8px 16px;
          font-family: var(--font-phantom);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--foreground);
          text-decoration: none;
          background: var(--border);
        }

        .board-section {
          padding-top: 56px;
        }

        .board-section__inner {
          border-radius: 32px;
          padding: 36px clamp(24px, 4vw, 48px);
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.12);
        }

        .board-section__title {
          margin: 0 0 28px;
          font-family: var(--font-zarathustra);
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 0.96;
          font-weight: 400;
          text-align: center;
          color: var(--foreground);
        }

        .board-grid {
          display: grid;
          gap: 18px;
        }

        .board-grid--leaders {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-bottom: 18px;
        }

        .board-grid--advisors {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .board-card-anchor {
          text-decoration: none;
          color: inherit;
          display: block;
          height: 100%;
        }

        .board-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 28px 20px;
          height: 100%;
          text-align: center;
          box-sizing: border-box;
        }

        .board-card__avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          box-shadow: 0 8px 20px rgba(91, 52, 18, 0.14);
        }

        .board-card__name {
          margin: 4px 0 0;
          font-family: var(--font-phantom);
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--foreground);
        }

        .board-card__role {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 0.9rem;
          color: var(--red);
          font-weight: 600;
        }

        .board-card__subrole {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 0.84rem;
          color: var(--muted);
        }

        .board-card__bio {
          margin: 6px 0 0;
          font-family: var(--font-phantom);
          font-size: 0.92rem;
          line-height: 1.52;
          color: var(--muted);
        }

        .board-card__pill {
          display: inline-flex;
          align-items: center;
          margin-top: 6px;
          border-radius: 999px;
          padding: 6px 14px;
          font-family: var(--font-phantom);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--foreground);
          text-decoration: none;
          background: var(--border);
        }

        @media (max-width: 1100px) {
          .team-hero__inner,
          .lane-grid,
          .pod-grid {
            grid-template-columns: 1fr;
          }

          .board-grid--advisors {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .team-shell {
            width: calc(100vw - 32px);
          }

          .team-hero {
            padding: 104px 0 72px;
          }

          .person-grid,
          .person-grid--compact {
            grid-template-columns: 1fr;
          }

          .lane,
          .pod,
          .team-intro__card {
            border-radius: 24px;
            padding: 20px;
          }

          .board-grid--leaders,
          .board-grid--advisors {
            grid-template-columns: 1fr;
          }

          .board-section__inner {
            border-radius: 24px;
            padding: 24px 20px;
          }
        }
      `}</style>
    </main>
  );
}
