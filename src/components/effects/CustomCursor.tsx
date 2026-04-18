"use client";

import { useEffect, useRef } from "react";
import { useIsLowPower } from "@/lib/device";

/**
 * Desktop-only cursor: a small dot + a larger glowing ring that trails it.
 * Hidden entirely on low-power (mobile/WeChat/reduced-motion).
 */
export function CustomCursor() {
  const isLowPower = useIsLowPower();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLowPower) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    };

    const onDown = () => ring.classList.add("scale-75");
    const onUp = () => ring.classList.remove("scale-75");

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button")) {
        ring.classList.add("is-hover");
      } else {
        ring.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);

    let rafId: number;
    const tick = () => {
      // Higher lerp factor = ring keeps up with fast movement
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;
      ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, [isLowPower]);

  if (isLowPower) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[300] h-2 w-2 rounded-full bg-[color:var(--color-accent)] mix-blend-difference will-change-transform"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[299] h-10 w-10 rounded-full border border-[color:var(--color-accent)]/50 bg-[color:var(--color-accent)]/5 backdrop-blur-[1px] transition-[width,height,border-color] duration-300 [&.is-hover]:h-16 [&.is-hover]:w-16 [&.is-hover]:border-[color:var(--color-accent)] [&.scale-75]:scale-75 will-change-transform"
        aria-hidden
      />
    </>
  );
}
