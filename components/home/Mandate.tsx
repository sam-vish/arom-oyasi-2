import { Pill } from "../LoopVideo";
import { Index, TextLink } from "../ui";
import { mandateText } from "@/content/words";

/**
 * The mandate, word for word, set large, with small loops of the congregation sitting inside the
 * sentence like words of their own. They print in ink and bloom into colour under the cursor.
 * Pills are anchored to phrases (not positions) so the copy can't drift out of sync silently.
 */
const pills: { after: string; name: string }[] = [
  { after: "realign with the Apostolic", name: "p-apostle" },
  { after: "the saints and disciples of old.", name: "p-hall" },
  { after: "raising men and women", name: "p-faces" },
  { after: "whose affection", name: "p-choir" },
];

function withPills(text: string) {
  const parts: React.ReactNode[] = [];
  let rest = text;
  pills.forEach((p) => {
    const at = rest.indexOf(p.after);
    if (at === -1) return;
    const end = at + p.after.length;
    parts.push(rest.slice(0, end), <Pill key={p.name} name={p.name} />);
    rest = rest.slice(end);
  });
  parts.push(rest);
  return parts;
}

export function Mandate() {
  return (
    <section aria-labelledby="mandate-title" className="border-t border-rule py-24 md:py-36">
      <div className="wrap">
        <Index n="01" className="mb-12 md:mb-16">
          <span id="mandate-title">The mandate</span>
        </Index>
        <p className="display max-w-[22ch] text-[clamp(24px,3.1vw,50px)] leading-[1.12] font-normal tracking-[-0.02em] text-ink sm:max-w-none" data-reveal>
          {withPills(mandateText)}
        </p>
        <div className="mt-14 flex justify-end border-t border-rule pt-6" data-reveal>
          <TextLink href="/about">Read his story</TextLink>
        </div>
      </div>
    </section>
  );
}
