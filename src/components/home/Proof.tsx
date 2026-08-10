import { Section, SectionHeading } from "@/components/ui/Section";
import { proof } from "@/content/site";

/**
 * PLACEHOLDER SECTION.
 *
 * Renders nothing when `proof.enabled` is false in content/site.ts — that is
 * the single switch for hiding it. The logo row and testimonial below are
 * deliberately neutral grey boxes so it is obvious they are not real content.
 *
 * To go live:
 *  - swap each placeholder box for an <Image src="/logos/....svg" /> and drop
 *    the dashed border + "Client logo" label;
 *  - replace the testimonial copy in content/site.ts.
 */
export function Proof() {
  if (!proof.enabled) return null;

  return (
    <Section tone="subtle">
      <SectionHeading title={proof.heading} align="center" />

      {/* Placeholder logo row */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {proof.logos.map((label, i) => (
          <div
            key={i}
            className="flex h-20 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-surface text-xs font-medium uppercase tracking-wider text-slate-400"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Placeholder testimonial */}
      <figure className="mx-auto mt-12 max-w-3xl rounded-2xl border border-dashed border-slate-300 bg-surface p-8 sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Testimonial placeholder
        </p>
        <blockquote className="mt-4 text-lg leading-relaxed text-slate-500 sm:text-xl">
          &ldquo;{proof.testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-11 w-11 shrink-0 rounded-full bg-slate-200"
          />
          <span className="text-sm text-slate-500">
            <span className="block font-semibold text-slate-600">
              {proof.testimonial.author}
            </span>
            {proof.testimonial.company}
          </span>
        </figcaption>
      </figure>
    </Section>
  );
}
