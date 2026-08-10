import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "onBrand" | "disabled";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition duration-200";

/** Shared hover/active motion for the interactive variants. */
const lift = "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0";

const variants: Record<Variant, string> = {
  /** Brand blue — the default call to action everywhere on the site. */
  primary: `bg-brand-600 text-white shadow-sm hover:bg-brand-700 ${lift}`,
  /** Quiet outline for use alongside a primary button on light backgrounds. */
  secondary: `border border-hairline bg-surface text-brand-700 hover:border-brand-300 hover:bg-brand-50 ${lift}`,
  /** Solid white — reads as the primary action on the deep blue CTA band. */
  onBrand: `bg-white text-brand-700 shadow-sm hover:bg-brand-50 ${lift}`,
  /** Inert state, e.g. a download whose file is not published yet. */
  disabled: "border border-hairline bg-surface-sunken text-muted cursor-not-allowed",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

/**
 * Shared class string for anything that should look like a Button but is not
 * a link — e.g. the disabled "Coming soon" download buttons on /whitepapers.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Optional side effect on click, e.g. closing the mobile menu. */
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={buttonClasses({ variant, size, className })}
    >
      {children}
    </Link>
  );
}
