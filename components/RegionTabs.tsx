"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Pending } from "./ui";
import { givingRegions } from "@/content/media";

/** Giving methods by region. Details come from content/media.ts (never hard-coded in markup). */
export function RegionTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = (active + d + givingRegions.length) % givingRegions.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const region = givingRegions[active];
  return (
    <div>
      <div role="tablist" aria-label="Giving region" className="flex flex-wrap gap-2" onKeyDown={onKey}>
        {givingRegions.map((r, i) => (
          <button
            key={r.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${r.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${r.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`min-h-11 rounded-[3px] border px-5 text-[12.5px] font-semibold tracking-[0.08em] uppercase transition-colors ${
              i === active ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink-soft hover:border-ink"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${region.id}`} aria-labelledby={`tab-${region.id}`} className="mt-8 border-t border-ink pt-8">
        {region.methods.length ? (
          <dl className="grid gap-6 sm:grid-cols-2">
            {region.methods.map((m) => (
              <div key={m.label}>
                <dt className="kicker text-muted">{m.label}</dt>
                <dd className="display mt-1 text-[19px]">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div>
            <p className="display text-[25px] leading-tight">Giving in {region.label}</p>
            <p className="mt-3 max-w-xl text-ink-soft">
              Account details for this region will appear here. Until then, sign up below and the partnership team will send you the right details for your country.
            </p>
            <Pending className="mt-4">which methods and accounts to publish for {region.label}</Pending>
          </div>
        )}
      </div>
    </div>
  );
}
