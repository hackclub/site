"use client";

import type { CSSProperties } from "react";
import HackclubIcon from "@hackclub/icons";

export interface IconProps {
  glyph: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Accessible name. Omit for decorative icons (the default), which are hidden from assistive tech. */
  label?: string;
}

export function Icon({ glyph, size = 40, style, className, label }: IconProps) {
  // @hackclub/icons sets aria-label={glyph} on every svg, so screen readers would
  // announce raw slugs like "view-forward". Override it: hide by default, or name it.
  const a11y = label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": true, "aria-label": undefined, focusable: "false" as const };

  return (
    <HackclubIcon
      // eslint-disable-next-line @typescript-eslint/no-explicit-anyfr
      glyph={glyph as any}
      size={size}
      style={style}
      className={className}
      {...a11y}
    />
  );
}
