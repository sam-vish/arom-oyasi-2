import { PageHeader, Pending } from "@/components/ui";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How the office of Apostle Arome Osayi handles information you share through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader kicker="Privacy" title="Privacy" />
      <section className="py-16 md:py-24">
        <div className="wrap max-w-3xl space-y-6 text-[17px] leading-relaxed text-ink-soft">
          <Pending>review of this notice by the ministry before launch</Pending>
          <p>
            This website collects the information you choose to send through its forms: invitations, prayer requests, contact messages, partnership sign-ups, testimonies and newsletter sign-ups.
          </p>
          <p>
            We use it only to respond to you and, if you joined the mailing list, to send you updates. Prayer requests are read by the prayer team. Testimonies are never published without your consent.
          </p>
          <p>We do not sell your information. You can ask us to update or delete it at any time.</p>
          <p>
            Videos are embedded from YouTube in privacy-enhanced mode and only load when you press play. We use privacy-friendly analytics to understand which pages are useful.
          </p>
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
