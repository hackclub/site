"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { EmailSignupInput } from "./email-signup";
import { BtnArrowSvg } from "./btn-arrow";
import { StickerEnvelopeLink } from "./stickers";

/**
 * Renders a polaroid photo matched to its Figma bounding box.
 * bbX/bbY: Figma bounding box top-left (x = local to 1920px canvas)
 * bbW/bbH: Figma bounding box dimensions
 * w/h: original (pre-rotation) image dimensions
 * rotate: rotation angle in degrees
 */
function DraggableSticker({
  src,
  initialLeft,
  initialRight,
  initialTop,
  rotate,
  width,
  sizes,
}: {
  src: string;
  initialLeft?: number | string;
  initialRight?: number | string;
  initialTop: number | string;
  rotate: number;
  width: number | string;
  sizes: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragOrigin = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragOrigin.current = { mx: e.clientX, my: e.clientY, ox: offset.x, oy: offset.y };
    const onMove = (e: MouseEvent) => {
      setOffset({
        x: dragOrigin.current.ox + (e.clientX - dragOrigin.current.mx),
        y: dragOrigin.current.oy + (e.clientY - dragOrigin.current.my),
      });
    };
    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const lifted = isHovered || isDragging;
  const lift = isDragging ? 14 : isHovered ? 6 : 0;
  const scale = isDragging ? 1.1 : isHovered ? 1.05 : 1;
  const extraTilt = isDragging ? 4 : 0;

  const dragX = offset.x;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      onMouseDown={handleMouseDown}
      onMouseEnter={() => {
        hoverTimer.current = setTimeout(() => setIsHovered(true), 150);
      }}
      onMouseLeave={() => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        if (!isDragging) setIsHovered(false);
      }}
      style={{
        position: "absolute",
        left: initialLeft,
        right: initialRight,
        top: initialTop,
        width,
        zIndex: isDragging ? 1000 : 30,
        pointerEvents: "auto",
        cursor: isDragging ? "grabbing" : "grab",
        transform: `translate(${dragX}px, ${offset.y - lift}px) scale(${scale})`,
        transition: isDragging
          ? "none"
          : "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.25s ease",
        filter: lifted
          ? `drop-shadow(0 ${lift}px ${lift + 6}px rgba(0,0,0,0.28))`
          : "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
        userSelect: "none",
      }}
    >
      <Image
        src={src}
        alt=""
        draggable={false}
        width={320}
        height={320}
        sizes={sizes}
        quality={85}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          transform: `rotate(${rotate + (isDragging ? extraTilt : 0)}deg)`,
          transition: isDragging ? "none" : "transform 0.25s ease",
        }}
      />
    </div>
  );
}

function Photo({
  src,
  bbX,
  bbY,
  bbW,
  bbH,
  w,
  h,
  rotate,
  zIndex = 8,
  border = true,
  side = "left",
  scale = 1,
  parallaxRate = 0.1,
  sizes = "(max-width: 1023px) 0px, 370px",
}: {
  src: string;
  bbX: number;
  bbY: number;
  bbW: number;
  bbH: number;
  w: number;
  h: number;
  rotate: number;
  zIndex?: number;
  border?: boolean;
  side?: "left" | "right";
  scale?: number;
  parallaxRate?: number;
  sizes?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const edgeStyle: React.CSSProperties =
    side === "right" ? { right: -(bbX + bbW - 1920) } : { left: bbX };

  const REVEAL = 80;
  const MIN_SLIDE = 160;
  const hidden = side === "right" ? bbX + bbW - 1920 : Math.abs(bbX);
  const magnitude = Math.max(hidden + REVEAL, MIN_SLIDE);
  const slideX = side === "right" ? -magnitude : magnitude;
  const slideY = bbY + bbH / 2 < 450 ? 40 : -40;

  return (
    // Outer: parallax target — JS updates translateY via data-parallax-rate
    <div
      data-parallax-rate={parallaxRate}
      style={{
        position: "absolute",
        ...edgeStyle,
        top: bbY,
        width: bbW,
        height: bbH,
        zIndex,
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      {/* Middle: hover slide */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform:
            hovered && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? `translateX(${slideX}px) translateY(${slideY}px)`
              : "none",
          transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Inner: photo with rotate/scale and event handlers */}
        <div
          onMouseEnter={() => {
            if (leaveTimer.current) clearTimeout(leaveTimer.current);
            setHovered(true);
          }}
          onMouseLeave={() => {
            leaveTimer.current = setTimeout(() => setHovered(false), 200);
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: w,
            height: h,
            transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
            border: border ? "4px solid var(--paper)" : "none",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: border ? "0 4px 20px rgba(0,0,0,0.18)" : "none",
            pointerEvents: "auto",
            cursor: "pointer",
          }}
        >
          <Image
            src={src}
            alt=""
            width={w}
            height={h}
            sizes={sizes}
            quality={75}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

// Small compressed mountain-bump wave
function WaveDivider() {
  return (
    <div
      className="wave-container"
      style={{
        position: "absolute",
        bottom: -2,
        left: 0,
        right: 0,
        lineHeight: 0,
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* Thin wave on top — stroke only */}
      <svg
        viewBox="0 0 1920 22"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 22, display: "block", marginBottom: -8 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,18 C40,18 40,2 80,2 C120,2 120,18 160,18 C200,18 200,2 240,2 C280,2 280,18 320,18 C360,18 360,2 400,2 C440,2 440,18 480,18 C520,18 520,2 560,2 C600,2 600,18 640,18 C680,18 680,2 720,2 C760,2 760,18 800,18 C840,18 840,2 880,2 C920,2 920,18 960,18 C1000,18 1000,2 1040,2 C1080,2 1080,18 1120,18 C1160,18 1160,2 1200,2 C1240,2 1240,18 1280,18 C1320,18 1320,2 1360,2 C1400,2 1400,18 1440,18 C1480,18 1480,2 1520,2 C1560,2 1560,18 1600,18 C1640,18 1640,2 1680,2 C1720,2 1720,18 1760,18 C1800,18 1800,2 1840,2 C1880,2 1880,18 1920,18"
          fill="none"
          style={{ stroke: "var(--background)" }}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Main wave — reduced amplitude */}
      <svg
        viewBox="0 0 1920 40"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 40, display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
          style={{ fill: "var(--background)" }}
        />
      </svg>
    </div>
  );
}

export function HeroSection() {
  const magazineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const parallaxElementsRef = useRef<HTMLElement[]>([]);
  const heroTopRef = useRef(0);
  const isHeroVisibleRef = useRef(true);
  const prefersReducedMotionRef = useRef(false);
  const [magHover, setMagHover] = useState<"idle" | "in" | "out">("idle");
  const magHoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetParallax = () => {
      if (magazineRef.current) {
        magazineRef.current.style.transform = "translate3d(-50%, 0, 0)";
      }

      for (const el of parallaxElementsRef.current) {
        el.style.transform = "translate3d(0, 0, 0)";
      }
    };

    const measureHero = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      heroTopRef.current = rect.top + window.scrollY;
    };

    const applyParallax = () => {
      rafRef.current = null;

      if (prefersReducedMotionRef.current) {
        resetParallax();
        return;
      }

      const scrollY = window.scrollY;
      const heroStart = heroTopRef.current;
      const relativeY = Math.max(0, scrollY - heroStart);

      if (magazineRef.current) {
        magazineRef.current.style.transform = `translate3d(-50%, ${relativeY * 0.4}px, 0)`;
      }

      for (const el of parallaxElementsRef.current) {
        const rate = parseFloat(el.dataset.parallaxRate ?? "0");
        el.style.transform = `translate3d(0, ${relativeY * rate}px, 0)`;
      }
    };

    const scheduleParallax = () => {
      if (prefersReducedMotionRef.current || !isHeroVisibleRef.current || rafRef.current !== null)
        return;
      rafRef.current = requestAnimationFrame(applyParallax);
    };

    const handleResize = () => {
      measureHero();

      if (prefersReducedMotionRef.current) {
        resetParallax();
        return;
      }

      scheduleParallax();
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotionChange = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;

      if (prefersReducedMotionRef.current) {
        resetParallax();
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        return;
      }

      measureHero();
      scheduleParallax();
    };

    parallaxElementsRef.current = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>("[data-parallax-rate]") ?? [],
    );

    measureHero();
    handleReducedMotionChange();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisibleRef.current = entry?.isIntersecting ?? false;
        if (isHeroVisibleRef.current) {
          measureHero();
          scheduleParallax();
        }
      },
      { rootMargin: "200px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, rgba(236,55,80,0.04) 60%, rgba(236,55,80,0.40) 100%)",
      }}
    >
      {/*
       * ── PHOTOS ──
       * All coordinates from Figma metadata (bounding box, 1920px canvas)
       * Left-side photos: bbX is negative (start off-screen left)
       * Right-side photos: bbX is large positive (extend off-screen right)
       * Hidden on mobile to avoid overlapping center content.
       * Wrapped in overflow:hidden so photos are clipped to section bounds
       * while the creature (outside this wrapper) can extend below.
       */}
      <style>{`
        @media (max-width: 1023px) { .hero-photos-left, .hero-photos-right, .hero-stickers { display: none; } }
      `}</style>
      {/* Magazine background — behind photos */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          ref={magazineRef}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            minWidth: 900,
            width: "100%",
            transform: "translate3d(-50%, 0, 0)",
            maskImage: "linear-gradient(to top, black 40%, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to top, black 40%, transparent 75%)",
            willChange: "transform",
          }}
        >
          <Image
            src="/assets/background.webp"
            alt=""
            width={1920}
            height={840}
            sizes="100vw"
            quality={85}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
      </div>

      {/* Photos — in front of magazine bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <div className="hero-photos-left">
          <Photo
            src="/assets/hero_photo1.webp"
            bbX={-140}
            bbY={65}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={-8}
            zIndex={8}
            scale={0.78}
            parallaxRate={0.15}
          />
          <Photo
            src="/assets/hero_photo2.webp"
            bbX={-185}
            bbY={225}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={16}
            zIndex={7}
            scale={0.78}
            parallaxRate={0.12}
          />
          <Photo
            src="/assets/hero_photo3.webp"
            bbX={-170}
            bbY={365}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={-14}
            zIndex={7}
            scale={0.78}
            parallaxRate={0.09}
          />
          <Photo
            src="/assets/hero_photo4.webp"
            bbX={-140}
            bbY={495}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={11}
            zIndex={8}
            scale={0.78}
            parallaxRate={0.07}
          />
          <Photo
            src="/assets/hero_photo5.webp"
            bbX={-95}
            bbY={610}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={-20}
            zIndex={9}
            scale={0.78}
            parallaxRate={0.05}
          />
          <Photo
            src="/assets/hero_photo6.webp"
            bbX={-100}
            bbY={695}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={22}
            zIndex={8}
            scale={0.78}
            parallaxRate={0.04}
          />
          <Photo
            src="/assets/hero_photo7.webp"
            bbX={-5}
            bbY={725}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={-9}
            zIndex={10}
            scale={0.78}
            parallaxRate={0.03}
          />
        </div>
        <div className="hero-photos-right">
          <Photo
            src="/assets/hero_photo8.webp"
            bbX={1680}
            bbY={70}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={10}
            zIndex={8}
            side="right"
            scale={0.78}
            parallaxRate={0.15}
          />
          <Photo
            src="/assets/hero_photo9.webp"
            bbX={1710}
            bbY={230}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={-16}
            zIndex={7}
            side="right"
            scale={0.78}
            parallaxRate={0.12}
          />
          <Photo
            src="/assets/hero_photo10.webp"
            bbX={1690}
            bbY={370}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={13}
            zIndex={7}
            side="right"
            scale={0.78}
            parallaxRate={0.09}
          />
          <Photo
            src="/assets/hero_photo11.webp"
            bbX={1665}
            bbY={500}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={-11}
            zIndex={8}
            side="right"
            scale={0.78}
            parallaxRate={0.07}
          />
          <Photo
            src="/assets/hero_photo12.webp"
            bbX={1640}
            bbY={615}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={20}
            zIndex={8}
            side="right"
            scale={0.78}
            parallaxRate={0.05}
          />
          <Photo
            src="/assets/hero_photo13.webp"
            bbX={1555}
            bbY={715}
            bbW={390}
            bbH={290}
            w={370}
            h={260}
            rotate={-10}
            zIndex={10}
            side="right"
            scale={0.78}
            parallaxRate={0.03}
          />
        </div>
      </div>

      {/* ── STICKERS — draggable, outside overflow clip, hidden on mobile ── */}
      <div className="hero-stickers">
        <DraggableSticker
          src="/assets/hero_sticker1.webp"
          initialLeft="calc(75 / 1920 * 100vw)"
          initialTop="calc(266 / 1080 * 100vh)"
          rotate={18}
          width="calc(141 / 1920 * 100vw)"
          sizes="(max-width: 1023px) 0px, 7.35vw"
        />
        <DraggableSticker
          src="/assets/hero_sticker2.webp"
          initialLeft="calc(215 / 1920 * 100vw)"
          initialTop="calc(663 / 1080 * 100vh)"
          rotate={-24}
          width="calc(65 / 1920 * 100vw)"
          sizes="(max-width: 1023px) 0px, 3.39vw"
        />
        <DraggableSticker
          src="/assets/hero_sticker3.webp"
          initialLeft="calc(300 / 1920 * 100vw)"
          initialTop="calc(768 / 1080 * 100vh)"
          rotate={13}
          width="calc(81 / 1920 * 100vw)"
          sizes="(max-width: 1023px) 0px, 4.22vw"
        />
        <DraggableSticker
          src="/assets/hero_sticker7.webp"
          initialRight="calc(100 / 1920 * 100vw)"
          initialTop="calc(285 / 1080 * 100vh)"
          rotate={-16}
          width="calc(112 / 1920 * 100vw)"
          sizes="(max-width: 1023px) 0px, 5.83vw"
        />
        <DraggableSticker
          src="/assets/hero_sticker5.webp"
          initialRight="calc(155 / 1920 * 100vw)"
          initialTop="calc(528 / 1080 * 100vh)"
          rotate={22}
          width="calc(89 / 1920 * 100vw)"
          sizes="(max-width: 1023px) 0px, 4.64vw"
        />
        <DraggableSticker
          src="/assets/hero_sticker6.webp"
          initialRight="calc(280 / 1920 * 100vw)"
          initialTop="calc(767 / 1080 * 100vh)"
          rotate={-9}
          width="calc(65 / 1920 * 100vw)"
          sizes="(max-width: 1023px) 0px, 3.39vw"
        />
      </div>

      {/* ── CENTER CONTENT ── */}
      <style>
        {`.hero-center { padding-left: 0; padding-right: 0; }
        @media (max-width: 1023px) {
          .hero-center { padding-left: 24px; padding-right: 24px; }
          .hero-mag-link { display: none !important; }
        }
        @keyframes teens-gradient {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes mag-bg-in  { from { transform: translateX(-101%); } to { transform: translateX(0%); } }
        @keyframes mag-bg-out { from { transform: translateX(0%); } to { transform: translateX(101%); } }
        .mag-link { position: relative; overflow: hidden; padding: 0 1px; transition: color 0.15s; }
        .mag-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #ec3750;
          transform: translateX(-101%);
          z-index: -1;
        }
        .mag-link[data-state="in"]::before  { animation: mag-bg-in  0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .mag-link[data-state="out"]::before { animation: mag-bg-out 0.25s cubic-bezier(0.55, 0, 1, 0.45) forwards; }
        .mag-link .btn-arrow { display: inline-flex; align-items: center; }`}
      </style>
      <div
        className="hero-center"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          paddingTop: 80,
          paddingBottom: 100,
          gap: 0,
          pointerEvents: "none",
        }}
      >
        {/* Stardance link */}
        <a
          href="https://stardance.hackclub.com/hackclubsite"
          target="_blank"
          rel="noopener"
          className="mag-link hero-mag-link"
          data-state={magHover}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 8,
            fontFamily: "var(--font-phantom)",
            fontSize: 20,
            color: magHover === "in" ? "#ffffff" : "var(--muted)",
            textDecoration: "none",
            textAlign: "center",
            marginBottom: 18,
            pointerEvents: "auto",
          }}
          onMouseEnter={() => {
            magHoverTimer.current = setTimeout(() => setMagHover("in"), 10);
          }}
          onMouseLeave={() => {
            if (magHoverTimer.current) clearTimeout(magHoverTimer.current);
            setMagHover(magHover === "in" ? "out" : "idle");
          }}
        >
          {/* <span style={{ color: magHover === "in" ? "#ffffff" : "#ec3750" }}>✦</span> */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.hackclub.com/019e7ad9-26a3-75ba-afcb-2f384110ea6c/star.svg"
            alt=""
            width={177}
            height={222}
            style={{ width: 18, height: "auto", display: "block", flexShrink: 0 }}
          />
          {"Check out Stardance, the largest free STEM event of the summer"}
          <span className="btn-arrow" aria-hidden="true">
            <BtnArrowSvg />
          </span>
        </a>

        {/* Headline — forced 2-line wrap */}
        <h1
          style={{
            fontFamily: "var(--font-zarathustra)",
            fontSize: "clamp(52px, 12vw, 90px)",
            fontWeight: "normal",
            lineHeight: 0.92,
            color: "var(--foreground)",
            margin: 0,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {"Where "}
          <span
            style={{
              background:
                "repeating-linear-gradient(105deg, #ec3750 0%, #ff8c37 16%, #f1c40f 32%, #33d6a6 48%, #338eda 64%, #a633d6 80%, #ec3750 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "teens-gradient 6s linear infinite",
            }}
          >
            teens
          </span>
          <br />
          {"make cool stuff."}
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontWeight: "normal",
            fontSize: 20,
            color: "var(--foreground)",
            margin: 0,
            marginBottom: 32,
            lineHeight: 1.2,
            textAlign: "center",
            maxWidth: "min(600px, calc(100vw - 64px))",
          }}
        >
          Hack Club is the world&rsquo;s largest nonprofit movement of teenagers making cool
          projects.
        </p>

        {/* Email signup */}
        <div style={{ pointerEvents: "auto" }}>
          <EmailSignupInput variant="hero" />
        </div>

        {/* Italic subtext */}
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontStyle: "italic",
            fontWeight: "normal",
            fontSize: 16,
            lineHeight: 1.35,
            color: "var(--foreground)",
            margin: 0,
            marginTop: 10,
            padding: "10px 16px",
            maxWidth: "min(680px, calc(100vw - 48px))",
            background: "var(--nav-bg)",
            border: "1px solid var(--border)",
            borderRadius: 9999,
            boxShadow: "0 10px 28px rgba(23, 23, 29, 0.08)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            pointerEvents: "auto",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            columnGap: 4,
          }}
        >
          <span style={{ color: "var(--foreground)" }}>
            For all teens aged 13–18. By continuing, you agree to our
          </span>
          <Link
            href="/privacy-and-terms"
            style={{
              color: "var(--red)",
              textDecoration: "underline",
              textUnderlineOffset: 2,
              pointerEvents: "auto",
              whiteSpace: "nowrap",
            }}
          >
            terms.
          </Link>
        </p>

        {/* Free stickers envelope */}
        <div
          style={{
            pointerEvents: "auto",
            marginTop: 28,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <StickerEnvelopeLink />
        </div>
      </div>

      {/* Creature — sits above the wave on the right */}
      <Image
        src={"/assets/creature1.webp"}
        alt=""
        width={1867}
        height={1485}
        sizes="(max-width: 1023px) 28vw, 28.33vw"
        quality={85}
        style={{
          position: "absolute",
          right: 0,
          bottom: 20,
          width: "calc(544 / 1920 * 100vw)",
          height: "auto",
          transform: "translateY(calc(50% - 8px))",
          zIndex: 25,
          pointerEvents: "none",
        }}
        priority
      />

      {/* Mountain-bump wave — small & compressed */}
      <WaveDivider />
    </section>
  );
}
