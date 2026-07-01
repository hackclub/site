"use client";

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "./constants";
import { DIRECTORY_CATEGORIES, FISCAL_REGIONS } from "@/lib/fiscal-sponsorship-config";

type FiscalFilterRailProps = {
  activeCategory?: string;
  activeRegion?: string;
  showCategories?: boolean;
  categoryHrefFor?: (categoryId: string) => string;
  regionHrefFor: (regionSlug: string) => string;
};

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        padding: "0.2rem 0",
        textDecoration: "none",
        color: active ? FISCAL_COLORS.primary : "#374151",
        transition: "color 160ms ease, transform 160ms ease",
      }}
    >
      {children}
    </Link>
  );
}

function RailTitle({
  children,
  open,
  onClick,
}: {
  children: ReactNode;
  open?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: onClick ? "pointer" : "default",
        color: FISCAL_COLORS.text,
        textAlign: "left",
        fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
        transition: onClick ? "transform 160ms ease" : undefined,
      }}
      onMouseEnter={(event) => {
        if (!onClick) {
          return;
        }
        event.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(event) => {
        if (!onClick) {
          return;
        }
        event.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#94a3b8",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
      {onClick && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            borderRadius: "999px",
            background: "#eef2f7",
            color: "#475569",
            fontSize: "18px",
            lineHeight: 1,
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 160ms ease",
          }}
        >
          ▾
        </span>
      )}
    </button>
  );
}

function CategoryLinks({
  activeCategory,
  categoryHrefFor,
  compact = false,
}: {
  activeCategory?: string;
  categoryHrefFor?: (categoryId: string) => string;
  compact?: boolean;
}) {
  return (
    <div style={{ display: "grid", gap: compact ? "0.6rem" : "0.75rem" }}>
      {DIRECTORY_CATEGORIES.map((category) => {
        const active = activeCategory === category.id;
        const href = categoryHrefFor
          ? categoryHrefFor(category.id)
          : `/fiscal-sponsorship/directory/${category.id}`;

        return (
          <FilterLink key={category.id} href={href} active={active}>
            <span
              style={{
                width: compact ? "32px" : "36px",
                height: compact ? "32px" : "36px",
                borderRadius: "10px",
                background: active ? "rgba(236, 55, 80, 0.12)" : "#e8edf5",
                color: active ? FISCAL_COLORS.primary : "#384150",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon glyph={category.icon} size={compact ? 18 : 20} />
            </span>
            <span
              style={{
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: compact ? "16px" : "18px",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {category.miniLabel ?? category.label}
            </span>
          </FilterLink>
        );
      })}
    </div>
  );
}

function RegionLinks({
  activeRegion,
  regionHrefFor,
  compact = false,
}: {
  activeRegion?: string;
  regionHrefFor: (regionSlug: string) => string;
  compact?: boolean;
}) {
  return (
    <div style={{ display: "grid", gap: compact ? "0.6rem" : "0.75rem" }}>
      {FISCAL_REGIONS.map((region) => {
        const active = activeRegion === region.slug;
        const href = regionHrefFor(region.slug);

        return (
          <FilterLink key={region.slug} href={href} active={active}>
            <span
              style={{
                width: compact ? "32px" : "36px",
                height: compact ? "32px" : "36px",
                borderRadius: "10px",
                backgroundColor: region.iconColor,
                backgroundImage: `linear-gradient(rgba(255,255,255,0.06), rgba(0,0,0,0.08)), url(${region.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: compact ? "16px" : "18px",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {region.miniLabel ?? region.label}
            </span>
          </FilterLink>
        );
      })}
    </div>
  );
}

export function FiscalFilterRail({
  activeCategory,
  activeRegion,
  showCategories = true,
  categoryHrefFor,
  regionHrefFor,
}: FiscalFilterRailProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);

  return (
    <aside
      className="fiscal-filter-rail"
      style={{
        position: "sticky",
        top: "96px",
        alignSelf: "start",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <div className="desktop-rail" style={{ display: "grid", gap: "1.25rem" }}>
        {showCategories && (
          <section style={sectionStyle}>
            <h2
              style={{
                margin: 0,
                marginBottom: "0.75rem",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Filter
            </h2>
            <CategoryLinks activeCategory={activeCategory} categoryHrefFor={categoryHrefFor} />
          </section>
        )}

        <section style={sectionStyle}>
          <h2
            style={{
              margin: 0,
              marginBottom: "0.75rem",
              fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#94a3b8",
              textTransform: "uppercase",
            }}
          >
            Regions
          </h2>
          <RegionLinks activeRegion={activeRegion} regionHrefFor={regionHrefFor} />
        </section>
      </div>

      <div className="mobile-rail" style={{ display: "none", gap: "1rem" }}>
        {showCategories && (
          <section style={sectionStyle}>
            <RailTitle open={categoryOpen} onClick={() => setCategoryOpen((current) => !current)}>
              Filter by category
            </RailTitle>
            <div
              style={{
                display: "grid",
                gridTemplateRows: categoryOpen ? "1fr" : "0fr",
                marginTop: categoryOpen ? "0.9rem" : 0,
                transition:
                  "grid-template-rows 240ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 180ms ease",
                opacity: categoryOpen ? 1 : 0.78,
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    transform: categoryOpen ? "translateY(0)" : "translateY(-6px)",
                    transition: "transform 240ms cubic-bezier(0.215, 0.61, 0.355, 1)",
                  }}
                >
                  <CategoryLinks
                    activeCategory={activeCategory}
                    categoryHrefFor={categoryHrefFor}
                    compact
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        <section style={sectionStyle}>
          <RailTitle open={regionOpen} onClick={() => setRegionOpen((current) => !current)}>
            Filter by region
          </RailTitle>
          <div
            style={{
              display: "grid",
              gridTemplateRows: regionOpen ? "1fr" : "0fr",
              marginTop: regionOpen ? "0.9rem" : 0,
              transition:
                "grid-template-rows 240ms cubic-bezier(0.215, 0.61, 0.355, 1), opacity 180ms ease",
              opacity: regionOpen ? 1 : 0.78,
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  transform: regionOpen ? "translateY(0)" : "translateY(-6px)",
                  transition: "transform 240ms cubic-bezier(0.215, 0.61, 0.355, 1)",
                }}
              >
                <RegionLinks activeRegion={activeRegion} regionHrefFor={regionHrefFor} compact />
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          aside {
            position: static !important;
            top: auto !important;
          }

          .desktop-rail {
            display: none !important;
          }

          .mobile-rail {
            display: grid !important;
          }
        }

        @media (min-width: 961px) {
          .mobile-rail {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          a,
          button,
          div {
            transition: none !important;
          }
        }
      `}</style>
    </aside>
  );
}

const sectionStyle: CSSProperties = {
  background: FISCAL_COLORS.background,
  borderRadius: "20px",
  border: "1px solid rgba(23, 23, 29, 0.08)",
  padding: "1rem",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.04)",
};
