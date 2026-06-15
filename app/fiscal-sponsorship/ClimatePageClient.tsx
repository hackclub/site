"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeLock } from "@/components/ThemeToggle";
import { ContactBanner } from "@/components/fiscal-sponsorship/ContactBanner";
import { FiscalFilterRail } from "@/components/fiscal-sponsorship/FiscalFilterRail";
import { OrganizationGrid } from "@/components/fiscal-sponsorship/OrganizationSpotlight";
import { FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "@/components/fiscal-sponsorship/constants";
import { getRegionBySlug } from "@/lib/fiscal-sponsorship-config";
import { buildOrganizationDescriptionPreview } from "@/lib/fiscal-sponsorship-description";
import type { Organization } from "@/lib/fiscal-sponsorship-data";

type ClimatePageClientProps = {
  organizations: Organization[];
  region?: string;
};

const PAGE_SIZE = 12;

export default function ClimatePageClient({ organizations, region }: ClimatePageClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const regionConfig = region ? getRegionBySlug(region) : undefined;

  const filteredOrganizations = searchTerm.trim()
    ? organizations.filter((organization) => {
        const haystack = [
          organization.name,
          organization.description,
          organization.location.readable,
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

  return (
    <>
      <ThemeLock />
      <Navbar invertColors />
      <main id="main" tabIndex={-1}>
        <section
          className="climate-hero"
          style={{
            position: "relative",
            overflow: "hidden",
            paddingTop: FISCAL_TYPOGRAPHY.sectionPaddingV,
            paddingBottom: FISCAL_TYPOGRAPHY.sectionPaddingV,
            paddingLeft: FISCAL_TYPOGRAPHY.sectionPaddingH,
            paddingRight: FISCAL_TYPOGRAPHY.sectionPaddingH,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
            }}
          >
            <Image
              src="https://cdn.hackclub.com/019db77c-2cd1-7aee-9eed-6dd685dc788c/climate.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(8, 23, 19, 0.72) 0%, rgba(8, 23, 19, 0.58) 42%, rgba(8, 23, 19, 0.34) 68%, rgba(255, 255, 255, 0.9) 100%)",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                maxWidth: "760px",
                marginTop: "clamp(40px, calc(112px - 6vw), 72px)",
              }}
            >
              <h1
                className="climate-hero-title"
                style={{
                  margin: 0,
                  fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
                  fontSize: "clamp(44px, 6vw, 72px)",
                  fontWeight: 400,
                  lineHeight: 1.02,
                  color: FISCAL_COLORS.white,
                  textWrap: "balance",
                  maxWidth: "12ch",
                  textShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
              >
                {regionConfig ? `Climate in ${regionConfig.label}` : "Climate Organizations"}
              </h1>
              <p
                className="climate-hero-description"
                style={{
                  margin: 0,
                  marginTop: "1rem",
                  maxWidth: "58ch",
                  fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                  fontSize: "clamp(18px, 2vw, 22px)",
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.88)",
                  textShadow: "0 6px 24px rgba(0,0,0,0.2)",
                }}
              >
                Climate-focused organizations using HCB to accelerate environmental action and
                sustainability initiatives.
              </p>
              <div
                className="climate-search"
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
          <div className="climate-layout" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <FiscalFilterRail
              activeRegion={regionConfig?.slug}
              showCategories={false}
              regionHrefFor={(regionSlug) =>
                `/fiscal-sponsorship/climate/organizations-in-${regionSlug}`
              }
            />

            <div style={{ minWidth: 0 }}>
              <div
                className="climate-stats"
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
                <OrganizationGrid organizations={displayOrganizations} />
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
                    No climate organizations found
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                      color: FISCAL_COLORS.text,
                      opacity: 0.78,
                    }}
                  >
                    Try a different search term or region.
                  </p>
                </div>
              )}

              <div
                className="climate-grid-wrap"
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
            .climate-hero-kicker {
              animation: climateFadeUp 420ms cubic-bezier(0.215, 0.61, 0.355, 1) both;
            }

            .climate-hero-title {
              animation: climateFadeUp 460ms cubic-bezier(0.215, 0.61, 0.355, 1) 0ms both;
            }

            .climate-hero-description {
              animation: climateFadeUp 460ms cubic-bezier(0.215, 0.61, 0.355, 1) 70ms both;
            }

            .climate-search {
              animation: climateFadeUp 460ms cubic-bezier(0.215, 0.61, 0.355, 1) 120ms both;
            }

            .climate-stats {
              animation: climateFadeUp 380ms cubic-bezier(0.215, 0.61, 0.355, 1) 40ms both;
            }

            .climate-grid-wrap {
              animation: climateFadeUp 420ms cubic-bezier(0.215, 0.61, 0.355, 1) 100ms both;
            }

            .climate-layout {
              display: grid;
              grid-template-columns: 320px minmax(0, 1fr);
              gap: 2rem;
              align-items: start;
            }

            @media (max-width: 960px) {
              .climate-layout {
                grid-template-columns: 1fr;
              }
            }

            @media (max-width: 640px) {
              .climate-hero {
                padding-bottom: clamp(32px, 5vw, 56px) !important;
              }

              .climate-hero-title {
                max-width: 10ch !important;
              }

              .climate-search {
                margin-top: 1.4rem !important;
                max-width: none !important;
              }

              .climate-search input {
                padding: 0.85rem 0.95rem !important;
                border-radius: 14px !important;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .climate-hero-kicker,
              .climate-hero-title,
              .climate-hero-description,
              .climate-search,
              .climate-stats,
              .climate-grid-wrap {
                animation: none !important;
              }
            }

            @keyframes climateFadeUp {
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
