import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Game } from "../components/not-found/Game";

type FloatTrackStyle = CSSProperties & Record<"--startX", string>;
type FloatImageStyle = CSSProperties & Record<"--spinStart", string>;

const font = "var(--font-phantom)";
const base: CSSProperties = {
  fontFamily: font,
  fontSize: 22,
  textDecoration: "none",
  borderRadius: 9999,
  padding: "11px 24px",
  lineHeight: 1,
};

const src = Array.from({ length: 11 }, (_, i) => `/assets/hero_sticker${i + 1}.webp`);

function create(count: number) {
  let seed = 404404;
  const r = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

  return Array.from({ length: count }, (_, i) => {
    const w = Math.round(56 + r() * 68);
    return {
      id: i,
      src: src[Math.floor(r() * src.length)],
      top: `${Math.round(r() * 100)}%`,
      width: w,
      duration: +(10 + r() * 22).toFixed(2),
      delay: +(r() * 30).toFixed(2),
      rotate: Math.round(-30 + r() * 60),
      opacity: +(0.6 + r() * 0.4).toFixed(2),
      blur: +(r() * 1.6).toFixed(2),
      bob: +(2.2 + r() * 2.8).toFixed(2),
      spinSpeed: +(8 + r() * 12).toFixed(2),
      spin: r() > 0.5 ? "clock" : "counter",
      spinStart: r() * 360,
      zIndex: Math.floor(1 + r() * 20),
      startX: -140 - r() * 60,
    };
  });
}

const stickers = create(20);

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} style={{ background: "#fff6eb", minHeight: "100vh" }}>
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(236,55,80,0.40) 60%, rgba(236,55,80,0.04) 100%)",
        }}
      >
        <Navbar />

        <div className="floating-field" aria-hidden="true">
          {stickers.map((s) => (
            <div
              key={s.id}
              className="float-track"
              style={
                {
                  top: s.top,
                  animationDuration: `${s.duration}s`,
                  animationDelay: `-${s.delay}s`,
                  opacity: s.opacity,
                  zIndex: s.zIndex,
                  "--startX": `${s.startX}%`,
                } as FloatTrackStyle
              }
            >
              <Image
                src={s.src}
                alt=""
                width={s.width}
                height={s.width}
                className="float-image"
                style={
                  {
                    width: `clamp(${Math.max(48, s.width - 20)}px, ${s.width / 11}vw, ${s.width}px)`,
                    height: "auto",
                    "--spinStart": `${s.rotate + s.spinStart}deg`,
                    filter: `blur(${s.blur}px) saturate(0.9)`,
                    animation: `spin-${s.spin} ${s.spinSpeed}s linear infinite, bob ${s.bob}s ease-in-out infinite alternate`,
                    mixBlendMode: "multiply",
                  } as FloatImageStyle
                }
              />
            </div>
          ))}
        </div>

        <div className="content-veil" aria-hidden="true" />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "clamp(120px, 18vh, 170px) 20px clamp(72px, 10vh, 120px)",
          }}
        >
          <Game />

          <p
            style={{
              margin: "18px 0 0",
              fontFamily: font,
              fontWeight: 500,
              fontSize: "clamp(24px, 4.2vw, 48px)",
              color: "#17171d",
              lineHeight: 1.08,
            }}
          >
            We couldn&apos;t find this page.
          </p>

          <p
            style={{
              margin: "14px 0 0",
              fontFamily: font,
              fontSize: "clamp(16px, 1.7vw, 22px)",
              maxWidth: 620,
              color: "rgba(23,23,29,0.72)",
              lineHeight: 1.28,
            }}
          >
            Try heading back to the homepage to find what you are looking for, or explore our
            programs to discover something new. We recently updated our website, so a few things
            have moved around. If you think something should be here that isn&apos;t, let us know by
            filing an issue on our{" "}
            <a
              href="https://github.com/hackclub/site/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(23,23,29,0.72)", textDecoration: "underline" }}
            >
              GitHub repo
            </a>
            .
          </p>

          <div
            style={{
              marginTop: "clamp(26px, 4.8vh, 42px)",
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="/"
              className="go-home-btn"
              style={{
                ...base,
                color: "#ffffff",
                background: "#17171d",
              }}
            >
              Go home
            </Link>
            <Link
              href="/programs"
              style={{
                ...base,
                color: "#17171d",
                border: "1.5px solid rgba(23,23,29,0.18)",
                background: "rgba(255,255,255,0.66)",
              }}
            >
              Explore programs
            </Link>
          </div>
        </div>

        <style>{`
          .floating-field {
            position: absolute;
            inset: 92px 0 0;
            z-index: 1;
            pointer-events: none;
            overflow: hidden;
          }

          .float-track {
            position: absolute;
            left: 0;
            transform: translateX(-140%);
            animation-name: drift-right;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform;
          }

          .float-image {
            display: block;
            animation: bob 2.8s ease-in-out infinite alternate;
          }

          .content-veil {
            position: absolute;
            inset: 0;
            z-index: 2;
            background:
              radial-gradient(circle at top, rgba(255, 246, 235, 0.08), transparent 36%),
              linear-gradient(180deg, rgba(255, 246, 235, 0.18) 10%, rgba(255, 246, 235, 0.68) 42%, rgba(255, 246, 235, 0.94) 100%);
            pointer-events: none;
          }

          .go-home-btn {
            transition: background-color 160ms ease;
          }

          .go-home-btn:hover {
            background: #ec3750;
          }

          @keyframes drift-right {
            from {
              transform: translateX(var(--startX));
            }
            to {
              transform: translateX(120vw);
            }
          }

          @keyframes bob {
            from {
              translate: 0 -5px;
            }
            to {
              translate: 0 5px;
            }
          }

          @keyframes spin-clock {
            from {
              transform: rotate(var(--spinStart));
            }
            to {
              transform: rotate(calc(var(--spinStart) + 360deg));
            }
          }

          @keyframes spin-counter {
            from {
              transform: rotate(var(--spinStart));
            }
            to {
              transform: rotate(calc(var(--spinStart) - 360deg));
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .float-track,
            .float-image,
            .go-home-btn {
              animation: none !important;
              transition: none !important;
            }

            .floating-field {
              display: none;
            }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
}
