import { ContactForm } from "@/components/forms";
import { PageHeader, TextLink } from "@/components/ui";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact the office of Apostle Arome Osayi at the RCN Embassy, Makurdi, Benue State, Nigeria.",
  path: "/contact",
  ogLabel: "Contact the office",
});

export default function ContactPage() {
  const { contact } = site;
  return (
    <>
      <PageHeader
        kicker="Contact"
        title={
          <>
            Reach <em>the office</em>
          </>
        }
        intro="Locate us at the address below, call, or send a message with the form."
      />
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-5">
          <dl className="space-y-10">
            <div>
              <dt className="kicker text-muted">Office</dt>
              <dd>
                <address className="display mt-2 text-[24px] leading-[1.1] not-italic">{contact.office}</address>
                <TextLink href={contact.mapsUrl} className="mt-4">
                  Open in Maps
                </TextLink>
              </dd>
            </div>
            <div>
              <dt className="kicker text-muted">Phone</dt>
              <dd>
                <a href={contact.phoneHref} className="display mt-2 block text-[24px] hover:text-copper">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="kicker text-muted">Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className="display mt-2 block text-[24px] break-words hover:text-copper">
                  {contact.email}
                </a>
              </dd>
            </div>
          </dl>
            <p className="text-[15px] text-ink-soft">
              Inviting the Apostle? Use the <TextLink href="/invite">invitation form</TextLink> so it reaches the right desk.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
