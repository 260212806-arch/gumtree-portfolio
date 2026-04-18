"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useIsLowPower } from "@/lib/device";

/**
 * Mounts Lenis smooth-scroll on desktop only. No-ops on mobile/WeChat.
 * Keep this component near the root of the client tree.
 */
export function SmoothScroll() {
  const isLowPower = useIsLowPower();

  useEffect(() => {
    if (isLowPower) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLowPower]);

  return null;
}
