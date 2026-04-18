"use client";

import { useIsLowPower } from "@/lib/device";

/**
 * Global film-grain overlay. On low-power devices we use a static SVG noise
 * (defined in globals.css as `.static-grain`). On capable devices, an animated
 * version could be added later — for v1 the static version is visually close
 * enough and far cheaper.
 */
export function FilmGrain() {
  // Always show the static SVG grain. Gate animated variant to hi-power if we
  // add one in v2.
  useIsLowPower(); // subscribed for future branching
  return <div className="static-grain" aria-hidden />;
}
