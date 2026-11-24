"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { testimonies } from "@/content/media";

/** First sentence(s) of a testimony, kept under ~240 characters, ending on a full stop. */
function excerpt(body: string) {
  const sentences = body.match(/[^.!?]+[.!?]+/g) ?? [body];
  let out = "";
  for (const s of sentences) {
    if (out && (out + s).length > 240) break;
    out += s;
  }
  return { text: out.trim(), cut: out.trim().length < body.trim().length };
}

const DUR = 11; // seconds per dispatch

/**
 * Testimonies as dispatches from the nations: the place as a dateline, the words in large type,
 * one at a time. A hairline timer advances them slowly; hovering or focusing pauses; the places
 * underneath are tabs. No autoplay for reduced motion.
 */
export function Dispatches() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = testimonies.length;

  useEffect(() => {
    // Autoplay only for people who haven't asked for less motion. Read after mount (window is client-only).
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      const id = requestAnimationFrame(() => setAuto(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  const t = testimonies[i];
  const ex = excerpt(t.body);

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = (i + d + n) % n;
    setI(next);
    tabs.current[next]?.focus();
  };

  return (
    <div onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div id="dispatch-panel" role="tabpanel" aria-labelledby={`dispatch-tab-${i}`} className="min-h-[340px] md:min-h-[380px]">
        <figure key={i} className="fade-in">
          <figcaption className="kicker flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            <span className="text-copper">{t.location}</span>
            <span aria-hidden className="h-px w-8 bg-rule" />
            <span>{t.name}</span>
          </figcaption>
          <blockquote className="display mt-6 text-[clamp(22px,2.29vw,37px)] leading-[1.1] tracking-[-0.015em]">
            <p>&ldquo;{ex.text}&rdquo;</p>
          </blockquote>
          {ex.cut && (
            <Link href="/testimonies" className="kicker mt-6 inline-flex items-center gap-2 text-ink hover:text-copper">
              Read the full testimony <span aria-hidden>→</span>
            </Link>
          )}
        </figure>
      </div>

      <div className="relative mt-10 h-px bg-rule">
        {auto && (
          <span
            key={i}
            aria-hidden
            data-paused={paused}
            onAnimationEnd={() => setI((x) => (x + 1) % n)}
            className="timer absolute inset-0 bg-ink"
            style={{ ["--dur" as string]: `${DUR}s` }}
          />
        )}
      </div>

      <div role="tablist" aria-label="Testimonies by place" className="mt-5 flex flex-wrap gap-x-1 gap-y-1" onKeyDown={onKey}>
        {testimonies.map((x, k) => (
          <button
            key={x.name}
            ref={(el) => {
              tabs.current[k] = el;
            }}
            id={`dispatch-tab-${k}`}
            role="tab"
            aria-selected={k === i}
            aria-controls="dispatch-panel"
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            className={`kicker min-h-11 rounded-full px-3.5 transition-colors ${k === i ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
          >
            {x.location}
          </button>
        ))}
      </div>
    </div>
  );
}
