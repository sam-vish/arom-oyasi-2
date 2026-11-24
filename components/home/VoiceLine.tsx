"use client";

import { useEffect, useRef, useState } from "react";
import { timeline } from "@/content/words";

/**
 * His life as a single line of sound. Flat from 1977 (born with facial palsy that impaired his
 * speech) until thirteen, when his tongue was loosened; from there the line becomes a voice, and
 * it grows with each mark: the mandate, the network, the nations. Drawn left to right the first
 * time it's seen, then it keeps breathing while on screen. Static for reduced motion.
 */
const STOPS = [0, 0.11, 0.25, 0.47, 0.6, 0.73, 0.95]; // where each timeline mark sits along the line
const VOICE_FROM = STOPS[2]; // "Age 13: the encounter"
const VB_W = 1200;
const VB_H = 160;

function wavePath(t: number) {
  let d = `M0 ${VB_H / 2}`;
  for (let x = 0; x <= VB_W; x += 4) {
    const p = x / VB_W;
    let env = 0;
    if (p > VOICE_FROM) {
      const k = (p - VOICE_FROM) / (1 - VOICE_FROM);
      env = Math.min(1, k * 1.25) ** 0.85 * (0.35 + 0.65 * k);
    }
    const y =
      VB_H / 2 +
      env *
        (VB_H * 0.42) *
        (Math.sin(x * 0.055 + t * 2.4) * 0.55 + Math.sin(x * 0.131 - t * 3.3) * 0.3 + Math.sin(x * 0.017 + t * 0.9) * 0.25);
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}

export function VoiceLine() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const p = path.current;
    if (!el || !p) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    p.setAttribute("d", wavePath(0.6));
    if (reduced) return; // .voice-svg is unclipped by CSS for reduced motion
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      p.setAttribute("d", wavePath((now - t0) / 1000));
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          if (!raf) raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrap}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden
          className="voice-svg block h-[110px] w-full transition-[clip-path] duration-[2.6s] ease-[cubic-bezier(.7,0,.2,1)] md:h-[160px]"
          style={{ clipPath: drawn ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
        >
          <path ref={path} d={`M0 ${VB_H / 2} L${VB_W} ${VB_H / 2}`} fill="none" stroke="currentColor" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* Marks on the line */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
          {STOPS.map((s, i) => (
            <span
              key={i}
              className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper ${i === 2 ? "bg-copper" : "bg-ink"}`}
              style={{ left: `${s * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Desktop: labels hang under their marks. Phone: a simple list. */}
      <ol className="relative mt-6 grid gap-6 md:mt-4 md:block md:h-[150px]">
        {timeline.map((m, i) => (
          <li
            key={m.mark}
            className={`md:absolute md:top-0 md:w-[10.5%] ${STOPS[i] > 0.85 ? "md:-translate-x-[calc(100%-8px)] md:text-right" : "md:-translate-x-[8px]"}`}
            style={{ left: `${STOPS[i] * 100}%` }}
            data-reveal
          >
            <p className={`kicker ${i === 2 ? "text-copper" : "text-muted"}`}>{m.mark}</p>
            <p className="display mt-1.5 text-[16px] leading-[1.14] md:text-[15px] lg:text-[17px]">{m.title}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
