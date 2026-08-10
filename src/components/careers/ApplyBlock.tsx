import { APPLY_EMAIL, type Role } from "@/content/roles";
import { Button } from "@/components/ui/Button";
import { DataLabel } from "@/components/ui/Data";

/**
 * Application step.
 *
 * Deliberately isolated: right now it is a mailto, but the surrounding page
 * makes no assumptions about that. Replacing the body of this component with
 * a real upload form needs no changes anywhere else.
 */
export function ApplyBlock({ role }: { role: Role }) {
  const subject = encodeURIComponent(`Application: ${role.title}`);
  const href = `mailto:${APPLY_EMAIL}?subject=${subject}`;

  return (
    <section
      aria-labelledby="apply"
      className="mt-14 border border-rule bg-surface"
    >
      <div className="border-b border-rule px-6 py-3">
        <DataLabel>Apply</DataLabel>
      </div>

      <div className="px-6 py-8 sm:px-8">
        <h2
          id="apply"
          className="font-display text-2xl font-semibold tracking-[-0.025em] text-navy"
        >
          Apply for this role
        </h2>
        <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          Email your CV to{" "}
          <a
            href={href}
            className="text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700"
          >
            {APPLY_EMAIL}
          </a>
          . Please attach your CV as a PDF or DOC file, and keep the role title
          in the subject line so it reaches the right team.
        </p>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href={href} size="lg" className="shrink-0">
            Apply for this role
          </Button>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Subject: Application: {role.title}
          </span>
        </div>
      </div>
    </section>
  );
}
