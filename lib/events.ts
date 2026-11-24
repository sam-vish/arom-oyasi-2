import "server-only";
import { sbSelect, supabaseEnabled } from "./supabase";

export type MinistryEvent = {
  id: string;
  title: string;
  date_start: string; // YYYY-MM-DD
  date_end?: string | null;
  city: string;
  country: string;
  venue?: string | null;
  host?: string | null;
  register_url?: string | null;
  livestream_url?: string | null;
};

/**
 * Upcoming, published events. The team edits these in Supabase (table `events`);
 * nothing is hard-coded, so the itinerary never shows invented dates.
 */
export async function getUpcomingEvents(limit = 24): Promise<MinistryEvent[]> {
  if (!supabaseEnabled) return [];
  const today = new Date().toISOString().slice(0, 10);
  try {
    return await sbSelect<MinistryEvent>(
      "events",
      `select=*&is_published=eq.true&or=(date_end.gte.${today},and(date_end.is.null,date_start.gte.${today}))&order=date_start.asc&limit=${limit}`,
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function formatEventDate(e: Pick<MinistryEvent, "date_start" | "date_end">) {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", timeZone: "UTC" };
  const start = new Date(e.date_start + "T00:00:00Z");
  const year = start.getUTCFullYear();
  if (e.date_end && e.date_end !== e.date_start) {
    const end = new Date(e.date_end + "T00:00:00Z");
    return `${start.toLocaleDateString("en-GB", opts)} to ${end.toLocaleDateString("en-GB", opts)} ${year}`;
  }
  return `${start.toLocaleDateString("en-GB", opts)} ${year}`;
}
