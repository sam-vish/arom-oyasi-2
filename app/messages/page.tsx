import { MessageCard, SeriesRow } from "@/components/media";
import { ButtonLink, Index, PageHeader, TextLink } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { conferenceSeries, featuredSeries } from "@/content/media";
import { links } from "@/content/site";
import { getLatestVideos, getPlaylistPreview, tidyTitle } from "@/lib/youtube";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 1800;

export const metadata = pageMetadata({
  title: "Messages & Sermons, Apostle Arome Osayi",
  description: "Watch the latest messages, conferences and teaching series from Apostle Arome Osayi.",
  path: "/messages",
  ogLabel: "Messages & sermons",
});

export default async function MessagesPage() {
  const [videos, covers] = await Promise.all([getLatestVideos(15), Promise.all(featuredSeries.map((s) => getPlaylistPreview(s.id)))]);

  return (
    <>
      <PageHeader
        video="v-hall"
        caption="Marching Orders Conference"
        kicker="Messages"
        title={
          <>
            Watch, listen, and <em>go deeper</em>
          </>
        }
        intro="Every message lives on the Apostle's YouTube channel. Here are the newest, and the series worth starting with."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={links.youtubeSubscribe}>Subscribe on YouTube</ButtonLink>
          <ButtonLink href={links.youtubeLive} variant="line">
            Live and past streams
          </ButtonLink>
        </div>
      </PageHeader>

      <section aria-labelledby="new-title" className="py-20 md:py-28">
        <div className="wrap">
          <Index n="01" className="mb-12">
            <span id="new-title">Newest</span>
          </Index>
          {videos.length ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <MessageCard key={v.id} video={v} />
              ))}
            </div>
          ) : (
            <p className="text-ink-soft">
              Messages are loading from YouTube. <TextLink href={links.youtube}>Open the channel</TextLink>
            </p>
          )}
          <div className="mt-16 border-t border-rule pt-8">
            <TextLink href={links.youtube}>See every message on YouTube</TextLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="series-title" className="border-t border-rule bg-paper-2 py-20 md:py-28">
        <div className="wrap">
          <Index n="02" className="mb-10">
            Series
          </Index>
          <h2 id="series-title" className="display text-[clamp(35px,3.7vw,59px)]">
            Series to start with
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">Conferences and teaching series, in order, as playlists.</p>
          <div className="mt-12 border-t border-ink">
            {featuredSeries.map((s, i) => (
              <SeriesRow key={s.id} {...s} n={i + 1} cover={covers[i]?.first?.thumbnail} />
            ))}
          </div>

          <h3 className="kicker mt-20 text-muted">More conferences</h3>
          <ul className="mt-4 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
            {conferenceSeries.map((s) => (
              <li key={s.id} className="border-b border-rule">
                <a
                  href={`https://www.youtube.com/playlist?list=${s.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-between gap-4 py-4 pr-4 hover:text-copper"
                >
                  <span className="display text-[19px] leading-tight">{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="listen-title" className="py-20 md:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <h2 id="listen-title" className="display text-[clamp(35px,3.7vw,59px)] lg:col-span-4">
            Also listen on
          </h2>
          <ul className="border-t border-ink lg:col-span-7 lg:col-start-6">
            {[
              { name: "Telegram", note: "Sermons and audio, posted by the media team", href: links.telegram },
              { name: "RCN Online Radio", note: "Live and replayed on Mixlr", href: links.radio },
              { name: "YouTube", note: "Full services and conferences", href: links.youtube },
            ].map((l) => (
              <li key={l.name} className="border-b border-rule">
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between gap-6 py-6">
                  <span className="display text-[30px] leading-none transition-colors group-hover:text-copper">{l.name}</span>
                  <span className="text-right text-[14px] text-muted">{l.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: videos.slice(0, 10).map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "VideoObject",
              name: tidyTitle(v.title),
              description: v.description?.slice(0, 300) || tidyTitle(v.title),
              thumbnailUrl: v.thumbnail,
              uploadDate: v.published,
              embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
              contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
            },
          })),
        }}
      />
    </>
  );
}
