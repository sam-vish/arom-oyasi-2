import { FeatureMessage, MessageRow } from "../media";
import { Index, TextLink } from "../ui";
import { Wave } from "../LoopVideo";
import { JsonLd } from "../JsonLd";
import { links } from "@/content/site";
import { quotes } from "@/content/words";
import { tidyTitle, type Video } from "@/lib/youtube";

/**
 * Latest messages as a broadcast: the newest on the big screen, the next four as a programme
 * listing, and his words crawling slowly along the bottom like a ticker (pauses under the cursor).
 */
export function Broadcast({ videos }: { videos: Video[] }) {
  const [latest, ...rest] = videos;
  if (!latest) return null;

  return (
    <section aria-labelledby="latest-title" className="bg-night text-bone">
      <div className="wrap pt-24 md:pt-32">
        <Index n="02" tone="night" className="mb-12">
          <span className="inline-flex items-center gap-3">
            <Wave className="text-gold" />
            <span id="latest-title">Now showing · Latest messages</span>
          </span>
        </Index>

        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <FeatureMessage video={latest} />
          </div>
          <div className="lg:col-span-5" data-reveal style={{ ["--d" as string]: 1 }}>
            <p className="kicker text-bone-muted">Also new</p>
            <div className="mt-2 border-t border-rule-night">
              {rest.slice(0, 4).map((v) => (
                <MessageRow key={v.id} video={v} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink href="/messages" tone="night">
                All messages and series
              </TextLink>
              <TextLink href={links.youtubeSubscribe} tone="night">
                Subscribe on YouTube
              </TextLink>
            </div>
          </div>
        </div>
      </div>

      {/* The crawl. Duplicated once so the loop is seamless; the copy is hidden from screen readers. */}
      <div className="crawl-wrap mt-24 overflow-hidden border-t border-rule-night py-6 md:mt-32 md:py-7">
        <div className="crawl" style={{ ["--crawl-dur" as string]: "140s" }}>
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
              {quotes.map((q) => (
                <li key={q} className="flex items-center">
                  <span className="kicker px-6 text-gold">Arome Osayi</span>
                  <q className="display text-[clamp(18px,1.48vw,22px)] whitespace-nowrap text-bone/90 font-normal">{q}</q>
                  <span aria-hidden className="ml-10 h-1.5 w-1.5 rounded-full bg-bone/30" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <JsonLd
        data={videos.slice(0, 5).map((v) => ({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: tidyTitle(v.title),
          description: v.description?.slice(0, 300) || tidyTitle(v.title),
          thumbnailUrl: v.thumbnail,
          uploadDate: v.published,
          embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
          contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        }))}
      />
    </section>
  );
}
