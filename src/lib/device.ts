"use client";

import { useEffect, useState } from "react";

/**
 * Detect low-power rendering contexts where we should skip WebGL / heavy animations.
 * Returns true for: any touch-primary device (mobile/tablet), WeChat X5 browser,
 * or users with prefers-reduced-motion.
 *
 * Usage: gate Three.js canvas, Lenis init, and custom cursor mounting with this.
 */
export function useIsLowPower(): boolean {
  // Default to "low power" during SSR so the server renders the safe version.
  // Hydration flips it to the real value after mount.
  const [isLowPower, setIsLowPower] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent.toLowerCase();
    const isWeChat = /micromessenger/.test(ua);
    const isMobile =
      /iphone|ipad|ipod|android|mobile|phone/.test(ua) ||
      (typeof matchMedia !== "undefined" &&
        matchMedia("(hover: none) and (pointer: coarse)").matches);
    const reduceMotion =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    setIsLowPower(isWeChat || isMobile || reduceMotion);
  }, []);

  return isLowPower;
}

/** Pure detection for contexts where hooks aren't usable (e.g. event handlers). */
export function detectLowPower(): boolean {
  if (typeof window === "undefined") return true;
  const ua = navigator.userAgent.toLowerCase();
  return (
    /micromessenger/.test(ua) ||
    /iphone|ipad|ipod|android|mobile|phone/.test(ua) ||
    matchMedia("(hover: none) and (pointer: coarse)").matches ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
