"use client";

import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { BtnArrowSvg } from "../../components/landing/btn-arrow";

export type ArcadePrize = {
  name: string;
  smallName?: string;
  description?: string;
  hours: number;
  imageURL: string;
  limited?: boolean;
};

export type ArcadeCarouselItem = {
  hours: number;
  imageURL: string;
};

const arcadeAssets: Record<string, string> = {
  "a1.png": "https://cdn.hackclub.com/019e383a-adac-7bed-bcb1-9d75a79dd2b3/a1.png",
  "a2.png": "https://cdn.hackclub.com/019e383a-afc9-7c6c-bd04-90172a0d094d/a2.png",
  "a3.png": "https://cdn.hackclub.com/019e383a-b1f6-7894-b6df-e97639ce732c/a3.png",
  "arcade_bg.png": "https://cdn.hackclub.com/019e383a-b427-7b96-823d-503209f32f81/arcade_bg.png",
  "beige_bg.png": "https://cdn.hackclub.com/019e383a-b655-736b-b1fb-e08a1fd36991/beige_bg.png",
  "blue_bg.svg": "https://cdn.hackclub.com/019e383a-bb5e-7666-95fa-0fbb6b1f50f4/blue_bg.svg",
  "blue_bottom.svg":
    "https://cdn.hackclub.com/019e383a-be5c-7aad-bf95-4d9a3401800f/blue_bottom.svg",
  "blue_top.png": "https://cdn.hackclub.com/019e383a-bf7f-7683-a876-16d867402200/blue_top.png",
  "blue_top.svg": "https://cdn.hackclub.com/019e383a-c0ca-7e75-af59-4b3355cfcdd9/blue_top.svg",
  "brown_bg.svg": "https://cdn.hackclub.com/019e383a-c2fe-7576-9077-d9d68e34f02f/brown_bg.svg",
  "o1.png": "https://cdn.hackclub.com/019e383a-c491-7731-997e-2af2db1dab8b/o1.png",
  "o2.png": "https://cdn.hackclub.com/019e383a-c5d5-78eb-bb85-14c2f9256fd6/o2.png",
  "o5.png": "https://cdn.hackclub.com/019e383a-c73a-77b3-abfd-bd39ae520c2f/o5.png",
  "o6.png": "https://cdn.hackclub.com/019e383a-c985-7e07-bc0d-121d85c3155b/o6.png",
  "o7.png": "https://cdn.hackclub.com/019e383a-cb0e-73b5-8d12-fd6158ac3e25/o7.png",
  "prizes.png": "https://cdn.hackclub.com/019e383a-cd3b-7a4b-b7da-09367ba3d1cc/prizes.png",
  "r5.png": "https://cdn.hackclub.com/019e383a-cf23-7553-b4a4-56058f8c0431/r5.png",
  "r6.png": "https://cdn.hackclub.com/019e383a-d0a9-715c-b5e9-9c0bd9b9c50e/r6.png",
  "yellow_bottom.svg":
    "https://cdn.hackclub.com/019e383a-d1d4-7d2a-921d-48725f1a6b85/yellow_bottom.svg",
};

const stickerAssets: Record<string, string> = {
  "2020_progress.png":
    "https://cdn.hackclub.com/019e383a-d35b-7c92-9cbb-124198c1593c/2020_progress.png",
  "2021_design_awards.png":
    "https://cdn.hackclub.com/019e383a-d474-7f6d-acbc-cd880ff971d4/2021_design_awards.png",
  "Blot.png": "https://cdn.hackclub.com/019e383a-d662-7da2-9dc8-2271e9fdde8c/Blot.png",
  "HackHackClub.png":
    "https://cdn.hackclub.com/019e383a-d910-7d56-9d3d-6c3a3224845c/HackHackClub.png",
  "In-N-Out.png": "https://cdn.hackclub.com/019e383a-da56-79e0-8a4f-0dce7ba77403/In-N-Out.png",
  "MRT.png": "https://cdn.hackclub.com/019e383a-dc1d-73e3-930e-91b9e6e337db/MRT.png",
  "OnBoard_holographic_sticker.png":
    "https://cdn.hackclub.com/019e383a-de59-799c-8429-330e3e31146e/OnBoard_holographic_sticker.png",
  "Rummage.png": "https://cdn.hackclub.com/019e383a-dfc2-7c3b-8de3-ff21f8612163/Rummage.png",
};

const arcadeAsset = (path: string) => arcadeAssets[path] ?? "";
const stickerAsset = (path: string) => stickerAssets[path] ?? "";

const stickerNames = [
  "Blot.png",
  "HackHackClub.png",
  "MRT.png",
  "Rummage.png",
  "In-N-Out.png",
  "OnBoard_holographic_sticker.png",
  "2021_design_awards.png",
  "2020_progress.png",
];

const projectIdeas = [
  "Drawing robot",
  "3D printer",
  "DIY Electric Skateboard",
  "Pixel art display",
  "Smart Garden",
  "CNC machine",
  "Interactive LED Art",
  "VR Escape Room",
  "Image Recognition App",
  "DIY Camera",
  "Multiplayer AR Game",
  "Drone Swarm Choreography",
];

const projectCards = [
  {
    avatar:
      "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Favatars.slack-edge.com%2F2024-05-06%2F7077145829972_8597fe575e09a698859c_192.png&w=48&q=75",
    username: "elijah",
    description:
      "Finally shipped my personal AI clone and had a ton of fun seeing what other people did with it.",
    image:
      "https://scrapbook-into-the-redwoods.s3.amazonaws.com/4d4ecc40-c388-4b9d-997f-1f3d6a21302c-image.png",
  },
  {
    avatar:
      "https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Favatars.slack-edge.com%2F2023-04-15%2F5116546887938_afb907f96fa13e434a49_192.png&w=48&q=75",
    username: "cupcakes",
    description: "Assembling blot robot.",
    image:
      "https://scrapbook-into-the-redwoods.s3.amazonaws.com/e75cf24a-46d9-45fa-92d3-b9e5862d0d47-img_2442.jpg",
  },
  {
    avatar:
      "https://scrapbook.hackclub.com/_next/image?url=https://secure.gravatar.com/avatar/c2e358d7bf4677cac086556035ce1dbc.jpg?s%3D192%26d%3Dhttps%253A%252F%252Fa.slack-edge.com%252Fdf10d%252Fimg%252Favatars%252Fava_0011-192.png&w=640&q=75",
    username: "KonstantinosFragkoulis",
    description: "A drone build that can follow the biggest object of a chosen color.",
    image: "https://cloud-fshng6w8x-hack-club-bot.vercel.app/0videoframe_809.png",
  },
];

const faqItems = [
  [
    "Who is eligible?",
    "You need to be a high schooler or younger. You just need a GitHub account and a Slack account to participate.",
  ],
  [
    "What types of projects count?",
    "Projects need to be open source and have a way for people to experience them. Document progress as you go.",
  ],
  [
    "How many projects can I build?",
    "You can submit as many projects as you make. We just count the hours.",
  ],
  [
    "How much does it cost?",
    "It is free. Some shipments may have customs charges depending on your country.",
  ],
  ["I need help!", "Get help in the #arcade-help channel in the Hack Club Slack."],
  ["My hours aren't counted!", "Reviews are done by humans and may take a few days to show up."],
  ["Does a team project count?", "Yes, but your own work needs to be clearly documented."],
  [
    "What about school work or a job?",
    "If you are building for school or work, it does not count for Arcade.",
  ],
  [
    "What counts as a scrap?",
    "Code needs a commit. Share links for projects like Sprig, Blot, or hosted 3D models.",
  ],
];

function IntroCard({
  title,
  text,
  number,
  image,
  className = "",
}: {
  title: string;
  text: React.ReactNode;
  number: string;
  image: string;
  className?: string;
}) {
  return (
    <article className={`arcade-intro-card ${className}`}>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="arcade-intro-number">{number}</span>
      <img src={image} alt="" aria-hidden="true" className="arcade-intro-figure" />
    </article>
  );
}

function PrizeCard({
  prize,
  onOpen,
}: {
  prize: ArcadePrize;
  onOpen: (prize: ArcadePrize) => void;
}) {
  return (
    <article className="arcade-prize-card">
      {prize.limited ? <div className="arcade-prize-limited">Limited!</div> : null}
      <div className="arcade-prize-image-shell">
        <img src={prize.imageURL} alt={prize.name} className="arcade-prize-image" />
      </div>
      <div className="arcade-prize-copy">
        <h3>{prize.name}</h3>
        <p>{prize.smallName || "\u00a0"}</p>
      </div>
      <div className="arcade-prize-ticket">
        {prize.hours} {prize.hours === 1 ? "ticket" : "tickets"}
      </div>
      <button
        type="button"
        className="arcade-prize-info"
        onClick={() => onOpen(prize)}
        aria-label={`More about ${prize.name}`}
      >
        📦
      </button>
    </article>
  );
}

function ProjectCard({
  avatar,
  username,
  description,
  image,
}: {
  avatar: string;
  username: string;
  description: string;
  image: string;
}) {
  return (
    <article className="arcade-project-card">
      <a
        href={`https://scrapbook.hackclub.com/${username}`}
        target="_blank"
        rel="noreferrer"
        className="arcade-project-user"
      >
        <img src={avatar} alt="" className="arcade-project-avatar" />
        <span>@{username}</span>
      </a>
      <p>{description}</p>
      <div className="arcade-project-shot" style={{ backgroundImage: `url(${image})` }} />
    </article>
  );
}

export default function ArcadePageClient({
  prizes,
  carouselItems,
}: {
  prizes: ArcadePrize[];
  carouselItems: ArcadeCarouselItem[];
}) {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const [stickerIndex, setStickerIndex] = useState(0);
  const [showSticker, setShowSticker] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<ArcadePrize | null>(null);
  const [showThought, setShowThought] = useState(false);

  const currentSticker = stickerNames[stickerIndex % stickerNames.length];

  return (
    <main id="main" tabIndex={-1} className="arcade-page">
      <section className="arcade-hero">
        <Navbar />
        <img
          src={arcadeAsset("beige_bg.png")}
          alt=""
          aria-hidden="true"
          className="arcade-beige-swirl"
        />
        <div className="arcade-shell arcade-hero-grid">
          <div className="arcade-hero-copy">
            <img
              src="https://cloud-e3wj9s4pe-hack-club-bot.vercel.app/00combo__1_.png"
              alt="GitHub + Hack Club"
              className="arcade-combo-mark"
            />
            <h1 className="arcade-logo-text">ARCADE</h1>
            <p className="arcade-title-copy">The summer is yours for the making</p>
            <p className="arcade-hero-note">
              The Arcade closed September 1st, but you can still join the{" "}
              <a href="https://slack.hackclub.com" target="_blank" rel="noreferrer">
                Hack Club Slack
              </a>
              !
            </p>
          </div>
          <div className="arcade-hero-art">
            <img
              src={arcadeAsset("prizes.png")}
              alt="Arcade prizes"
              className="arcade-prizes-hero"
            />
          </div>
        </div>
      </section>

      <section className="arcade-blue-section">
        <img
          src={arcadeAsset("blue_top.svg")}
          alt=""
          aria-hidden="true"
          className="arcade-top-scribble"
        />
        <div className="arcade-shell">
          <h2 className="arcade-section-title">How to play</h2>
          <div className="arcade-intro-stack">
            <div className="arcade-intro-row arcade-intro-row--single">
              <IntroCard
                title="Work on projects"
                text="Hack on something cool. Examples: making your own PCB, building your own site, creating an app."
                number="1"
                image={arcadeAsset("o2.png")}
              />
              <img
                src={arcadeAsset("a1.png")}
                alt=""
                aria-hidden="true"
                className="arcade-arrow arcade-arrow--left"
              />
              <img
                src={arcadeAsset("a2.png")}
                alt=""
                aria-hidden="true"
                className="arcade-arrow arcade-arrow--right"
              />
            </div>
            <div className="arcade-intro-row">
              <IntroCard
                title="Bank your hours"
                text={
                  <>
                    Join the{" "}
                    <a href="https://slack.hackclub.com" target="_blank" rel="noreferrer">
                      Hack Club Slack
                    </a>{" "}
                    and use /hack in #arcade to log your hours. You earn a ticket for each hour
                    spent.
                  </>
                }
                number="2"
                image={arcadeAsset("o1.png")}
              />
              <IntroCard
                title="Redeem your Prizes"
                text="Use your tickets to buy prizes for your next project, like Arduino kits, drawing tablets, and more."
                number="3"
                image={arcadeAsset("o7.png")}
              />
              <img
                src={arcadeAsset("a3.png")}
                alt=""
                aria-hidden="true"
                className="arcade-arrow arcade-arrow--center"
              />
            </div>
            <p className="arcade-repeat-line">
              <span>Make stuff. Get stuff. Repeat.</span>
            </p>
          </div>
        </div>
        <div className="arcade-carousel">
          <div className="arcade-carousel-track">
            {[...carouselItems, ...carouselItems].map((prize, index) => (
              <div key={`${prize.imageURL}-${index}`} className="arcade-carousel-item">
                <span>{prize.hours}h</span>
                <img src={prize.imageURL} alt="" />
              </div>
            ))}
          </div>
        </div>
        <img
          src={arcadeAsset("blue_bottom.svg")}
          alt=""
          aria-hidden="true"
          className="arcade-bottom-triangle"
        />
      </section>

      <section className="arcade-sticker-section">
        <div className="arcade-marquee-wrap">
          <div
            className="arcade-sticker-line"
            onMouseEnter={() => {
              setStickerIndex((value) => (value + 1) % stickerNames.length);
              setShowSticker(true);
            }}
            onMouseLeave={() => setShowSticker(false)}
          >
            <p>
              Get <span className="arcade-sticker-trigger">free stickers</span> and code with other
              high schoolers!
            </p>
            {showSticker && (
              <div className="arcade-sticker-pop">
                <div className="arcade-sticker-pop-inner">
                  <img
                    src={stickerAsset(currentSticker)}
                    alt={currentSticker.replace(/\.(png|svg)$/i, "")}
                  />
                  <span>{currentSticker.replace(/\.(png|svg)$/i, "").replaceAll("_", " ")}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="arcade-projects">
        <div className="arcade-projects-bg" aria-hidden="true" />
        <div className="arcade-shell arcade-projects-shell">
          <h2 className="arcade-projects-title">
            <span>You could be building a</span>
            <button
              type="button"
              onClick={() => setIdeaIndex((value) => (value + 1) % projectIdeas.length)}
            >
              {projectIdeas[ideaIndex]}
            </button>
          </h2>
          <div className="arcade-project-grid">
            {projectCards.map((card) => (
              <ProjectCard key={card.username} {...card} />
            ))}
          </div>
          <a
            href="https://scrapbook.hackclub.com/"
            target="_blank"
            rel="noreferrer"
            className="arcade-projects-link cta-btn"
          >
            See more projects{" "}
            <span className="btn-arrow" aria-hidden="true">
              <BtnArrowSvg />
            </span>
          </a>
        </div>
      </section>

      <section className="arcade-green-section">
        <div className="arcade-shell">
          <p className="arcade-hour-line">One hour at a time,</p>
          <h2 className="arcade-make-line">
            What will <span>you</span> make this summer?
          </h2>
          <div className="arcade-ticket-grid">
            <article className="arcade-ticket-card arcade-ticket-card--wide">
              <h3>Build whatever you want!</h3>
              <div>
                <p>
                  Any technical project counts. You could build an AR game, pixel art display,
                  drawing robot, and more. Anytime you work on your project, start the hack hour
                  timer. You earn a ticket for every hour.
                </p>
                <h4>Don&apos;t know where to start?</h4>
                <ul>
                  <li>
                    <a href="https://boba.hackclub.com/" target="_blank" rel="noreferrer">
                      Boba drops
                    </a>
                    : Build a website, get boba.
                  </li>
                  <li>
                    <a
                      href="https://jams.hackclub.com/jam/wizard-orpheus"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Wizard Orpheus
                    </a>
                    : Build a text-based game with AI.
                  </li>
                  <li>
                    <a href="/bin" target="_blank" rel="noreferrer">
                      The Bin
                    </a>
                    : Build an online circuit, get the parts for free.
                  </li>
                  <li>
                    <a href="/sprig" target="_blank" rel="noreferrer">
                      Sprig
                    </a>
                    : Build a JS game, play it on your own console.
                  </li>
                  <li>
                    <a href="/onboard" target="_blank" rel="noreferrer">
                      OnBoard
                    </a>
                    : Design a PCB, get a $100 grant.
                  </li>
                  <li>
                    <a href="https://fraps.hackclub.com" target="_blank" rel="noreferrer">
                      Hackaccino
                    </a>
                    : Build a 3D website and get a free frappuccino.
                  </li>
                  <li>
                    <a href="https://blot.hackclub.com/" target="_blank" rel="noreferrer">
                      Blot
                    </a>
                    : Write code. Make art. Get a drawing machine.
                  </li>
                  <li>
                    <a href="https://cider.hackclub.com" target="_blank" rel="noreferrer">
                      Cider
                    </a>
                    : Make a mobile app and get an Apple Developer account.
                  </li>
                  <li>
                    <a
                      href="https://easel.hackclub.com/orpheus-finds-easel"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Easel
                    </a>
                    : Write a programming language and receive fudge.
                  </li>
                </ul>
              </div>
            </article>
            <article className="arcade-ticket-card arcade-ticket-card--idea">
              <h3>Not sure what to make?</h3>
              <p>Click me for ideas!</p>
              <button
                type="button"
                className="arcade-idea-console"
                onClick={() => setShowThought((value) => !value)}
              >
                {showThought && (
                  <span className="arcade-thought-bubble">
                    Arcade has ended! Thanks for playing.
                  </span>
                )}
                <img
                  src="https://cloud-ocoecqzgs-hack-club-bot.vercel.app/0screenshot_2024-06-13_at_22.01.02.png"
                  alt="Need an idea?"
                />
              </button>
            </article>
            <img src={arcadeAsset("r5.png")} alt="" aria-hidden="true" className="arcade-r5" />
          </div>
        </div>
        <img
          src={arcadeAsset("yellow_bottom.svg")}
          alt=""
          aria-hidden="true"
          className="arcade-yellow-zig"
        />
      </section>

      <section className="arcade-prizes-section">
        <img src={arcadeAsset("o5.png")} alt="" aria-hidden="true" className="arcade-o5" />
        <img src={arcadeAsset("o6.png")} alt="" aria-hidden="true" className="arcade-o6" />
        <div className="arcade-shell arcade-prizes-shell">
          <h2 className="arcade-prizes-title">
            <span>Prizes</span> to powerup your next project!
          </h2>
          <p className="arcade-prizes-subtitle">
            Redeem these with your tickets. For high schoolers or younger only.
          </p>
          <div className="arcade-prize-grid">
            {prizes.map((prize) => (
              <PrizeCard
                key={`${prize.name}-${prize.hours}`}
                prize={prize}
                onOpen={setSelectedPrize}
              />
            ))}
          </div>
          <p className="arcade-sneak-peek">
            This is just a <span>sneak peek</span>... there were many more prizes that were unlocked
            as the summer went on!
          </p>
        </div>

        <div className="arcade-faq-wrap">
          <img
            src={arcadeAsset("blue_top.png")}
            alt=""
            aria-hidden="true"
            className="arcade-blue-top-png"
          />
          <div className="arcade-shell">
            <h2 className="arcade-faq-title">F.A.Q.</h2>
            <div className="arcade-faq-grid">
              {faqItems.map(([question, answer]) => (
                <article key={question} className="arcade-faq-card">
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
            <div className="arcade-close-line">
              Join <span className="arcade-logo-inline">ARCADE</span>.
              <br />
              Build real projects.
              <br />
              Share it with friends.
            </div>
          </div>
          <img src={arcadeAsset("r6.png")} alt="" aria-hidden="true" className="arcade-r6" />
        </div>
      </section>

      <Footer />

      {selectedPrize && (
        // oxlint-disable jsx-a11y/prefer-tag-over-role
        <div
          className="arcade-dialog-backdrop"
          onClick={() => setSelectedPrize(null)}
          role="button"
          tabIndex={0}
          aria-label="Close dialog"
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") setSelectedPrize(null);
          }}
        >
          {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
          <dialog open className="arcade-dialog" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="arcade-dialog-close"
              onClick={() => setSelectedPrize(null)}
            >
              ×
            </button>
            <img
              src={selectedPrize.imageURL}
              alt={selectedPrize.name}
              className="arcade-dialog-image"
            />
            <h3>{selectedPrize.name}</h3>
            {selectedPrize.smallName ? (
              <p className="arcade-dialog-subtitle">{selectedPrize.smallName}</p>
            ) : null}
            {selectedPrize.description ? (
              <p className="arcade-dialog-copy">{selectedPrize.description}</p>
            ) : null}
            <div className="arcade-dialog-ticket">
              {selectedPrize.hours} {selectedPrize.hours === 1 ? "ticket" : "tickets"}
            </div>
          </dialog>
        </div>
        // oxlint-enable jsx-a11y/prefer-tag-over-role
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu:wght@400;700&display=swap");

        .arcade-page {
          background: #faefd6;
          color: #35290f;
          overflow-x: hidden;
        }

        .arcade-page * {
          box-sizing: border-box;
        }

        .arcade-page a {
          color: inherit;
        }

        .arcade-shell {
          width: min(1200px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .arcade-hero {
          position: relative;
          overflow: hidden;
          min-height: 820px;
          padding: 110px 0 180px;
        }

        .arcade-beige-swirl {
          position: absolute;
          width: 110vw;
          right: -35vw;
          bottom: -30vw;
          transform: rotate(-30deg);
          pointer-events: none;
        }

        .arcade-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: center;
          gap: 32px;
          padding-top: 46px;
        }

        .arcade-hero-copy {
          max-width: 560px;
          padding-top: 0;
        }

        .arcade-hero-art {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .arcade-combo-mark {
          width: clamp(140px, 15vw, 210px);
          height: auto;
          margin-bottom: 22px;
        }

        .arcade-logo-text,
        .arcade-logo-inline {
          font-family: "Slackey", cursive;
          color: #ff5c00;
          text-shadow:
            -4px -4px #faefd6,
            4px 4px #faefd6,
            -8px -8px #09afb4,
            8px 8px #09afb4,
            -10px -10px #09afb4,
            10px 10px #09afb4;
        }

        .arcade-logo-text {
          margin: 0;
          font-size: clamp(3.4rem, 6vw, 4.95rem);
          line-height: 1;
        }

        .arcade-title-copy,
        .arcade-section-title,
        .arcade-projects-title,
        .arcade-make-line,
        .arcade-prizes-title,
        .arcade-faq-title {
          font-family: "Emblema One", system-ui;
        }

        .arcade-title-copy {
          margin: 30px 0 28px;
          max-width: 540px;
          font-family: var(--font-phantom);
          font-size: clamp(3.25rem, 4.7vw, 4.9rem);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: #10b7cc;
        }

        .arcade-hero-note,
        .arcade-prizes-subtitle,
        .arcade-sneak-peek,
        .arcade-close-line {
          font-family: "Gaegu", cursive;
          font-size: clamp(1.15rem, 2.1vw, 1.6rem);
        }

        .arcade-hero-note {
          max-width: 700px;
          margin: 0;
          color: #10b7cc;
          font-size: clamp(1.3rem, 1.8vw, 1.9rem);
          line-height: 1.4;
        }

        .arcade-prizes-hero {
          width: min(100%, 760px);
          height: auto;
          display: block;
          margin: 40px auto -8px;
          animation: arcade-float 6s ease-in-out infinite;
        }

        .arcade-blue-section {
          position: relative;
          z-index: 2;
          color: #faefd6;
          background: #09afb4 url("${arcadeAsset("blue_bg.svg")}") center / cover no-repeat;
          margin-top: 11vw;
          padding: 0 0 138px;
          overflow: visible;
        }

        .arcade-blue-section .arcade-shell {
          position: relative;
          z-index: 2;
          padding-top: 0;
        }

        .arcade-top-scribble,
        .arcade-bottom-triangle,
        .arcade-yellow-zig,
        .arcade-blue-top-png {
          width: 100%;
          height: auto;
          position: absolute;
          left: 0;
          pointer-events: none;
        }

        .arcade-top-scribble {
          top: -20vw;
          z-index: 1;
        }

        .arcade-bottom-triangle {
          bottom: -16vw;
          z-index: 4;
        }

        .arcade-section-title,
        .arcade-faq-title {
          margin: 0;
          text-align: center;
          font-size: clamp(2.2rem, 4vw, 3.6rem);
        }

        .arcade-intro-stack {
          padding-top: 24px;
        }

        .arcade-intro-row {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .arcade-intro-row--single {
          grid-template-columns: minmax(0, 1fr);
          width: min(100%, 560px);
          margin: 30px auto 0;
        }

        .arcade-intro-card,
        .arcade-faq-card {
          position: relative;
          border-radius: 5px;
          background: #faefd6;
          color: #35290f;
          padding: 20px 136px 20px 20px;
          min-height: 142px;
        }

        .arcade-intro-card h3,
        .arcade-ticket-card h3,
        .arcade-faq-card h3 {
          margin: 0 0 10px;
          font-family: "Gaegu", cursive;
          font-size: clamp(1.7rem, 3vw, 2.5rem);
          line-height: 1;
        }

        .arcade-intro-card p,
        .arcade-faq-card p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.45;
        }

        .arcade-intro-number {
          position: absolute;
          top: 6px;
          right: 10px;
          opacity: 0.2;
          font-family: "Slackey", cursive;
          font-size: 2rem;
        }

        .arcade-intro-figure {
          position: absolute;
          right: 10px;
          bottom: 8px;
          width: min(34%, 150px);
          max-height: calc(100% - 16px);
          height: auto;
          object-fit: contain;
        }

        .arcade-arrow {
          position: absolute;
          display: none;
        }

        .arcade-arrow--left {
          left: -110px;
          bottom: 0;
          width: 100px;
        }

        .arcade-arrow--right {
          right: -120px;
          bottom: 0;
          width: 90px;
        }

        .arcade-arrow--center {
          left: 35vw;
          bottom: -92px;
          width: 250px;
          z-index: 1;
        }

        .arcade-repeat-line {
          position: relative;
          z-index: 2;
          margin: 108px 0 0;
          text-align: center;
          transform: rotate(3deg);
        }

        .arcade-repeat-line span {
          display: inline-block;
          background: #5e3414;
          color: #faefd6;
          padding: 8px 16px;
          font-family: "Gaegu", cursive;
          font-size: clamp(1.6rem, 3vw, 2.8rem);
        }

        .arcade-marquee-wrap {
          width: min(1200px, calc(100vw - 48px));
          margin: 0 auto;
          position: relative;
          z-index: 12;
        }

        .arcade-sticker-section {
          position: relative;
          z-index: 1;
          background: transparent;
          padding: 15vw 0 20px;
        }

        .arcade-sticker-line {
          position: relative;
          color: #5e3414;
          font-family: "Slackey", cursive;
          font-size: clamp(1.4rem, 3vw, 3rem);
          line-height: 1.4;
        }

        .arcade-sticker-line p {
          margin: 0;
        }

        .arcade-sticker-trigger {
          position: relative;
          display: inline-block;
          margin: 0 6px;
          padding: 4px 8px;
          background: #09afb4;
          color: #faefd6;
          border-radius: 2px;
          transform: rotate(-3deg) scale(1.1);
          cursor: pointer;
        }

        .arcade-sticker-pop {
          position: absolute;
          left: 24px;
          top: -240px;
          z-index: 5;
        }

        .arcade-sticker-pop-inner {
          position: relative;
          width: fit-content;
          background: #d0bf97;
          border-radius: 5px;
          padding: 20px 30px;
          transform: rotate(3deg);
          display: grid;
          justify-items: center;
          gap: 10px;
        }

        .arcade-sticker-pop-inner::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -20px;
          transform: translateX(-50%);
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 20px solid #d0bf97;
        }

        .arcade-sticker-pop-inner img {
          width: 160px;
          height: 160px;
          object-fit: contain;
        }

        .arcade-sticker-pop-inner span {
          color: #faefd6;
          font-size: 1.15rem;
          text-align: center;
        }

        .arcade-carousel {
          overflow: hidden;
          width: 105vw;
          margin: 38px 0 0 -2vw;
          padding-bottom: 52px;
          transform: rotate(-7deg) scale(1.03);
          position: relative;
          z-index: 1;
        }

        .arcade-carousel-track {
          display: flex;
          width: max-content;
          animation: arcade-scroll 38s linear infinite;
        }

        .arcade-carousel-item {
          width: 140px;
          height: 100px;
          margin: 0 10px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 239, 214, 0.2);
          border: 2px solid #faefd6;
        }

        .arcade-carousel-item span {
          position: absolute;
          left: 10px;
          bottom: -12px;
          opacity: 0.2;
          font-family: "Slackey", cursive;
          font-size: 1.4rem;
        }

        .arcade-carousel-item img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .arcade-projects {
          position: relative;
          background:
            radial-gradient(circle at top center, rgba(255, 170, 78, 0.22), transparent 28%),
            linear-gradient(180deg, #302720 0%, #1d1816 100%);
          padding: 80px 0 0;
        }

        .arcade-projects-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(30, 24, 22, 0.18), rgba(30, 24, 22, 0.18)),
            linear-gradient(transparent 96%, rgba(255, 255, 255, 0.06) 96%);
          background-size:
            auto,
            28px 28px;
          opacity: 1;
        }

        .arcade-projects-shell {
          position: relative;
          z-index: 1;
          padding: 36px 0 64px;
          text-align: center;
          color: #faefd6;
        }

        .arcade-projects-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin: 0;
          font-size: clamp(2rem, 4vw, 3.4rem);
          text-shadow: none;
        }

        .arcade-projects-title button {
          border: 0;
          border-radius: 10px;
          background: #ff5c00;
          color: #faefd6;
          padding: 14px 18px;
          font: inherit;
          cursor: pointer;
        }

        .arcade-project-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 34px;
        }

        .arcade-project-card {
          background: linear-gradient(180deg, #4f63d7 0%, #3f56d2 100%);
          color: #faefd6;
          border-radius: 8px;
          border: 3px solid rgba(250, 239, 214, 0.9);
          padding: 20px;
          text-align: left;
          box-shadow: 0 14px 0 rgba(0, 0, 0, 0.18);
        }

        .arcade-project-user {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 12px;
        }

        .arcade-project-avatar {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          object-fit: cover;
        }

        .arcade-project-card p {
          margin: 0 0 12px;
          min-height: 86px;
          font-size: 0.95rem;
          line-height: 1.45;
        }

        .arcade-project-shot {
          height: 160px;
          border-radius: 6px;
          border: 3px solid rgba(250, 239, 214, 0.9);
          background-position: bottom center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .arcade-projects-link {
          display: inline-block;
          margin-top: 30px;
          padding: 12px 18px;
          border-radius: 999px;
          text-decoration: none;
          background: linear-gradient(
            32deg,
            rgba(51, 142, 218, 0.9) 0%,
            rgba(51, 214, 166, 0.9) 100%
          );
          color: white;
          font-weight: 700;
        }

        .arcade-green-section {
          position: relative;
          background: linear-gradient(0deg, #a5c47f 0%, #09afb4 100%);
          padding: 120px 0 120px;
        }

        .arcade-hour-line {
          margin: 0;
          text-align: center;
          font-family: "Slackey", cursive;
          font-size: clamp(1.5rem, 3vw, 3rem);
          color: #faefd6;
        }

        .arcade-make-line {
          margin: 0;
          text-align: center;
          color: #faefd6;
          font-size: clamp(2rem, 4vw, 3.7rem);
        }

        .arcade-make-line span,
        .arcade-prizes-title span,
        .arcade-sneak-peek span {
          display: inline-block;
          background: #35290f;
          color: #faefd6;
          padding: 0 10px 4px;
          transform: rotate(20deg);
        }

        .arcade-ticket-grid {
          position: relative;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          padding: 44px 0 20px;
          align-items: start;
        }

        .arcade-ticket-card {
          position: relative;
          min-height: 100%;
          border: 3px dashed #5e3414;
          border-radius: 5px;
          background: #faefd6;
          color: #35290f;
          padding: 20px;
        }

        .arcade-ticket-card h4 {
          margin: 18px 0 10px;
        }

        .arcade-ticket-card p,
        .arcade-ticket-card li {
          font-size: 1rem;
          line-height: 1.55;
        }

        .arcade-ticket-card--wide {
          grid-column: span 1;
        }

        .arcade-ticket-card--idea {
          display: grid;
          align-content: start;
          justify-items: center;
          text-align: center;
        }

        .arcade-idea-console {
          position: relative;
          border: 0;
          background: url("${arcadeAsset("arcade_bg.png")}") center/contain no-repeat;
          cursor: pointer;
          margin-top: 20px;
          padding: 140px 0 80px;
          width: 100%;
          color: #5e3414;
        }

        .arcade-idea-console img {
          display: block;
          width: auto;
          height: 8em;
          margin: 0 auto;
        }

        .arcade-thought-bubble {
          position: absolute;
          left: 50%;
          top: 44px;
          transform: translateX(-50%);
          width: min(180px, 75%);
          min-height: 100px;
          border-radius: 30px;
          background: #f8f3f3;
          color: #35290f;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .arcade-r5 {
          position: absolute;
          top: 0;
          right: 10px;
          width: 210px;
          height: auto;
        }

        .arcade-yellow-zig {
          bottom: -10vw;
          z-index: 3;
        }

        .arcade-prizes-section {
          position: relative;
          background: url("${arcadeAsset("brown_bg.svg")}") center / cover no-repeat;
          color: #5e3414;
          padding: 20vw 0 0;
        }

        .arcade-o5,
        .arcade-o6,
        .arcade-r6 {
          position: absolute;
          height: auto;
          pointer-events: none;
        }

        .arcade-o5 {
          right: 10px;
          top: 40px;
          width: min(60vw, 310px);
        }

        .arcade-o6 {
          left: 10px;
          top: 70px;
          width: min(40vw, 210px);
        }

        .arcade-prizes-shell {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .arcade-prizes-title {
          margin: 0;
          font-size: clamp(2.1rem, 4vw, 3.8rem);
        }

        .arcade-prizes-title span {
          background: #ff8c37;
          color: #ffeec6;
          transform: rotate(-5deg);
        }

        .arcade-prize-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 42px;
          padding-top: 50px;
        }

        .arcade-prize-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-radius: 10px;
          background: #09afb4;
          padding: 20px;
          transform: rotate(-2deg);
          transition: transform 0.25s ease;
        }

        .arcade-prize-limited {
          position: absolute;
          top: -15px;
          left: -12px;
          z-index: 1;
          background: #cc6ce7;
          color: #ffeec6;
          padding: 6px 14px;
          font-family: "Gaegu", cursive;
          font-size: 1.25rem;
          transform: rotate(-12deg);
        }

        .arcade-prize-card:nth-child(even) {
          transform: rotate(2deg);
        }

        .arcade-prize-card:hover {
          transform: scale(1.06) rotate(0deg);
        }

        .arcade-prize-image-shell {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 250px;
          background: #ffeec6;
        }

        .arcade-prize-image {
          width: 100%;
          max-height: 250px;
          object-fit: contain;
        }

        .arcade-prize-copy {
          text-align: left;
          color: #ffeec6;
        }

        .arcade-prize-copy h3 {
          margin: 0;
          font-family: "Slackey", cursive;
          font-size: 1.5rem;
        }

        .arcade-prize-copy p {
          margin: 10px 0 0;
          font-size: 1rem;
        }

        .arcade-prize-ticket,
        .arcade-dialog-ticket {
          position: absolute;
          top: -12px;
          right: -12px;
          background: #ff8c37;
          color: #ffeec6;
          padding: 6px 16px;
          font-family: "Gaegu", cursive;
          font-size: 1.5rem;
          transform: rotate(12deg);
        }

        .arcade-prize-info {
          position: absolute;
          right: -10px;
          bottom: -24px;
          border: 0;
          background: transparent;
          color: #ffeec6;
          font-size: 2rem;
          cursor: pointer;
        }

        .arcade-shop-link {
          display: inline-block;
          margin-top: 32px;
          border-radius: 5px;
          background: #ff8c37;
          color: #faefd6;
          padding: 15px 20px;
          text-decoration: none;
          font-family: "Slackey", cursive;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
        }

        .arcade-faq-wrap {
          position: relative;
          margin-top: 88px;
          padding: 90px 0 100px;
          background: #09afb4;
          color: #faefd6;
        }

        .arcade-blue-top-png {
          top: -8vw;
        }

        .arcade-faq-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 50px;
        }

        .arcade-close-line {
          width: min(70vw, 840px);
          margin: 50px 0 -20px 10vw;
          line-height: 1.4;
          color: #faefd6;
        }

        .arcade-r6 {
          right: 20px;
          bottom: 0;
          width: min(50vw, 210px);
        }

        .arcade-dialog-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          background: rgba(0, 0, 0, 0.45);
          padding: 24px;
        }

        .arcade-dialog {
          position: relative;
          width: min(420px, 100%);
          border: 0;
          border-radius: 10px;
          background: #09afb4;
          color: #ffeec6;
          padding: 30px;
        }

        .arcade-dialog-close {
          position: absolute;
          top: 10px;
          right: 12px;
          border: 0;
          background: transparent;
          color: inherit;
          font-size: 2rem;
          cursor: pointer;
        }

        .arcade-dialog-image {
          width: 100%;
          max-height: 250px;
          object-fit: contain;
        }

        .arcade-dialog h3 {
          margin: 14px 0 6px;
          font-family: "Slackey", cursive;
          font-size: 1.5rem;
        }

        .arcade-dialog-subtitle {
          margin: 0 0 12px;
          font-style: italic;
        }

        .arcade-dialog-copy {
          margin: 0;
          line-height: 1.45;
        }

        @keyframes arcade-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes arcade-float {
          from,
          to {
            transform: translate(0%, -2%) rotate(-2deg);
          }
          25% {
            transform: translate(-2%, -5%) rotate(2deg);
          }
          50% {
            transform: translate(0%, -8%) rotate(-1deg);
          }
          75% {
            transform: translate(-1%, -5%) rotate(-1deg);
          }
        }

        @media (min-width: 900px) {
          .arcade-arrow {
            display: block;
          }
        }

        @media (max-width: 960px) {
          .arcade-hero-grid,
          .arcade-intro-row,
          .arcade-ticket-grid,
          .arcade-prize-grid,
          .arcade-project-grid,
          .arcade-faq-grid {
            grid-template-columns: 1fr;
          }

          .arcade-combo-mark,
          .arcade-hero-copy,
          .arcade-hero-note,
          .arcade-title-copy {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          .arcade-hero {
            min-height: auto;
            padding: 126px 0 120px;
          }

          .arcade-hero-grid {
            padding-top: 0;
          }

          .arcade-hero-copy {
            padding-top: 0;
          }

          .arcade-prizes-hero {
            margin: 24px auto 0;
          }

          .arcade-carousel {
            margin-top: 28px;
            padding-bottom: 32px;
          }

          .arcade-blue-section .arcade-shell {
            padding-top: 18vw;
          }

          .arcade-sticker-section {
            padding-top: 16vw;
          }

          .arcade-sticker-pop {
            left: 8px;
            top: -220px;
          }

          .arcade-r5,
          .arcade-o5,
          .arcade-o6,
          .arcade-r6 {
            display: none;
          }

          .arcade-faq-wrap {
            padding-bottom: 140px;
          }

          .arcade-close-line {
            width: 100%;
            margin: 50px 0 0;
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .arcade-shell {
            width: min(100vw - 24px, 1200px);
          }

          .arcade-intro-card p {
            font-size: 0.95rem;
          }

          .arcade-intro-card,
          .arcade-faq-card {
            padding: 18px 104px 18px 18px;
            min-height: 132px;
          }

          .arcade-intro-figure {
            width: min(32%, 118px);
            right: 6px;
          }

          .arcade-title-copy {
            font-size: clamp(2.7rem, 12vw, 4rem);
          }

          .arcade-carousel {
            margin-top: 50px;
          }

          .arcade-blue-section .arcade-shell {
            padding-top: 0;
          }

          .arcade-sticker-section {
            padding-top: 22vw;
          }

          .arcade-ticket-card--wide {
            min-height: auto;
          }
        }
      `}</style>
    </main>
  );
}
