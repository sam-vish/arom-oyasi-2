// Form definitions shared by the server action (validation, storage, email) and the UI.

export type FormKind =
  | "invitation"
  | "prayer"
  | "contact"
  | "newsletter"
  | "partner"
  | "testimony";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

type FieldRule = { required?: boolean; email?: boolean; max?: number; checkbox?: boolean };

export const formSpecs: Record<
  FormKind,
  {
    table: string;
    /** Env var holding the team inbox for this form. Falls back to TEAM_INBOX. */
    inboxEnv: string;
    subject: string;
    fields: Record<string, FieldRule>;
    success: string;
    autoReply?: { subject: string; body: string };
  }
> = {
  invitation: {
    table: "invitations",
    inboxEnv: "INBOX_INVITATIONS",
    subject: "New invitation request",
    fields: {
      full_name: { required: true, max: 120 },
      organization: { required: true, max: 160 },
      role: { max: 120 },
      email: { required: true, email: true },
      phone: { required: true, max: 40 },
      country: { required: true, max: 80 },
      city: { required: true, max: 80 },
      event_name: { required: true, max: 160 },
      event_type: { required: true, max: 40 },
      proposed_dates: { required: true, max: 160 },
      expected_attendance: { max: 40 },
      message: { max: 4000 },
      heard_from: { max: 160 },
    },
    success:
      "Thank you. Your invitation has reached the Apostle's office. The team will review it and respond to you by email.",
    autoReply: {
      subject: "We received your invitation",
      body: "Thank you for inviting Apostle Arome Osayi. Your request has reached his office, and the team will review it and get back to you to discuss details. Availability is subject to his ministry commitments.",
    },
  },
  prayer: {
    table: "prayer_requests",
    inboxEnv: "INBOX_PRAYER",
    subject: "New prayer request",
    fields: {
      name: { max: 120 },
      email: { required: true, email: true },
      country: { required: true, max: 80 },
      request: { required: true, max: 4000 },
      may_contact: { checkbox: true },
    },
    success: "Your request has been received. The prayer team will stand with you in prayer.",
    autoReply: {
      subject: "Your prayer request was received",
      body: "Your prayer request has been received and will be read by the prayer team. If you are in an emergency, please contact your local emergency services.",
    },
  },
  contact: {
    table: "contact_messages",
    inboxEnv: "INBOX_CONTACT",
    subject: "New message from the website",
    fields: {
      name: { required: true, max: 120 },
      email: { required: true, email: true },
      subject: { required: true, max: 40 },
      message: { required: true, max: 4000 },
    },
    success: "Thank you. Your message has been sent to the office.",
    autoReply: {
      subject: "We received your message",
      body: "Thank you for contacting the office of Apostle Arome Osayi. Your message has been received and the team will respond as soon as possible.",
    },
  },
  newsletter: {
    table: "newsletter_signups",
    inboxEnv: "INBOX_NEWSLETTER",
    subject: "New newsletter signup",
    fields: {
      first_name: { max: 80 },
      email: { required: true, email: true },
      country: { max: 80 },
      consent: { required: true, checkbox: true },
      source: { max: 40 },
    },
    success: "You're on the list. Watch your inbox for new messages and meetings.",
  },
  partner: {
    table: "partner_signups",
    inboxEnv: "INBOX_PARTNERS",
    subject: "New partner signup",
    fields: {
      full_name: { required: true, max: 120 },
      email: { required: true, email: true },
      phone: { max: 40 },
      country: { required: true, max: 80 },
      interest: { required: true, max: 40 },
      frequency: { required: true, max: 20 },
      affirmation: { required: true, checkbox: true },
    },
    success:
      "Thank you for standing with the mission. The partnership team will reach out with the next steps.",
    autoReply: {
      subject: "Welcome, Kingdom Financier",
      body: "Thank you for choosing to partner with Apostle Arome Osayi and the North American Missions. The partnership team will be in touch with the next steps.",
    },
  },
  testimony: {
    table: "testimony_submissions",
    inboxEnv: "INBOX_TESTIMONIES",
    subject: "New testimony submitted (needs moderation)",
    fields: {
      name: { required: true, max: 120 },
      country: { required: true, max: 80 },
      email: { required: true, email: true },
      testimony: { required: true, max: 6000 },
      consent_publish: { checkbox: true },
    },
    success:
      "Thank you for sharing what God has done. The team reads every testimony before anything is published.",
  },
};
