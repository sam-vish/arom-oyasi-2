import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { SHOW_PENDING, socials } from "@/content/site";
import { LoopVideo } from "./LoopVideo";

/** A clearly-labelled placeholder for anything the Apostle's office still has to confirm.
 *  Hidden entirely when NEXT_PUBLIC_SHOW_PENDING=false. */
export function Pending({ children, className = "", tone = "paper" }: { children: ReactNode; className?: string; tone?: Tone }) {
  if (!SHOW_PENDING) return null;
  return (
    <span
      className={`inline-flex items-start gap-2 rounded border border-dashed px-2.5 py-1.5 text-[13px] leading-snug ${
        tone === "night" ? "border-[#e7c585]/60 text-[#e7c585]" : "border-copper/60 bg-copper/[0.04] text-copper"
      } ${className}`}
    >
      <span aria-hidden className="mt-[5px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
      <span>
        <strong className="font-semibold">To confirm:</strong> {children}
      </span>
    </span>
  );
}

export type Tone = "paper" | "night";

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "line";
  tone?: Tone;
  external?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

// Buttons follow the original site: uppercase Poppins SemiBold, square corners, gradient fill.
const btnBase =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] px-6 text-[13px] font-semibold tracking-[0.08em] uppercase transition-[background-position,background-color,color,border-color] duration-300";

export function btnClass(variant: "solid" | "line" = "solid", tone: Tone = "paper") {
  if (tone === "night") {
    return variant === "solid"
      ? `${btnBase} btn-grad`
      : `${btnBase} border border-bone/30 text-bone hover:border-gold hover:text-gold`;
  }
  return variant === "solid"
    ? `${btnBase} btn-grad`
    : `${btnBase} border border-ink/25 text-ink hover:border-ink`;
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden>
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ButtonLink({ href, children, variant = "solid", tone = "paper", external, className = "", ...rest }: BtnProps) {
  const cls = `${btnClass(variant, tone)} ${className}`;
  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
        <Arrow />
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      <Arrow />
    </Link>
  );
}

/** Underlined text link; the underline draws in copper on hover. */
export function TextLink({ href, children, className = "", tone = "paper" }: { href: string; children: ReactNode; className?: string; tone?: Tone }) {
  const cls = `group/tl relative inline-flex items-center gap-1.5 pb-1 text-[15px] font-medium ${tone === "night" ? "text-bone" : "text-ink"} ${className}`;
  const inner = (
    <>
      {children}
      <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px ${tone === "night" ? "bg-bone/30" : "bg-ink/25"}`} />
      <span aria-hidden className="grad-bg absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover/tl:scale-x-100" />
    </>
  );
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Section label: a numbered "index" line with a rule, like a programme listing. */
export function Index({ n, children, tone = "paper", className = "" }: { n?: string; children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <p className={`kicker flex items-center gap-4 ${tone === "night" ? "text-bone-muted" : "text-muted"} ${className}`}>
      {n && <span className={tone === "night" ? "text-gold" : "text-copper"}>{n}</span>}
      <span>{children}</span>
      <span aria-hidden className={`h-px flex-1 ${tone === "night" ? "bg-rule-night" : "bg-rule"}`} />
    </p>
  );
}

/**
 * Inner-page header: big serif title on paper, and optionally a letterbox band of footage that
 * opens from a hairline (the site's signature), with a caption naming what's on screen.
 */
export function PageHeader({
  kicker,
  title,
  intro,
  children,
  video,
  caption,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  video?: string;
  caption?: string;
}) {
  return (
    <header className="pt-32 md:pt-40">
      <div className="wrap">
        {kicker && <Index className="rise mb-8">{kicker}</Index>}
        <h1 className="display rise max-w-6xl text-[clamp(42px,6.22vw,101px)]" style={{ animationDelay: "120ms" }}>
          {title}
        </h1>
        {intro && (
          <div className="rise mt-7 max-w-2xl text-lg text-ink-soft md:text-xl" style={{ animationDelay: "260ms" }}>
            {intro}
          </div>
        )}
        {children && (
          <div className="rise" style={{ animationDelay: "380ms" }}>
            {children}
          </div>
        )}
      </div>
      {video ? (
        <figure className="mt-14 md:mt-20">
          <div className="relative">
            <span aria-hidden className="opening-line absolute inset-x-0 top-1/2 h-px bg-ink" />
            <LoopVideo name={video} priority className="opening relative aspect-[16/9] w-full md:aspect-[2.6/1]" />
          </div>
          {caption && (
            <figcaption className="wrap kicker mt-3 flex items-center gap-3 text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden />
              {caption}
            </figcaption>
          )}
        </figure>
      ) : (
        <div className="wrap">
          <div className="mt-14 h-px bg-rule md:mt-20" />
        </div>
      )}
    </header>
  );
}

const iconPaths: Record<string, ReactNode> = {
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z"
      fill="currentColor"
    />
  ),
  x: <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />,
  telegram: (
    <path
      d="M21 4.5L2.8 11.4c-.9.4-.9 1.4 0 1.7l4.5 1.4 1.7 5.3c.2.7 1.1.9 1.6.4l2.5-2.3 4.6 3.4c.8.5 1.7.1 1.9-.8L22.3 5.8c.3-1-.5-1.7-1.3-1.3zM9.3 14.2l8.2-6.9-6.4 7.8-.3 3.1z"
      fill="currentColor"
    />
  ),
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {iconPaths[name]}
    </svg>
  );
}

export function SocialLinks({ className = "", tone = "paper" }: { className?: string; tone?: Tone }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} (opens in a new tab)`}
            className={`grid h-11 w-11 place-items-center rounded-full transition-colors hover:text-copper ${tone === "night" ? "text-bone/75" : "text-ink/70"}`}
          >
            <Icon name={s.icon} className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
