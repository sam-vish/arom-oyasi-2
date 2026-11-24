"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Lenis smooth scrolling for mouse wheels and trackpads. A wheel moves in ~100px steps,
 * which makes scroll-bound moments (the Mandate scrub, the About timeline) step instead of
 * glide; Lenis turns those steps into one continuous motion.
 * Off for touch devices (native touch scrolling already feels right) and for visitors who
 * prefer reduced motion. Elements with data-lenis-prevent (video dialog, mobile menu)
 * scroll natively. Our scroll bindings read native scroll position, so they work either way.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !finePointer) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
