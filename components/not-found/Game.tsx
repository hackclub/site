"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "../Navbar";

type Phase = "idle" | "intro" | "playing" | "lost";
type Sticker = {
  id: number;
  src: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  rot: number;
  spin: number;
};

const srcs = Array.from({ length: 10 }, (_, i) => `/assets/hero_sticker${i + 1}.webp`);

const roundArm = 3;
const stickerCount = 10;
const shipRatio = 1218 / 1356;
const shipH = 148;
const shipW = Math.round(shipH * shipRatio);
const shipRight = 88;
const shipPad = 14;
const fieldPad = 28;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const fmt = (ms: number) => Math.floor(ms / 10).toLocaleString();

function rnd(seed: number) {
  const next = (seed * 1664525 + 1013904223) % 4294967296;
  return [next / 4294967296, next] as const;
}

function makeSticker(seed: number, id: number, w: number, h: number, gap = 0) {
  let s = seed;
  const r = () => {
    const [v, n] = rnd(s);
    s = n;
    return v;
  };
  const size = Math.round(54 + r() * 52);
  const maxY = Math.max(fieldPad, h - fieldPad - size);

  return {
    sticker: {
      id,
      src: srcs[Math.floor(r() * srcs.length)],
      x: -size - gap - r() * (w * 0.65),
      y: Math.round(fieldPad + r() * (maxY - fieldPad)),
      size,
      speed: 220 + r() * 170,
      rot: r() * 360,
      spin: -140 + r() * 280,
    } satisfies Sticker,
    seed: s,
  };
}

function makeBatch(seed: number, count: number, w: number, h: number) {
  let s = seed;
  const out: Sticker[] = [];
  for (let i = 0; i < count; i += 1) {
    const n = makeSticker(s, i, w, h, i * 120);
    out.push(n.sticker);
    s = n.seed;
  }
  return { stickers: out, seed: s };
}

const title = (p: Phase) => (p === "lost" ? "Sled destroyed" : "");

const body = (p: Phase, s: number) =>
  p === "intro"
    ? "Pilot the sled on the right. Move up and down with your mouse, finger, or arrow keys. Survive as long as you can without crashing into a sticker!"
    : p === "lost"
      ? `Score: ${fmt(s)}. Better luck next time!`
      : "";

export function Game() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [arming, setArming] = useState(0);
  const [shipY, setShipY] = useState(0);
  const [score, setScore] = useState(0);
  const [stickers, setStickers] = useState<Sticker[]>([]);

  const open = phase !== "idle";
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0 });
  const seedRef = useRef(505505);
  const stickersRef = useRef<Sticker[]>([]);
  const shipYRef = useRef(0);
  const shipTargetRef = useRef(0);
  const phaseRef = useRef<Phase>("idle");

  const syncStickers = (n: Sticker[]) => {
    stickersRef.current = n;
    setStickers(n);
  };
  const syncShip = (n: number) => {
    shipYRef.current = n;
    setShipY(n);
  };

  const measure = () => {
    const r = fieldRef.current?.getBoundingClientRect();
    sizeRef.current = {
      width: r?.width ?? window.innerWidth,
      height: r?.height ?? window.innerHeight,
    };
  };

  const respawn = (id: number) => {
    const { width: w, height: h } = sizeRef.current;
    const n = makeSticker(seedRef.current, id, w, h);
    seedRef.current = n.seed;
    return n.sticker;
  };

  const setShipTarget = (v: number) => {
    shipTargetRef.current = clamp(
      v,
      fieldPad,
      Math.max(fieldPad, sizeRef.current.height - fieldPad - shipH),
    );
  };

  const close = useCallback(() => {
    stickersRef.current = [];
    setStickers([]);
    scoreRef.current = 0;
    setPhase("idle");
    setArming(0);
    setScore(0);
  }, []);

  const intro = () => {
    syncStickers([]);
    scoreRef.current = 0;
    setArming(0);
    setScore(0);
    setPhase("intro");
  };

  const start = () => {
    measure();
    const { width: w, height: h } = sizeRef.current;
    const b = makeBatch(seedRef.current, stickerCount, w, h);
    seedRef.current = b.seed;
    scoreRef.current = 0;
    lastRef.current = null;
    syncStickers(b.stickers);
    const y = Math.max(fieldPad, (h - shipH) / 2);
    setShipTarget(y);
    syncShip(y);
    setScore(0);
    setPhase("playing");
  };

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (phase !== "idle" || arming === 0) return undefined;
    const t = window.setTimeout(() => setArming(0), 1800);
    return () => window.clearTimeout(t);
  }, [arming, phase]);

  useEffect(() => {
    if (!open) return undefined;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    measure();

    const onResize = () => {
      measure();
      setShipTarget(shipTargetRef.current);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }

      if (phaseRef.current !== "playing") return;
      const dir = /^(ArrowUp|w)$/i.test(e.key) ? -1 : /^(ArrowDown|s)$/i.test(e.key) ? 1 : 0;
      if (dir) {
        e.preventDefault();
        setShipTarget(shipTargetRef.current + dir * 72);
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [close, open]);

  useEffect(() => {
    if (phase !== "playing") {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
      return undefined;
    }

    const tick = (now: number) => {
      if (lastRef.current === null) {
        lastRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min((now - lastRef.current) / 1000, 0.032);
      lastRef.current = now;
      scoreRef.current += dt * 1000;

      const ship =
        shipYRef.current + (shipTargetRef.current - shipYRef.current) * Math.min(1, dt * 10);
      shipYRef.current = ship;

      const boost = 1 + Math.min(2.5, scoreRef.current / 10000);
      const left = sizeRef.current.width - shipRight - shipW + shipPad;
      const right = sizeRef.current.width - shipRight - shipPad;
      const top = ship + shipPad;
      const bottom = ship + shipH - shipPad;

      let dead = false;

      const next = stickersRef.current.map((sticker) => {
        let s = {
          ...sticker,
          x: sticker.x + sticker.speed * boost * dt,
          rot: sticker.rot + sticker.spin * dt,
        };

        if (s.x > sizeRef.current.width + s.size + 36) s = respawn(sticker.id);

        const sx1 = s.x + 10;
        const sx2 = s.x + s.size - 10;
        const sy1 = s.y + 10;
        const sy2 = s.y + s.size - 10;

        if (sx2 >= left && sx1 <= right && sy2 >= top && sy1 <= bottom) dead = true;

        return s;
      });

      syncStickers(next);
      syncShip(ship);
      setScore(scoreRef.current);

      if (dead) {
        setPhase("lost");
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [phase]);

  const onTrigger = () => {
    if (open) return;
    if (arming + 1 >= roundArm) {
      intro();
      return;
    }
    setArming(arming + 1);
  };

  const onPointer = (clientY: number) => {
    if (phase !== "playing") return;
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    setShipTarget(clientY - rect.top - shipH / 2);
  };

  return (
    <>
      <h1
        style={{
          position: "relative",
          margin: 0,
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
          fontWeight: 400,
          fontFamily: "var(--font-zarathustra)",
          fontSize: "clamp(64px, 16vw, 172px)",
          color: "var(--foreground)",
        }}
      >
        <button
          type="button"
          className="glitch-trigger"
          onClick={onTrigger}
          aria-label="Tap the 404 three times to open Sticker Run"
        >
          <span className="glitch-layer base">404</span>
          <span className="glitch-layer cyan" aria-hidden="true">
            404
          </span>
          <span className="glitch-layer red" aria-hidden="true">
            404
          </span>
        </button>
      </h1>

      {arming > 0 ? (
        <div className="arming-strip" aria-hidden="true">
          {Array.from({ length: 3 }, (_, index) => (
            <span
              key={index}
              className={index < arming ? "arming-dot active" : "arming-dot"}
              style={{ animationDelay: `${index * 70}ms` }}
            />
          ))}
        </div>
      ) : null}

      {open ? (
        <dialog
          open
          className="game-overlay"
          aria-modal="true"
          aria-labelledby="sticker-game-title"
        >
          <Navbar />
          <div className="game-overlay__wash" aria-hidden="true" />

          <div
            ref={fieldRef}
            className={`game-overlay__field${phase === "playing" ? " is-live" : ""}`}
            onPointerMove={(e) => onPointer(e.clientY)}
            onPointerDown={(e) => onPointer(e.clientY)}
          >
            <div className="game-lane game-lane--top" aria-hidden="true" />
            <div className="game-lane game-lane--mid" aria-hidden="true" />
            <div className="game-lane game-lane--bottom" aria-hidden="true" />

            {stickers.map((s) => (
              <div
                key={s.id}
                className="game-sticker"
                style={{
                  transform: `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rot}deg)`,
                  width: s.size,
                  height: s.size,
                }}
              >
                <Image src={s.src} alt="" width={s.size} height={s.size} className="game-image" />
              </div>
            ))}

            <div
              className={`game-ship${phase === "lost" ? " is-dead" : ""}`}
              style={{ transform: `translate3d(0, ${shipY}px, 0)` }}
              aria-hidden="true"
            >
              <div className="game-ship__trail" />
              <Image
                src="/assets/hero_sticker11.webp"
                alt=""
                width={1218}
                height={1356}
                className="game-ship__image"
              />
            </div>
          </div>

          <div className="game-overlay__hud">
            <div className="game-chip">Score {fmt(score)}</div>
            <button type="button" className="game-exit" onClick={close}>
              Exit
            </button>
          </div>

          <div className={`game-overlay__panel game-overlay__panel--${phase}`}>
            <h2 id="sticker-game-title">{title(phase)}</h2>
            <p>{body(phase, score)}</p>

            {(phase === "intro" || phase === "lost") && (
              <div className="game-actions">
                <button type="button" className="game-primary" onClick={start}>
                  {phase === "intro" ? "Start run" : "Play again"}
                </button>
              </div>
            )}
          </div>

          <style>{`
            .game-overlay {
              position: fixed;
              inset: 0;
              width: 100%;
              max-width: none;
              height: 100%;
              max-height: none;
              margin: 0;
              padding: 0;
              border: 0;
              z-index: 2000;
              overflow: hidden;
              color: inherit;
              background:
                radial-gradient(circle at 18% 18%, rgba(91, 192, 222, 0.16), transparent 30%),
                radial-gradient(circle at 86% 16%, rgba(255, 206, 107, 0.22), transparent 24%),
                linear-gradient(180deg, #fff8ef 0%, #ffe8dc 100%);
              animation: overlay-enter 260ms cubic-bezier(0.22, 1, 0.36, 1);
            }

            html.dark .game-overlay {
              background:
                radial-gradient(circle at 18% 18%, rgba(91, 192, 222, 0.12), transparent 30%),
                radial-gradient(circle at 86% 16%, rgba(255, 206, 107, 0.14), transparent 24%),
                linear-gradient(180deg, #1d1a18 0%, #21160f 100%);
            }

            .game-overlay__wash {
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at center, rgba(236, 55, 80, 0.06), transparent 40%);
              pointer-events: none;
            }

            .game-overlay__field {
              position: absolute;
              inset: 0;
              overflow: hidden;
              cursor: default;
            }

            .game-overlay__field.is-live {
              cursor: none;
            }

            .game-lane {
              position: absolute;
              left: -10%;
              right: 22%;
              height: 1px;
              border-top: 1px dashed var(--border);
              opacity: 0.8;
              animation: lane-drift 1.4s linear infinite;
            }

            .game-lane--top { top: 28%; }
            .game-lane--mid { top: 50%; }
            .game-lane--bottom { top: 72%; }

            .game-sticker {
              position: absolute;
              left: 0;
              top: 0;
              will-change: transform;
              filter: drop-shadow(0 12px 22px rgba(0, 0, 0, 0.28));
            }

            .game-image {
              display: block;
              width: 100%;
              height: auto;
              animation: bob 2.8s ease-in-out infinite alternate;
            }

            .game-ship {
              position: absolute;
              right: ${shipRight}px;
              top: 0;
              width: ${shipW}px;
              height: ${shipH}px;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              pointer-events: none;
              will-change: transform;
            }

            .game-ship.is-dead {
              filter: saturate(0.3) brightness(0.86);
            }

            .game-ship__trail {
              position: absolute;
              right: -18px;
              top: 50%;
              width: 52px;
              height: 18px;
              border-radius: 999px;
              background: linear-gradient(90deg, rgba(91, 192, 222, 0.6), rgba(91, 192, 222, 0.05));
              filter: blur(4px);
              transform: translateY(-50%);
              animation: thruster 240ms ease-in-out infinite alternate;
              z-index: 0;
            }

            .game-ship__image {
              position: relative;
              z-index: 1;
              display: block;
              width: 100%;
              height: auto;
              filter: drop-shadow(0 10px 20px rgba(23, 23, 29, 0.22));
            }

            .game-overlay__hud {
              position: absolute;
              top: 94px;
              left: 22px;
              right: 22px;
              z-index: 3;
              display: flex;
              align-items: center;
              gap: 10px;
              flex-wrap: wrap;
              animation: panel-enter 320ms 60ms cubic-bezier(0.22, 1, 0.36, 1) both;
            }

            .game-chip,
            .game-exit {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-height: 42px;
              padding: 0 16px;
              border-radius: 999px;
              border: 1px solid var(--border);
              background: var(--nav-bg);
              backdrop-filter: blur(12px);
              color: var(--foreground);
              font-family: var(--font-phantom);
              font-size: 14px;
              line-height: 1;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .game-exit {
              margin-left: auto;
              cursor: pointer;
              transition: background-color 160ms ease, border-color 160ms ease;
            }

            .game-exit:hover {
              background: rgba(236, 55, 80, 0.14);
              border-color: rgba(236, 55, 80, 0.28);
            }

            .game-overlay__panel {
              position: absolute;
              left: 24px;
              bottom: 24px;
              z-index: 3;
              max-width: 440px;
              padding: 18px 18px 16px;
              border-radius: 24px;
              background: var(--nav-bg);
              border: 1px solid var(--border);
              box-shadow: var(--shadow-dd);
              backdrop-filter: blur(20px);
              animation: panel-enter 320ms 80ms cubic-bezier(0.22, 1, 0.36, 1) both;
            }

            .game-overlay__panel--playing {
              max-width: 300px;
              padding: 14px 14px 12px;
            }

            .game-overlay__panel h2 {
              margin: 0;
              font-family: var(--font-zarathustra);
              font-size: clamp(34px, 7vw, 56px);
              line-height: 0.92;
              font-weight: 400;
              color: var(--foreground);
            }

            .game-overlay__panel p {
              margin: 10px 0 0;
              max-width: 28ch;
              font-family: var(--font-phantom);
              font-size: clamp(15px, 1.8vw, 19px);
              line-height: 1.3;
              color: var(--muted);
            }

            .game-actions {
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
              margin-top: 16px;
            }

            .game-primary,
            .game-secondary {
              min-height: 48px;
              padding: 0 18px;
              border-radius: 999px;
              font-family: var(--font-phantom);
              font-size: 18px;
              line-height: 1;
              cursor: pointer;
              transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
            }

            .game-primary {
              border: 0;
              background: var(--foreground);
              color: var(--background);
            }

            .game-primary:hover {
              background: var(--red);
              color: var(--paper);
            }

            .game-secondary {
              border: 1px solid var(--border);
              background: transparent;
              color: var(--foreground);
            }

            .game-secondary:hover {
              background: var(--surface-hover);
            }

            @keyframes overlay-enter {
              from { opacity: 0; transform: scale(1.02); }
              to { opacity: 1; transform: scale(1); }
            }

            @keyframes panel-enter {
              from { opacity: 0; transform: translateY(18px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes lane-drift {
              from { transform: translateX(0); }
              to { transform: translateX(-54px); }
            }

            @keyframes thruster {
              from { transform: scaleX(0.82); opacity: 0.7; }
              to { transform: scaleX(1.12); opacity: 1; }
            }

            @keyframes bob {
              from { translate: 0 -5px; }
              to { translate: 0 5px; }
            }

            @media (max-width: 767px) {
              .game-overlay__hud {
                top: 92px;
                left: 16px;
                right: 16px;
              }

              .game-exit {
                margin-left: 0;
              }

              .game-overlay__panel {
                left: 16px;
                right: 16px;
                bottom: 16px;
                max-width: none;
                padding: 20px 18px 18px;
              }

              .game-ship {
                right: 26px;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .game-overlay,
              .game-lane,
              .game-image,
              .game-ship__trail,
              .game-overlay__hud,
              .game-overlay__panel,
              .game-exit,
              .game-primary,
              .game-secondary {
                animation: none !important;
                transition: none !important;
              }
            }
          `}</style>
        </dialog>
      ) : null}

      <style>{`
        .glitch-trigger {
          position: relative;
          display: inline-grid;
          place-items: center;
          padding: 0;
          border: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          cursor: pointer;
        }

        .glitch-trigger:focus-visible {
          outline: 3px solid rgba(236, 55, 80, 0.32);
          outline-offset: 12px;
          border-radius: 24px;
        }

        .glitch-layer {
          position: absolute;
          inset: 0;
          display: inline-block;
        }

        .glitch-layer.base {
          position: relative;
        }

        .glitch-layer.cyan {
          color: #5bc0de;
          transform: translate(-2px, 0);
          clip-path: inset(6% 0 64% 0);
          animation: cyan 1.8s steps(2, jump-end) infinite alternate;
        }

        .glitch-layer.red {
          color: #ec3750;
          transform: translate(2px, 0);
          clip-path: inset(54% 0 12% 0);
          animation: red 2.2s steps(2, jump-end) infinite alternate;
        }

        .arming-strip {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 18px;
          padding: 10px 16px;
          border-radius: 999px;
          background: var(--nav-bg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-dd);
          animation: arming-enter 180ms ease-out;
        }

        .arming-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--border);
          transform: scale(0.6);
          opacity: 0;
          animation: arming-dot-in 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .arming-dot.active {
          background: #ec3750;
        }

        @keyframes arming-enter {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes arming-dot-in {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes cyan {
          0% { clip-path: inset(6% 0 64% 0); }
          20% { clip-path: inset(78% 0 4% 0); }
          40% { clip-path: inset(32% 0 36% 0); }
          60% { clip-path: inset(10% 0 66% 0); }
          80% { clip-path: inset(62% 0 14% 0); }
          100% { clip-path: inset(48% 0 24% 0); }
        }

        @keyframes red {
          0% { clip-path: inset(54% 0 12% 0); }
          20% { clip-path: inset(16% 0 58% 0); }
          40% { clip-path: inset(70% 0 8% 0); }
          60% { clip-path: inset(26% 0 42% 0); }
          80% { clip-path: inset(48% 0 16% 0); }
          100% { clip-path: inset(8% 0 66% 0); }
        }

        @media (max-width: 767px) {
          .glitch-layer.cyan,
          .glitch-layer.red {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .glitch-layer.cyan,
          .glitch-layer.red,
          .arming-strip,
          .arming-dot {
            animation: none !important;
            transition: none !important;
          }

          .glitch-layer.cyan,
          .glitch-layer.red {
            clip-path: inset(0 0 0 0);
            color: inherit;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
