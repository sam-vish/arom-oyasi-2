import Image from "next/image";
import { EventRow } from "@/components/media";
import { NewsletterForm } from "@/components/forms";
import { Index, PageHeader, TextLink } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { conferenceSeries, gallery } from "@/content/media";
import { SITE_URL } from "@/content/site";
import { itineraryIntro } from "@/content/words";
import { getUpcomingEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Itinerary: Where Apostle Arome Osayi Is Ministering",
  description: "Upcoming conferences, crusades and meetings with Apostle Arome Osayi.",
  path: "/itinerary",
  ogLabel: "Itinerary",
});

export default async function ItineraryPage() {
  const events = await getUpcomingEvents();

  return (
    <>
      <PageHeader
        kicker="Itinerary"
        video="v-faces"
        caption="Marching Orders Conference"
        title={
          <>
            Where the Apostle <em>is ministering</em>
          </>
        }
        intro={itineraryIntro}
      />

      <section aria-labelledby="upcoming-title" className="py-20 md:py-28">
        <div className="wrap">
          <Index n="01" className="mb-10">
            <span id="upcoming-title">Upcoming</span>
          </Index>
          {events.length ? (
            <ul className="border-t border-ink">
              {events.map((e) => (
                <EventRow key={e.id} e={e} />
              ))}
            </ul>
          ) : (
            <div className="grid gap-12 border-t border-ink pt-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="display text-[clamp(27px,2.66vw,41px)] leading-[1.14]">New dates are being confirmed.</p>
                <p className="mt-4 text-ink-soft">Join the list to hear first when the next meetings are announced.</p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <NewsletterForm source="itinerary" />
              </div>
            </div>
          )}
          <p className="mt-12 text-[15px] text-ink-soft">
            Want the Apostle at your church or conference? <TextLink href="/invite">Send an invitation</TextLink>
          </p>
        </div>
      </section>

      <section aria-labelledby="past-title" className="border-t border-rule bg-paper-2 py-20 md:py-28">
        <div className="wrap">
          <Index n="02" className="mb-10">
            Archive
          </Index>
          <h2 id="past-title" className="display text-[clamp(35px,3.7vw,59px)]">
            From past meetings
          </h2>
          <ul className="mt-12 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
            {gallery.map((g) => (
              <li key={g.src} className="group mb-3 break-inside-avoid overflow-hidden rounded-[2px] md:mb-4">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={g.width}
                  height={g.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  quality={60}
                  className="ink-print h-auto w-full"
                />
              </li>
            ))}
          </ul>

          <h3 className="kicker mt-16 text-muted">Watch past conferences</h3>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {conferenceSeries.map((s) => (
              <li key={s.id}>
                <TextLink href={`https://www.youtube.com/playlist?list=${s.id}`}>{s.title}</TextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {events.length > 0 && (
        <JsonLd
          data={events.map((e) => ({
            "@context": "https://schema.org",
            "@type": "Event",
            name: e.title,
            startDate: e.date_start,
            ...(e.date_end ? { endDate: e.date_end } : {}),
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: e.livestream_url ? "https://schema.org/MixedEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: e.venue || e.city,
              address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: e.country },
            },
            performer: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Apostle Arome Osayi" },
            organizer: { "@type": "Organization", name: e.host || "Remnant Christian Network" },
            ...(e.register_url ? { url: e.register_url } : {}),
          }))}
        />
      )}
    </>
  );
}
