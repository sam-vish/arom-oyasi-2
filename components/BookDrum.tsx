"use client";

import { useEffect, useRef, useState } from "react";
import { BookCover } from "./BookCover";
import { links } from "@/content/site";
import type { Book } from "@/content/books";

/**
 * The books, rolling slowly on a drum: covers travel right-to-left around a shallow cylinder,
 * turning away as they near the edges. Hover pauses it, drag spins it, arrows step one title,
 * and keyboard focus brings the focused book to the front. The title in front is named below.
 * Reduced motion: it holds still until someone moves it.
 */
const SPEED = 30; // px per second at rest

export function BookDrum({ books }: { books: Book[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);
  const api = useRef<{ step: (dir: number) => void; focus: (i: number) => void }>({ step: () => {}, focus: () => {} });
  const [front, setFront] = useState(0);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const n = books.length;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, w = 0, step = 0, S = 0;
    const measure = () => {
      W = el.clientWidth;
      w = items.current[0]?.offsetWidth || 180;
      step = w * 1.16;
      S = n * step;
    };
    measure();

    // Start with the first book in front.
    let offset = -(W / 2 - w / 2);
    let speed = reduced ? 0 : SPEED;
    let hovering = false;
    let target: number | null = null; // offset we're easing toward after a nudge
    let idleUntil = 0; // autoplay resumes after this timestamp
    let drag: { x: number; o: number; moved: number; v: number; t: number } | null = null;
    let lastFront = -1;
    let visible = false;
    let raf = 0;
    let last = performance.now();

    const mod = (a: number, m: number) => ((a % m) + m) % m;
    const xOf = (i: number) => mod(i * step - offset + step * 2, S) - step * 2;

    const render = () => {
      const R = W / 2 / Math.sin(1);
      let best = 0, bestD = Infinity;
      for (let i = 0; i < n; i++) {
        const it = items.current[i];
        if (!it) continue;
        const x = xOf(i);
        const c = x + w / 2 - W / 2;
        const u = c / (W / 2); // -1 at left edge, 1 at right edge
        const theta = Math.max(-1.5, Math.min(1.5, u)); // radians around the drum
        const X = W / 2 + R * Math.sin(theta) - w / 2;
        const Z = -R * (1 - Math.cos(theta)) * 0.55;
        const rot = (theta * 180) / Math.PI * 0.85;
        const a = Math.abs(theta);
        const op = a > 1.35 ? Math.max(0, 1 - (a - 1.35) / 0.15) : 1;
        it.style.transform = `translate3d(${X.toFixed(1)}px,0,${Z.toFixed(1)}px) rotateY(${rot.toFixed(2)}deg)`;
        it.style.opacity = String(op * (1 - Math.min(0.45, a * a * 0.22)));
        it.style.zIndex = String(100 - Math.round(a * 40));
        it.style.visibility = op <= 0 ? "hidden" : "visible";
        const d = Math.abs(c);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (best !== lastFront) {
        lastFront = best;
        setFront(best);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!drag) {
        if (target !== null) {
          offset += (target - offset) * Math.min(1, dt * 6);
          if (Math.abs(target - offset) < 0.5) {
            offset = target;
            target = null;
          }
        } else {
          const want = reduced || hovering || now < idleUntil ? 0 : SPEED;
          speed += (want - speed) * Math.min(1, dt * 3);
          offset += speed * dt;
        }
      }
      render();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    // Offset that puts book i exactly in front, via the shortest way round.
    const offsetFor = (i: number) => {
      const c = xOf(i) + w / 2 - W / 2;
      return offset + c;
    };
    api.current.step = (dir) => {
      const cur = lastFront < 0 ? 0 : lastFront;
      target = offsetFor(mod(cur + dir, n));
      // Keep direction honest when the wrap makes the shortest path the other way.
      if (Math.sign(target - offset) !== dir && Math.abs(target - offset) > 1) target += dir * S;
      idleUntil = performance.now() + 4000;
      start();
    };
    api.current.focus = (i) => {
      target = offsetFor(i);
      idleUntil = performance.now() + 4000;
      start();
    };

    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag = { x: e.clientX, o: offset, moved: 0, v: 0, t: performance.now() };
      target = null;
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4 && !el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId);
      const now = performance.now();
      const prev = offset;
      offset = drag.o - dx;
      drag.v = (offset - prev) / Math.max(1, now - drag.t);
      drag.t = now;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
    };
    const onUp = (e: PointerEvent) => {
      if (!drag) return;
      const wasDrag = drag.moved > 6;
      if (wasDrag) {
        // A short glide in the direction of the throw, then settle on the nearest book.
        offset += drag.v * 180;
        render();
        target = offsetFor(lastFront);
        idleUntil = performance.now() + 4000;
        const stopClick = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        el.addEventListener("click", stopClick, { capture: true, once: true });
        setTimeout(() => el.removeEventListener("click", stopClick, { capture: true }), 0);
      }
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      drag = null;
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    const ro = new ResizeObserver(() => {
      measure();
      render();
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(el);
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [books]);

  const b = books[front];

  return (
    <div>
      <div
        ref={stage}
        className="relative h-[calc(var(--w)*1.5+40px)] cursor-grab touch-pan-y overflow-hidden select-none [--w:150px] [perspective:1400px] active:cursor-grabbing md:[--w:210px]"
      >
        <ul className="absolute inset-x-0 top-5 [transform-style:preserve-3d]">
          {books.map((book, i) => (
            <li key={book.slug} className="[transform-style:preserve-3d]">
              <a
                ref={(el) => {
                  items.current[i] = el;
                }}
                href={links.aaobooks}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                onFocus={() => api.current.focus(i)}
                aria-label={`${book.title}${book.subtitle ? `: ${book.subtitle}` : ""}, get it on aaobooks.com`}
                className="absolute top-0 left-0 block w-[var(--w)] will-change-transform"
                style={{ transform: `translateX(calc(${i} * var(--w) * 1.16))` }}
              >
                <BookCover book={book} sizes="(min-width: 768px) 210px, 150px" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap mt-8 grid items-start gap-6 md:grid-cols-[1fr_auto]">
        <div className="min-h-[92px] text-center md:text-left" aria-hidden>
          <p className="kicker text-muted">
            <span className="text-copper">{String(front + 1).padStart(2, "0")}</span> / {String(books.length).padStart(2, "0")}
            {b.series ? ` · ${b.series}` : ""}
          </p>
          <p key={b.slug} className="fade-in display mt-2 text-[clamp(22px,2.22vw,30px)] leading-[1.14]">
            {b.title}
            {b.subtitle && <span className="text-muted">, {b.subtitle}</span>}
          </p>
        </div>
        <div className="flex justify-center gap-2">
          {[
            { dir: -1, label: "Previous book", d: "M10 3L5 8l5 5" },
            { dir: 1, label: "Next book", d: "M6 3l5 5-5 5" },
          ].map((a) => (
            <button
              key={a.dir}
              type="button"
              onClick={() => api.current.step(a.dir)}
              aria-label={a.label}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                <path d={a.d} fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
