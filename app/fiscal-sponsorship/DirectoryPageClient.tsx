"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeLock } from "@/components/ThemeToggle";
import { ContactBanner } from "@/components/fiscal-sponsorship/ContactBanner";
import { FiscalFilterRail } from "@/components/fiscal-sponsorship/FiscalFilterRail";
import { OrganizationGrid } from "@/components/fiscal-sponsorship/OrganizationSpotlight";
import { FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "@/components/fiscal-sponsorship/constants";
import { getDirectoryCategoryById, getRegionBySlug } from "@/lib/fiscal-sponsorship-config";
import { buildOrganizationDescriptionPreview } from "@/lib/fiscal-sponsorship-description";
import type { Organization } from "@/lib/fiscal-sponsorship-data";

type DirectoryPageClientProps = {
  organizations: Organization[];
  category?: string;
  region?: string;
};

const PAGE_SIZE = 12;

export default function DirectoryPageClient({
  organizations,
  category = "organizations",
  region,
}: DirectoryPageClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const categoryConfig = getDirectoryCategoryById(category);
  const regionConfig = region ? getRegionBySlug(region) : undefined;

  const filteredOrganizations = searchTerm.trim()
    ? organizations.filter((organization) => {
        const haystack = [
          organization.name,
          organization.description,
          organization.location.readable,
          organization.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(searchTerm.trim().toLowerCase());
      })
    : organizations;

  const totalPages = Math.max(1, Math.ceil(filteredOrganizations.length / PAGE_SIZE));
  const currentPage = Math.min(pageIndex, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageOrganizations = filteredOrganizations.slice(pageStart, pageStart + PAGE_SIZE);
  const displayOrganizations = pageOrganizations.map((organization) => ({
    ...organization,
    description: buildOrganizationDescriptionPreview(organization.description),
  }));
  const pageStartLabel = filteredOrganizations.length === 0 ? 0 : pageStart + 1;
  const pageEndLabel = Math.min(pageStart + PAGE_SIZE, filteredOrganizations.length);

  const heroBackground = {
    backgroundColor: "rgb(104, 41, 205)",
    backgroundImage: `
      radial-gradient(ellipse at 5% 5%, #ec555c 0%, rgba(236,85,92,0) 75%),
      radial-gradient(ellipse at 95% 5%, #dc71a1 0%, rgba(220,113,161,0) 75%),
      radial-gradient(ellipse at 95% 95%, #fcc8bf 0%, rgba(252,200,191,0) 75%),
      radial-gradient(ellipse at 5% 95%, #ffce33 0%, rgba(255,206,51,0) 75%)
    `,
  };

  return (
    <>
      <ThemeLock />
      <Navbar invertColors />
      <main id="main" tabIndex={-1}>
        <section
          className="directory-hero"
          style={{
            paddingTop: FISCAL_TYPOGRAPHY.sectionPaddingV,
            paddingBottom: FISCAL_TYPOGRAPHY.sectionPaddingV,
            paddingLeft: FISCAL_TYPOGRAPHY.sectionPaddingH,
            paddingRight: FISCAL_TYPOGRAPHY.sectionPaddingH,
            position: "relative",
            overflow: "hidden",
            color: FISCAL_COLORS.white,
            ...heroBackground,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundSize: "48px 48px",
              backgroundImage: `linear-gradient(to right,  #fcc8bf 1px, transparent 1px), linear-gradient(to bottom, #fcc8bf 1px, transparent 1px)`,
              backgroundPosition: "top left",
              maskImage: "linear-gradient(180deg, transparent 0%, white 4%, white 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, white 4%, white 100%)",
              opacity: 0.1,
            }}
          />
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
            <div
              className="directory-hero-copy"
              style={{
                maxWidth: "760px",
                marginTop: "clamp(40px, calc(112px - 6vw), 72px)",
              }}
            >
              <h1
                className="directory-hero-title"
                style={{
                  margin: 0,
                  fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
                  fontSize: "clamp(44px, 6vw, 72px)",
                  fontWeight: 400,
                  lineHeight: 1.02,
                  color: FISCAL_COLORS.white,
                  textWrap: "balance",
                  maxWidth: "11ch",
                }}
              >
                {regionConfig
                  ? `${categoryConfig?.label ?? "Organizations"} in ${regionConfig.label}`
                  : "Organization Directory"}
              </h1>
              <p
                className="directory-hero-description"
                style={{
                  margin: 0,
                  marginTop: "1rem",
                  maxWidth: "58ch",
                  fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                  fontSize: "clamp(18px, 2vw, 22px)",
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Discover the organizations and projects using HCB for fiscal sponsorship.
              </p>
              <div
                className="directory-search"
                style={{
                  display: "block",
                  marginTop: "2rem",
                  maxWidth: "640px",
                }}
              >
                <input
                  type="search"
                  aria-label="Search organizations"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setPageIndex(1);
                  }}
                  placeholder="Search by name, description, or location"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.22)",
                    background: "rgba(255,255,255,0.12)",
                    color: FISCAL_COLORS.white,
                    padding: "0.95rem 1rem",
                    fontSize: "clamp(16px, 2.8vw, 20px)",
                    fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                    outline: "none",
                    backdropFilter: "blur(12px)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            paddingTop: FISCAL_TYPOGRAPHY.sectionPaddingV,
            paddingBottom: FISCAL_TYPOGRAPHY.sectionPaddingV,
            paddingLeft: FISCAL_TYPOGRAPHY.sectionPaddingH,
            paddingRight: FISCAL_TYPOGRAPHY.sectionPaddingH,
            backgroundColor: FISCAL_COLORS.lightGray,
          }}
        >
          <div className="directory-layout" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <FiscalFilterRail
              activeCategory={category}
              activeRegion={regionConfig?.slug}
              categoryHrefFor={(categoryId) =>
                categoryId === "organizations"
                  ? "/fiscal-sponsorship/directory"
                  : `/fiscal-sponsorship/directory/${categoryId}`
              }
              regionHrefFor={(regionSlug) =>
                category === "organizations"
                  ? `/fiscal-sponsorship/directory/organizations/${regionSlug}`
                  : `/fiscal-sponsorship/directory/${category}/${regionSlug}`
              }
            />

            <div style={{ minWidth: 0 }}>
              <div
                className="directory-stats"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                    color: FISCAL_COLORS.text,
                    fontSize: "15px",
                    opacity: 0.72,
                  }}
                >
                  Showing {pageStartLabel}-{pageEndLabel} of {filteredOrganizations.length}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                    color: FISCAL_COLORS.text,
                    fontSize: "15px",
                    opacity: 0.72,
                  }}
                >
                  Page {currentPage} of {totalPages}
                </p>
              </div>

              {pageOrganizations.length > 0 ? (
                <div className="directory-grid-wrap">
                  <OrganizationGrid organizations={displayOrganizations} />
                </div>
              ) : (
                <div
                  style={{
                    borderRadius: "24px",
                    border: "1px solid rgba(23, 23, 29, 0.08)",
                    background: FISCAL_COLORS.background,
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      marginBottom: "0.5rem",
                      fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
                      fontSize: "32px",
                      fontWeight: 400,
                      color: FISCAL_COLORS.text,
                    }}
                  >
                    No organizations found
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                      color: FISCAL_COLORS.text,
                      opacity: 0.78,
                    }}
                  >
                    Try a different search term or switch filters.
                  </p>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginTop: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={() => setPageIndex((current) => Math.max(1, current - 1))}
                  disabled={currentPage <= 1}
                  style={paginationButtonStyle}
                >
                  Previous
                </button>
                <span
                  style={{
                    fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                    fontSize: "15px",
                    color: FISCAL_COLORS.text,
                    opacity: 0.78,
                  }}
                >
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPageIndex((current) => Math.min(totalPages, current + 1))}
                  disabled={currentPage >= totalPages}
                  style={paginationButtonStyle}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <style jsx>{`
            .directory-layout {
              display: grid;
              grid-template-columns: 320px minmax(0, 1fr);
              gap: 2rem;
              align-items: start;
            }

            .directory-hero-copy {
              animation: directoryFadeUp 420ms cubic-bezier(0.215, 0.61, 0.355, 1) both;
            }

            .directory-hero-title {
              animation: directoryFadeUp 460ms cubic-bezier(0.215, 0.61, 0.355, 1) 0ms both;
            }

            .directory-hero-description {
              animation: directoryFadeUp 460ms cubic-bezier(0.215, 0.61, 0.355, 1) 70ms both;
            }

            .directory-search {
              animation: directoryFadeUp 460ms cubic-bezier(0.215, 0.61, 0.355, 1) 120ms both;
            }

            .directory-stats {
              animation: directoryFadeUp 380ms cubic-bezier(0.215, 0.61, 0.355, 1) 40ms both;
            }

            .directory-grid-wrap {
              animation: directoryFadeUp 420ms cubic-bezier(0.215, 0.61, 0.355, 1) 100ms both;
            }

            @media (max-width: 960px) {
              .directory-layout {
                grid-template-columns: 1fr;
              }
            }

            @media (max-width: 640px) {
              .directory-hero h1 {
                max-width: 9.5ch;
              }

              .directory-search {
                margin-top: 1.4rem !important;
                max-width: none !important;
              }

              .directory-search input {
                padding: 0.85rem 0.95rem !important;
                border-radius: 14px !important;
              }

              input[type="search"]::placeholder {
                color: rgba(255, 255, 255, 0.68);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .directory-hero-copy,
              .directory-hero-title,
              .directory-hero-description,
              .directory-search,
              .directory-stats,
              .directory-grid-wrap {
                animation: none !important;
              }
            }

            @keyframes directoryFadeUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </section>

        <ContactBanner />
      </main>
      <Footer />
    </>
  );
}

const paginationButtonStyle: CSSProperties = {
  border: "1px solid rgba(23, 23, 29, 0.12)",
  background: FISCAL_COLORS.background,
  color: FISCAL_COLORS.text,
  borderRadius: "999px",
  padding: "0.75rem 1rem",
  fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
  fontSize: "15px",
  fontWeight: 700,
  cursor: "pointer",
  transition: "opacity 160ms ease, transform 160ms ease",
};
