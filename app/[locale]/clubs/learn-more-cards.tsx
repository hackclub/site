"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { BtnArrowSvg } from "@/components/landing/btn-arrow";
import { IMAGES, STICKERS, shuffle } from "./random-media";

type Styles = Record<string, string>;
type ModalKind = "new" | "convert" | null;
type Decor = { photos: string[]; stickers: string[] };
type Faq = { q: string; a: ReactNode };

const applyLink = (chunks: ReactNode) => (
  <a href="https://apply.hackclub.com" target="_blank" rel="noreferrer">
    {chunks}
  </a>
);

const shopLink = (chunks: ReactNode) => (
  <a href="https://clubs.hackclub.com/shop" target="_blank" rel="noreferrer">
    {chunks}
  </a>
);

const NEW_FAQS = [
  "whatIs",
  "experience",
  "ages",
  "inPerson",
  "teacher",
  "multiple",
  "activities",
  "support",
  "coLeaders",
] as const;

const CONVERT_FAQS = ["sameClub", "programs", "requirements", "dormant", "benefits"] as const;

const content = {
  new: { bg: "/assets/backImg2.webp" },
  convert: { bg: "/assets/backImg6.webp" },
} as const;

function useFaqs(kind: Exclude<ModalKind, null>): Faq[] {
  const t = useTranslations("Clubs");
  const links = { apply: applyLink, shop: shopLink };

  if (kind === "convert") {
    return CONVERT_FAQS.map((id) => ({
      q: t(`convertFaqs.${id}.q`),
      a: t.rich(`convertFaqs.${id}.a`, links),
    }));
  }

  return [
    ...NEW_FAQS.map((id) => ({
      q: t(`newFaqs.${id}.q`),
      a: t.rich(`newFaqs.${id}.a`, links),
    })),
    {
      q: t("newFaqs.steps.q"),
      a: (
        <ol>
          <li>{t.rich("newFaqs.steps.step1", links)}</li>
          <li>{t("newFaqs.steps.step2")}</li>
          <li>{t("newFaqs.steps.step3")}</li>
        </ol>
      ),
    },
  ];
}

function FaqList({ kind, styles }: { kind: Exclude<ModalKind, null>; styles: Styles }) {
  const faqs = useFaqs(kind);
  return (
    <>
      {faqs.map((faq, index) => (
        <FaqItem key={faq.q} faq={faq} index={index} styles={styles} />
      ))}
    </>
  );
}

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
  const t = useTranslations("Clubs");
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
              <h3 className={styles["clubs-joining-card-title"]}>{t(`${kind}Title`)}</h3>
              <p className={styles["clubs-joining-card-body"]}>{t(`${kind}Body`)}</p>
              <span className={`${styles["clubs-joining-card-link"]} cta-btn`}>
                {t("learnMore")} <Arrow />
              </span>
            </div>
          </button>
        );
      })}

      {open &&
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
                src={content[open].bg}
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
                aria-label={t("close")}
              >
                ×
              </button>
              <h3 id="clubs-modal-title" className={styles["clubs-modal-title"]}>
                {t(`${open}ModalTitle`)}
              </h3>

              <div className={styles["clubs-modal-faqs"]}>
                <FaqList kind={open} styles={styles} />
              </div>

              <a
                href="https://apply.hackclub.com"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-modal-cta"]} cta-btn`}
              >
                {t("applyCta")} <Arrow />
              </a>
            </dialog>
          </div>,
          document.body,
        )}
    </>
  );
}
