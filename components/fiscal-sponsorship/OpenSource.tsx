"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import { FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "./constants";

type OpenSourceProps = {
  announcementHref?: string;
};

export function OpenSource({
  announcementHref = "/fiscal-sponsorship/open-source",
}: OpenSourceProps) {
  const t = useTranslations("Hcb");
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
            {t("openSourceTitle")}
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
            {t("openSourceBody")}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <a
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
              {t("starOnGithub")}
              <div style={{ width: "20px", height: "20px" }}>
                <Icon glyph="github" size={20} />
              </div>
            </a>

            {isExternal ? (
              <a
                href={announcementHref}
                target="_blank"
                rel="noopener noreferrer"
                style={announcementButtonStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                {t("readAnnouncement")}
                <div style={{ width: "16px", height: "16px" }}>
                  <Icon glyph="view-forward" size={16} />
                </div>
              </a>
            ) : (
              <Link
                href={announcementHref}
                style={announcementButtonStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                {t("readAnnouncement")}
                <div style={{ width: "16px", height: "16px" }}>
                  <Icon glyph="view-forward" size={16} />
                </div>
              </Link>
            )}
          </div>
        </div>

        <div style={{ borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="https://cdn.hackclub.com/019db0db-c501-72f3-940d-b9fd99013ece/hcb-gource.a2e03707.gif"
            alt={t("gourceAlt")}
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

const announcementButtonStyle = {
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
} as const;
