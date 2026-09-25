"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { ReactNode } from "react";
import { BtnArrowSvg } from "@/components/landing/btn-arrow";
import { IMAGES, STICKERS, shuffle } from "./random-media";

type Styles = Record<string, string>;
type ModalKind = "new" | "convert" | null;
type Decor = { photos: string[]; stickers: string[] };
type Faq = { q: string; a: ReactNode };

const ApplyLink = () => (
  <a href="https://apply.hackclub.com" target="_blank" rel="noreferrer">
    apply.hackclub.com
  </a>
);

const ShopLink = () => (
  <a href="https://clubs.hackclub.com" target="_blank" rel="noreferrer">
    clubs.hackclub.com
  </a>
);

const newFaqs: Faq[] = [
  {
    q: "What is Hack Club?",
    a: "A global nonprofit network of student-led coding clubs! Your club can be a place to code, build hardware, learn together, or experiment, whatever your members want.",
  },
  {
    q: "Do I need to be an experienced programmer to start one?",
    a: "Nope! Start with what you know and learn alongside your members as you go.",
  },
  {
    q: "Who can join, and is there an age requirement?",
    a: "Members must be 13–18 and able to attend your in-person meetings; they don't need to attend your school, so feel free to invite friends from anywhere nearby!",
  },
  {
    q: "Do meetings have to be in person?",
    a: "Yes, that's the main format. Online meetings can supplement it, but your club needs an established space (classroom, library, makerspace, cafe, etc.) for in-person meetings.",
  },
  {
    q: "Do I need a teacher to start a Hack Club?",
    a: "Not required by Hack Club, but recommended! Many schools require an adult supervisor for approval, and one can help with logistics like booking a room.",
  },
  {
    q: "Can there be multiple Hack Clubs at my school?",
    a: "Yes, if your school can support them without clubs competing for the same members or resources!",
  },
  {
    q: "What can my Hack Club do?",
    a: "Anything your members are excited about: workshops, projects, hackathons, hardware, you name it! You're not required to follow Hack Club's official programs (YSWS); other activities can often still count toward funding if real projects are being shipped.",
  },
  {
    q: "What support does Hack Club provide?",
    a: (
      <>
        A lot! Funding, hardware, ready-to-run workshops, stickers/posters, and support from the
        Clubs team. Ships earn coins on <ShopLink />, redeemable in the shop for grants, gear, and
        merch. In return, we ask members to build and ship projects.
      </>
    ),
  },
  {
    q: "Can I add co-leaders?",
    a: "Yes! The main leader can promote any member to co-leader from the members page.",
  },
  {
    q: "What are the steps to start a club?",
    a: (
      <ol>
        <li>
          Apply at <ApplyLink /> (~10 min).
        </li>
        <li>Get school approval.</li>
        <li>Run your first meeting and ship something!</li>
      </ol>
    ),
  },
];

const convertFaqs: Faq[] = [
  {
    q: "If I convert my existing club into a Hack Club, do we have to do anything differently?",
    a: "Nope! Keep your current name, members, and schedule while getting access to Hack Club's resources.",
  },
  {
    q: "Do we have to only participate in Hack Club's programs?",
    a: "No. Programs are optional; run your own workshops, hackathons, or other activities, whatever gets your members excited!",
  },
  {
    q: "What are the requirements to stay an active club?",
    a: "Ship at least one project every 6 months (by any leader or member), with meetings that are mainly in-person. That's it!",
  },
  {
    q: "What happens if my club doesn't ship for 6 months?",
    a: (
      <>
        The club gets marked dormant (you may see 0 members/ships even if your roster is fine). No
        worries though, just head to <ApplyLink /> and use the option to
        reconnect/&quot;rescue&quot; your existing club rather than starting over.
      </>
    ),
  },
  {
    q: "What are the benefits of becoming a Hack Club?",
    a: (
      <>
        Access to Hack Club&apos;s community, workshops, funding tools, hardware perks, and coins
        from shipped projects, redeemable in the <ShopLink />! The only ongoing requirement: ship
        every 6 months, meet mainly in-person.
      </>
    ),
  },
];

const content = {
  new: {
    title: "Starting a new club",
    description: "Start a new Hack Club!",
    modalTitle: "Starting a Hack Club",
    bg: "/assets/backImg2.webp",
    faqs: newFaqs,
  },
  convert: {
    title: "Converting an existing club",
    description: "Turn your existing club into a Hack Club!",
    modalTitle: "Converting an existing club",
    bg: "/assets/backImg6.webp",
    faqs: convertFaqs,
  },
} as const;

const Arrow = () => (
  <span className="btn-arrow" aria-hidden="true">
    <BtnArrowSvg />
  </span>
);

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FaqItem({ faq, index, styles }: { faq: Faq; index: number; styles: Styles }) {
  return (
    <details
      className={styles["clubs-modal-faq"]}
      style={{ animationDelay: `${Math.min(index, 10) * 0.035}s` }}
    >
      <summary className={styles["clubs-modal-faq-summary"]}>
        <span>{faq.q}</span>
        <span className={styles["clubs-modal-faq-icon"]}>
          <ChevronIcon />
        </span>
      </summary>
      <div className={styles["clubs-modal-faq-content"]}>
        <div className={styles["clubs-modal-faq-answer"]}>{faq.a}</div>
      </div>
    </details>
  );
}

const noopSubscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

export function LearnMoreCards({ styles }: { styles: Styles }) {
  const [open, setOpen] = useState<ModalKind>(null);
  const mounted = useIsMounted();
  const decor = useMemo<Decor>(() => {
    if (!open) return { photos: [], stickers: [] };
    return {
      photos: shuffle(IMAGES).slice(0, 2),
      stickers: shuffle(STICKERS).slice(0, 2),
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  const modal = open ? content[open] : null;

  return (
    <>
      {(["new", "convert"] as const).map((kind) => {
        const card = content[kind];
        return (
          <button
            key={kind}
            type="button"
            className={styles["clubs-joining-card"]}
            onClick={() => setOpen(kind)}
          >
            <Image
              src={card.bg}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles["clubs-joining-card-bg"]}
            />
            <div className={styles["clubs-joining-card-overlay"]} />
            <div className={styles["clubs-joining-card-content"]}>
              <h3 className={styles["clubs-joining-card-title"]}>{card.title}</h3>
              <p className={styles["clubs-joining-card-body"]}>{card.description}</p>
              <span className={`${styles["clubs-joining-card-link"]} cta-btn`}>
                Learn more <Arrow />
              </span>
            </div>
          </button>
        );
      })}

      {modal &&
        mounted &&
        createPortal(
          <div
            className={styles["clubs-modal-backdrop"]}
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(null);
            }}
          >
            {decor.photos[0] && (
              <div
                className={`${styles["clubs-modal-decor-photo"]} ${styles["clubs-modal-decor-photo-left"]}`}
                aria-hidden="true"
              >
                <Image src={decor.photos[0]} alt="" fill sizes="190px" />
              </div>
            )}
            {decor.photos[1] && (
              <div
                className={`${styles["clubs-modal-decor-photo"]} ${styles["clubs-modal-decor-photo-right"]}`}
                aria-hidden="true"
              >
                <Image src={decor.photos[1]} alt="" fill sizes="190px" />
              </div>
            )}
            {decor.stickers[0] && (
              <div
                className={`${styles["clubs-modal-decor-sticker"]} ${styles["clubs-modal-decor-sticker-left"]}`}
                aria-hidden="true"
              >
                <Image src={decor.stickers[0]} alt="" fill sizes="110px" />
              </div>
            )}
            {decor.stickers[1] && (
              <div
                className={`${styles["clubs-modal-decor-sticker"]} ${styles["clubs-modal-decor-sticker-right"]}`}
                aria-hidden="true"
              >
                <Image src={decor.stickers[1]} alt="" fill sizes="110px" />
              </div>
            )}
            <dialog
              open
              className={styles["clubs-modal"]}
              aria-modal="true"
              aria-labelledby="clubs-modal-title"
            >
              <Image
                src={modal.bg}
                alt=""
                fill
                sizes="620px"
                className={styles["clubs-modal-photo"]}
              />
              <div className={styles["clubs-modal-photo-overlay"]} />
              <button
                type="button"
                className={styles["clubs-modal-close"]}
                onClick={() => setOpen(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 id="clubs-modal-title" className={styles["clubs-modal-title"]}>
                {modal.modalTitle}
              </h3>

              <div className={styles["clubs-modal-faqs"]}>
                {modal.faqs.map((faq, index) => (
                  <FaqItem key={faq.q} faq={faq} index={index} styles={styles} />
                ))}
              </div>

              <a
                href="https://apply.hackclub.com"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-modal-cta"]} cta-btn`}
              >
                Apply to Hack Club <Arrow />
              </a>
            </dialog>
          </div>,
          document.body,
        )}
    </>
  );
}
