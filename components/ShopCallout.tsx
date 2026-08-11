import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const SHOP_URL = "https://shop.hackclub.com/";

const MERCH_COLUMNS = [
  [
    "/assets/shop/shop-hoodie.webp",
    "/assets/shop/shop-mug.webp",
    "/assets/shop/shop-tote.webp",
    "/assets/shop/shop-tee.webp",
  ],
  [
    "/assets/shop/shop-vest.webp",
    "/assets/shop/shop-sticker.webp",
    "/assets/shop/shop-mom-sweatshirt.webp",
    "/assets/shop/shop-hoodie.webp",
  ],
];

const red = (chunks: ReactNode) => <span className="shop-callout__accent">{chunks}</span>;

type Props = {
  campaign: string;
};

export async function ShopCallout({ campaign }: Props) {
  const t = await getTranslations("Shop");
  const href = `${SHOP_URL}?utm_source=site&utm_medium=internal&utm_campaign=${campaign}&utm_content=shop_callout`;

  return (
    <aside className="shop-callout">
      <div className="shop-callout__copy">
        <Image
          className="shop-callout__wordmark shop-callout__wordmark--light"
          src="/assets/shop/shop-wordmark.webp"
          alt={t("wordmarkAlt")}
          width={936}
          height={306}
        />
        <Image
          className="shop-callout__wordmark shop-callout__wordmark--dark"
          src="/assets/shop/shop-wordmark-white.webp"
          alt=""
          aria-hidden="true"
          width={936}
          height={306}
        />
        <h2>{t.rich("title", { red })}</h2>
        <p>{t("body")}</p>
        <a className="shop-callout__cta" href={href} target="_blank" rel="noopener noreferrer">
          {t("cta")}
        </a>
        <p className="shop-callout__caption">{t("caption")}</p>
      </div>

      <div className="shop-callout__marquee" aria-hidden="true">
        {MERCH_COLUMNS.map((column, index) => (
          <div key={index} className="shop-callout__column">
            <div className="shop-callout__track">
              {[...column, ...column].map((src, i) => (
                <div key={`${src}-${i}`} className="shop-callout__tile">
                  <Image src={src} alt="" fill sizes="180px" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .shop-callout {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(240px, 30vw, 336px);
          gap: 36px;
          align-items: center;
          border-radius: 28px;
          padding: 34px 36px;
          background:
            radial-gradient(circle at 100% 0%, rgba(255, 140, 55, 0.16), transparent 46%),
            radial-gradient(circle at 0% 100%, rgba(236, 55, 80, 0.12), transparent 48%),
            var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.12);
        }

        .shop-callout__wordmark {
          width: auto;
          height: clamp(34px, 4.4vw, 46px);
          margin-bottom: 18px;
        }

        .shop-callout__wordmark--dark {
          display: none;
        }

        html.dark .shop-callout__wordmark--light {
          display: none;
        }

        html.dark .shop-callout__wordmark--dark {
          display: block;
        }

        .shop-callout h2 {
          margin: 0 0 14px;
          font-family: var(--font-zarathustra);
          font-weight: 700;
          font-size: clamp(1.85rem, 3.4vw, 2.7rem);
          line-height: 1.05;
          color: var(--foreground);
        }

        .shop-callout__accent {
          color: var(--red);
        }

        .shop-callout p {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--muted);
        }

        .shop-callout__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 22px 0 12px;
          padding: 12px 24px;
          border-radius: 999px;
          background: var(--red);
          color: #ffffff;
          font-family: var(--font-phantom);
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 14px 30px rgba(236, 55, 80, 0.3);
          transition: transform 0.15s ease;
        }

        .shop-callout__cta:hover {
          transform: translateY(-2px);
        }

        .shop-callout__caption {
          font-size: 0.92rem;
        }

        .shop-callout__marquee {
          display: flex;
          gap: 14px;
          height: clamp(250px, 28vw, 330px);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(180deg, transparent, #000 14%, #000 86%, transparent);
          mask-image: linear-gradient(180deg, transparent, #000 14%, #000 86%, transparent);
        }

        .shop-callout__column {
          flex: 1;
          min-width: 0;
        }

        .shop-callout__track {
          animation: shop-callout-scroll 34s linear infinite;
        }

        .shop-callout__column:nth-child(2) .shop-callout__track {
          animation-direction: reverse;
        }

        .shop-callout__marquee:hover .shop-callout__track {
          animation-play-state: paused;
        }

        .shop-callout__tile {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          margin-bottom: 14px;
          border-radius: 18px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.12);
        }

        .shop-callout__tile img {
          object-fit: cover;
        }

        @keyframes shop-callout-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(0, -50%, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shop-callout__track {
            animation: none;
          }
        }

        @media (max-width: 900px) {
          .shop-callout {
            grid-template-columns: 1fr;
            gap: 26px;
          }

          .shop-callout__marquee {
            height: 240px;
          }
        }

        @media (max-width: 767px) {
          .shop-callout {
            padding: 26px 22px;
          }

          .shop-callout__cta {
            width: 100%;
          }
        }
      `}</style>
    </aside>
  );
}
