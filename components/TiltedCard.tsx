"use client";

import { useRef, useState } from "react";

export default function TiltedCard({
  children,
  className = "",
  rotateAmplitude = 12,
  scaleOnHover = 1.03,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({});

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransformStyle({
      transform: `perspective(900px) rotateY(${x * rotateAmplitude}deg) rotateX(${-y * rotateAmplitude}deg) scale(${scaleOnHover})`,
      transition: "transform 0.08s ease-out",
    });
  }

  function handleMouseLeave() {
    setTransformStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.4s ease-out",
    });
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, ...transformStyle, willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
