import Link from "next/link";
import { footerQuickLinks, nav, site } from "@/content/site";
import { NewsletterForm } from "./forms";
import { SocialLinks } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-night text-bone">
      <div className="wrap grid gap-14 pt-20 pb-16 md:pt-28 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="display text-[clamp(32px,3.4vw,50px)]">
            Stay close to <em>the Word.</em>
          </p>
          <p className="mt-4 max-w-md text-[16px] text-bone-muted">New messages and meetings, straight to your inbox.</p>
          <div className="mt-8 max-w-lg">
            <NewsletterForm source="footer" tone="night" compact />
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
          <div>
            <h2 className="kicker mb-5 text-bone-muted">Menu</h2>
            <ul className="space-y-2.5 text-[15px]">
              {[...nav, { label: "Partner", href: "/partner" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-bone/85 hover:text-gold">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="kicker mb-5 text-bone-muted">The ministry</h2>
            <ul className="space-y-2.5 text-[15px]">
              {footerQuickLinks.map((n) => (
                <li key={n.href}>
                  <a href={n.href} target="_blank" rel="noopener noreferrer" className="text-bone/85 hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className="kicker mb-5 text-bone-muted">The office</h2>
            <ul className="space-y-2.5 text-[15px] text-bone/85">
              <li>
                <Link href="/prayer" className="hover:text-gold">
                  Prayer request
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Contact
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="break-words hover:text-gold">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="hover:text-gold">
                  {site.contact.phone}
                </a>
              </li>
            </ul>
            <SocialLinks tone="night" className="mt-6 -ml-3" />
          </div>
        </nav>
      </div>

      {/* The name, set as large as the page allows and cut by the bottom edge. */}
      <p aria-hidden className="pointer-events-none -mb-[0.16em] text-center text-[11.6vw] leading-[0.9] font-semibold tracking-[-0.03em] whitespace-nowrap text-bone/[0.07] uppercase select-none">
        Arome Osayi
      </p>

      <div className="relative border-t border-rule-night bg-night">
        <div className="wrap kicker flex flex-col gap-3 py-6 text-bone-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Apostle Arome Osayi</p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link href="/privacy" className="hover:text-bone">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-bone">
                Terms
              </Link>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/brainchainlabs/" target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                Built by <span className="text-bone">BrainChain Labs</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
