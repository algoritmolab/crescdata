/**
 * Small inline icon set (no icon dependency).
 * All icons share a 24px viewBox and inherit `currentColor`.
 */

const paths: Record<string, React.ReactNode> = {
  tag: (
    <>
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h5.38a2 2 0 0 1 1.41.59l8.12 8.12a1.5 1.5 0 0 1 0 2.12l-5.38 5.38a1.5 1.5 0 0 1-2.12 0L3.79 14.1A2 2 0 0 1 3.2 12.7Z" />
      <circle cx="7.75" cy="10.25" r="1.25" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17.5 9.5 11l4 4L21 7.5" />
      <path d="M15.5 7.5H21v5.5" />
    </>
  ),
  scale: (
    <>
      <path d="M4 20V9.5M12 20V4M20 20v-6.5" />
      <path d="M2.5 20h19" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: keyof typeof paths | string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
