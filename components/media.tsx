import Image from "next/image";
import { PlayTrigger } from "./VideoModal";
import { displayTitle, formatDate, type Video } from "@/lib/youtube";
import { formatEventDate, type MinistryEvent } from "@/lib/events";
import { links } from "@/content/site";
import type { Tone } from "./ui";

export { BookCover } from "./BookCover";

function PlayDisc({ size = "md" }: { size?: "md" | "lg" }) {
  const s = size === "lg" ? "h-[72px] w-[72px] md:h-24 md:w-24" : "h-12 w-12";
  return (
    <span
      className={`grid ${s} place-items-center rounded-full bg-bone/90 text-ink backdrop-blur transition-[transform,background-color,color] duration-500 group-hover:scale-105 group-hover:bg-gold group-hover:text-ink`}
    >
      <svg viewBox="0 0 24 24" className={`${size === "lg" ? "h-6 w-6 md:h-7 md:w-7" : "h-4 w-4"} ml-1`} aria-hidden>
        <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
      </svg>
    </span>
  );
}

/** The big "now showing" message. */
export function FeatureMessage({ video, tone = "night" }: { video: Video; tone?: Tone }) {
  const title = displayTitle(video.title);
  return (
    <PlayTrigger id={video.id} title={title} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-[3px] bg-night-2">
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute inset-0 grid place-items-center">
          <PlayDisc size="lg" />
        </span>
      </div>
      <div className="mt-6 flex items-start justify-between gap-6">
        <h3 className={`display text-[clamp(24px,2.22vw,34px)] leading-[1.14] ${tone === "night" ? "text-bone" : "text-ink"}`}>{title}</h3>
        <p className={`kicker mt-2 shrink-0 ${tone === "night" ? "text-bone-muted" : "text-muted"}`}>{formatDate(video.published)}</p>
      </div>
    </PlayTrigger>
  );
}

/** A programme-listing row: date, title, a small frame that blooms into colour on hover. */
export function MessageRow({ video, tone = "night" }: { video: Video; tone?: Tone }) {
  const title = displayTitle(video.title);
  const night = tone === "night";
  return (
    <PlayTrigger
      id={video.id}
      title={title}
      className={`group grid grid-cols-[96px_1fr] items-center gap-5 border-b py-5 sm:grid-cols-[132px_1fr] ${night ? "border-rule-night" : "border-rule"}`}
    >
      <span className="relative block aspect-video overflow-hidden rounded-[2px] bg-night-2">
        <Image src={video.thumbnail} alt="" fill sizes="132px" className="ink-print object-cover" />
      </span>
      <span className="min-w-0">
        <span className={`kicker block ${night ? "text-bone-muted" : "text-muted"}`}>{formatDate(video.published)}</span>
        <span
          className={`display mt-1.5 line-clamp-2 block text-[16px] leading-[1.1] transition-colors duration-300 md:text-[18px] ${night ? "text-bone group-hover:text-gold" : "text-ink group-hover:text-copper"}`}
        >
          {title}
        </span>
      </span>
    </PlayTrigger>
  );
}

/** Grid card for the messages page. */
export function MessageCard({ video }: { video: Video }) {
  const title = displayTitle(video.title);
  return (
    <PlayTrigger id={video.id} title={title} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-[3px] bg-paper-2">
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="ink-print object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 bottom-3">
          <PlayDisc />
        </span>
      </div>
      <p className="kicker mt-4 text-muted">{formatDate(video.published)}</p>
      <h3 className="display mt-1.5 line-clamp-2 text-[18px] leading-[1.1] transition-colors group-hover:text-copper">{title}</h3>
    </PlayTrigger>
  );
}

export function SeriesRow({ id, title, note, cover, n }: { id: string; title: string; note?: string; cover?: string; n: number }) {
  return (
    <a
      href={`https://www.youtube.com/playlist?list=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-[28px_1fr_auto] items-center gap-4 border-b border-rule py-5 md:grid-cols-[48px_1fr_180px] md:gap-8"
    >
      <span className="kicker text-copper">{String(n).padStart(2, "0")}</span>
      <span>
        <span className="display block text-[clamp(22px,2.22vw,33px)] leading-[1.14] transition-colors group-hover:text-copper">{title}</span>
        {note && <span className="mt-1.5 block text-[15px] text-muted">{note}</span>}
      </span>
      <span className="relative hidden aspect-video overflow-hidden rounded-[2px] bg-paper-2 md:block">
        {cover && <Image src={cover} alt="" fill sizes="180px" className="ink-print object-cover" />}
      </span>
    </a>
  );
}

export function EventRow({ e }: { e: MinistryEvent }) {
  return (
    <li className="grid gap-3 border-b border-rule py-7 md:grid-cols-12 md:items-center md:gap-6">
      <p className="kicker text-copper md:col-span-3">{formatEventDate(e)}</p>
      <div className="md:col-span-6">
        <p className="display text-[24px] leading-[1.14]">{e.title}</p>
        <p className="mt-1.5 text-[15px] text-muted">
          {[e.venue, e.city, e.country].filter(Boolean).join(", ")}
          {e.host ? `. Hosted by ${e.host}` : ""}
        </p>
      </div>
      <div className="flex gap-3 md:col-span-3 md:justify-end">
        {e.register_url && (
          <a
            href={e.register_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-grad inline-flex min-h-11 items-center rounded-[3px] px-5 text-[12.5px] font-semibold tracking-[0.08em] uppercase"
          >
            Attend
          </a>
        )}
        <a
          href={e.livestream_url || links.youtubeLive}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-[3px] border border-ink/25 px-5 text-[12.5px] font-semibold tracking-[0.08em] uppercase hover:border-ink"
        >
          Watch live
        </a>
      </div>
    </li>
  );
}
