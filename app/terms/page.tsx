import { PageHeader, Pending } from "@/components/ui";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Terms of use for the website of Apostle Arome Osayi.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader kicker="Terms" title="Terms of use" />
      <section className="py-16 md:py-24">
        <div className="wrap max-w-3xl space-y-6 text-[17px] leading-relaxed text-ink-soft">
          <Pending>review of these terms by the ministry before launch</Pending>
          <p>
            The messages, writing, photographs and other content on this website belong to the ministry of Apostle Arome Osayi unless stated otherwise. You are welcome to share links to them.
          </p>
          <p>Books are sold through aaobooks.com and its distributors, and videos are hosted on YouTube. Those services have their own terms.</p>
          <p>
            Questions:{" "}
            <a className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-copper" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
