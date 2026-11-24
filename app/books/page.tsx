import { BookCover } from "@/components/media";
import { BookDrum } from "@/components/BookDrum";
import { ButtonLink, Index, PageHeader, Pending, TextLink } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { books } from "@/content/books";
import { SITE_URL, links } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Books by Apostle Arome Osayi",
  description: "Kingdom Recalibration, Godward, The Science of Altars and more. Order official copies.",
  path: "/books",
  ogLabel: "Books by Apostle Arome Osayi",
});

export default function BooksPage() {
  return (
    <>
      <PageHeader
        kicker="Books"
        title={
          <>
            Books by <em>Arome Osayi</em>
          </>
        }
        intro="Thirteen titles on prayer, ministry, the marketplace and the Kingdom. Every book is ordered through the official store, aaobooks.com."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={links.aaobooks}>Shop on aaobooks.com</ButtonLink>
          <ButtonLink href={links.distributorsLocal} variant="line">
            Distributors in Nigeria
          </ButtonLink>
          <ButtonLink href={links.distributorsIntl} variant="line">
            International distributors
          </ButtonLink>
        </div>
      </PageHeader>

      <section aria-label="The shelf, rolling" className="overflow-hidden bg-paper-2 py-16 md:py-24">
        <BookDrum books={books} />
      </section>

      <section aria-labelledby="titles-title" className="py-20 md:py-28">
        <div className="wrap">
          <Index n="01" className="mb-10">
            <span id="titles-title">All titles</span>
          </Index>
          <Pending className="mb-12">a one-line description for each title, from aaobooks.com or the publisher</Pending>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {books.map((b, i) => (
              <li key={b.slug} data-reveal style={{ ["--d" as string]: i % 5 }}>
                <article>
                  <a href={links.aaobooks} target="_blank" rel="noopener noreferrer" aria-label={`Get ${b.title} on aaobooks.com`} className="group block">
                    <BookCover book={b} sizes="(min-width: 1280px) 220px, (min-width: 640px) 30vw, 45vw" className="transition-transform duration-700 group-hover:-translate-y-2" />
                  </a>
                  <p className="kicker mt-5 text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="display mt-1 text-[19px] leading-[1.14]">{b.title}</h2>
                  {b.subtitle && <p className="mt-1.5 text-[14px] leading-snug text-muted">{b.subtitle}</p>}
                  {b.series && <p className="kicker mt-2 text-copper">{b.series}</p>}
                  {b.blurb && <p className="mt-3 text-[15px] text-ink-soft">{b.blurb}</p>}
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule bg-paper-2 py-16">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="display max-w-2xl text-[clamp(24px,2.22vw,33px)] leading-[1.14]">Prefer to listen? Look for the Apostle&rsquo;s books on Audible.</p>
          <TextLink href="https://www.audible.com/search?searchAuthor=Arome+Osayi">Find them on Audible</TextLink>
        </div>
      </section>

      <JsonLd
        data={books.map((b) => ({
          "@context": "https://schema.org",
          "@type": "Book",
          name: b.subtitle ? `${b.title}: ${b.subtitle}` : b.title,
          author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Arome Osayi" },
          image: `${SITE_URL}${b.cover}`,
          url: links.aaobooks,
          ...(b.series ? { isPartOf: { "@type": "BookSeries", name: "Kingdom Advance Series" } } : {}),
        }))}
      />
    </>
  );
}
