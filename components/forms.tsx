"use client";

import { Check, Field, FormShell } from "./Form";
import type { Tone } from "./ui";
import { partnerCopy } from "@/content/words";

const grid = "grid gap-x-8 gap-y-7 md:grid-cols-2";
const legend = "kicker mb-6 flex w-full items-center gap-4 text-ink md:col-span-2";

export function InviteForm() {
  return (
    <FormShell kind="invitation" submitLabel="Send invitation">
      {(s) => (
        <div className="space-y-12">
          <fieldset className={grid}>
            <legend className={legend}>
              <span className="text-copper">01</span> You
            </legend>
            <Field state={s} name="full_name" label="Full name" required autoComplete="name" />
            <Field state={s} name="role" label="Your role" placeholder="e.g. Senior Pastor" />
            <Field state={s} name="email" label="Email" type="email" required autoComplete="email" />
            <Field state={s} name="phone" label="Phone (with country code)" type="tel" required autoComplete="tel" placeholder="+234 …" />
          </fieldset>
          <fieldset className={grid}>
            <legend className={legend}>
              <span className="text-copper">02</span> Your church or organisation
            </legend>
            <Field state={s} name="organization" label="Church / organisation" required className="md:col-span-2" />
            <Field state={s} name="country" label="Country" required autoComplete="country-name" />
            <Field state={s} name="city" label="City" required autoComplete="address-level2" />
          </fieldset>
          <fieldset className={grid}>
            <legend className={legend}>
              <span className="text-copper">03</span> The event
            </legend>
            <Field state={s} name="event_name" label="Event name" required className="md:col-span-2" />
            <Field state={s} name="event_type" label="Event type" required as="select" options={["Church program", "Conference", "Crusade", "Other"]} />
            <Field state={s} name="expected_attendance" label="Expected attendance" placeholder="e.g. 2,000" />
            <Field
              state={s}
              name="proposed_dates"
              label="Proposed date(s)"
              required
              className="md:col-span-2"
              placeholder="e.g. 14–16 August 2027, or a range of options"
            />
            <Field state={s} name="message" label="Anything else we should know" as="textarea" className="md:col-span-2" />
            <Field state={s} name="heard_from" label="How did you hear about us?" className="md:col-span-2" />
          </fieldset>
        </div>
      )}
    </FormShell>
  );
}

export function PrayerForm() {
  return (
    <FormShell kind="prayer" submitLabel="Send prayer request">
      {(s) => (
        <div className={grid}>
          <Field state={s} name="name" label="Name (optional)" autoComplete="name" />
          <Field state={s} name="country" label="Country" required autoComplete="country-name" />
          <Field state={s} name="email" label="Email" type="email" required autoComplete="email" className="md:col-span-2" />
          <Field state={s} name="request" label="Your prayer request" as="textarea" rows={6} required className="md:col-span-2" />
          <div className="md:col-span-2">
            <Check state={s} name="may_contact" label="Yes, the prayer team may contact me." />
          </div>
        </div>
      )}
    </FormShell>
  );
}

export function ContactForm() {
  return (
    <FormShell kind="contact" submitLabel="Send message">
      {(s) => (
        <div className={grid}>
          <Field state={s} name="name" label="Name" required autoComplete="name" />
          <Field state={s} name="email" label="Email" type="email" required autoComplete="email" />
          <Field
            state={s}
            name="subject"
            label="Subject"
            required
            as="select"
            options={["General", "Media", "Books", "Partnership", "Other"]}
            className="md:col-span-2"
          />
          <Field state={s} name="message" label="Message" as="textarea" rows={6} required className="md:col-span-2" />
        </div>
      )}
    </FormShell>
  );
}

export function NewsletterForm({ source, tone = "paper", compact }: { source: string; tone?: Tone; compact?: boolean }) {
  return (
    <FormShell kind="newsletter" submitLabel="Join the list" tone={tone}>
      {(s) => (
        <div className="space-y-6">
          <input type="hidden" name="source" value={source} />
          <div className={compact ? "grid gap-x-8 gap-y-6 sm:grid-cols-2" : "grid gap-x-8 gap-y-6 sm:grid-cols-3"}>
            {!compact && <Field tone={tone} state={s} name="first_name" label="First name" autoComplete="given-name" />}
            <Field tone={tone} state={s} name="email" label="Email" type="email" required autoComplete="email" />
            <Field tone={tone} state={s} name="country" label="Country" autoComplete="country-name" />
          </div>
          <Check
            tone={tone}
            state={s}
            name="consent"
            required
            label="Email me new messages, meetings and updates from the office of Apostle Arome Osayi. I can unsubscribe at any time."
          />
        </div>
      )}
    </FormShell>
  );
}

export function PartnerForm({ tone = "paper" }: { tone?: Tone }) {
  return (
    <FormShell kind="partner" submitLabel="Become a partner" tone={tone}>
      {(s) => (
        <div className={grid}>
          <Field tone={tone} state={s} name="full_name" label="Full name" required autoComplete="name" />
          <Field tone={tone} state={s} name="email" label="Email" type="email" required autoComplete="email" />
          <Field tone={tone} state={s} name="phone" label="Phone" type="tel" autoComplete="tel" />
          <Field tone={tone} state={s} name="country" label="Country" required autoComplete="country-name" />
          <Field
            tone={tone}
            state={s}
            name="interest"
            label="I'd like to join"
            required
            as="select"
            options={["Partnership", "Discipleship", "Both: partnership and discipleship"]}
          />
          <Field tone={tone} state={s} name="frequency" label="How I plan to give" required as="select" options={["Monthly", "One-time"]} />
          <div className="md:col-span-2">
            <Check tone={tone} state={s} name="affirmation" required label={partnerCopy.affirmation} />
          </div>
        </div>
      )}
    </FormShell>
  );
}

export function TestimonyForm() {
  return (
    <FormShell kind="testimony" submitLabel="Share testimony">
      {(s) => (
        <div className={grid}>
          <Field state={s} name="name" label="Name" required autoComplete="name" />
          <Field state={s} name="country" label="Country" required autoComplete="country-name" />
          <Field state={s} name="email" label="Email" type="email" required autoComplete="email" hint="Never published." className="md:col-span-2" />
          <Field state={s} name="testimony" label="Your testimony" as="textarea" rows={7} required className="md:col-span-2" />
          <div className="md:col-span-2">
            <Check state={s} name="consent_publish" label="You may publish my testimony with my first name and country." />
          </div>
        </div>
      )}
    </FormShell>
  );
}
