"use client";

import Link from "next/link";
import { useState } from "react";
import { LoopVideo, Wave } from "../LoopVideo";
import { PlayTrigger, useVideoModal } from "../VideoModal";
import { btnClass } from "../ui";
import { heroScenes } from "@/content/media";
import { links, site } from "@/content/site";
import type { Video } from "@/lib/youtube";

const tc = (s: number) => {
  const t = Math.max(0, Math.floor(s));
  return [Math.floor(t / 3600), Math.floor((t % 3600) / 60), t % 60].map((n) => String(n).padStart(2, "0")).join(":");
};

/**
 * The opening. Paper, his name, and between the two words a hairline that opens into footage,
 * like a mouth opening: the tongue that was loosened. Inside the band, a broadcast-style caption
 * names the message on screen and runs its real source timecode; one tap opens it at that moment.
 */
export function Opening({ latest, latestTitle }: { latest?: Video; latestTitle?: string }) {
  const [scene, setScene] = useState(0);
  const [time, setTime] = useState<number | null>(null);
  const { open } = useVideoModal();

  const onTime = (t: number) => {
    const i = heroScenes.findIndex((s) => t < s.until);
    if (i !== -1 && i !== scene) setScene(i);
    const sceneStart = i > 0 ? heroScenes[i - 1].until : 0;
    const s = heroScenes[i === -1 ? 0 : i];
    setTime(s.start + (t - sceneStart));
  };
  const s = heroScenes[scene];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[68px] md:pt-[76px]">
      <h1 id="hero-title" className="sr-only">
        Apostle Arome Osayi
      </h1>

      <div className="wrap flex items-end justify-between gap-6 pt-6 md:pt-8">
        <p className="kicker rise text-muted" style={{ animationDelay: "900ms" }}>
          Apostle of the Lord Jesus Christ
        </p>
        <p className="kicker rise hidden text-muted md:block" style={{ animationDelay: "1000ms" }}>
          Remnant Christian Network · Est. 2006
        </p>
      </div>

      <div aria-hidden className="wrap">
        <p
          className="rise -mb-[0.02em] text-[clamp(64px,12vw,216px)] leading-[0.84] font-semibold tracking-[-0.03em] uppercase"
          style={{ animationDelay: "1250ms" }}
        >
          Arome
        </p>
      </div>

      {/* The band. Full-bleed, hairline first, then it opens. */}
      <div className="relative mt-3 md:mt-4">
        <span aria-hidden className="opening-line absolute inset-x-0 top-1/2 z-10 h-px bg-ink" />
        <LoopVideo
          name="hero"
          mobileName="hero-mobile"
          priority
          onTime={onTime}
          objectPosition="50% 20%"
          className="opening relative h-[58svh] max-h-[680px] min-h-[320px] w-full md:h-[max(320px,calc(100svh-76px-2*min(12vw,216px)*0.86-112px))]"
        >
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-4 md:p-6">
            <button type="button" onClick={() => open(s.id, s.title, Math.floor(time ?? s.start))} className="group flex items-center gap-3 text-left text-bone">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-bone/40 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink md:h-12 md:w-12">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" aria-hidden>
                  <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
                </svg>
              </span>
              <span>
                <span className="kicker flex items-center gap-2 text-bone/70">
                  <Wave className="text-gold" /> On screen
                </span>
                <span key={s.title} className="fade-in display block text-[16px] leading-tight md:text-[19px]">
                  {s.title}
                </span>
                <span className="sr-only">, watch this moment</span>
              </span>
            </button>
            <span aria-hidden className="kicker hidden tabular-nums text-bone/70 sm:block">
              {time === null ? "" : `TC ${tc(time)}`}
            </span>
          </span>
        </LoopVideo>
      </div>

      <div aria-hidden className="wrap">
        <p
          className="rise mt-[0.04em] text-right text-[clamp(64px,12vw,216px)] leading-[0.84] font-semibold tracking-[-0.03em] uppercase"
          style={{ animationDelay: "1350ms" }}
        >
          Osayi
        </p>
      </div>

      {/* The mandate and the two doors. */}
      <div className="wrap grid gap-10 pt-10 pb-24 md:pt-14 md:pb-32 lg:grid-cols-12">
        <p className="display text-[clamp(24px,2.37vw,36px)] leading-[1.14] lg:col-span-6" data-reveal>
          {site.mandate.replace(/\.$/, "")}
          <span className="text-copper">.</span>
        </p>
        <div className="lg:col-span-5 lg:col-start-8" data-reveal style={{ ["--d" as string]: 1 }}>
          <p className="max-w-md text-[16px] leading-relaxed text-ink-soft">{site.descriptor}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {latest ? (
              <PlayTrigger id={latest.id} title={latestTitle ?? latest.title} label="Watch the latest message" className={btnClass("solid")}>
                <Wave />
                Watch the latest message
              </PlayTrigger>
            ) : (
              <a href={links.youtube} target="_blank" rel="noopener noreferrer" className={btnClass("solid")}>
                Watch on YouTube
              </a>
            )}
            <Link href="/itinerary" className={btnClass("line")}>
              Upcoming meetings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
