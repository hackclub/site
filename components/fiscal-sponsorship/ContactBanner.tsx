"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { FISCAL_CONTACT, FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "./constants";

export function ContactBanner() {
  return (
    <>
      <div
        className="contact-banner"
        style={{
          backgroundColor: FISCAL_COLORS.lightGray,
          color: FISCAL_COLORS.text,
          padding: "1rem",
        }}
      >
        <div className="contact-banner__inner">
          <div
            style={{
              color: FISCAL_COLORS.text,
              flexShrink: 0,
            }}
          >
            <Icon glyph="message" size={24} />
          </div>
          <p
            style={{
              fontSize: "16px",
              fontFamily: "var(--font-phantom)",
              color: FISCAL_COLORS.text,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Questions? Email{" "}
            <Link
              href={`mailto:${FISCAL_CONTACT.email}`}
              style={{
                color: FISCAL_COLORS.text,
                textDecoration: "none",
                borderBottom: `1px solid ${FISCAL_COLORS.text}`,
                marginLeft: "0.125em",
                marginRight: "0.125em",
                whiteSpace: "nowrap",
              }}
            >
              {FISCAL_CONTACT.email}
            </Link>{" "}
            or call{" "}
            <Link
              href={`tel:${FISCAL_CONTACT.phoneUri}`}
              style={{
                color: FISCAL_COLORS.text,
                textDecoration: "none",
                borderBottom: `1px solid ${FISCAL_COLORS.text}`,
                whiteSpace: "nowrap",
              }}
            >
              {FISCAL_CONTACT.phone}
            </Link>
          </p>
        </div>
        <p
          className="contact-banner__notice"
          style={{
            margin: 0,
            fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
            fontSize: 13,
            lineHeight: 1.5,
            color: "#687578",
          }}
        >
          HCB Visa® Commercial cards are powered by Stripe and issued by Celtic Bank.
        </p>
      </div>

      <style jsx>{`
        .contact-banner {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 0.5rem;
        }

        .contact-banner__inner {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .contact-banner {
            gap: 0.4rem;
          }

          .contact-banner__inner {
            align-items: center;
          }
        }

        @media (max-width: 767px) {
          .contact-banner {
            padding-bottom: 4.5rem !important;
          }
        }
      `}</style>
    </>
  );
}
