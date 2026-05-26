import Link from "next/link";
import { YouTubeEmbed } from "../YouTubeEmbed";
import { EmailSignupInput } from "./email-signup";

// Community back-img photos — repeated to fill taller section
const backImgsBase = [
  "/assets/backImg1.webp",
  "/assets/backImg2.webp",
  "/assets/backImg3.webp",
  "/assets/backImg4.webp",
  "/assets/backImg5.webp",
  "/assets/backImg6.webp",
  "/assets/backImg7.webp",
  "/assets/backImg8.webp",
  "/assets/backImg9.webp",
  "/assets/backImg10.webp",
  "/assets/backImg11.webp",
  "/assets/backImg12.webp",
  "/assets/backImg13.webp",
  "/assets/backImg14.webp",
  "/assets/backImg15.webp",
  "/assets/backImg16.webp",
  "/assets/backImg17.webp",
];
const backImgs = [...backImgsBase, ...backImgsBase, ...backImgsBase];

export function VideoSection() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {/* White fade from top (blends out of prior section) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          background: "linear-gradient(180deg, var(--background) 0%, transparent 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "380px repeat(4, auto)",
          gap: 0,
          zIndex: 0,
        }}
      >
        <img
          src="https://cdn.hackclub.com/019db857-4b48-7633-9df8-a4b335a251ef/bigCollage.webp"
          alt=""
          width={1920}
          height={1280}
          decoding="async"
          fetchPriority="high"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            gridColumn: "1 / -1",
          }}
        />
        {backImgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            width={320}
            height={220}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ))}
      </div>

      {/* Content — centered card/block that floats over the photo grid */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "clamp(160px, 20vw, 320px)",
          paddingBottom: "clamp(160px, 20vw, 320px)",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Card background — doesn't extend to edges */}
        <div
          style={{
            background: "var(--background)",
            borderRadius: 24,
            padding: "clamp(32px, 5vw, 60px) clamp(24px, 5vw, 60px)",
            width: "min(640px, calc(100vw - 48px))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-zarathustra)",
              fontWeight: "normal",
              fontSize: 40,
              lineHeight: 1.05,
              color: "var(--foreground)",
              margin: "0 auto 32px",
              maxWidth: 640,
            }}
          >
            {"Imagine a world where"}
            <span className="video-headline-break" style={{ display: "inline" }}>
              {" "}
            </span>
            <span
              style={{
                background: "linear-gradient(90deg, #ec3750 0%, #ff8c37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              you joined Hack Club:
            </span>
          </h2>

          {/* Hero video */}
          <div
            style={{
              width: "min(520px, calc(100vw - 96px))",
              borderRadius: 12,
              overflow: "hidden",
              aspectRatio: "16 / 9",
              background: "rgba(0,0,0,0.3)",
              marginBottom: 32,
            }}
          >
            <YouTubeEmbed id="JkSquIVXXds" title="Hack Club introduction for high school teens" />
          </div>

          {/* Email signup */}
          <div
            style={{
              marginBottom: 12,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <EmailSignupInput variant="video" />
          </div>

          {/* Italic subtitle */}
          <p
            style={{
              fontFamily: "var(--font-phantom)",
              fontStyle: "italic",
              fontSize: 16,
              color: "var(--muted)",
              margin: 0,
              pointerEvents: "auto",
            }}
          >
            For all teens aged 13–18. By continuing, you agree to our{" "}
            <Link
              href="/privacy-and-terms"
              className="video-terms-link"
              style={{
                color: "var(--red)",
                textDecoration: "underline",
                textUnderlineOffset: 2,
                pointerEvents: "auto",
              }}
            >
              terms.
            </Link>
          </p>
        </div>
      </div>

      {/* White fade at bottom into DonorsSection */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 280,
          background: "linear-gradient(0deg, var(--background) 40%, transparent 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      <style>{`
        .video-terms-link:hover,
        .video-terms-link:focus-visible {
          text-decoration-thickness: 2px;
        }
      `}</style>
    </section>
  );
}
