import Image from "next/image";
import { YouTubeEmbed } from "../YouTubeEmbed";

const photos = [
  {
    title: "Hack Club Daydream event showcase",
    logo: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Image
          src={
            "https://cdn.hackclub.com/019db857-7952-7be6-bf18-9aee5cf67274/hereLogoDaydream.webp"
          }
          alt="Daydream"
          width={182}
          height={52}
          quality={100}
          sizes="182px"
          style={{ height: 52, width: "auto", display: "block" }}
        />
      </div>
    ),
    caption: "100 high school game jams in 100 cities around the world, all on the same weekend",
  },
  {
    title: "Hack Club Undercity hardware hackathon showcase",
    logo: (
      <Image
        src={"https://cdn.hackclub.com/019db857-7bd5-7376-8361-bac54818fc9c/hereLogoUndercity.webp"}
        alt="Undercity"
        width={159}
        height={58}
        quality={100}
        sizes="159px"
        style={{
          height: 58,
          width: "auto",
          display: "block",
          filter: "drop-shadow(2px 2px 0px #000)",
        }}
      />
    ),
    caption: "A 4-day hardware hackathon in GitHub HQ, San Francisco.",
  },
  {
    title: "Hack Club Juice popup games cafe showcase",
    logo: (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image
          src={"https://cdn.hackclub.com/019db857-80eb-77db-82ae-2b49f5bdd4bc/sticker.webp"}
          alt=""
          width={48}
          height={56}
          quality={100}
          sizes="48px"
          style={{ height: 56, width: "auto", display: "block" }}
        />
        <Image
          src={"https://cdn.hackclub.com/019db857-7e65-75fc-b1ec-949cf8cecb55/heroLogoJuice.webp"}
          alt="Juice"
          width={100}
          height={44}
          quality={100}
          sizes="100px"
          style={{ height: 44, width: "auto", display: "block" }}
        />
      </div>
    ),
    caption: "100 teenagers ran a popup games cafe in Shanghai for seven days.",
  },
];

export function HerePhotosSection() {
  return (
    <section
      className="section-padded"
      style={{
        background: "var(--background)",
        paddingTop: 48,
        paddingBottom: 80,
        paddingLeft: "clamp(24px, 14.29%, 220px)",
        paddingRight: "clamp(24px, 14.29%, 220px)",
      }}
    >
      {/* Tagline */}
      <p
        style={{
          fontFamily: "var(--font-phantom)",
          fontSize: 20,
          color: "var(--foreground)",
          textAlign: "center",
          marginBottom: 36,
          marginTop: 0,
          lineHeight: 1.2,
        }}
      >
        We&apos;ve done this countless times before.
        <br />
        See more on our{" "}
        <a
          href="https://www.youtube.com/@HackClubHQ"
          className="here-photos-youtube-link"
          style={{ color: "var(--red)", textDecoration: "none" }}
        >
          YouTube.
        </a>
      </p>

      {/* 3-column photo + logo + caption grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(8px, 1.2vw, 16px)",
          marginBottom: 56,
        }}
        className="here-photos-grid"
      >
        {photos.map((photo, i) => (
          <div key={i}>
            {/* Photo thumbnail / video embed */}
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                aspectRatio: "16 / 9",
                marginBottom: 18,
                position: "relative",
              }}
            >
              <YouTubeEmbed
                id={["vvdoW2gh9YU", "kaEFv7e49mo", "Gtjyyu82pw4"][i]}
                title={photo.title}
              />
            </div>

            {/* Event logo — centered */}
            <div style={{ marginBottom: 10, display: "flex", justifyContent: "center" }}>
              {photo.logo}
            </div>

            {/* Caption — centered */}
            <p
              style={{
                fontFamily: "var(--font-phantom)",
                fontSize: 20,
                color: "var(--foreground)",
                margin: 0,
                lineHeight: 1.2,
                textAlign: "center",
              }}
            >
              {photo.caption}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .here-photos-youtube-link:hover,
        .here-photos-youtube-link:focus-visible {
          text-decoration: underline !important;
        }

        @media (max-width: 640px) {
          .here-photos-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .here-photos-grid {
            display: flex !important;
            flex-wrap: wrap;
            justify-content: center;
            gap: 32px !important;
          }
          .here-photos-grid > div {
            flex: 0 0 calc(50% - 16px);
          }
        }
      `}</style>
    </section>
  );
}
