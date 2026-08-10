import Link from "next/link";
import type { Role } from "@/content/roles";

/** One line of the role index. The whole row is the link. */
export function RoleRow({ role }: { role: Role }) {
  return (
    <li className="border-b border-rule">
      <Link
        href={`/careers/${role.slug}`}
        className="group relative block px-1 py-7 transition-colors duration-200 hover:bg-surface focus-visible:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600"
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-brand-600 transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
        />

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_180px_112px_96px_104px] lg:items-center lg:gap-7">
          <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-navy transition-colors group-hover:text-brand-700 lg:text-2xl">
            {role.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-label lg:contents">
            <span>{role.department}</span>
            <span>{role.location}</span>
            <span>{role.experience}</span>
            {/* Every role runs the same shift; the tag makes that visible up front. */}
            <span className="border border-rule px-2 py-1 text-[10px] text-ink-soft lg:justify-self-end">
              US shift
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
