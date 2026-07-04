"use client";

import Image from "next/image";

const STICKER_FORM_URL =
  "https://forms.hackclub.com/t/eLhFehpKG6us?utm_campaign=hackclub_com&r=hackclub_com";

const FLY_STICKERS = [
  { src: "/assets/hero_sticker1.webp", className: "sf-kawaii", w: 160, h: 99 },
  { src: "/assets/hero_sticker3.webp", className: "sf-yippee", w: 97, h: 100 },
  { src: "/assets/hero_sticker4.webp", className: "sf-coke", w: 120, h: 64 },
  { src: "/assets/hero_sticker7.webp", className: "sf-boba", w: 96, h: 120 },
] as const;

/**
 * Compact airmail-envelope callout for the hero — links to the free
 * sticker request form. Clean at rest so it reads as one clickable
 * card; on hover the stickers fly in and land around it.
 */
export function StickerEnvelopeLink() {
  return (
    <a
      href={STICKER_FORM_URL}
      target="_blank"
      rel="noopener"
      className="sticker-envelope"
      aria-label="Get free Hack Club stickers mailed to you — anywhere in the world"
      style={{
        display: "block",
        position: "relative",
        textDecoration: "none",
        containerType: "inline-size",
      }}
    >
      {/* Envelope */}
      <div
        className="sticker-envelope-body"
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: 10,
          // Airmail edging — diagonal red/blue stripes
          background:
            "repeating-linear-gradient(45deg, #ec3750 0 7px, #fffdf8 7px 14px, #338eda 14px 21px, #fffdf8 21px 28px)",
          padding: 8,
          aspectRatio: "10 / 6.2",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "linear-gradient(155deg, #fffefb 0%, #fdfaf2 55%, #f9f3e6 100%)",
            borderRadius: 5,
            overflow: "hidden",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -6px 14px rgba(23,23,29,0.035)",
          }}
        >
          {/* Return address */}
          <div
            style={{
              position: "absolute",
              top: "7.5%",
              left: "7%",
              fontFamily: "var(--font-phantom)",
              fontSize: "clamp(7px, 3.5cqw, 9.5px)",
              lineHeight: 1.45,
              letterSpacing: "0.07em",
              color: "rgba(23,23,29,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            HACK CLUB HQ
            <br />
            BURLINGTON, VT
          </div>

          {/* Stamp — red with white Hack Club flag */}
          <div
            style={{
              position: "absolute",
              top: "6.5%",
              right: "5.5%",
              width: "18%",
              aspectRatio: "82 / 92",
              background: "#ffffff",
              boxShadow: "0 1.5px 4px rgba(23,23,29,0.18)",
              transform: "rotate(3deg)",
              padding: "1.1%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(150deg, #f04a61 0%, #ec3750 45%, #d92c44 100%)",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hackClubFlag.svg"
                alt=""
                style={{ width: "82%", height: "auto", display: "block" }}
              />
            </div>
          </div>

          {/* Postmark */}
          <svg
            viewBox="0 0 120 70"
            style={{
              position: "absolute",
              top: "5%",
              right: "14%",
              width: "26%",
              opacity: 0.48,
              transform: "rotate(-6deg)",
            }}
          >
            <circle cx="35" cy="35" r="26" fill="none" stroke="#17171d" strokeWidth="2.5" />
            <circle cx="35" cy="35" r="19" fill="none" stroke="#17171d" strokeWidth="1.2" />
            <path
              d="M64 22 Q74 18 84 22 T104 22 M64 34 Q74 30 84 34 T104 34 M64 46 Q74 42 84 46 T104 46"
              fill="none"
              stroke="#17171d"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Address — "TO:" label on the left, both lines aligned beside it */}
          <div
            style={{
              position: "absolute",
              left: "11%",
              right: "11%",
              top: "41%",
              display: "flex",
              alignItems: "flex-start",
              fontFamily: "var(--font-phantom)",
              fontStyle: "italic",
              color: "#17171d",
              fontSize: "clamp(10px, 5.6cqw, 14px)",
              lineHeight: 1.05,
            }}
          >
            <span
              style={{
                color: "rgba(23,23,29,0.5)",
                fontStyle: "normal",
                marginRight: "2.5%",
                flexShrink: 0,
              }}
            >
              TO:
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ borderBottom: "1.2px solid rgba(23,23,29,0.35)" }}>you, a teenager</div>
              <div
                style={{
                  borderBottom: "1.2px solid rgba(23,23,29,0.35)",
                  marginTop: "6.5%",
                }}
              >
                anywhere on Earth
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stickers — hidden at rest, fly in around the envelope on hover */}
      {FLY_STICKERS.map(({ src, className, w, h }) => (
        <div key={src} className={`sticker-fly ${className}`} aria-hidden="true">
          <Image
            src={src}
            alt=""
            draggable={false}
            width={w}
            height={h}
            sizes="100px"
            quality={85}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.16))",
            }}
          />
        </div>
      ))}

      {/* CTA pill — a die-cut sticker slapped over the envelope's bottom edge */}
      <span
        className="sticker-envelope-pill"
        style={{
          position: "absolute",
          left: "50%",
          bottom: -16,
          zIndex: 4,
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: "var(--red)",
          color: "#ffffff",
          borderRadius: 999,
          padding: "8px 18px",
          border: "2.5px solid #fffdf8",
          fontFamily: "var(--font-phantom)",
          fontSize: 16,
          whiteSpace: "nowrap",
          boxShadow: "0 5px 16px rgba(236,55,80,0.40), 0 2px 5px rgba(23,23,29,0.14)",
        }}
      >
        Get free stickers
        <svg
          className="sticker-envelope-arrow"
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <style>{`
        .sticker-envelope {
          width: clamp(210px, 16vw, 260px);
          transform: rotate(-3deg);
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        /* Desktop: drop it a bit lower, clear of the signup stack */
        @media (min-width: 1024px) {
          .sticker-envelope { margin-top: 28px; }
        }
        /* Shorter laptop screens — keep the whole envelope above the fold */
        @media (min-width: 1024px) and (max-height: 850px) {
          .sticker-envelope { width: 200px; margin-top: 14px; }
        }
        .sticker-envelope .sticker-envelope-body {
          box-shadow: 0 12px 28px rgba(23, 23, 29, 0.18), 0 3px 7px rgba(23, 23, 29, 0.09);
          transition: box-shadow 0.28s ease;
        }
        .sticker-envelope:hover,
        .sticker-envelope:focus-visible {
          transform: rotate(-1.5deg) translateY(-5px) scale(1.03);
        }
        .sticker-envelope:hover .sticker-envelope-body,
        .sticker-envelope:focus-visible .sticker-envelope-body {
          box-shadow: 0 20px 40px rgba(23, 23, 29, 0.24), 0 5px 12px rgba(23, 23, 29, 0.11);
        }
        .sticker-envelope-pill {
          transform: translateX(-50%) rotate(1.5deg);
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .sticker-envelope:hover .sticker-envelope-pill,
        .sticker-envelope:focus-visible .sticker-envelope-pill {
          transform: translateX(-50%) rotate(0deg) scale(1.05);
        }
        .sticker-envelope-arrow {
          transition: transform 0.2s ease;
        }
        .sticker-envelope:hover .sticker-envelope-arrow,
        .sticker-envelope:focus-visible .sticker-envelope-arrow {
          transform: translateX(4px);
        }

        /* ── Fly-in stickers ── */
        .sticker-fly {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          /* exit: quick zip away, no delay */
          transition: transform 0.22s ease-in, opacity 0.16s ease-in;
        }
        .sticker-envelope:hover .sticker-fly,
        .sticker-envelope:focus-visible .sticker-fly {
          opacity: 1;
        }
        .sf-kawaii { left: -9%;   top: -17%;    width: 34%; transform: translate(-70px, -55px) scale(0.3) rotate(-24deg); }
        .sf-yippee { right: -9%;  top: -18%;    width: 21%; transform: translate(60px, -60px)  scale(0.3) rotate(22deg); }
        .sf-coke   { right: -8%;  bottom: 15%;  width: 27%; transform: translate(75px, 30px)   scale(0.3) rotate(24deg); }
        .sf-boba   { left: -8.5%; bottom: -10%; width: 19%; transform: translate(-65px, 45px)  scale(0.3) rotate(-26deg); }

        .sticker-envelope:hover .sf-kawaii,
        .sticker-envelope:focus-visible .sf-kawaii {
          transform: translate(0, 0) scale(1) rotate(-9deg);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0ms, opacity 0.18s ease 0ms;
        }
        .sticker-envelope:hover .sf-yippee,
        .sticker-envelope:focus-visible .sf-yippee {
          transform: translate(0, 0) scale(1) rotate(8deg);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 50ms, opacity 0.18s ease 50ms;
        }
        .sticker-envelope:hover .sf-coke,
        .sticker-envelope:focus-visible .sf-coke {
          transform: translate(0, 0) scale(1) rotate(7deg);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 100ms, opacity 0.18s ease 100ms;
        }
        .sticker-envelope:hover .sf-boba,
        .sticker-envelope:focus-visible .sf-boba {
          transform: translate(0, 0) scale(1) rotate(-8deg);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 150ms, opacity 0.18s ease 150ms;
        }

        /* Touch devices and small screens never see the hover — show the
           sticker pile landed by default */
        @media (hover: none), (max-width: 1023px) {
          .sticker-fly { opacity: 1; transition: none; }
          .sf-kawaii { transform: translate(0, 0) scale(1) rotate(-9deg); }
          .sf-yippee { transform: translate(0, 0) scale(1) rotate(8deg); }
          .sf-coke   { transform: translate(0, 0) scale(1) rotate(7deg); }
          .sf-boba   { transform: translate(0, 0) scale(1) rotate(-8deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sticker-envelope,
          .sticker-envelope:hover,
          .sticker-envelope:focus-visible {
            transform: rotate(-3deg);
            transition: none;
          }
          .sticker-envelope-pill,
          .sticker-envelope:hover .sticker-envelope-pill {
            transform: translateX(-50%) rotate(1.5deg);
            transition: none;
          }
          .sticker-fly,
          .sticker-envelope:hover .sticker-fly,
          .sticker-envelope:focus-visible .sticker-fly {
            transition: none;
          }
        }
      `}</style>
    </a>
  );
}
