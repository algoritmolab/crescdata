import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "default" | "subtle" | "brand";

const tones: Record<Tone, string> = {
  default: "bg-surface",
  subtle: "bg-surface-subtle",
  brand: "bg-brand-800 text-white",
};

/** Vertical rhythm wrapper. Keeps section spacing identical across pages. */
export function Section({
  tone = "default",
  className,
  containerClassName,
  id,
  children,
}: {
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Eyebrow + heading + optional intro, with consistent type scale. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            // Orange eyebrow — one of the small, deliberate accent moments.
            "text-xs font-semibold uppercase tracking-[0.14em]",
            onDark ? "text-accent-300" : "text-label",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 text-3xl font-semibold sm:text-4xl",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            // Measure on the paragraph itself, so 68ch resolves against this
            // element's font-size rather than the wrapper's.
            "mt-4 max-w-[68ch] text-lg leading-relaxed",
            onDark ? "text-brand-50" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
