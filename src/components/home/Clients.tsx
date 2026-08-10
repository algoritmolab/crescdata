import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { clients } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Client logo strip.
 *
 * Each logo sits in its own white card so artwork with different backgrounds
 * (Sutton is a pale tile, Bluestone ships on white) reads consistently against
 * the tinted section. Adding logos to `clients.logos` reflows the row — no
 * layout changes needed. Set `clients.enabled` to false to hide the section.
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
            className="flex h-32 w-full max-w-[16rem] items-center justify-center rounded-2xl border border-hairline bg-surface px-8 sm:w-64"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              className={cn("w-auto object-contain", logo.heightClass)}
              sizes="256px"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
