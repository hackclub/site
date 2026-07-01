"use client";

import Image from "next/image";
import Link from "next/link";
import { FISCAL_COLORS } from "./constants";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  backgroundImage: string;
  hcbProfileUrl?: string;
  location: {
    readable: string;
  };
}

interface OrganizationSpotlightProps {
  organization: Organization;
  animationDelayMs?: number;
}

function hashString(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function buildFallbackBackground(name: string) {
  const hue = hashString(name) % 360;
  const accent = (hue + 42) % 360;

  return {
    backgroundImage: [
      `radial-gradient(circle at 18% 18%, hsla(${hue}, 68%, 48%, 0.85) 0%, hsla(${hue}, 68%, 48%, 0) 42%)`,
      `radial-gradient(circle at 78% 12%, hsla(${accent}, 72%, 52%, 0.72) 0%, hsla(${accent}, 72%, 52%, 0) 36%)`,
      `linear-gradient(150deg, hsl(${hue}, 34%, 18%) 0%, hsl(${accent}, 34%, 13%) 100%)`,
    ].join(", "),
    backgroundColor: "#0e0f14",
  };
}

export function OrganizationSpotlight({
  organization,
  animationDelayMs = 0,
}: OrganizationSpotlightProps) {
  const hasBackgroundImage = Boolean(organization.backgroundImage);
  const cardBackground = hasBackgroundImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(10,10,14,0.12) 0%, rgba(10,10,14,0.55) 78%), url('${organization.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : buildFallbackBackground(organization.name);

  return (
    <Link href={organization.hcbProfileUrl ?? `https://hcb.hackclub.com/${organization.slug}`}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: organization.logo ? "64px 1fr" : "1fr",
          columnGap: "1rem",
          rowGap: "0.5rem",
          padding: "1.25rem",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          minHeight: "128px",
          height: "100%",
          textDecoration: "none",
          color: "white",
          textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
          cursor: "pointer",
          border: "1px solid rgba(255,255,255,0.06)",
          ...cardBackground,
          transition: "transform 180ms ease, box-shadow 180ms ease",
          animation: "organizationRise 420ms cubic-bezier(0.215, 0.61, 0.355, 1) both",
          animationDelay: `${animationDelayMs}ms`,
          willChange: "transform, box-shadow",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1.02)";
          el.style.boxShadow = FISCAL_COLORS.shadowHover;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Logo */}
        {organization.logo && (
          <div
            style={{
              gridColumn: "1 / 2",
              gridRow: "1 / 3",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Image
              src={organization.logo}
              alt={`${organization.name} logo`}
              width={64}
              height={64}
              style={{
                borderRadius: "14px",
                width: "64px",
                height: "64px",
                objectFit: "cover",
                boxShadow: "0 10px 24px rgba(0, 0, 0, 0.25)",
              }}
            />
          </div>
        )}

        {/* Name and Location */}
        <div style={{ gridColumn: organization.logo ? "2" : "1" }}>
          <h3
            style={{
              fontSize: "20px",
              margin: 0,
              color: "white",
              fontFamily: "var(--font-zarathustra)",
              fontWeight: 400,
              overflowWrap: "anywhere",
              lineHeight: 1.05,
            }}
          >
            {organization.name}
          </h3>
          <p
            style={{
              fontSize: "13px",
              margin: 0,
              color: "rgba(255,255,255,0.875)",
              fontFamily: "var(--font-phantom)",
            }}
          >
            {organization.location.readable}
          </p>
        </div>

        {/* Description */}
        <p
          style={{
            gridColumn: "2",
            margin: 0,
            fontSize: "15px",
            color: "rgba(255,255,255,0.95)",
            fontFamily: "var(--font-phantom)",
            lineHeight: 1.5,
            maxWidth: "42ch",
          }}
        >
          {organization.description}
        </p>

        <style jsx>{`
          @keyframes organizationRise {
            from {
              opacity: 0;
              transform: translateY(14px) scale(0.985);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            div {
              animation: none !important;
            }
          }

          @media (max-width: 768px) {
            p {
              grid-column: span 2;
            }
          }
        `}</style>
      </div>
    </Link>
  );
}

interface OrganizationGridProps {
  organizations: Organization[];
}

export function OrganizationGrid({ organizations }: OrganizationGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem",
      }}
    >
      {organizations.map((org, index) => (
        <OrganizationSpotlight key={org.id} organization={org} animationDelayMs={index * 45} />
      ))}
    </div>
  );
}
