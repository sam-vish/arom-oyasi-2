import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoModalProvider } from "@/components/VideoModal";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Reveal } from "@/components/Reveal";
import { SITE_URL, site } from "@/content/site";
import { orgJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";

// The original site's typeface, used for everything.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name}: Official Website`, template: `%s | ${site.name}` },
  description:
    "Messages, books and itinerary of Apostle Arome Osayi, Set Man of Remnant Christian Network. Towards the rebirth of Apostolic Christianity.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ede8de",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Marks the page as scripted before first paint, so reveal-on-view never hides content without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      {/* Extensions such as Grammarly add attributes to <body> before React loads; ignore those. */}
      <body suppressHydrationWarning>
        <JsonLd data={[personJsonLd, orgJsonLd, websiteJsonLd]} />
        <VideoModalProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </VideoModalProvider>
        <Reveal />
        <SmoothScroll />
        <Analytics />
      </body>
    </html>
  );
}
