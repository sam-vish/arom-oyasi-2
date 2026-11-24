import Image from "next/image";
import { LoopVideo } from "@/components/LoopVideo";
import { VoiceLine } from "@/components/home/VoiceLine";
import { ButtonLink, Index, PageHeader, Pending, TextLink } from "@/components/ui";
import { bio, ministries, timeline } from "@/content/words";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Apostle Arome Osayi",
  description:
    "The story and apostolic mandate of Arome Osayi, founder of Remnant Christian Network (RCN), headquartered in Makurdi, Nigeria.",
  path: "/about",
  ogLabel: "About Apostle Arome Osayi",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About"
        title={
          <>
            About Apostle <em>Arome Osayi</em>
          </>
        }
        intro={site.descriptor}
      />

      <section aria-label="Biography" className="py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <figure className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <LoopVideo name="v-apostle" priority mediaClassName="ink-print" className="group relative aspect-[4/5] rounded-[3px] bg-paper-2" objectPosition="50% 20%" />
              <figcaption className="kicker mt-3 flex items-center gap-3 text-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-copper" />
                Marching Orders Conference
              </figcaption>
            </div>
          </figure>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="display text-[clamp(26px,2.52vw,38px)] leading-[1.14]" data-reveal>
              A servant of the Lord Jesus Christ, committed to seeing the church established by the present truth and power of the Holy Spirit.
            </p>
            <div className="prose-voice mt-12 max-w-[64ch] text-[18px] leading-[1.8] text-ink-soft first-letter:float-left first-letter:mt-2 first-letter:mr-3 first-letter:text-[60px] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-copper">
              {bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="timeline-title" className="border-t border-rule py-20 md:py-28">
        <div className="wrap">
          <Index n="01" className="mb-12">
            <span id="timeline-title">A life, as a line of sound</span>
          </Index>
          <VoiceLine />
          <ol className="mt-16 grid gap-x-10 gap-y-12 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((m, i) => (
              <li key={m.mark} data-reveal style={{ ["--d" as string]: i % 4 }}>
                <p className={`kicker ${i === 2 ? "text-copper" : "text-muted"}`}>{m.mark}</p>
                <h3 className="display mt-2 text-[22px] leading-[1.14]">{m.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mission + scripture */}
      <section aria-labelledby="mission-title" className="bg-night text-bone">
        <div className="wrap grid gap-14 py-24 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Index n="02" tone="night" className="mb-10">
              <span id="mission-title">Mission statement</span>
            </Index>
            <p className="display text-[clamp(35px,4.44vw,74px)]" data-reveal>
              Towards the rebirth of an <em>Apostolic</em> Christianity
            </p>
          </div>
          <figure className="self-end border-l border-gold pl-6 lg:col-span-4 lg:col-start-9" data-reveal>
            <blockquote className="display text-[clamp(19px,1.63vw,24px)] leading-[1.2] italic">
              And the remnant that is escaped of the house of Judah shall again take root downward, and bear fruit upward.
            </blockquote>
            <figcaption className="kicker mt-5 text-bone-muted">Isaiah 37:31 (KJV) · the Network&rsquo;s divine policy direction</figcaption>
            <Pending tone="night" className="mt-4">
              the translation the ministry uses for this verse
            </Pending>
          </figure>
        </div>
      </section>

      {/* Family */}
      <section aria-labelledby="family-title" className="py-20 md:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="group relative aspect-[407/429] w-full max-w-[420px] overflow-hidden rounded-[3px] bg-paper-2 lg:col-span-4">
            <Image src="/images/photos/with-wife.jpg" alt="Apostle Arome Osayi and Reverend Mrs Dinna Osayi" fill sizes="420px" className="ink-print object-cover object-top" />
          </div>
          <div className="lg:col-span-6 lg:col-start-6">
            <Index n="03" className="mb-8">
              Family
            </Index>
            <h2 id="family-title" className="display text-[clamp(35px,3.7vw,59px)]">
              Husband and father
            </h2>
            <p className="mt-6 text-lg text-ink-soft">He is married to Reverend Mrs Dinna Osayi, and they have three children.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/invite">Invite the Apostle</ButtonLink>
              <ButtonLink href="/messages" variant="line">
                Watch his messages
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="arms-title" className="border-t border-rule py-20 md:py-28">
        <div className="wrap">
          <Index n="04" className="mb-10">
            The ministry
          </Index>
          <h2 id="arms-title" className="display text-[clamp(35px,3.7vw,59px)]">
            One mandate, three arms
          </h2>
          <div className="mt-14 grid border-t border-ink md:grid-cols-3">
            {ministries.map((m, i) => (
              <article key={m.name} className="border-b border-rule py-10 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="kicker text-muted">
                  <span className="text-copper">{String(i + 1).padStart(2, "0")}</span> · {m.short}
                </p>
                <h3 className="display mt-4 text-[27px] leading-[1.14]">{m.name}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{m.body}</p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
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
    </>
  );
}
