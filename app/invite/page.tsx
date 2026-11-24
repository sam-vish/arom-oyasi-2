import { InviteForm } from "@/components/forms";
import { LoopVideo } from "@/components/LoopVideo";
import { Index } from "@/components/ui";
import { inviteIntro } from "@/content/words";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Invite Apostle Arome Osayi to Speak",
  description: "Invite Apostle Arome Osayi to your church program, conference or crusade.",
  path: "/invite",
  ogLabel: "Invite the Apostle",
});

export default function InvitePage() {
  return (
    <div className="pt-32 md:pt-40">
      <div className="wrap grid gap-16 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Index className="rise mb-8">Invitations</Index>
            <h1 className="display rise text-[clamp(45px,5.18vw,83px)]" style={{ animationDelay: "120ms" }}>
              Invite <em>the Apostle</em>
            </h1>
            <div className="prose-voice rise mt-8 text-[17px] leading-relaxed text-ink-soft" style={{ animationDelay: "260ms" }}>
              {inviteIntro.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <div className="relative mt-10 hidden lg:block">
              <span aria-hidden className="opening-line absolute inset-x-0 top-1/2 z-10 h-px bg-ink" />
              <LoopVideo name="invite" priority mediaClassName="ink-print" className="group opening relative aspect-[2.2/1] rounded-[2px]" />
            </div>
            <p className="mt-6 text-[15px] text-ink-soft">
              Questions first? Email{" "}
              <a className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-copper" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="kicker text-muted">Invitation details</h2>
          <p className="mt-2 mb-12 text-[15px] text-ink-soft">Fields marked * are required. Submitting well in advance helps the team schedule.</p>
          <InviteForm />
        </div>
      </div>
    </div>
  );
}
