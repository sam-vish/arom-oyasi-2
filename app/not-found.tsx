import { ButtonLink, Index } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[86svh] flex-col justify-center pt-32 pb-20">
      <Index className="mb-8">Page not found</Index>
      <h1 className="display max-w-4xl text-[clamp(42px,5.62vw,89px)]">
        This page has moved, <em>or never existed.</em>
      </h1>
      <p className="mt-7 max-w-xl text-lg text-ink-soft">The site has a new home for messages, books and the itinerary. Start from one of these.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/messages" variant="line">
          Messages
        </ButtonLink>
        <ButtonLink href="/books" variant="line">
          Books
        </ButtonLink>
      </div>
    </section>
  );
}
