"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { FISCAL_FEATURES, FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "./constants";

export function Features() {
  return (
    <section
      style={{
        paddingTop: FISCAL_TYPOGRAPHY.sectionPaddingV,
        paddingBottom: FISCAL_TYPOGRAPHY.sectionPaddingV,
        paddingLeft: FISCAL_TYPOGRAPHY.sectionPaddingH,
        paddingRight: FISCAL_TYPOGRAPHY.sectionPaddingH,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Headline */}
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
              fontSize: "40px",
              fontWeight: 400,
              color: FISCAL_COLORS.text,
              margin: 0,
              marginBottom: "1rem",
              maxWidth: "55ch",
              lineHeight: 1.2,
            }}
          >
            Powerful financial tools built by our nonprofit, for yours.
          </h2>
          <p
            style={{
              fontSize: "20px",
              fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
              color: FISCAL_COLORS.text,
              margin: 0,
              marginBottom: "1rem",
              maxWidth: "55ch",
              lineHeight: 1.5,
            }}
          >
            Since day one, we&apos;ve built beautiful, self-serve software to empower you to raise
            and spend money without administrative hassle. We&apos;re also open source!
          </p>
        </div>

        {/* Feature Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginTop: "2rem",
            marginBottom: "3rem",
          }}
        >
          {FISCAL_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: FISCAL_COLORS.primary,
                }}
              >
                <Icon glyph={feature.icon} size={40} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "20px",
                    fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                    color: FISCAL_COLORS.text,
                    margin: 0,
                    lineHeight: 1.375,
                  }}
                >
                  <strong>{feature.name}</strong> {feature.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: "680px",
            margin: "3rem auto 0",
            textAlign: "center",
          }}
        >
          <Link
            href="https://hcb.hackclub.com/reboot"
            title="See Reboot's finances in public"
            style={{ display: "block", textDecoration: "none" }}
          >
            <Image
              src="/fiscal-sponsorship/laptop.webp"
              alt="HCB dashboard shown in a laptop"
              width={680}
              height={430}
              style={{ width: "100%", height: "auto" }}
            />
            <p
              style={{
                fontSize: "14px",
                color: FISCAL_COLORS.primary,
                margin: "0.5rem 0 0",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
              }}
            >
              See <em>Reboot</em>&apos;s finances in Transparency Mode
            </p>
          </Link>
          <Link href="https://github.com/hackclub/hcb" style={{ textDecoration: "none" }}>
            <p
              style={{
                fontSize: "14px",
                color: FISCAL_COLORS.primary,
                marginTop: "0.5rem",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
              }}
            >
              See our open source on GitHub
            </p>
          </Link>
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
