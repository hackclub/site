import Image from "next/image";
import { pull, type AirtableProject } from "../../lib/projects";
import { BtnArrow } from "./btn-arrow";

function ProjectCard({ project }: { project: AirtableProject }) {
  const { projectName, person, age, country, imageUrl, programName, playableUrl, codeUrl } =
    project;
  return (
    <div
      style={{
        flexShrink: 0,
        width: 290,
        borderRadius: 16,
        overflow: "hidden",
        background: "var(--surface)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Project screenshot */}
      <div
        style={{
          width: "100%",
          height: 200,
          overflow: "hidden",
          flexShrink: 0,
          background: "var(--surface-hover)",
        }}
      >
        <Image
          src={
            imageUrl ??
            "https://cdn.hackclub.com/019db857-86e4-716f-b274-7aa4c975fa67/projectCardPhoto.webp"
          }
          alt={projectName}
          width={290}
          height={200}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          unoptimized
        />
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "16px 18px 18px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontSize: 20,
            color: "var(--foreground)",
            margin: 0,
            lineHeight: 1.2,
            flex: 1,
          }}
        >
          <strong>{person}</strong>
          {age ? ` (${age})` : ""}
          {country ? ` from ${country}` : ""} made <strong>{projectName}</strong>
          {programName ? ` for Hack Club ${programName}` : ""}.
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          {playableUrl && (
            <a
              href={playableUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              style={{
                fontSize: 20,
                color: "var(--red)",
                textDecoration: "none",
                fontFamily: "var(--font-phantom)",
                display: "inline-flex",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              Try it out <BtnArrow />
            </a>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code"
              title="View source code"
              style={{
                color: "var(--foreground)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "auto",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M2.6 10.59L8.38 4.8l1.69 1.7c-.24.85.15 1.78.93 2.23v5.54c-.6.34-1 .99-1 1.73a2 2 0 0 0 2 2a2 2 0 0 0 2-2c0-.74-.4-1.39-1-1.73V9.41l2.07 2.09c-.07.15-.07.32-.07.5a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2c-.18 0-.35 0-.5.07L13.93 7.5a1.98 1.98 0 0 0-1.15-2.34c-.43-.16-.88-.2-1.28-.09L9.8 3.38l.79-.78c.78-.79 2.04-.79 2.82 0l7.99 7.99c.79.78.79 2.04 0 2.82l-7.99 7.99c-.78.79-2.04.79-2.82 0L2.6 13.41c-.79-.78-.79-2.04 0-2.82"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const MIN_CARDS = 15;

export async function ProjectsSection() {
  let projects: AirtableProject[] = [];
  try {
    projects = await pull(MIN_CARDS);
  } catch {
    // Silently fall back to no cards to keep the section stable even if Airtable errors.
  }

  // Carousel needs 3× repetition for seamless loop
  const carouselItems = projects.length ? [...projects, ...projects, ...projects] : [];

  return (
    <section
      className="projects-section"
      style={{
        position: "relative",
        zIndex: 1,
        background: "var(--background)",
        paddingTop: 80,
        paddingBottom: 100,
      }}
    >
      {/* Creature overlay — 3.5 waves wide, front of everything including hero wave and images */}

      {/* Headline */}
      <div
        className="section-padded"
        style={{
          position: "relative",
          zIndex: 5,
          paddingLeft: "clamp(24px, 15vw, 260px)",
          paddingRight: 32,
          marginBottom: 8,
          maxWidth: 1017 + 260,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-zarathustra)",
            fontSize: 40,
            lineHeight: 1,
            color: "var(--foreground)",
            margin: 0,
            fontWeight: "normal",
          }}
        >
          Imagine a world where{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #b3203d 0%, #d96b1d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline",
            }}
          >
            you made this:
          </span>
        </h2>
      </div>

      {/* Subtext */}
      <div
        className="section-padded"
        style={{
          position: "relative",
          zIndex: 5,
          paddingLeft: "clamp(24px, 15vw, 260px)",
          paddingRight: 32,
          marginBottom: 40,
          maxWidth: 1279 + 260,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontSize: 20,
            color: "var(--foreground)",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          100,000 teens started exactly where you are. We&rsquo;re here to help you build your first
          crazy thing.
        </p>
      </div>

      {/* Project card autoscrolling carousel */}
      <div style={{ position: "relative", zIndex: 5, marginBottom: 24, overflow: "hidden" }}>
        {/* Edge fade overlays */}
        <div
          className="carousel-fade-left"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          className="carousel-fade-right"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: "linear-gradient(270deg, var(--background) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          className="carousel-track"
          style={{
            display: "flex",
            gap: 20,
            paddingTop: 8,
            paddingBottom: 16,
            width: "max-content",
          }}
        >
          {carouselItems.map((project, i) => (
            <ProjectCard key={`${project.id}-${i}`} project={project} />
          ))}
        </div>

        <style>{`
          .carousel-pause-toggle {
            position: absolute;
            inset: 0;
            opacity: 0;
            margin: 0;
            cursor: pointer;
          }
          .carousel-pause-button .play-icon { display: none; }
          .carousel-pause-toggle:checked ~ .pause-icon { display: none; }
          .carousel-pause-toggle:checked ~ .play-icon { display: block; }
          .carousel-pause-toggle:focus-visible {
            outline: 3px solid var(--orange);
            outline-offset: 2px;
          }
          .carousel-track {
            animation: carousel-scroll ${projects.length > 0 ? projects.length * 4 : 60}s linear infinite;
          }
          .carousel-track:hover {
            animation-play-state: paused;
          }
          .projects-section:has(.carousel-pause-toggle:checked) .carousel-track {
            animation-play-state: paused;
          }
          @keyframes carousel-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-${projects.length > 0 ? projects.length * (290 + 20) : 1600}px); }
          }
          @media (prefers-reduced-motion: reduce) {
            .carousel-track { animation: none !important; }
          }
          .projects-cta-short { display: none; }
          @media (max-width: 640px) {
            .carousel-fade-left, .carousel-fade-right { display: none !important; }
            .projects-cta-full { display: none; }
            .projects-cta-short { display: inline; }
          }
        `}</style>
      </div>

      {/* CTA button — left-aligned, matching headline indent */}
      <div
        className="section-padded"
        style={{
          paddingLeft: "clamp(24px, 15vw, 260px)",
          paddingRight: 32,
          position: "relative",
          zIndex: 5,
          marginTop: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://magazine.hackclub.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--foreground)",
              color: "var(--background)",
              borderRadius: 41,
              height: 52,
              paddingLeft: 32,
              paddingRight: 32,
              fontFamily: "var(--font-phantom)",
              fontSize: 20,
              fontWeight: "normal",
              textDecoration: "none",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
            className="cta-btn dark-btn"
          >
            <span className="projects-cta-full">See more projects in the 2025 magazine</span>
            <span className="projects-cta-short">See more in the magazine</span> <BtnArrow />
          </a>

          <label
            className="carousel-pause-button"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              color: "var(--muted)",
              background: "transparent",
              border: "3px solid var(--muted)",
              borderRadius: 999,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              id="projects-carousel-pause"
              type="checkbox"
              className="carousel-pause-toggle"
              aria-label="Pause auto-scrolling projects carousel"
            />
            <svg
              className="pause-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <line
                x1="8"
                y1="6"
                x2="8"
                y2="18"
                stroke="currentColor"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
              <line
                x1="16"
                y1="6"
                x2="16"
                y2="18"
                stroke="currentColor"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="play-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <path
                d="M8 6 Q8 5 9 5 L16.5 9.9 Q17.8 10.8 17.8 12 Q17.8 13.2 16.5 14.1 L9 19 Q8 19 8 18 Z"
                fill="currentColor"
              />
            </svg>
          </label>
        </div>
      </div>

      {/* Creature2 — left side, centered on wave */}
      <Image
        src="/assets/creature2.webp"
        alt=""
        width={560}
        height={620}
        style={{
          position: "absolute",
          left: 0,
          bottom: -18,
          width: "calc(560 / 1920 * 100vw)",
          height: "auto",
          transform: "translateY(calc(85%))",
          zIndex: 15,
          pointerEvents: "none",
        }}
      />

      {/* Downward wave — matches HeroSection wave height/amplitude */}
      <div
        className="wave-container"
        style={{
          position: "absolute",
          bottom: -40,
          left: 0,
          right: 0,
          lineHeight: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Back shadow layer — matches HeroSection shadow */}
        <svg
          viewBox="0 0 1920 40"
          preserveAspectRatio="none"
          style={{ width: "100%", height: 40, display: "block", position: "absolute", bottom: 0 }}
        >
          <path
            d="M0,0 L0,8 C40,8 40,27 80,27 C120,27 120,8 160,8 C200,8 200,27 240,27 C280,27 280,8 320,8 C360,8 360,27 400,27 C440,27 440,8 480,8 C520,8 520,27 560,27 C600,27 600,8 640,8 C680,8 680,27 720,27 C760,27 760,8 800,8 C840,8 840,27 880,27 C920,27 920,8 960,8 C1000,8 1000,27 1040,27 C1080,27 1080,8 1120,8 C1160,8 1160,27 1200,27 C1240,27 1240,8 1280,8 C1320,8 1320,27 1360,27 C1400,27 1400,8 1440,8 C1480,8 1480,27 1520,27 C1560,27 1560,8 1600,8 C1640,8 1640,27 1680,27 C1720,27 1720,8 1760,8 C1800,8 1800,27 1840,27 C1880,27 1880,8 1920,8 L1920,0 Z"
            style={{ fill: "var(--background)" }}
          />
        </svg>
        {/* Main fill layer — 40px, amplitude 19px matching HeroSection */}
        <svg
          viewBox="0 0 1920 40"
          preserveAspectRatio="none"
          style={{ width: "100%", height: 40, display: "block" }}
        >
          <path
            d="M0,0 L0,8 C40,8 40,27 80,27 C120,27 120,8 160,8 C200,8 200,27 240,27 C280,27 280,8 320,8 C360,8 360,27 400,27 C440,27 440,8 480,8 C520,8 520,27 560,27 C600,27 600,8 640,8 C680,8 680,27 720,27 C760,27 760,8 800,8 C840,8 840,27 880,27 C920,27 920,8 960,8 C1000,8 1000,27 1040,27 C1080,27 1080,8 1120,8 C1160,8 1160,27 1200,27 C1240,27 1240,8 1280,8 C1320,8 1320,27 1360,27 C1400,27 1400,8 1440,8 C1480,8 1480,27 1520,27 C1560,27 1560,8 1600,8 C1640,8 1640,27 1680,27 C1720,27 1720,8 1760,8 C1800,8 1800,27 1840,27 C1880,27 1880,8 1920,8 L1920,0 Z"
            style={{ fill: "var(--background)" }}
          />
        </svg>
        {/* Thin stroke wave — same as HeroSection stroke, positioned at fill edge */}
        <svg
          viewBox="0 0 1920 22"
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: 22,
            display: "block",
            position: "absolute",
            top: 24,
            left: 0,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,2 C40,2 40,18 80,18 C120,18 120,2 160,2 C200,2 200,18 240,18 C280,18 280,2 320,2 C360,2 360,18 400,18 C440,18 440,2 480,2 C520,2 520,18 560,18 C600,18 600,2 640,2 C680,2 680,18 720,18 C760,18 760,2 800,2 C840,2 840,18 880,18 C920,18 920,2 960,2 C1000,2 1000,18 1040,18 C1080,18 1080,2 1120,2 C1160,2 1160,18 1200,18 C1240,18 1240,2 1280,2 C1320,2 1320,18 1360,18 C1400,18 1400,2 1440,2 C1480,2 1480,18 1520,18 C1560,18 1560,2 1600,2 C1640,2 1640,18 1680,18 C1720,18 1720,2 1760,2 C1800,2 1800,18 1840,18 C1880,18 1880,2 1920,2"
            fill="none"
            style={{ stroke: "var(--background)" }}
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
