"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { logo, navLinks, site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <Image
              src={logo}
              alt={site.name}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          {/* Desktop nav. Seven links plus the CTA is tight at 1024px, so the
              links run at 13px / narrow padding and open up from xl. */}
          <nav aria-label="Main" className="hidden items-center lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm",
                  isActive(link.href)
                    ? "text-brand-700"
                    : "text-ink-soft hover:text-brand-700",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" className="ml-2 whitespace-nowrap xl:ml-4">
              Get in touch
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hairline text-brand-700 transition-colors hover:bg-brand-50 lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile nav */}
      {open && (
        <div
          id="mobile-nav"
          className="border-t border-hairline bg-surface lg:hidden"
        >
          <Container>
            <nav aria-label="Mobile" className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-3 text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-soft hover:bg-surface-subtle hover:text-brand-700",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                href="/contact"
                size="lg"
                className="mt-3 w-full"
                onClick={() => setOpen(false)}
              >
                Get in touch
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
