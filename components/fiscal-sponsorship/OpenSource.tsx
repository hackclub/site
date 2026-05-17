"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "./constants";

type OpenSourceProps = {
  announcementHref?: string;
};

export function OpenSource({
  announcementHref = "/fiscal-sponsorship/open-source",
}: OpenSourceProps) {
  const isExternal = announcementHref.startsWith("http");

  return (
    <section
      style={{
        paddingTop: FISCAL_TYPOGRAPHY.sectionPaddingV,
        paddingBottom: FISCAL_TYPOGRAPHY.sectionPaddingV,
        paddingLeft: FISCAL_TYPOGRAPHY.sectionPaddingH,
        paddingRight: FISCAL_TYPOGRAPHY.sectionPaddingH,
        backgroundColor: FISCAL_COLORS.lightGray,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {/* Left column: Text and CTAs */}
        <div>
          <h2
            style={{
              fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
              fontSize: "40px",
              fontWeight: 400,
              color: FISCAL_COLORS.text,
              margin: 0,
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Open source infrastructure for fiscally sponsored organizations.
          </h2>
          <p
            style={{
              fontSize: "20px",
              fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
              color: FISCAL_COLORS.text,
              margin: 0,
              marginBottom: "1.5rem",
              lineHeight: 1.5,
            }}
          >
            HCB is open source and built in public, like many other Hack Club projects. Join us in
            building the infrastructure powering fiscally sponsored organizations around the world.
          </p>

          {/* Button Group */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <Link
              href="https://github.com/hackclub/hcb"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.875rem",
                padding: "12px 24px",
                paddingLeft: "25px",
                backgroundColor: "transparent",
                border: `2px solid ${FISCAL_COLORS.primary}`,
                color: FISCAL_COLORS.primary,
                borderRadius: "9999px",
                fontSize: "16px",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = FISCAL_COLORS.primary;
                el.style.color = "white";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "transparent";
                el.style.color = FISCAL_COLORS.primary;
              }}
            >
              Star on GitHub
              <div style={{ width: "20px", height: "20px" }}>
                <Icon glyph="github" size={20} />
              </div>
            </Link>

            <Link
              href={announcementHref}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "12px 24px",
                paddingLeft: "25px",
                backgroundColor: FISCAL_COLORS.primary,
                color: "white",
                borderRadius: "9999px",
                fontSize: "16px",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = "1";
              }}
            >
              Read the announcement
              <div style={{ width: "16px", height: "16px" }}>
                <Icon glyph="view-forward" size={16} />
              </div>
            </Link>
          </div>
        </div>

        {/* Right column: Gource GIF */}
        <div style={{ borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="https://cdn.hackclub.com/019db0db-c501-72f3-940d-b9fd99013ece/hcb-gource.a2e03707.gif"
            alt="HCB commit history visualised with Gource"
            width={640}
            height={360}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
