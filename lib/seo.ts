import type { Metadata } from "next";
import { SITE_URL, site, socials, links } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Short label printed on the generated share image. */
  ogLabel?: string;
  absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, ogLabel, absoluteTitle }: PageMeta): Metadata {
  const og = `/og?title=${encodeURIComponent(ogLabel ?? title)}`;
  // PRD titles already carry his name; only append it when a title doesn't.
  const fullTitle = absoluteTitle || title.includes("Arome Osayi") ? title : `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title,
      description,
      images: [{ url: og, width: 1200, height: 630, alt: title }],
      locale: "en",
    },
    twitter: {
      card: "summary_large_image",
      site: "@apostlearome",
      title,
      description,
      images: [og],
    },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Arome Osayi",
  alternateName: ["Apostle Arome Osayi", site.alternateName],
  honorificPrefix: "Apostle",
  jobTitle: "Apostle",
  description: site.descriptor,
  birthDate: "1977-12-02",
  birthPlace: { "@type": "Place", name: "Makurdi, Benue State, Nigeria" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Benue State University, Makurdi" },
  url: SITE_URL,
  image: `${SITE_URL}/images/photos/portrait-gold.jpg`,
  worksFor: { "@id": `${SITE_URL}/#rcn` },
  founder: { "@id": `${SITE_URL}/#rcn` },
  sameAs: [...socials.map((s) => s.href), links.aaobooks],
};

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#rcn`,
  name: "Remnant Christian Network",
  alternateName: "RCN",
  url: links.rcnGlobal,
  foundingDate: "2006-12",
  founder: { "@id": `${SITE_URL}/#person` },
  address: {
    "@type": "PostalAddress",
    streetAddress: "RCN Embassy, Beside International Market, George Akume Way",
    addressLocality: "Makurdi",
    addressRegion: "Benue State",
    addressCountry: "NG",
  },
  sameAs: [links.rcnGlobal, links.rcnNorthAmerica],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.name,
  publisher: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en",
};
