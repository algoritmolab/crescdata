import { ArrowLink } from "./ArrowLink";

/**
 * Back navigation link. A left-pointing ArrowLink at the mono label size used
 * across the document language, so every "back" control on the site is the
 * same component.
 */
export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <ArrowLink
      href={href}
      direction="left"
      className="font-mono text-[11px] uppercase tracking-[0.16em]"
    >
      {children}
    </ArrowLink>
  );
}
