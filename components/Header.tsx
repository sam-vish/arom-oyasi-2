"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, nav } from "@/content/site";
import { SocialLinks } from "./ui";
import { Wave } from "./LoopVideo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu is "open on a given path", so navigating anywhere closes it with no effect needed.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const mobileNav = [...nav, { label: "Partner", href: "/partner" }, { label: "Prayer request", href: "/prayer" }, { label: "Contact", href: "/contact" }];

  return (
    <>
      <a href="#main" className="fixed top-2 left-2 z-[80] -translate-y-20 rounded bg-ink px-4 py-2 font-medium text-paper focus:translate-y-0">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled || open ? "border-b border-rule bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="wrap flex h-[68px] items-center justify-between gap-6 md:h-[76px]">
          <Link href="/" aria-label="Apostle Arome Osayi, home" className="group flex shrink-0 items-center gap-3">
            {/* The brand monogram as-is (gold → copper), with the name set like the original's hero. */}
            <Image src="/images/brand/monogram.png" alt="" width={958} height={958} priority className="h-10 w-10" />
            <span className="hidden text-[14px] leading-none font-semibold tracking-[0.12em] uppercase sm:block">Arome Osayi</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className="group/n relative py-2 text-[12.5px] font-medium tracking-[0.08em] text-ink/75 uppercase transition-colors hover:text-ink aria-[current=page]:text-ink"
                  >
                    {n.label}
                    <span
                      aria-hidden
                      className={`grad-bg absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-500 ${
                        isActive(n.href) ? "scale-x-100" : "scale-x-0 group-hover/n:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={links.youtubeLive}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center gap-2.5 px-4 text-[12.5px] font-medium tracking-[0.08em] text-ink/80 uppercase hover:text-copper md:inline-flex"
            >
              <Wave className="text-copper" />
              Watch
            </a>
            <Link
              href="/partner"
              className="btn-grad hidden min-h-11 items-center rounded-[3px] px-5 text-[13px] font-semibold tracking-[0.08em] uppercase sm:inline-flex"
            >
              Partnership
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                ) : (
                  <path d="M4 9h16M4 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" data-lenis-prevent hidden={!open} className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-[68px] lg:hidden">
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-10">
          <ul className="mt-6 border-t border-rule">
            {mobileNav.map((n, i) => (
              <li key={n.href} className="border-b border-rule">
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className="flex items-baseline gap-5 py-4"
                >
                  <span className="kicker w-6 text-copper">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[28px]">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={links.youtubeLive}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-[3px] border border-ink/25 px-6 text-[13px] font-semibold tracking-[0.08em] uppercase"
          >
            <Wave className="text-copper" />
            Watch live and past streams
          </a>
          <SocialLinks className="mt-6 -ml-3" />
        </nav>
      </div>
    </>
  );
}
