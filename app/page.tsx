import Link from "next/link";
import { Opening } from "@/components/home/Opening";
import { Mandate } from "@/components/home/Mandate";
import { Broadcast } from "@/components/home/Broadcast";
import { VoiceLine } from "@/components/home/VoiceLine";
import { Dispatches } from "@/components/home/Dispatches";
import { BookDrum } from "@/components/BookDrum";
import { LoopVideo, Pill } from "@/components/LoopVideo";
import { EventRow } from "@/components/media";
import { NewsletterForm } from "@/components/forms";
import { ButtonLink, Index, Pending, TextLink } from "@/components/ui";
import { books } from "@/content/books";
import { links } from "@/content/site";
import { bio, ministries } from "@/content/words";
import { displayTitle, getLatestVideos } from "@/lib/youtube";
import { getUpcomingEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 1800;

export const metadata = pageMetadata({
  title: "Apostle Arome Osayi: Official Website",
  absoluteTitle: true,
  description:
    "Messages, books and itinerary of Apostle Arome Osayi, Set Man of Remnant Christian Network. Towards the rebirth of Apostolic Christianity.",
  path: "/",
  ogLabel: "Towards the rebirth of Apostolic Christianity",
});

export default async function Home() {
  const [videos, events] = await Promise.all([getLatestVideos(7), getUpcomingEvents(3)]);
  const latest = videos[0];

  return (
    <>
      <Opening latest={latest} latestTitle={latest ? displayTitle(latest.title) : undefined} />

      <Mandate />

      <Broadcast videos={videos} />

      {/* 03 · The voice: his story as a line of sound */}
      <section aria-labelledby="voice-title" className="py-24 md:py-36">
        <div className="wrap">
          <Index n="03" className="mb-12 md:mb-16">
            The voice
          </Index>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 id="voice-title" className="display text-[clamp(35px,4.14vw,68px)]" data-reveal>
                Born with his speech impaired. Called to be <em className="text-copper">God&rsquo;s mouthpiece</em> to the nations.
              </h2>
              <p className="mt-8 max-w-[60ch] text-[18px] leading-[1.75] text-ink-soft" data-reveal>
                {bio[1]}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3" data-reveal>
                <TextLink href="/about">Read his story</TextLink>
                <TextLink href="/invite">Invite the Apostle</TextLink>
              </div>
            </div>
            <figure className="lg:col-span-4 lg:col-start-9" data-reveal style={{ ["--d" as string]: 2 }}>
              <LoopVideo name="v-apostle" mediaClassName="ink-print" className="group relative aspect-[4/5] rounded-[3px] bg-paper-2" objectPosition="50% 20%" />
              <figcaption className="kicker mt-3 flex items-center gap-3 text-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-copper" />
                Marching Orders Conference
              </figcaption>
            </figure>
          </div>
          <div className="mt-20 md:mt-28">
            <VoiceLine />
          </div>
        </div>
      </section>

      {/* 04 · Books, rolling */}
      <section aria-labelledby="books-title" className="overflow-hidden border-y border-rule bg-paper-2 py-24 md:py-32">
        <div className="wrap">
          <Index n="04" className="mb-12">
            Books
          </Index>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <h2 id="books-title" className="display max-w-3xl text-[clamp(35px,4.14vw,68px)]" data-reveal>
              Thirteen books on prayer, ministry and the Kingdom.
            </h2>
            <div className="flex flex-wrap gap-3" data-reveal>
              <ButtonLink href={links.aaobooks}>Get the books</ButtonLink>
              <ButtonLink href="/books" variant="line">
                Browse titles
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="mt-14 md:mt-20">
          <BookDrum books={books} />
        </div>
      </section>

      {/* 05 · Testimonies */}
      <section aria-labelledby="testimonies-title" className="py-24 md:py-36">
        <div className="wrap">
          <Index n="05" className="mb-12 md:mb-16">
            Testimonies
          </Index>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="testimonies-title" className="display text-[clamp(35px,3.7vw,59px)]" data-reveal>
                What God has done.
              </h2>
              <p className="mt-6 max-w-sm text-ink-soft" data-reveal>
                Shared from the Midlands to Johannesburg, during seasons of fasting and prayer and after the Word was taught.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3" data-reveal>
                <TextLink href="/testimonies">Read them in full</TextLink>
                <TextLink href="/testimonies#share">Share yours</TextLink>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Dispatches />
            </div>
          </div>
        </div>
      </section>

      {/* 06 · The ministry */}
      <section aria-labelledby="arms-title" className="border-t border-rule py-24 md:py-36">
        <div className="wrap">
          <Index n="06" className="mb-12 md:mb-16">
            The ministry
          </Index>
          <h2 id="arms-title" className="display text-[clamp(35px,4.14vw,68px)]" data-reveal>
            One mandate <Pill name="p-light" /> three arms.
          </h2>
          <div className="mt-16 grid border-t border-ink md:grid-cols-3">
            {ministries.map((m, i) => (
              <article
                key={m.name}
                className="border-b border-rule py-10 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                data-reveal
                style={{ ["--d" as string]: i }}
              >
                <p className="kicker text-muted">
                  <span className="text-copper">{String(i + 1).padStart(2, "0")}</span> · {m.short}
                </p>
                <h3 className="display mt-4 text-[30px] leading-[1.14]">{m.name}</h3>
                <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">{m.body}</p>
                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                  {m.links.map((l) => (
                    <li key={l.href}>
                      <TextLink href={l.href}>{l.label}</TextLink>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07 · Meetings + the gift */}
      <section aria-labelledby="itinerary-title" className="border-t border-rule bg-paper-2 py-24 md:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Index n="07" className="mb-10">
              Itinerary
            </Index>
            <h2 id="itinerary-title" className="display text-[clamp(32px,3.4vw,53px)]" data-reveal>
              Upcoming meetings
            </h2>
            {events.length ? (
              <ul className="mt-10 border-t border-rule">
                {events.map((e) => (
                  <EventRow key={e.id} e={e} />
                ))}
              </ul>
            ) : (
              <p className="mt-6 max-w-md text-ink-soft" data-reveal>
                New dates are being confirmed. Join the list and you&rsquo;ll hear first when the next meetings are announced.
              </p>
            )}
            <TextLink href="/itinerary" className="mt-8">
              Full itinerary
            </TextLink>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Index n="08" className="mb-10">
              A gift for you
            </Index>
            <p className="display text-[clamp(26px,2.22vw,33px)] leading-[1.14]" data-reveal>
              Join the list and receive a free chapter from one of the Apostle&rsquo;s books.
            </p>
            <Pending className="mt-5">which book or chapter the team will give away</Pending>
            <div className="mt-8">
              <NewsletterForm source="gift" />
            </div>
          </div>
        </div>
      </section>

      {/* Two doors: invite, partner */}
      <section aria-label="Invite or partner" className="grid bg-night md:grid-cols-2">
        {[
          { href: "/invite", video: "invite", title: "Invite the Apostle", body: "To your church program, conference or crusade.", cta: "Send an invitation" },
          { href: "/partner", video: "v-petals", title: "Become a Kingdom Financier", body: "Stand with the mission through giving and prayer.", cta: "Partner with us" },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="group relative block min-h-[460px] overflow-hidden text-bone md:min-h-[620px]">
            <LoopVideo name={c.video} className="absolute inset-0 transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]" />
            <span className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/10" />
            <span className="absolute inset-x-0 bottom-0 p-8 md:p-12">
              <span className="display block text-[clamp(32px,3.26vw,53px)] leading-[1.06]">{c.title}</span>
              <span className="mt-3 block max-w-sm text-bone/80">{c.body}</span>
              <span className="mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-[3px] border border-bone/40 px-6 text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                {c.cta}
              </span>
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
