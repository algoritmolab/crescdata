import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "onDark" | "onAccent";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition duration-200 " +
  "hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  /** Amber accent — the main call to action. */
  primary:
    "bg-accent-500 text-brand-950 shadow-sm hover:bg-accent-400 hover:shadow-md",
  /** Quiet outline for use alongside a primary button on light backgrounds. */
  secondary:
    "border border-hairline bg-surface text-brand-800 hover:border-brand-300 hover:bg-brand-50",
  /** Outline for use on the deep teal band. */
  onDark:
    "border border-white/30 text-white hover:border-white/60 hover:bg-white/10",
  /** Solid teal — reads as the primary action on the amber CTA band. */
  onAccent:
    "bg-brand-800 text-white shadow-sm hover:bg-brand-900 hover:shadow-md",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

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
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}
