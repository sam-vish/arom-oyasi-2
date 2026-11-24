import { TestimonyForm } from "@/components/forms";
import { Index, PageHeader } from "@/components/ui";
import { testimonies } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Testimonies",
  description: "What God has done: testimonies shared by people around the world through the ministry of Apostle Arome Osayi.",
  path: "/testimonies",
  ogLabel: "Testimonies",
});

export default function TestimoniesPage() {
  return (
    <>
      <PageHeader
        kicker="Testimonies"
        video="v-choir"
        caption="Marching Orders Conference"
        title={
          <>
            What <em>God</em> has done
          </>
        }
        intro="Shared by people from the Midlands to Johannesburg, during seasons of fasting and prayer and after the Word was taught."
      />

      <section aria-label="Testimonies" className="py-20 md:py-28">
        <ol className="wrap">
          {testimonies.map((t, i) => (
            <li key={t.name} className="grid gap-6 border-t border-rule py-12 md:grid-cols-12 md:gap-10 md:py-16" data-reveal>
              <div className="md:col-span-3">
                <p className="kicker text-copper">{String(i + 1).padStart(2, "0")}</p>
                <p className="kicker mt-3 text-ink">{t.location}</p>
                <p className="mt-1 text-[15px] text-muted">{t.name}</p>
              </div>
              <blockquote className="md:col-span-8 md:col-start-5">
                <p className="display text-[clamp(19px,1.7vw,25px)] leading-[1.25] tracking-[-0.01em]">&ldquo;{t.body}&rdquo;</p>
              </blockquote>
            </li>
          ))}
        </ol>
      </section>

      <section id="share" aria-labelledby="share-title" className="scroll-mt-24 border-t border-rule bg-paper-2 py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Index n="—" className="mb-8">
              Your turn
            </Index>
            <h2 id="share-title" className="display text-[clamp(35px,3.7vw,59px)]">
              Share your testimony
            </h2>
            <p className="mt-5 text-ink-soft">
              Has God met you through a message, a fast or a meeting? Tell us. The team reads every testimony, and nothing is published without your consent.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <TestimonyForm />
          </div>
        </div>
      </section>
    </>
  );
}
