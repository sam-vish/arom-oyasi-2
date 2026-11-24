"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Muted, looping footage that behaves: the poster paints first, the video fades in once it is
 * actually playing, it only plays while on screen, and it never loads at all for reduced-motion
 * or data-saver visitors. Files: /public/video/<name>.{webm,mp4} + <name>-poster.jpg.
 *
 * `as="span"` lets it sit inside a line of text (the inline "pills").
 */
type Props = {
  name: string;
  /** Portrait variant for phones (<768px), e.g. "hero-mobile". */
  mobileName?: string;
  className?: string;
  /** Classes for the <img> and <video> themselves (e.g. "ink-print"). */
  mediaClassName?: string;
  priority?: boolean;
  objectPosition?: string;
  onTime?: (t: number) => void;
  as?: "div" | "span";
  children?: ReactNode;
};

export function LoopVideo({
  name,
  mobileName,
  className = "relative",
  mediaClassName = "",
  priority,
  objectPosition = "50% 50%",
  onTime,
  as: Tag = "div",
  children,
}: Props) {
  const wrap = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = video.current;
    const el = wrap.current;
    if (!v || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced || conn?.saveData) return;

    const useMobile = mobileName && window.matchMedia("(max-width: 767px)").matches;
    const base = `/video/${useMobile ? mobileName : name}`;
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      const webm = document.createElement("source");
      webm.src = `${base}.webm`;
      webm.type = "video/webm";
      const mp4 = document.createElement("source");
      mp4.src = `${base}.mp4`;
      mp4.type = "video/mp4";
      v.append(webm, mp4);
      v.load();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: priority ? "0px" : "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [name, mobileName, priority]);

  const poster = `/video/${name}-poster.jpg`;
  return (
    <Tag ref={wrap as never} className={`overflow-hidden ${className}`}>
      <picture>
        {mobileName && <source media="(max-width: 767px)" srcSet={`/video/${mobileName}-poster.jpg`} />}
        <img
          src={poster}
          alt=""
          aria-hidden
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover ${mediaClassName}`}
          style={{ objectPosition }}
        />
      </picture>
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        onTimeUpdate={onTime ? (e) => onTime(e.currentTarget.currentTime) : undefined}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"} ${mediaClassName}`}
        style={{ objectPosition }}
      />
      {children}
    </Tag>
  );
}

/** A small rounded loop that sits inside a sentence, at the size of the type around it.
 *  Purely decorative (hidden from screen readers) so it never interrupts the sentence. */
export function Pill({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden>
      <LoopVideo
        as="span"
        name={name}
        mediaClassName="ink-print"
        className={`group relative mx-[0.12em] inline-block h-[0.74em] w-[1.85em] translate-y-[0.06em] rounded-full bg-ink/10 align-baseline ${className}`}
      />
    </span>
  );
}

/** The live/now-playing glyph: four bars breathing. */
export function Wave({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`wave ${className}`}>
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
