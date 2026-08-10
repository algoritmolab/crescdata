import { cn } from "@/lib/cn";

/**
 * Lead / intro paragraph.
 *
 * One place that sets the reading measure for every hero subhead and section
 * intro on the site. Constraining these to max-w-xl or max-w-2xl produced a
 * measure around 50 characters, which broke phrases mid-thought. 68ch is
 * written literally rather than via a custom property, so it resolves
 * against this paragraph's own font-size and never a wrapper's.
 */
export function Lead({
  className,
  tone = "dark",
  children,
}: {
  className?: string;
  /** "light" for copy set over a scrimmed photograph. */
  tone?: "dark" | "light";
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "max-w-[68ch] text-lg leading-relaxed sm:text-xl",
        tone === "light" ? "text-brand-50" : "text-ink-soft",
        className,
      )}
    >
      {children}
    </p>
  );
}
