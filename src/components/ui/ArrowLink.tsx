import Link from "next/link";
import { cn } from "@/lib/cn";

export type ArrowDirection = "right" | "left";

/**
 * Directional arrow.
 *
 * Sized in `em` so it tracks the label's font size, and drawn in
 * `currentColor` so it follows the link's colour without extra classes.
 * Decorative: the adjacent label always carries the meaning.
 *
 * The shift on hover is behind `motion-safe:`, so it is not merely made
 * instant for reduced-motion users — it does not happen at all.
 */
export function ArrowIcon({
  direction = "right",
  className,
}: {
  direction?: ArrowDirection;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "shrink-0 transition-transform duration-200",
        direction === "right"
          ? "motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
          : "motion-safe:group-hover:-translate-x-1 motion-safe:group-focus-visible:-translate-x-1",
        className,
      )}
    >
      {direction === "right" ? (
        <>
          <path d="M2.5 8h11" />
          <path d="M9.5 4l4 4-4 4" />
        </>
      ) : (
        <>
          <path d="M13.5 8h-11" />
          <path d="M6.5 4l-4 4 4 4" />
        </>
      )}
    </svg>
  );
}

/**
 * Text link with a directional arrow.
 *
 * The arrow is a sibling of the label rather than a child of the underlined
 * element. text-decoration on an <a> propagates to every descendant and a
 * child cannot opt out, so underlining the <a> would always draw a rule under
 * the arrow. The underline therefore lives on the label span alone.
 */
export function ArrowLink({
  href,
  direction = "right",
  className,
  labelClassName,
  children,
}: {
  href: string;
  direction?: ArrowDirection;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-sm text-brand-600 transition-colors hover:text-brand-700",
        className,
      )}
    >
      {direction === "left" && <ArrowIcon direction="left" />}
      <span
        className={cn(
          "underline decoration-1 underline-offset-4 decoration-brand-600/40 transition-[text-decoration-color] group-hover:decoration-brand-700",
          labelClassName,
        )}
      >
        {children}
      </span>
      {direction === "right" && <ArrowIcon direction="right" />}
    </Link>
  );
}
