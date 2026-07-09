"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const about = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "Philanthropy", href: "/philanthropy" },
  { label: "Team & Board", href: "/team" },
  { label: "Jobs", href: "/jobs" },
  { label: "Branding Guide", href: "/brand" },
  { label: "Press Inquiries", href: "/press" },
];

const resources = [
  { label: "HCB Fiscal Sponsorship", href: "/fiscal-sponsorship" },
  { label: "Hacker Toolbox", href: "https://toolbox.hackclub.com" },
  { label: "Code of Conduct", href: "/conduct" },
  { label: "Privacy & Terms", href: "/privacy-and-terms" },
  { label: "Safety", href: "/safety" },
];

const links = [
  { label: "About", dropdown: about },
  // { label: "Projects", href: "/projects" },
  { label: "Programs", href: "/programs" },
  { label: "Clubs", href: "/clubs" },
  { label: "Hackathons", href: "https://hackathons.hackclub.com" },
  { label: "Resources", dropdown: resources },
  { label: "Donate", href: "/philanthropy" },
];

const F = "var(--font-phantom)";
const ddId = (l: string) => `dropdown-${l.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
const ease = "cubic-bezier(0.23, 1, 0.32, 1)";

type Item = { label: string; href: string };

function NL({
  href,
  children,
  ...p
}: { href: string; children: React.ReactNode } & Record<string, unknown>) {
  return href.startsWith("/") ? (
    <Link href={href} {...p}>
      {children}
    </Link>
  ) : (
    <a href={href} {...p}>
      {children}
    </a>
  );
}

function DropdownMenu({ items, menuId }: { items: Item[]; menuId: string }) {
  return (
    <>
      <div
        className="dropdown-menu"
        id={menuId}
        role="menu"
        style={
          {
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            background: "var(--dd-bg)",
            borderRadius: 12,
            boxShadow: "var(--dd-shadow)",
            padding: "8px",
            minWidth: 220,
            zIndex: 100,
            pointerEvents: "auto",
            ["--dd-bg" as string]: "var(--surface)",
            ["--dd-shadow" as string]: "var(--shadow-dd)",
            ["--dd-link" as string]: "var(--foreground)",
            ["--dd-hover" as string]: "var(--surface-hover)",
          } as React.CSSProperties
        }
      >
        {items.map((i) => (
          <NL key={i.label} href={i.href} role="menuitem" className="dd-link">
            {i.label}
          </NL>
        ))}
      </div>
      <style jsx>{`
        .dropdown-menu {
          transform: translate3d(-50%, 0, 0);
          opacity: 1;
          animation: ddIn 180ms ${ease};
          will-change: transform, opacity;
        }
        :global(.dd-link) {
          display: block;
          padding: 10px 20px;
          font-family: ${F};
          font-size: 18px;
          color: var(--dd-link);
          text-decoration: none;
          white-space: nowrap;
          border-radius: 8px;
          background-color: transparent;
          transition:
            background-color 200ms ease,
            color 200ms ease,
            padding-left 200ms ease,
            box-shadow 200ms ease;
        }
        :global(.dd-link:hover) {
          background-color: var(--dd-hover);
          color: #ec3750;
          padding-left: 26px;
          box-shadow: 0 4px 12px rgba(236, 55, 80, 0.12);
        }
        @keyframes ddIn {
          from {
            opacity: 0;
            transform: translate3d(-50%, 6px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(-50%, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .dropdown-menu {
            animation: none;
          }
          :global(.dd-link) {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

export function Navbar({ invertColors = false }: { invertColors?: boolean }) {
  const [menuState, setMenuState] = useState<"closed" | "opening" | "open" | "closing">("closed");
  const [openDd, setOpenDd] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openFrame = useRef<number | null>(null);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inv = invertColors && !scrolled;
  const txt = inv ? "var(--cream)" : "var(--foreground)";
  const muted = inv ? "rgba(255, 246, 235, 0.7)" : "var(--muted)";
  const btnTxt = inv ? "var(--ink)" : "var(--background)";
  const btnHover = "var(--red)";
  const mobBg = inv ? "rgba(23, 23, 29, 0.96)" : "var(--nav-bg)";
  const mobBorder = `1px solid ${inv ? "rgba(255, 255, 255, 0.08)" : "var(--border)"}`;

  const enter = (l: string) => {
    if (timer.current) clearTimeout(timer.current);
    setOpenDd(l);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpenDd(null), 120);
  };
  const active = (h?: string) => (h ? h !== "#" && path.startsWith(h) : false);
  const mounted = menuState !== "closed";
  const isOpen = menuState === "opening" || menuState === "open";

  const clearHandles = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openFrame.current) cancelAnimationFrame(openFrame.current);
    closeTimer.current = null;
    openFrame.current = null;
  }, []);

  const openMenu = useCallback(() => {
    clearHandles();
    if (menuState === "open" || menuState === "opening") return;
    setMenuState("opening");
    openFrame.current = requestAnimationFrame(() => {
      setMenuState("open");
      openFrame.current = null;
    });
  }, [clearHandles, menuState]);

  const closeMenu = useCallback(() => {
    clearHandles();
    if (menuState === "closed" || menuState === "closing") return;
    setMenuState("closing");
    closeTimer.current = setTimeout(() => {
      setMenuState("closed");
      closeTimer.current = null;
    }, 240);
  }, [clearHandles, menuState]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [closeMenu, mounted]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      clearHandles();
    },
    [clearHandles],
  );

  const ls = (a: boolean) => ({
    fontFamily: F,
    fontWeight: a ? ("bold" as const) : ("normal" as const),
    fontSize: 20,
    color: txt,
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
    opacity: 1,
    transition: "opacity 0.15s",
  });
  const hIn = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = "0.6";
  };
  const hOut = (e: React.MouseEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = "1";
  };

  return (
    <>
      <nav
        className="navbar-shell fixed lg:absolute left-0 right-0 flex items-center justify-between"
        style={{
          top: 0,
          paddingLeft: 32,
          paddingRight: "clamp(16px, 4vw, 55px)",
          height: 80,
          zIndex: 1100,
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/hackClubLogoRed.svg"
            alt="Hack Club"
            height={184}
            width={526}
            priority
            style={{ height: 48, width: "auto", display: "block", objectFit: "contain" }}
          />
        </Link>

        <div className="hidden lg:flex items-center" style={{ gap: 24 }}>
          {links.map(({ label, href, dropdown }) => {
            const a = active(href);
            if (dropdown) {
              const id = ddId(label);
              return (
                <div
                  key={label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => enter(label)}
                  onMouseLeave={leave}
                  onFocus={() => enter(label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) leave();
                  }}
                >
                  <button
                    type="button"
                    className="nav-link"
                    aria-haspopup="menu"
                    aria-expanded={openDd === label}
                    aria-controls={id}
                    style={{
                      ...ls(a),
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      opacity: openDd === label ? 0.6 : 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {label}
                    <svg
                      className="nav-arrow"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {openDd === label && <DropdownMenu items={dropdown} menuId={id} />}
                </div>
              );
            }
            return (
              <NL
                key={label}
                href={href!}
                className="nav-link"
                style={ls(a)}
                onMouseEnter={hIn}
                onMouseLeave={hOut}
              >
                {label}
              </NL>
            );
          })}

          <ThemeToggle />

          <a
            href="https://slack.hackclub.com"
            className="dark-btn nav-cta"
            style={{
              fontFamily: F,
              fontWeight: "normal",
              fontSize: 20,
              textDecoration: "none",
              borderRadius: 9999,
              height: 44,
              paddingLeft: 20,
              paddingRight: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Join the community
          </a>
        </div>

        <button
          className="lg:hidden flex flex-col justify-center items-center"
          style={{
            width: 40,
            height: 40,
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "auto",
          }}
          onClick={() => (isOpen ? closeMenu() : openMenu())}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 26,
                height: 3,
                background: txt,
                borderRadius: 2,
                boxShadow: inv ? "0 1px 2px rgba(0,0,0,0.25)" : "none",
                transform:
                  i === 0 && isOpen
                    ? "translateY(8px) rotate(45deg)"
                    : i === 1 && isOpen
                      ? "scaleX(0)"
                      : i === 2 && isOpen
                        ? "translateY(-8px) rotate(-45deg)"
                        : "none",
                opacity: i === 1 && isOpen ? 0 : 1,
                transition: `transform 220ms ${ease}, opacity 220ms ${ease}`,
              }}
            />
          ))}
        </button>
      </nav>

      {!invertColors && (
        <div className="lg:hidden" style={{ height: 80, flexShrink: 0 }} aria-hidden="true" />
      )}

      {mounted && (
        <div
          className="mobile-nav-overlay lg:hidden"
          id="mobile-nav-menu"
          data-state={menuState}
          aria-hidden={!isOpen}
          style={
            {
              ["--mob-bg" as string]: mobBg,
              ["--mob-border" as string]: mobBorder,
            } as React.CSSProperties
          }
        >
          <div className="mobile-nav-panel">
            {links.map(({ label, href, dropdown }) => {
              const a = active(href);
              const s = {
                fontFamily: F,
                fontWeight: a ? ("bold" as const) : ("normal" as const),
                fontSize: 20,
                color: txt,
                textDecoration: "none",
              };
              return (
                <div key={label} className="mobile-nav-item">
                  {href ? (
                    <NL href={href} style={s} onClick={closeMenu}>
                      {label}
                    </NL>
                  ) : (
                    <span style={s}>{label}</span>
                  )}
                  {dropdown && (
                    <div
                      style={{
                        paddingLeft: 16,
                        marginTop: 6,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {dropdown.map((d) => (
                        <NL
                          key={d.label}
                          href={d.href}
                          onClick={closeMenu}
                          style={{
                            fontFamily: F,
                            fontSize: 17,
                            color: muted,
                            textDecoration: "none",
                            opacity: 0.9,
                          }}
                        >
                          {d.label}
                        </NL>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <a
              href="https://slack.hackclub.com"
              className="dark-btn mobile-nav-item"
              onClick={closeMenu}
              style={{
                fontFamily: F,
                fontSize: 20,
                color: btnTxt,
                textDecoration: "none",
                background: txt,
                borderRadius: 9999,
                padding: "10px 24px",
                textAlign: "center",
                marginTop: 4,
                display: "block",
              }}
            >
              Join the community
            </a>
            <div className="mobile-nav-item" style={{ display: "flex", justifyContent: "center" }}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .navbar-shell {
          z-index: 1100;
          transition:
            background 300ms ease,
            border-color 300ms ease,
            backdrop-filter 300ms ease;
        }
        @media (max-width: 1023px) {
          .navbar-shell {
            background: ${scrolled ? "var(--nav-bg)" : "transparent"};
            backdrop-filter: ${scrolled ? "blur(16px)" : "none"};
            -webkit-backdrop-filter: ${scrolled ? "blur(16px)" : "none"};
            border-bottom: ${scrolled ? "1px solid var(--border)" : "1px solid transparent"};
          }
        }
        .mobile-nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 1090;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          background: var(--mob-bg);
          backdrop-filter: blur(14px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition:
            opacity 220ms ${ease},
            visibility 0ms linear 220ms;
        }
        .mobile-nav-overlay[data-state="opening"],
        .mobile-nav-overlay[data-state="open"],
        .mobile-nav-overlay[data-state="closing"] {
          visibility: visible;
        }
        .mobile-nav-overlay[data-state="open"] {
          opacity: 1;
          pointer-events: auto;
          transition:
            opacity 240ms ${ease},
            visibility 0ms linear 0ms;
        }
        .mobile-nav-panel {
          width: 100%;
          min-height: 100%;
          padding: 104px 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          border-top: var(--mob-border);
          transform: translate3d(0, -14px, 0);
          transition: transform 240ms ${ease};
          will-change: transform;
        }
        .mobile-nav-overlay[data-state="open"] .mobile-nav-panel {
          transform: translate3d(0, 0, 0);
        }
        .mobile-nav-item {
          opacity: 0;
          transform: translate3d(0, 12px, 0);
          transition:
            transform 240ms ${ease},
            opacity 180ms ease-out;
          will-change: transform, opacity;
        }
        .mobile-nav-overlay[data-state="open"] .mobile-nav-item {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .mobile-nav-overlay[data-state="open"] .mobile-nav-item:nth-child(1) {
          transition-delay: 40ms;
        }
        .mobile-nav-overlay[data-state="open"] .mobile-nav-item:nth-child(2) {
          transition-delay: 65ms;
        }
        .mobile-nav-overlay[data-state="open"] .mobile-nav-item:nth-child(3) {
          transition-delay: 90ms;
        }
        .mobile-nav-overlay[data-state="open"] .mobile-nav-item:nth-child(4) {
          transition-delay: 115ms;
        }
        .mobile-nav-overlay[data-state="open"] .mobile-nav-item:nth-child(5) {
          transition-delay: 140ms;
        }
        .nav-arrow {
          transition:
            transform 160ms ease,
            opacity 160ms ease;
          opacity: 0.8;
        }
        .nav-link:hover .nav-arrow {
          opacity: 1;
          transform: translateY(1px);
        }
        .nav-cta {
          color: ${btnTxt};
          background: ${txt};
          transition:
            background 180ms ease,
            color 180ms ease;
        }
        .nav-cta:hover {
          background: ${btnHover};
          color: var(--paper);
        }
        .nav-cta:active {
          transform: translateY(0) scale(0.98);
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-arrow,
          .nav-cta,
          .mobile-nav-overlay,
          .mobile-nav-panel,
          .mobile-nav-item {
            transition: none;
          }
          .mobile-nav-panel,
          .mobile-nav-item {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
