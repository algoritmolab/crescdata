import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { clients } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Client logo strip.
 *
 * Each logo sits in its own white card so artwork with different backgrounds
 * reads consistently against the tinted section, and so a wide wordmark and a
 * square tile occupy the same footprint. Adding a logo is one entry in
 * `clients.logos` — the row reflows and wraps rather than shrinking.
 *
 * No treatment filter is applied: the two rasters are untreated (desaturating
 * Sutton's white-on-pale-blue tile would erase it) and Metro1 is already
 * monochrome, so the three sit together without one.
 */
export function Clients() {
  if (!clients.enabled) return null;

  return (
    <Section tone="subtle">
      <SectionHeading title={clients.heading} align="center" />

      <div className="mt-12 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
        {clients.logos.map((logo) => (
          <div
            key={logo.alt}
            className="flex h-32 w-full max-w-[18rem] items-center justify-center rounded-none border border-hairline bg-surface px-8 sm:w-72"
          >
            {typeof logo.src === "string" ? (
              // SVG: served as-is, since the optimizer does not handle SVG.
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                unoptimized
                className={cn(
                  "w-auto max-w-full object-contain",
                  logo.heightClass,
                )}
              />
            ) : (
              <Image
                src={logo.src}
                alt={logo.alt}
                sizes="288px"
                className={cn(
                  "w-auto max-w-full object-contain",
                  logo.heightClass,
                )}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
