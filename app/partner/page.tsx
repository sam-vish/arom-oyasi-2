import { PartnerForm } from "@/components/forms";
import { RegionTabs } from "@/components/RegionTabs";
import { Index, PageHeader } from "@/components/ui";
import { partnerCopy } from "@/content/words";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partner with Apostle Arome Osayi",
  description: "Become a Kingdom Financier and support the mission.",
  path: "/partner",
  ogLabel: "Become a Kingdom Financier",
});

export default function PartnerPage() {
  return (
    <>
      <PageHeader
        kicker="Partnership"
        video="v-petals"
        caption="Marching Orders Conference"
        title={
          <>
            Become a <em>partner</em>
          </>
        }
        intro={<>Join partnership with Apostle Arome Osayi. {partnerCopy.intro}</>}
      />

      <section aria-label="Scripture" className="py-20 md:py-32">
        <figure className="wrap max-w-6xl">
          <blockquote className="display text-[clamp(29px,3.7vw,59px)] leading-[1.14]" data-reveal>
            &ldquo;{partnerCopy.scripture.text}&rdquo;
          </blockquote>
          <figcaption className="kicker mt-8 text-copper">{partnerCopy.scripture.ref}</figcaption>
        </figure>
      </section>

      <section aria-labelledby="financiers-title" className="border-t border-rule py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Index n="01" className="mb-8">
              Kingdom Financiers
            </Index>
            <h2 id="financiers-title" className="display text-[clamp(35px,3.7vw,59px)]">
              Who are Kingdom Financiers?
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p className="text-xl leading-relaxed text-ink">{partnerCopy.financiers}</p>
            <p className="mt-5 text-ink-soft">
              As Kingdom Financiers partnering with North American Missions (NAM), you are not just joining visions and faith but playing a key part in finishing the work of our Lord Jesus Christ.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="give-title" className="border-t border-rule bg-paper-2 py-20 md:py-28">
        <div className="wrap">
          <Index n="02" className="mb-8">
            Giving
          </Index>
          <h2 id="give-title" className="display text-[clamp(35px,3.7vw,59px)]">
            Ways to give
          </h2>
          <p className="mt-4 mb-10 max-w-xl text-ink-soft">Choose your region to see how to give.</p>
          <RegionTabs />
        </div>
      </section>

      <section aria-labelledby="signup-title" className="bg-night text-bone">
        <div className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Index n="03" tone="night" className="mb-8">
              Join
            </Index>
            <h2 id="signup-title" className="display text-[clamp(35px,3.7vw,59px)]">
              Join as a <em>partner</em>
            </h2>
            <p className="mt-5 text-lg text-bone-muted">
              Tell us a little about you. The partnership team will follow up with the right giving details for your country, and keep you close to the mission.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <PartnerForm tone="night" />
          </div>
        </div>
      </section>
    </>
  );
}
