import "server-only";
import { site } from "@/content/site";

// V1: the public channel RSS feed (no API key). Revalidates every 30 minutes, so new uploads
// appear without a redeploy. V1.1 can swap in YouTube Data API v3 for durations + live status.

export type Video = {
  id: string;
  title: string;
  published: string; // ISO
  description: string;
  thumbnail: string;
  views?: number;
};

const REVALIDATE = 1800;

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function pick(block: string, re: RegExp) {
  const m = block.match(re);
  return m ? decode(m[1].trim()) : "";
}

function parseFeed(xml: string): Video[] {
  const entries = xml.split("<entry>").slice(1);
  return entries
    .map((e) => {
      const id = pick(e, /<yt:videoId>([^<]+)<\/yt:videoId>/);
      const views = Number(pick(e, /<media:statistics views="(\d+)"/)) || undefined;
      return {
        id,
        title: pick(e, /<title>([\s\S]*?)<\/title>/),
        published: pick(e, /<published>([^<]+)<\/published>/),
        description: pick(e, /<media:description>([\s\S]*?)<\/media:description>/),
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        views,
      };
    })
    .filter((v) => v.id);
}

async function fetchFeed(query: string): Promise<Video[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?${query}`, {
      next: { revalidate: REVALIDATE, tags: ["youtube"] },
    });
    if (!res.ok) return [];
    return parseFeed(await res.text());
  } catch {
    return [];
  }
}

export function getLatestVideos(limit = 15) {
  return fetchFeed(`channel_id=${site.youtubeChannelId}`).then((v) => v.slice(0, limit));
}

export async function getPlaylistPreview(playlistId: string) {
  const videos = await fetchFeed(`playlist_id=${playlistId}`);
  return { first: videos[0], count: videos.length };
}

/** Titles on the channel are often ALL CAPS; make them readable without changing words. */
export function tidyTitle(title: string) {
  const letters = title.replace(/[^A-Za-z]/g, "");
  const upper = letters.replace(/[^A-Z]/g, "").length;
  if (letters.length > 8 && upper / letters.length > 0.7) {
    const keepUpper = new Set(["RCN", "USA", "DMV", "IEC", "CMFI", "NAM", "UK", "II", "III", "TV", "DR."]);
    return title
      .toLowerCase()
      .split(/(\s+)/)
      .map((w) => {
        const up = w.toUpperCase();
        if (keepUpper.has(up)) return up;
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join("");
  }
  return title;
}

const SMALL = new Set(["a", "an", "and", "at", "by", "for", "in", "of", "on", "or", "the", "to", "with"]);
const KEEP_UPPER = new Set(["RCN", "USA", "DMV", "IEC", "CMFI", "NAM", "UK", "II", "III", "IV", "TV", "NYC", "DC"]);

function titleCaseIfShouting(seg: string) {
  const letters = seg.replace(/[^A-Za-z]/g, "");
  const upper = letters.replace(/[^A-Z]/g, "").length;
  if (letters.length < 3 || upper / letters.length < 0.7) return seg;
  return seg
    .toLowerCase()
    .split(/(\s+)/)
    .map((w, i) => {
      const up = w.toUpperCase();
      if (KEEP_UPPER.has(up)) return up;
      if (i > 0 && SMALL.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join("");
}

/**
 * Display title for the page: channel titles repeat the speaker and the date in pipe-separated
 * segments ("FESTIVAL OF GLORY 2026 | DAY 6 EVENING | Apostle Arome Osayi || 23 - 11 - 26").
 * The site already shows both, so drop those segments, de-shout the rest, join with " · ".
 * Words are never changed, only case and the redundant segments. (JSON-LD keeps the full title.)
 */
export function displayTitle(title: string) {
  const segs = title
    .split(/\s*\|+\s*/)
    .map((x) => x.replace(/\s+(with|by|ft\.?|featuring)\s+(apostle\s+)?(dr\.?\s+)?arome\s+osayi\s*$/i, "").trim())
    .filter((x) => x && !/^(apostle\s+)?(dr\.?\s+)?arome\s+osayi$/i.test(x) && !/^\d{1,2}\s*[-./]\s*\d{1,2}\s*[-./]\s*\d{2,4}$/.test(x));
  const out = (segs.length ? segs : [title]).map(titleCaseIfShouting).join(" · ");
  return out;
}

export function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
