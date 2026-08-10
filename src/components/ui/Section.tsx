import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "default" | "subtle" | "brand" | "accent";

const tones: Record<Tone, string> = {
  default: "bg-surface",
  subtle: "bg-surface-subtle",
  brand: "bg-brand-800 text-white",
  accent: "bg-accent-500 text-brand-950",
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
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.14em]",
            onDark ? "text-accent-300" : "text-brand-600",
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
            "mt-4 text-lg leading-relaxed",
            onDark ? "text-brand-100" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
