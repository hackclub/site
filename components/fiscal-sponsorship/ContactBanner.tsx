"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { FISCAL_CONTACT, FISCAL_COLORS } from "./constants";

export function ContactBanner() {
  return (
    <>
      <div
        className="contact-banner"
        style={{
          backgroundColor: FISCAL_COLORS.lightGray,
          color: FISCAL_COLORS.text,
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
        }}
      >
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

      <style jsx>{`
        .contact-banner {
          display: none;
        }

        @media (min-width: 768px) {
          .contact-banner {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
