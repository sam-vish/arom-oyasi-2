import { PrayerForm } from "@/components/forms";
import { PageHeader } from "@/components/ui";
import { quotes } from "@/content/words";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Prayer Request",
  description: "Send a prayer request to the prayer team of Apostle Arome Osayi.",
  path: "/prayer",
  ogLabel: "Send a prayer request",
});

export default function PrayerPage() {
  return (
    <>
      <PageHeader
        kicker="Prayer"
        title={
          <>
            We&rsquo;ll stand with you <em>in prayer</em>
          </>
        }
        intro="Share your request. It will be read by the prayer team."
      />
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="display text-[25px] leading-[1.1]">&ldquo;{quotes[2]}&rdquo;</p>
            <p className="kicker mt-4 text-copper">Apostle Arome Osayi</p>
            <p className="mt-10 border-l border-rule pl-5 text-[14px] leading-relaxed text-muted">
              Requests are read by the prayer team and are not monitored around the clock. If you or someone else is in danger, contact your local emergency services now.
            </p>
          </aside>
          <div className="lg:col-span-6 lg:col-start-7">
            <PrayerForm />
          </div>
        </div>
      </section>
    </>
  );
}
