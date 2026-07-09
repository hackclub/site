"use client";

import type { CSSProperties } from "react";
import HackclubIcon from "@hackclub/icons";

export interface IconProps {
  glyph: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ glyph, size = 40, style, className }: IconProps) {
  return (
    <HackclubIcon
      // eslint-disable-next-line @typescript-eslint/no-explicit-anyfr
      glyph={glyph as any}
      size={size}
      style={style}
      className={className}
    />
  );
}
