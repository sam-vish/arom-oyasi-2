// Single source of truth for links, contact details and settings.
// Everything here was verified against the Apostle's own channels (Nov 2026).

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.aromeosayi.org";

export const site = {
  name: "Apostle Arome Osayi",
  shortName: "Arome Osayi",
  alternateName: "Dr Arome Osayi",
  mandate: "Towards the rebirth of Apostolic Christianity.",
  descriptor:
    "Apostle of the Lord Jesus Christ, husband, father, author, mentor, entrepreneur and philanthropist.",
  youtubeChannelId: "UCh6Sn6v_mdhwWTEpNvo5A4A",
  contact: {
    office:
      "RCN Embassy, Beside International Market, George Akume Way, Makurdi, Benue State, Nigeria",
    phone: "+1 312 721 5289",
    phoneHref: "tel:+13127215289",
    email: "info@aromeosayi.org",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=RCN+Embassy+George+Akume+Way+Makurdi+Benue+Nigeria",
  },
} as const;

export const socials = [
  { name: "YouTube", href: "https://www.youtube.com/@ApostleAromeOsayi", icon: "youtube" },
  { name: "Instagram", href: "https://www.instagram.com/apostlearome/", icon: "instagram" },
  { name: "Facebook", href: "https://www.facebook.com/ApostleArome", icon: "facebook" },
  { name: "X", href: "https://x.com/apostlearome", icon: "x" },
  { name: "Telegram", href: "https://t.me/apostlearome", icon: "telegram" },
] as const;

export const links = {
  youtube: "https://www.youtube.com/@ApostleAromeOsayi",
  youtubeSubscribe: "https://www.youtube.com/@ApostleAromeOsayi?sub_confirmation=1",
  youtubeLive: "https://www.youtube.com/@ApostleAromeOsayi/streams",
  telegram: "https://t.me/apostlearome",
  radio: "https://mixlr.com/remnant-christian-network",
  linktree: "https://linktr.ee/apostlearome",
  aaobooks: "https://aaobooks.com",
  distributorsLocal: "https://aaobooks.com/distributors/local",
  distributorsIntl: "https://aaobooks.com/distributors/international",
  rcnGlobal: "https://rcnglobal.org",
  rcnNorthAmerica: "https://rcnnorthamerica.com",
  adullam: "https://www.adullam.ng",
  voiceOfOne: "https://voiceofonetv.org",
  rcnAppIos: "https://apps.apple.com/app/id1597529578",
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Messages", href: "/messages" },
  { label: "Books", href: "/books" },
  { label: "Itinerary", href: "/itinerary" },
  { label: "Invite", href: "/invite" },
  { label: "Testimonies", href: "/testimonies" },
] as const;

export const footerQuickLinks = [
  { label: "RCN Global", href: links.rcnGlobal },
  { label: "RCN North America", href: links.rcnNorthAmerica },
  { label: "Adullam", href: links.adullam },
  { label: "Voice of One TV", href: links.voiceOfOne },
  { label: "aaobooks.com", href: links.aaobooks },
  { label: "RCN Online Radio", href: links.radio },
] as const;

/** Show "To confirm" markers in previews; set NEXT_PUBLIC_SHOW_PENDING=false for production. */
export const SHOW_PENDING = process.env.NEXT_PUBLIC_SHOW_PENDING !== "false";
